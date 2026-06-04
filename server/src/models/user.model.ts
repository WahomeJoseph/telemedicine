import mongoose, { Document, Schema, Model } from 'mongoose';
import bcrypt from 'bcryptjs';
import { UserRole, SubscriptionStatus } from '@shared/types.js';

// Interface
export interface IUserDocument extends Document {
  name: string;
  email: string;
  passwordHash: string;
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
  refreshTokens: string[];          
  isEmailVerified: boolean;
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;

  
  comparePassword(plain: string): Promise<boolean>;
}

export interface IUserModel extends Model<IUserDocument> {
  findByEmail(email: string): Promise<IUserDocument | null>;
}

// Subscription schema

const SubscriptionSchema = new Schema(
  {
    status: {
      type: String,
      enum: Object.values(SubscriptionStatus),
      default: SubscriptionStatus.NONE,
    },
    stripeCustomerId: String,
    stripeSubscriptionId: String,
    currentPeriodEnd: Date,
  },
  { _id: false }
);

const UserSchema = new Schema<IUserDocument, IUserModel>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Invalid email format'],
    },
    passwordHash: {
      type: String,
      required: true,
      select: false,       
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.PATIENT,
    },
    phone: { type: String, trim: true },
    dob: { type: String },
    address: { type: String },
    subscription: { type: SubscriptionSchema, default: () => ({}) },
    refreshTokens: {
      type: [String],
      default: [],
      select: false,        // hidden by default
    },
    isEmailVerified: { type: Boolean, default: false },
    lastLoginAt: Date,
  },
  {
    timestamps: true,
    toJSON: {
  transform(_doc, ret: Record<string, any>) {
    const { passwordHash, refreshTokens, __v, ...safe } = ret;
    return safe;
  },
},
  }
);

// Indexes

UserSchema.index({ role: 1 });
UserSchema.index({ createdAt: -1 });

// Pre-save: hash password

UserSchema.pre<IUserDocument>('save', async function (next) {
  if (!this.isModified('passwordHash')) 
    return;

  const SALT_ROUNDS = 12;
  this.passwordHash = await bcrypt.hash(this.passwordHash, SALT_ROUNDS);
});

UserSchema.methods.comparePassword = async function (
  plain: string
): Promise<boolean> {
  return bcrypt.compare(plain, this.passwordHash);
};

// Find by email

UserSchema.statics.findByEmail = function (
  email: string
): Promise<IUserDocument | null> {
  return this.findOne({ email: email.toLowerCase().trim() })
    .select('+passwordHash +refreshTokens')
    .exec();
};

export const User = mongoose.model<IUserDocument, IUserModel>('User', UserSchema);
