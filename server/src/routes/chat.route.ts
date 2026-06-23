import { Router, Request, Response } from 'express';
import { ChatSession } from '../models/chat.model.js';
import { authenticate, optionalAuth } from '../middleware/auth.middleware.js';
import { validate, StartChatSchema, ChatMessageSchema } from '../middleware/validate.js';
import { ChatSender, TriageOutcome } from '@shared/types.js';
import { chatLimiter } from '../middleware/ratelimit.js';
import {
  runTriage,
  matchFAQ,
  hasRedFlag,
  buildEmergencyResponse,
} from '../services/chatbot.service.js';
import mongoose from 'mongoose';

export const chatRouter = Router();

// Helper to build OpenAI message history from our chat session messages, keeping only last 10 and mapping sender to role
function buildHistory(messages: { sender: string; text: string }[]) {
  return messages
    .filter((m) => m.sender !== ChatSender.SYSTEM)
    .slice(-10)
    .map((m) => ({
      role: (m.sender === ChatSender.PATIENT ? 'user' : 'assistant') as 'user' | 'assistant',
      content: m.text,
    }));
}

// POST /api/chat/session — start new chat session with initial message
chatRouter.post(
  '/session',
  chatLimiter,
  optionalAuth,
  validate(StartChatSchema),
  async (req: Request, res: Response) => {
    try {
      const { initialSymptomText } = req.body;
      const patientId = req.user?.userId;
      const isAuthenticated = !!patientId;

      const disclaimer =
        '⚕️ Disclaimer: I am not a doctor. This is for informational triage only and does not replace professional medical advice. For emergencies, call 911 immediately.';

      const systemGreeting = {
        sender: ChatSender.BOT,
        text: `👋 Hello! I'm MediBot, your BioMedLink health assistant.\n\n${disclaimer}\n\nHow can I help you today?`,
        timestamp: new Date(),
        metadata: { isDisclaimer: true },
      };

      const patientMessage = {
        sender: ChatSender.PATIENT,
        text: initialSymptomText,
        timestamp: new Date(),
      };

      // Build bot reply based on tier
      let botReply: Record<string, unknown>;
      let sessionTriageOutcome: TriageOutcome | undefined;
      let flagged = false;
      let escalated = false;

      if (hasRedFlag(initialSymptomText)) {
        // Tier 0: immediate emergency, no LLM call
        const emergency = buildEmergencyResponse();
        botReply = {
          sender: ChatSender.BOT,
          text: emergency.message,
          timestamp: new Date(),
          metadata: {
            triageOutcome: TriageOutcome.EMERGENCY,
            suggestedActions: emergency.suggestedActions,
            confidence: 1.0,
          },
        };
        sessionTriageOutcome = TriageOutcome.EMERGENCY;
        flagged = true;
        escalated = true;
      } else if (!isAuthenticated) {
        // Tier 0: anonymous user — FAQ or sign-up CTA
        const faqAnswer = matchFAQ(initialSymptomText);
        botReply = {
          sender: ChatSender.BOT,
          text: faqAnswer
            ? faqAnswer
            : "I can answer general health questions here. For personalised AI-powered symptom triage, please sign in or create a free account — it only takes a minute!",
          timestamp: new Date(),
          metadata: {
            suggestedActions: faqAnswer
              ? [{ label: 'Book a Visit', type: 'book_appointment' }]
              : [
                  { label: 'Sign In', type: 'redirect', payload: { url: '/auth/login' } },
                  { label: 'Create Free Account', type: 'redirect', payload: { url: '/auth/register' } },
                ],
          },
        };
      } else {
        // Tier 1: full AI triage for authenticated patients
        const triageResult = await runTriage(initialSymptomText, [], true);
        const replyText = triageResult.followUpQuestion
          ? `${triageResult.message}\n\n${triageResult.followUpQuestion}`
          : triageResult.message;

        botReply = {
          sender: ChatSender.BOT,
          text: replyText,
          timestamp: new Date(),
          metadata: {
            triageOutcome: triageResult.triageOutcome,
            suggestedActions: triageResult.suggestedActions,
            confidence: triageResult.confidence,
          },
        };
        sessionTriageOutcome = triageResult.triageOutcome;
        flagged = triageResult.redFlagDetected;
        escalated = triageResult.triageOutcome === TriageOutcome.EMERGENCY;
      }

      const session = await ChatSession.create({
        patientId: patientId ? new mongoose.Types.ObjectId(patientId) : undefined,
        isAnonymous: !patientId,
        messages: [systemGreeting, patientMessage, botReply],
        triageOutcome: sessionTriageOutcome,
        flaggedForReview: flagged,
        status: escalated ? 'escalated' : 'active',
      });

      res.status(201).json({
        success: true,
        data: {
          sessionId: session._id,
          messages: session.messages,
          triageOutcome: session.triageOutcome,
          sessionStatus: session.status,
        },
      });
    } catch (err) {
      console.error('[Chat:start]', err);
      res.status(500).json({ success: false, error: 'Failed to start chat session' });
    }
  }
);

