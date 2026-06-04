import mongoose, { Document, Schema } from 'mongoose';

interface ScheduleSlot {
  dayOfWeek: number;     // 0 = Sunday, 6 = Saturday
  startTime: string;     // 'HH:MM' 24h
  endTime: string;
  isAvailable: boolean;
}

export interface IProviderDocument extends Document {
  userId?: mongoose.Types.ObjectId;   // linked User account (clinician role)
  name: string;
  credentials: string;                // e.g. "MD, FACP"
  specialties: string[];
  bio: string;
  avatarUrl?: string;
  schedule: ScheduleSlot[];
  ratings: number[];
  avgRating: number;
  isAcceptingPatients: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ScheduleSlotSchema = new Schema<ScheduleSlot>(
  {
    dayOfWeek: { type: Number, min: 0, max: 6, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    isAvailable: { type: Boolean, default: true },
  },
  { _id: false }
);

const ProviderSchema = new Schema<IProviderDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true, trim: true },
    credentials: { type: String, required: true },
    specialties: [{ type: String, trim: true }],
    bio: { type: String },
    avatarUrl: { type: String },
    schedule: [ScheduleSlotSchema],
    ratings: [{ type: Number, min: 1, max: 5 }],
    avgRating: { type: Number, default: 0 },
    isAcceptingPatients: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Recompute avgRating before save
ProviderSchema.pre<IProviderDocument>('save', function (next) {
  if (this.ratings.length > 0) {
    this.avgRating =
      this.ratings.reduce((a, b) => a + b, 0) / this.ratings.length;
  }
});

ProviderSchema.index({ specialties: 1 });
ProviderSchema.index({ isAcceptingPatients: 1 });

export const Provider = mongoose.model<IProviderDocument>('Provider', ProviderSchema);
