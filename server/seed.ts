import 'dotenv/config';
import mongoose from 'mongoose';
import { User } from './src/models/user.model.js';
import { Service } from './src/models/service.model.js';
import { Provider } from './src/models/provider.model.js';
import { UserRole } from '../shared/src/types.js';

const MONGO_URI = process.env.MONGO_URI as string;

const SERVICES = [
  { title: 'Primary Care Virtual Visit', category: 'Primary Care', description: 'Consult with a board-certified primary care physician for non-emergency health concerns, referrals, and general wellness.', price: 75, durationMin: 30, tags: ['general', 'primary', 'wellness'], isPremium: false, iconName: 'stethoscope' },
  { title: 'Urgent Care Televisit', category: 'Urgent Care', description: 'Fast access to urgent care for common ailments like infections, minor injuries, rashes, and fever — no ER wait.', price: 99, durationMin: 20, tags: ['urgent', 'fast', 'infection'], isPremium: false, iconName: 'zap' },
  { title: 'Mental Health Counseling', category: 'Mental Health', description: 'Confidential video sessions with licensed therapists and counselors for anxiety, depression, stress, and more.', price: 120, durationMin: 50, tags: ['mental health', 'therapy', 'counseling'], isPremium: false, iconName: 'heart' },
  { title: 'Dermatology Photo Review', category: 'Dermatology', description: 'Submit photos of skin concerns for async review by a board-certified dermatologist with treatment recommendations in 24h.', price: 65, durationMin: 5, tags: ['skin', 'dermatology', 'async'], isPremium: false, iconName: 'eye' },
  { title: 'Pediatric Televisit', category: 'Pediatrics', description: 'Expert pediatric care for children from newborns to teens. Covers illness, development concerns, and preventive guidance.', price: 85, durationMin: 25, tags: ['pediatric', 'children', 'kids'], isPremium: false, iconName: 'baby' },
  { title: 'Chronic Care Management', category: 'Chronic Care', description: 'Ongoing management of chronic conditions like diabetes, hypertension, and asthma with care plan updates and medication reviews.', price: 150, durationMin: 45, tags: ['chronic', 'diabetes', 'hypertension', 'asthma'], isPremium: true, iconName: 'activity' },
  { title: 'Medication Management', category: 'Psychiatry', description: 'Psychiatric evaluation and medication management for mental health conditions including ADHD, depression, and anxiety.', price: 175, durationMin: 40, tags: ['medication', 'psychiatry', 'adhd'], isPremium: true, iconName: 'pill' },
  { title: 'Lab Test Ordering', category: 'Diagnostics', description: 'Order lab tests through our partner network and receive results reviewed by a clinician — no office visit required.', price: 45, durationMin: 15, tags: ['lab', 'diagnostics', 'blood test'], isPremium: false, iconName: 'flask' },
  { title: 'e-Prescription Service', category: 'Prescriptions', description: 'Get prescriptions for common medications sent directly to your preferred pharmacy after a quick clinician review.', price: 55, durationMin: 15, tags: ['prescription', 'medication', 'pharmacy'], isPremium: false, iconName: 'file-text' },
];

