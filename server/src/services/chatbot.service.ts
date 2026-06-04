import OpenAI from 'openai';
import { TriageOutcome, SuggestedAction } from '@shared/types.js';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const MODEL = process.env.OPENAI_MODEL || 'gpt-4o-mini';

// System prompt with detailed instructions for the triage assistant
const SYSTEM_PROMPT = `You are MediBot, a medical triage assistant for MediConnect Telemedicine.

YOUR ROLE:
- Help patients understand the urgency of their symptoms
- Triage them to the appropriate level of care
- Never diagnose, prescribe, or replace a licensed clinician

ALWAYS follow these rules:
1. Be warm, calm, and empathetic — patients may be anxious
2. Ask ONE clarifying question at a time when you need more info
3. NEVER provide a diagnosis or definitive medical opinion
4. ALWAYS include the medical disclaimer in your first response
5. For ANY red-flag symptoms, IMMEDIATELY recommend emergency services

TRIAGE LEVELS — you MUST classify every response into one of:
- SELF_CARE: minor, manageable at home (e.g. mild cold, minor cut, headache)
- BOOK_APPOINTMENT: needs professional evaluation but not urgent (e.g. persistent cough, rash, chronic pain)
- URGENT_CARE: needs same-day care (e.g. high fever, moderate pain, possible infection)
- EMERGENCY: life-threatening — call 911 immediately (e.g. chest pain, difficulty breathing, stroke symptoms, severe bleeding, loss of consciousness)

RED FLAG SYMPTOMS — always classify as EMERGENCY:
- Chest pain or tightness
- Difficulty breathing or shortness of breath
- Sudden severe headache ("worst headache of my life")
- Facial drooping, arm weakness, speech difficulty (stroke signs)
- Severe abdominal pain
- Coughing or vomiting blood
- Uncontrolled bleeding
- Loss of consciousness or confusion
- Overdose or poisoning
- Suicidal ideation or self-harm

RESPONSE FORMAT:
Always respond with valid JSON matching this exact structure:
{
  "message": "Your warm, helpful response to the patient (plain text, no markdown)",
  "triageOutcome": "SELF_CARE | BOOK_APPOINTMENT | URGENT_CARE | EMERGENCY",
  "confidence": 0.0-1.0,
  "followUpQuestion": "Optional single clarifying question, or null",
  "suggestedActions": [
    { "label": "Action label", "type": "book_appointment|call_emergency|self_care_tip|faq|redirect", "payload": {} }
  ],
  "redFlagDetected": true | false,
  "disclaimer": "Include only on first message: 'I am not a doctor. This is for informational triage only. Always seek emergency care for life-threatening symptoms.'"
}`;

export interface TriageResult {
  message: string;
  triageOutcome: TriageOutcome;
  confidence: number;
  followUpQuestion: string | null;
  suggestedActions: SuggestedAction[];
  redFlagDetected: boolean;
  disclaimer?: string;
}

interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
}

// Pre-screening for red flags using regex patterns before calling the LLM
const RED_FLAG_PATTERNS = [
  /chest\s*pain/i,
  /can'?t?\s*breath/i,
  /difficulty\s*breath/i,
  /shortness\s*of\s*breath/i,
  /stroke/i,
  /face\s*(drooping|numb)/i,
  /arm\s*weak/i,
  /slurred?\s*speech/i,
  /worst\s*headache/i,
  /suicid/i,
  /self.?harm/i,
  /overdos/i,
  /poison/i,
  /uncontrolled\s*bleed/i,
  /unconscious/i,
  /not\s*breathing/i,
  /heart\s*attack/i,
  /coughing\s*blood/i,
  /vomit(ing)?\s*blood/i,
  /severe\s*abdominal\s*pain/i,
];

export function hasRedFlag(text: string): boolean {
  return RED_FLAG_PATTERNS.some((pattern) => pattern.test(text));
}

// Build a standard emergency response if a red flag is detected in pre-screening
export function buildEmergencyResponse(): TriageResult {
  return {
    message:
      '🚨 Based on what you described, this may be a life-threatening emergency. Please call 911 (or your local emergency number) immediately or go to your nearest emergency room. Do not wait.',
    triageOutcome: TriageOutcome.EMERGENCY,
    confidence: 1.0,
    followUpQuestion: null,
    redFlagDetected: true,
    suggestedActions: [
      { label: 'Call 911 Now', type: 'call_emergency', payload: { number: '911' } },
      { label: 'Find Nearest ER', type: 'redirect', payload: { url: '/emergency' } },
    ],
    disclaimer:
      'I am not a doctor. This is for informational triage only. Always seek emergency care for life-threatening symptoms.',
  };
}

