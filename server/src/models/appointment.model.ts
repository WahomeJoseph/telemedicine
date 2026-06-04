import mongoose, { Document, Schema } from 'mongoose';
import { AppointmentStatus } from '../../../shared/src/types.js';

export interface IAppointmentDocument extends Document {
  patientId: mongoose.Types.ObjectId;
  providerId?: mongoose.Types.ObjectId;
  serviceId: mongoose.Types.ObjectId;
  startAt: Date;
  endAt: Date;
  status: AppointmentStatus;
  patientNotes?: string;
  clinicianNotes?: string;
  videoUrl?: string;
  paymentIntentId?: string;
  amountPaid?: number;
  createdAt: Date;
  updatedAt: Date;
}

const AppointmentSchema = new Schema<IAppointmentDocument>(
  {
    patientId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    providerId: { type: Schema.Types.ObjectId, ref: 'Provider' },
    serviceId: { type: Schema.Types.ObjectId, ref: 'Service', required: true },
    startAt: { type: Date, required: true },
    endAt: { type: Date, required: true },
    status: {
      type: String,
      enum: Object.values(AppointmentStatus),
      default: AppointmentStatus.REQUESTED,
    },
    patientNotes: { type: String, maxlength: 2000 },
    clinicianNotes: { type: String, maxlength: 5000 },
    videoUrl: { type: String },
    paymentIntentId: { type: String },
    amountPaid: { type: Number, min: 0 },
  },
  { timestamps: true }
);

AppointmentSchema.index({ patientId: 1, startAt: -1 });
AppointmentSchema.index({ providerId: 1, startAt: 1 });
AppointmentSchema.index({ status: 1 });
AppointmentSchema.index({ startAt: 1 });

export const Appointment = mongoose.model<IAppointmentDocument>(
  'Appointment',
  AppointmentSchema
);
