import mongoose, { Document, Schema } from 'mongoose';
import { ChatSender, TriageOutcome } from '@shared/types.js';

interface ISuggestedAction {
  label: string;
  type: 'book_appointment' | 'call_emergency' | 'self_care_tip' | 'faq' | 'redirect';
  payload?: Record<string, unknown>;
}

interface IMessageMetadata {
  triageOutcome?: TriageOutcome;
  suggestedActions?: ISuggestedAction[];
  isDisclaimer?: boolean;
  confidence?: number;
}

export interface IChatMessage {
  _id?: mongoose.Types.ObjectId;
  sender: ChatSender;
  text: string;
  timestamp: Date;
  metadata?: IMessageMetadata;
}

export interface IChatSessionDocument extends Document {
  patientId?: mongoose.Types.ObjectId;
  providerId?: mongoose.Types.ObjectId;
  messages: IChatMessage[];
  status: 'active' | 'closed' | 'escalated';
  triageOutcome?: TriageOutcome;
  transcriptSummary?: string;
  flaggedForReview: boolean;
  isAnonymous: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const SuggestedActionSchema = new Schema<ISuggestedAction>(
  {
    label: { type: String, required: true },
    type: {
      type: String,
      enum: ['book_appointment', 'call_emergency', 'self_care_tip', 'faq', 'redirect'],
      required: true,
    },
    payload: { type: Schema.Types.Mixed },
  },
  { _id: false }
);

const MessageMetadataSchema = new Schema<IMessageMetadata>(
  {
    triageOutcome: { type: String, enum: Object.values(TriageOutcome) },
    suggestedActions: [SuggestedActionSchema],
    isDisclaimer: { type: Boolean },
    confidence: { type: Number, min: 0, max: 1 },
  },
  { _id: false }
);

const ChatMessageSchema = new Schema<IChatMessage>(
  {
    sender: {
      type: String,
      enum: Object.values(ChatSender),
      required: true,
    },
    text: { type: String, required: true, maxlength: 5000 },
    timestamp: { type: Date, default: Date.now },
    metadata: { type: MessageMetadataSchema },
  },
  { _id: true }
);

const ChatSessionSchema = new Schema<IChatSessionDocument>(
  {
    patientId: { type: Schema.Types.ObjectId, ref: 'User' },
    providerId: { type: Schema.Types.ObjectId, ref: 'Provider' },
    messages: [ChatMessageSchema],
    status: {
      type: String,
      enum: ['active', 'closed', 'escalated'],
      default: 'active',
    },
    triageOutcome: { type: String, enum: Object.values(TriageOutcome) },
    transcriptSummary: { type: String },
    flaggedForReview: { type: Boolean, default: false },
    isAnonymous: { type: Boolean, default: false },
  },
  { timestamps: true }
);

ChatSessionSchema.index({ patientId: 1, createdAt: -1 });
ChatSessionSchema.index({ status: 1 });
ChatSessionSchema.index({ flaggedForReview: 1 });

export const ChatSession = mongoose.model<IChatSessionDocument>(
  'ChatSession',
  ChatSessionSchema
);