// Sanitize user input to prevent injection attacks and remove unwanted characters before sending to LLM
function sanitizeInput(text: string): string {
  return text
    .trim()
    .slice(0, 1000)                        // hard length cap
    .replace(/<[^>]*>/g, '')               // strip HTML tags
    .replace(/[^\w\s.,!?'"-]/g, ' ')      // remove unusual characters
    .replace(/\s+/g, ' ');
}

// Main function to run triage: takes user message and conversation history, returns triage result
export async function runTriage(
  userMessage: string,
  conversationHistory: ConversationMessage[],
  isFirstMessage: boolean
): Promise<TriageResult> {
  // Tier 0: pre-screen for red flags without calling LLM
  if (hasRedFlag(userMessage)) {
    return buildEmergencyResponse();
  }

  const sanitized = sanitizeInput(userMessage);

  // Build message array for OpenAI
  const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...conversationHistory.slice(-10),    // keep last 10 messages for context
    { role: 'user', content: sanitized },
  ];

//  If this is the first message in the conversation, include a disclaimer in the system prompt to ensure it's always present in the response
  if (isFirstMessage) {
    messages.push({
      role: 'system',
      content: 'This is the patient\'s first message. Include the disclaimer field in your JSON response.',
    });
  }

  const completion = await openai.chat.completions.create({
    model: MODEL,
    messages,
    temperature: 0.3,           // low temperature for consistent, safe medical responses
    max_tokens: 600,
    response_format: { type: 'json_object' },
  });

  const raw = completion.choices[0]?.message?.content;
  if (!raw) throw new Error('Empty response from OpenAI');

  let parsed: TriageResult;
  try {
    parsed = JSON.parse(raw) as TriageResult;
  } catch {
    throw new Error('Failed to parse OpenAI JSON response');
  }

  // Normalise triageOutcome to our enum
  const outcomeMap: Record<string, TriageOutcome> = {
    SELF_CARE: TriageOutcome.SELF_CARE,
    BOOK_APPOINTMENT: TriageOutcome.BOOK_APPOINTMENT,
    URGENT_CARE: TriageOutcome.URGENT_CARE,
    EMERGENCY: TriageOutcome.EMERGENCY,
  };
  parsed.triageOutcome =
    outcomeMap[parsed.triageOutcome as unknown as string] ?? TriageOutcome.BOOK_APPOINTMENT;

  // Safety net: if LLM detected emergency but our pre-screen missed it, honour it
  if (parsed.triageOutcome === TriageOutcome.EMERGENCY || parsed.redFlagDetected) {
    parsed.suggestedActions = [
      { label: 'Call 911 Now', type: 'call_emergency', payload: { number: '911' } },
      ...(parsed.suggestedActions || []),
    ];
    parsed.redFlagDetected = true;
  }

  // Ensure suggestedActions always has booking CTA for non-emergency
  if (
    parsed.triageOutcome !== TriageOutcome.EMERGENCY &&
    !parsed.suggestedActions?.some((a) => a.type === 'book_appointment')
  ) {
    parsed.suggestedActions = [
      ...(parsed.suggestedActions || []),
      { label: 'Book a Virtual Visit', type: 'book_appointment' },
    ];
  }

  return parsed;
}

// FAQ matching rules for common questions, to provide instant answers without LLM calls
const FAQ_RULES: { pattern: RegExp; answer: string }[] = [
  {
    pattern: /how\s+do\s+i\s+(book|schedule|make)\s+(an?\s+)?(appointment|visit|consult)/i,
    answer:
      'You can book a virtual visit by creating an account, then selecting a service and a time that works for you. It only takes 2 minutes!',
  },
  {
    pattern: /how\s+much\s+does\s+it\s+cost|pricing|price|fee/i,
    answer:
      'Our visits start at $45 for lab ordering and go up to $175 for specialised psychiatry. Check our Pricing page for the full breakdown.',
  },
  {
    pattern: /insurance/i,
    answer:
      'We work with several insurance partners. Coverage depends on your plan — our team can help verify your benefits before your visit.',
  },
  {
    pattern: /prescription|medication/i,
    answer:
      'Our clinicians can issue e-prescriptions for eligible medications after a consultation. Prescriptions are sent directly to your preferred pharmacy.',
  },
  {
    pattern: /emergency|911|urgent/i,
    answer:
      '🚨 If you are experiencing a medical emergency, please call 911 or go to your nearest emergency room immediately. Do not use this chat for emergencies.',
  },
  {
    pattern: /hour|available|open/i,
    answer:
      'Our clinicians are available 7 days a week. Availability varies by provider — you can see real-time slots when you book.',
  },
];

export function matchFAQ(text: string): string | null {
  for (const rule of FAQ_RULES) {
    if (rule.pattern.test(text)) return rule.answer;
  }
  return null;
}