// POST /api/chat/session/:id/message — send message in existing session and get bot reply
chatRouter.post(
  '/session/:id/message',
  chatLimiter,
  optionalAuth,
  validate(ChatMessageSchema),
  async (req: Request, res: Response) => {
    try {
      const session = await ChatSession.findById(req.params.id);
      if (!session) {
        res.status(404).json({ success: false, error: 'Session not found' });
        return;
      }
      if (session.status !== 'active') {
        res.status(400).json({ success: false, error: `Session is ${session.status}` });
        return;
      }

      const { text } = req.body;
      const isAuthenticated = !!req.user?.userId;

      const patientMsg = { sender: ChatSender.PATIENT, text, timestamp: new Date() };
      session.messages.push(patientMsg);

      let botReply: Record<string, unknown>;

      if (hasRedFlag(text)) {
        const emergency = buildEmergencyResponse();
        botReply = {
          sender: ChatSender.BOT,
          text: emergency.message,
          timestamp: new Date(),
          metadata: {
            triageOutcome: TriageOutcome.EMERGENCY,
            suggestedActions: emergency.suggestedActions,
            confidence: 1.0,
          },
        };
        session.status = 'escalated';
        session.flaggedForReview = true;
        session.triageOutcome = TriageOutcome.EMERGENCY;
      } else if (!isAuthenticated) {
        const faqAnswer = matchFAQ(text);
        botReply = {
          sender: ChatSender.BOT,
          text: faqAnswer || 'For personalised AI triage, please sign in or create a free account.',
          timestamp: new Date(),
          metadata: {
            suggestedActions: [
              { label: 'Sign In', type: 'redirect', payload: { url: '/auth/login' } },
              { label: 'Book a Visit', type: 'book_appointment' },
            ],
          },
        };
      } else {
        const history = buildHistory(
          session.messages.map((m) => ({ sender: m.sender, text: m.text }))
        );
        const isFirst =
          session.messages.filter((m) => m.sender === ChatSender.PATIENT).length <= 1;
        const triageResult = await runTriage(text, history, isFirst);

        const replyText = triageResult.followUpQuestion
          ? `${triageResult.message}\n\n${triageResult.followUpQuestion}`
          : triageResult.message;

        botReply = {
          sender: ChatSender.BOT,
          text: replyText,
          timestamp: new Date(),
          metadata: {
            triageOutcome: triageResult.triageOutcome,
            suggestedActions: triageResult.suggestedActions,
            confidence: triageResult.confidence,
          },
        };
        session.triageOutcome = triageResult.triageOutcome;
        if (triageResult.redFlagDetected) {
          session.flaggedForReview = true;
          session.status = 'escalated';
        }
      }

      session.messages.push(botReply as never);
      await session.save();

      res.json({
        success: true,
        data: {
          message: botReply,
          triageOutcome: session.triageOutcome,
          suggestedActions:
            (botReply as { metadata?: { suggestedActions?: unknown[] } })?.metadata
              ?.suggestedActions ?? [],
          sessionStatus: session.status,
        },
      });
    } catch (err) {
      console.error('[Chat:message]', err);
      res.status(500).json({ success: false, error: 'Failed to process message' });
    }
  }
);

// GET /api/chat/session/:id — get full session details (for patient or clinician/admin if flagged)
chatRouter.get('/session/:id', authenticate, async (req: Request, res: Response) => {
  const session = await ChatSession.findById(req.params.id);
  if (!session) { res.status(404).json({ success: false, error: 'Not found' }); return; }
  res.json({ success: true, data: session });
});

// GET /api/chat/sessions — list recent chat sessions for patient (without messages)
chatRouter.get('/sessions', authenticate, async (req: Request, res: Response) => {
  const sessions = await ChatSession.find({ patientId: req.user!.userId })
    .sort({ createdAt: -1 })
    .limit(20)
    .select('-messages');
  res.json({ success: true, data: sessions });
});

// PATCH /api/chat/session/:id/close — allow patient to close session when issue resolved (clinician can also close after review)
chatRouter.patch('/session/:id/close', authenticate, async (req: Request, res: Response) => {
  const session = await ChatSession.findByIdAndUpdate(
    req.params.id,
    { status: 'closed' },
    { new: true }
  );
  if (!session) { res.status(404).json({ success: false, error: 'Not found' }); return; }
  res.json({ success: true, data: { status: session.status } });
});

// GET /api/chat/flagged — for clinicians/admins to review recently flagged sessions
chatRouter.get('/flagged', authenticate, async (req: Request, res: Response) => {
  const { role } = req.user!;
  if (role !== 'admin' && role !== 'clinician') {
    res.status(403).json({ success: false, error: 'Access denied' }); return;
  }
  const flagged = await ChatSession.find({ flaggedForReview: true })
    .sort({ updatedAt: -1 })
    .limit(50)
    .select('patientId triageOutcome status updatedAt messages');
  res.json({ success: true, data: flagged });
});