const PROVIDERS = [
  {
    name: 'Dr. Sarah Mitchell', credentials: 'MD, FACP', specialties: ['Primary Care', 'Internal Medicine', 'Preventive Health'],
    bio: 'Dr. Mitchell has 12 years of experience in primary and internal medicine. She is passionate about preventive care and helping patients manage chronic conditions.', avgRating: 4.9,
    isAcceptingPatients: true,
    schedule: [
      { dayOfWeek: 1, startTime: '09:00', endTime: '17:00', isAvailable: true },
      { dayOfWeek: 3, startTime: '09:00', endTime: '17:00', isAvailable: true },
      { dayOfWeek: 5, startTime: '09:00', endTime: '13:00', isAvailable: true },
    ],
  },
  {
    name: 'Dr. James Okafor', credentials: 'MD, MPH', specialties: ['Urgent Care', 'Emergency Medicine', 'Pediatrics'],
    bio: 'Dr. Okafor brings 8 years of emergency medicine experience to telehealth. He specializes in fast, accurate evaluation of acute conditions across all age groups.',
    avgRating: 4.8, isAcceptingPatients: true,
    schedule: [
      { dayOfWeek: 0, startTime: '08:00', endTime: '16:00', isAvailable: true },
      { dayOfWeek: 2, startTime: '08:00', endTime: '16:00', isAvailable: true },
      { dayOfWeek: 4, startTime: '08:00', endTime: '16:00', isAvailable: true },
      { dayOfWeek: 6, startTime: '08:00', endTime: '12:00', isAvailable: true },
    ],
  },
  {
    name: 'Dr. Nameless', credentials: 'MD, FAPA', specialties: ['Psychiatry', 'Mental Health', 'Medication Management', 'Anxiety', 'Depression'],
    bio: 'Dr. Nameless is a board-certified psychiatrist with 10 years of experience providing compassionate, evidence-based mental health care and medication management.',
    avgRating: 4.95, isAcceptingPatients: true,
    schedule: [
      { dayOfWeek: 1, startTime: '10:00', endTime: '18:00', isAvailable: true },
      { dayOfWeek: 2, startTime: '10:00', endTime: '18:00', isAvailable: true },
      { dayOfWeek: 4, startTime: '10:00', endTime: '18:00', isAvailable: true },
    ],
  },
];

const PARTNERS = [
  { name: 'LabCorp Direct', type: 'lab', contact: 'partners@labcorp.com', description: 'Nationwide lab network for diagnostics and blood work.', link: 'https://labcorp.com', isActive: true },
  { name: 'CVS Health', type: 'pharmacy', contact: 'telehealth@cvs.com', description: 'Prescription fulfillment and health services at 9,000+ locations.', link: 'https://cvs.com', isActive: true },
  { name: 'Aetna Health', type: 'insurer', contact: 'telehealth@aetna.com', description: 'Health insurance partner for coverage verification and co-pay processing.', link: 'https://aetna.com', isActive: true },
  { name: 'Stripe', type: 'payments', contact: 'support@stripe.com', description: 'Secure payment processing for subscriptions and one-time visits.', link: 'https://stripe.com', isActive: true },
  { name: 'Twilio', type: 'telehealth_tech', contact: 'sales@twilio.com', description: 'Video and SMS infrastructure powering virtual visits and notifications.', link: 'https://twilio.com', isActive: true },
  { name: 'Memorial Health Network', type: 'hospital', contact: 'digital@memorialhealth.com', description: 'Regional hospital partner for escalated in-person referrals.', link: '#', isActive: true },
];

async function seed() {
  console.log('Starting seed planting...');
  await mongoose.connect(MONGO_URI);
  console.log('Connected to MongoDB successfully!');

  // Clear existing data
  await Promise.all([
    User.deleteMany({}),
    Service.deleteMany({}),
    Provider.deleteMany({}),
    mongoose.connection.collection('partners').deleteMany({}),
  ]);
  console.log('Cleared existing data');

  // Seed admin user
  const admin = new User({
    name: 'Admin MediConnect',
    email: 'admin@mediconnect.com',
    passwordHash: 'Admin@1234',   // pre-save hook will hash this
    role: UserRole.ADMIN,
    isEmailVerified: true,
  });
  await admin.save();
  console.log('Admin user created successfully!');

  // Seed demo patient
  const patient = new User({
    name: 'Jane Doe',
    email: 'patient@mediconnect.com',
    passwordHash: 'Patient@1234',
    role: UserRole.PATIENT,
    phone: '+1 555-0100',
    isEmailVerified: true,
  });
  await patient.save();
  console.log('Patient user created successfully!');

  // Seed services
  const services = await Service.insertMany(SERVICES);
  console.log(`${services.length} services seeded successfully!`);

  // Seed providers
  const providers = await Provider.insertMany(PROVIDERS);
  console.log(`${providers.length} providers seeded successfully!`);

  // Seed partners
  await mongoose.connection.collection('partners').insertMany(PARTNERS);
  console.log(`${PARTNERS.length} partners seeded successfully!`);

  console.log('\nSeed planting complete!');

  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
