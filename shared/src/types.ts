export enum UserRole {
  PATIENT = 'patient',
  DOCTOR = 'doctor',
  CLINICIAN = 'clinician',
  ADMIN = 'admin',
}

export enum AppointmentStatus {
  REQUESTED = 'requested',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed',
}

export enum ChatSender {
  PATIENT = 'patient',
  BOT = 'bot',
  CLINICIAN = 'clinician',
  SYSTEM = 'system',
}

export enum TriageOutcome {
  SELF_CARE = 'self_care',
  BOOK_APPOINTMENT = 'book_appointment',
  URGENT_CARE = 'urgent_care',
  EMERGENCY = 'emergency',
}

export enum SubscriptionStatus {
  NONE = 'none',
  ACTIVE = 'active',
  CANCELLED = 'cancelled',
  PAST_DUE = 'past_due',
}

export interface AuthTokens {
  token: string;
  refreshToken: string;
}

export interface JWTPayload {
  userId: string;
  role: UserRole;
  email: string;
  iat?: number;
  exp?: number;
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  dob?: string;
  address?: string;
  subscription: {
    status: SubscriptionStatus;
    stripeCustomerId?: string;
    stripeSubscriptionId?: string;
    currentPeriodEnd?: Date;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface IContact {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  department: string;
  message: string;
  preferredContact: 'email' | 'phone';
  createdAt: Date;
}

export interface IService {
  _id: string;
  title: string;
  category: string;
  description: string;
  price: number;
  durationMin: number;
  providerIds: string[];
  tags: string[];
  isPremium: boolean;
  iconName?: string;
}

export interface IAppointment {
  _id: string;
  patientId: string;
  providerId?: string;
  serviceId: string;
  startAt: string;
  endAt: string;
  status: AppointmentStatus;
  notes?: string;
  videoUrl?: string;
  createdAt: Date;
}

export interface ChatMessage {
  _id?: string;
  sender: ChatSender;
  text: string;
  timestamp: Date;
  metadata?: {
    triageOutcome?: TriageOutcome;
    suggestedActions?: SuggestedAction[];
    isDisclaimer?: boolean;
    confidence?: number;
  };
}

export interface SuggestedAction {
  label: string;
  type: 'book_appointment' | 'call_emergency' | 'self_care_tip' | 'faq' | 'redirect';
  payload?: Record<string, unknown>;
}

export interface IChatSession {
  _id: string;
  patientId?: string;
  providerId?: string;
  messages: ChatMessage[];
  status: 'active' | 'closed' | 'escalated';
  triageOutcome?: TriageOutcome;
  transcriptSummary?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface AdminMetrics {
  dau: number;
  mau: number;
  bookingsToday: number;
  bookingsThisMonth: number;
  conversionRate: number;
  mrr: number;
  arr: number;
  arpu: number;
  avgBookingLeadTimeHours: number;
  clinicianUtilizationPct: number;
  avgConsultRating: number;
  totalUsers: number;
  premiumUsers: number;
}
