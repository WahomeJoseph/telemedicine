import mongoose, { Document, Schema } from 'mongoose';

export interface IServiceDocument extends Document {
  title: string;
  category: string;
  description: string;
  price: number;
  durationMin: number;
  providerIds: mongoose.Types.ObjectId[];
  tags: string[];
  isPremium: boolean;
  iconName?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema = new Schema<IServiceDocument>(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    durationMin: { type: Number, required: true, min: 3 },
    providerIds: [{ type: Schema.Types.ObjectId, ref: 'Provider' }],
    tags: [{ type: String, lowercase: true, trim: true }],
    isPremium: { type: Boolean, default: false },
    iconName: { type: String },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

ServiceSchema.index({ category: 1 });
ServiceSchema.index({ tags: 1 });
ServiceSchema.index({ isPremium: 1 });

export const Service = mongoose.model<IServiceDocument>('Service', ServiceSchema);
