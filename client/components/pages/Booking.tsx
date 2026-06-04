'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/libs/hooks/useAuthStore';
import {
    Calendar,
    Clock,
    Stethoscope,
    Video,
    MapPin,
    CreditCard,
    ChevronRight,
    Search,
    Star,
    CheckCircle,
    User,
    Phone,
    Mail,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';

// Mock data - replace with API call
const doctors = [
    {
        id: 1,
        name: 'Dr. Sarah Johnson',
        specialty: 'Cardiologist',
        experience: '12 years',
        rating: 4.9,
        reviews: 128,
        price: 89,
        available: true,
        image: '/doctor-1.jpg',
        nextAvailable: 'Today, 2:30 PM',
        education: 'MD, FACC - Harvard Medical School',
        languages: ['English', 'Spanish'],
        videoConsult: true,
        inPerson: true
    },
    {
        id: 2,
        name: 'Dr. Michael Chen',
        specialty: 'General Physician',
        experience: '8 years',
        rating: 4.8,
        reviews: 94,
        price: 69,
        available: true,
        image: '/doctor-2.jpg',
        nextAvailable: 'Tomorrow, 9:00 AM',
        education: 'MD - Johns Hopkins University',
        languages: ['English', 'Mandarin'],
        videoConsult: true,
        inPerson: true
    },
    {
        id: 3,
        name: 'Dr. Amina Hassan',
        specialty: 'Pediatrician',
        experience: '15 years',
        rating: 5.0,
        reviews: 203,
        price: 99,
        available: true,
        image: '/doctor-3.jpg',
        nextAvailable: 'Today, 4:00 PM',
        education: 'MD, FAAP - Stanford University',
        languages: ['English', 'Swahili', 'Arabic'],
        videoConsult: true,
        inPerson: false
    },
    {
        id: 4,
        name: 'Dr. James Wilson',
        specialty: 'Dermatologist',
        experience: '10 years',
        rating: 4.7,
        reviews: 76,
        price: 79,
        available: false,
        image: '/doctor-4.jpg',
        nextAvailable: 'Dec 18, 10:00 AM',
        education: 'MD - Yale School of Medicine',
        languages: ['English'],
        videoConsult: true,
        inPerson: true
    },
];

const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM'
];

const reasons = [
    'General Checkup',
    'Follow-up Visit',
    'New Symptoms',
    'Prescription Refill',
    'Test Results Review',
    'Vaccination',
    'Mental Health',
    'Other'
];

export default function BookAppointmentPage() {
    const router = useRouter();
    const { user } = useAuthStore();
    const [step, setStep] = useState(1);
    const [selectedDoctor, setSelectedDoctor] = useState<typeof doctors[0] | null>(null);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [selectedReason, setSelectedReason] = useState('');
    const [consultationType, setConsultationType] = useState('video');
    const [searchTerm, setSearchTerm] = useState('');
    const [specialtyFilter, setSpecialtyFilter] = useState('');
    const [notes, setNotes] = useState('');
    const [isBooking, setIsBooking] = useState(false);
    const [bookingSuccess, setBookingSuccess] = useState(false);

    const getNextDays = () => {
        const days = [];
        const today = new Date();
        for (let i = 0; i < 30; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            days.push(date);
        }
        return days;
    };

    const handleBooking = async () => {
        setIsBooking(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsBooking(false);
        setBookingSuccess(true);

        // Redirect after 2 seconds
        setTimeout(() => {
            router.push('/dashboard/patient/appointments');
        }, 2000);
    };

    const filteredDoctors = doctors.filter(doctor =>
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (bookingSuccess) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center max-w-md">
                    <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-10 h-10 text-accent" />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground mb-3">Appointment Booked!</h2>
                    <p className="text-muted-foreground mb-6">
                        Your appointment has been successfully scheduled. You will receive a confirmation email shortly.
                    </p>
                    <div className="bg-card rounded-xl border border-border p-4 mb-6">
                        <p className="text-sm text-muted-foreground">Appointment with</p>
                        <p className="font-semibold text-foreground">{selectedDoctor?.name}</p>
                        <p className="text-sm text-muted-foreground">{selectedDoctor?.specialty}</p>
                        <div className="flex items-center gap-2 mt-2 text-sm">
                            <Calendar className="w-4 h-4 text-primary" />
                            <span>{selectedDate}</span>
                            <Clock className="w-4 h-4 text-primary ml-2" />
                            <span>{selectedTime}</span>
                        </div>
                    </div>
                    <Link
                        href="/dashboard/patient/appointments"
                        className="btn-medical-primary inline-flex items-center gap-2"
                    >
                        View My Appointments
                        <ChevronRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 mx-10">
            <div className="flex items-center justify-between">
                <div>
                    <Link href="/" className="flex items-center gap-1.5 group">
                        <div className="shrink-0 flex items-center justify-center px-0">
                            <Image
                                src="/logo.png"
                                alt="BioMedPharm"
                                width={80}
                                height={80}
                                className="object-contain"
                                priority
                            />
                        </div>

                    </Link>
                    <h1 className="text-2xl md:text-3xl font-bold text-foreground">Book an Appointment</h1>
                    <p className="text-muted-foreground text-sm mt-1">Schedule a consultation with our expert doctors, clinicians and specialists</p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 text-sm">
                        <div className={clsx(
                            "w-2 h-2 rounded-full",
                            step >= 1 ? "bg-accent" : "bg-border"
                        )} />
                        <span className="text-xs text-muted-foreground">Doctor</span>
                    </div>
                    <div className="w-8 h-px bg-border" />
                    <div className="flex items-center gap-1 text-sm">
                        <div className={clsx(
                            "w-2 h-2 rounded-full",
                            step >= 2 ? "bg-accent" : "bg-border"
                        )} />
                        <span className="text-xs text-muted-foreground">Schedule</span>
                    </div>
                    <div className="w-8 h-px bg-border" />
                    <div className="flex items-center gap-1 text-sm">
                        <div className={clsx(
                            "w-2 h-2 rounded-full",
                            step >= 3 ? "bg-accent" : "bg-border"
                        )} />
                        <span className="text-xs text-muted-foreground">Confirm</span>
                    </div>
                </div>
            </div>

            {/* Step 1: Select Doctor */}
            {step === 1 && (
                <div className="space-y-6">
                    {/* Search and Filter */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Search by doctor name or specialty..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 border border-border rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>
                        <select
                            value={specialtyFilter}
                            onChange={(e) => setSpecialtyFilter(e.target.value)}
                            className="px-4 py-2.5 border border-border rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                            <option value="">All Specialties</option>
                            <option value="Cardiologist">Cardiologist</option>
                            <option value="General Physician">General Physician</option>
                            <option value="Pediatrician">Pediatrician</option>
                            <option value="Dermatologist">Dermatologist</option>
                        </select>
                    </div>

                    {/* Doctors Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {filteredDoctors.map((doctor) => (
                            <div
                                key={doctor.id}
                                className={clsx(
                                    "bg-card rounded-2xl border-2 p-6 cursor-pointer transition-all duration-300 hover:shadow-strong",
                                    selectedDoctor?.id === doctor.id
                                        ? "border-primary shadow-primary-glow"
                                        : "border-border hover:border-primary/50"
                                )}
                                onClick={() => setSelectedDoctor(doctor)}
                            >
                                <div className="flex items-start gap-4">
                                    {/* Doctor Avatar */}
                                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent-teal flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                                        {doctor.name.charAt(0)}
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h3 className="font-semibold text-foreground text-lg">{doctor.name}</h3>
                                                <p className="text-sm text-primary">{doctor.specialty}</p>
                                            </div>
                                            <div className="text-right">
                                                <div className="flex items-center gap-1">
                                                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                                    <span className="font-semibold text-foreground">{doctor.rating}</span>
                                                    <span className="text-xs text-muted-foreground">({doctor.reviews})</span>
                                                </div>
                                                <p className="text-sm font-semibold text-foreground">${doctor.price}</p>
                                                <p className="text-xs text-muted-foreground">per visit</p>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-2 mt-3">
                                            <span className="px-2 py-1 bg-secondary rounded-lg text-xs text-muted-foreground">
                                                {doctor.experience} exp.
                                            </span>
                                            {doctor.videoConsult && (
                                                <span className="px-2 py-1 bg-secondary rounded-lg text-xs text-muted-foreground flex items-center gap-1">
                                                    <Video className="w-3 h-3" /> Video
                                                </span>
                                            )}
                                            {doctor.inPerson && (
                                                <span className="px-2 py-1 bg-secondary rounded-lg text-xs text-muted-foreground flex items-center gap-1">
                                                    <MapPin className="w-3 h-3" /> In-person
                                                </span>
                                            )}
                                        </div>

                                        <div className="flex items-center justify-between mt-4">
                                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                                <Clock className="w-3 h-3" />
                                                <span>Next: {doctor.nextAvailable}</span>
                                            </div>
                                            {doctor.available ? (
                                                <span className="text-xs text-accent flex items-center gap-1">
                                                    <CheckCircle className="w-3 h-3" /> Available
                                                </span>
                                            ) : (
                                                <span className="text-xs text-warm">Limited slots</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Next Button */}
                    <div className="flex justify-end">
                        <button
                            onClick={() => setStep(2)}
                            disabled={!selectedDoctor}
                            className={clsx(
                                "px-8 py-3 rounded-xl font-semibold transition-all duration-200",
                                selectedDoctor
                                    ? "btn-medical-primary shadow-primary-glow"
                                    : "bg-border text-muted-foreground cursor-not-allowed"
                            )}
                        >
                            Continue to Schedule
                            <ChevronRight className="w-4 h-4 ml-2 inline" />
                        </button>
                    </div>
                </div>
            )}

            {/* Step 2: Schedule Appointment */}
            {step === 2 && selectedDoctor && (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Left - Date Selection */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Consultation Type */}
                            <div className="bg-card rounded-2xl border border-border p-6">
                                <h3 className="font-semibold text-foreground mb-4">Consultation Type</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        onClick={() => setConsultationType('video')}
                                        className={clsx(
                                            "p-4 rounded-xl border-2 transition-all duration-200",
                                            consultationType === 'video'
                                                ? "border-primary bg-primary/5"
                                                : "border-border hover:border-primary/50"
                                        )}
                                    >
                                        <Video className="w-6 h-6 text-primary mx-auto mb-2" />
                                        <p className="font-medium text-foreground">Video Call</p>
                                        <p className="text-xs text-muted-foreground">Consult from home</p>
                                    </button>
                                    <button
                                        onClick={() => setConsultationType('in-person')}
                                        className={clsx(
                                            "p-4 rounded-xl border-2 transition-all duration-200",
                                            consultationType === 'in-person'
                                                ? "border-primary bg-primary/5"
                                                : "border-border hover:border-primary/50"
                                        )}
                                    >
                                        <MapPin className="w-6 h-6 text-primary mx-auto mb-2" />
                                        <p className="font-medium text-foreground">In-Person</p>
                                        <p className="text-xs text-muted-foreground">Visit our clinic</p>
                                    </button>
                                </div>
                            </div>

                            {/* Date Selection */}
                            <div className="bg-card rounded-2xl border border-border p-6">
                                <h3 className="font-semibold text-foreground mb-4">Select Date</h3>
                                <div className="grid grid-cols-4 sm:grid-cols-7 gap-3">
                                    {getNextDays().map((date, idx) => {
                                        const isSelected = selectedDate === date.toDateString();
                                        const isToday = idx === 0;
                                        return (
                                            <button
                                                key={idx}
                                                onClick={() => setSelectedDate(date.toDateString())}
                                                className={clsx(
                                                    "p-3 rounded-xl text-center transition-all duration-200",
                                                    isSelected
                                                        ? "bg-gradient-to-r from-primary to-accent-teal text-white"
                                                        : "border border-border hover:border-primary/50 bg-background"
                                                )}
                                            >
                                                <p className="text-xs font-medium">
                                                    {isToday ? 'Today' : date.toLocaleDateString('en-US', { weekday: 'short' })}
                                                </p>
                                                <p className="text-lg font-bold mt-1">{date.getDate()}</p>
                                                <p className="text-xs mt-1">{date.toLocaleDateString('en-US', { month: 'short' })}</p>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Time Selection */}
                            {selectedDate && (
                                <div className="bg-card rounded-2xl border border-border p-6">
                                    <h3 className="font-semibold text-foreground mb-4">Select Time</h3>
                                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                                        {timeSlots.map((time) => (
                                            <button
                                                key={time}
                                                onClick={() => setSelectedTime(time)}
                                                className={clsx(
                                                    "p-2 rounded-lg text-center transition-all duration-200",
                                                    selectedTime === time
                                                        ? "bg-gradient-to-r from-primary to-accent-teal text-white"
                                                        : "border border-border hover:border-primary/50 bg-background"
                                                )}
                                            >
                                                <Clock className="w-3 h-3 mx-auto mb-1" />
                                                <span className="text-sm">{time}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Right - Doctor Summary */}
                        <div className="space-y-6">
                            <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl border border-primary/10 p-6 sticky top-24">
                                <h3 className="font-semibold text-foreground mb-4">Appointment Summary</h3>

                                <div className="flex items-center gap-3 pb-4 border-b border-border">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent-teal flex items-center justify-center text-white font-bold">
                                        {selectedDoctor.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-foreground">{selectedDoctor.name}</p>
                                        <p className="text-xs text-primary">{selectedDoctor.specialty}</p>
                                    </div>
                                </div>

                                <div className="space-y-3 mt-4">
                                    <div className="flex items-center gap-2 text-sm">
                                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                        <span>{selectedDoctor.rating} stars</span>
                                        <span className="text-muted-foreground">({selectedDoctor.reviews} reviews)</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <Stethoscope className="w-4 h-4 text-primary" />
                                        <span>{selectedDoctor.experience} experience</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <CreditCard className="w-4 h-4 text-primary" />
                                        <span>${selectedDoctor.price} consultation fee</span>
                                    </div>
                                </div>

                                {selectedDate && selectedTime && (
                                    <div className="mt-4 p-3 bg-primary/5 rounded-lg">
                                        <p className="text-xs text-muted-foreground">Scheduled for:</p>
                                        <p className="font-medium text-foreground">
                                            {new Date(selectedDate).toLocaleDateString('en-US', {
                                                weekday: 'long',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </p>
                                        <p className="text-sm text-primary">{selectedTime}</p>
                                    </div>
                                )}

                                <button
                                    onClick={() => setStep(3)}
                                    disabled={!selectedDate || !selectedTime}
                                    className={clsx(
                                        "w-full mt-6 py-3 rounded-xl font-semibold transition-all duration-200",
                                        selectedDate && selectedTime
                                            ? "btn-medical-primary shadow-primary-glow"
                                            : "bg-border text-muted-foreground cursor-not-allowed"
                                    )}
                                >
                                    Continue to Confirm
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Step 3: Confirm Booking */}
            {step === 3 && selectedDoctor && selectedDate && selectedTime && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left - Patient Information */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-card rounded-2xl border border-border p-6">
                            <h3 className="font-semibold text-foreground mb-4">Patient Information</h3>

                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-1">Full Name</label>
                                        <div className="flex items-center gap-2 px-3 py-2 border border-border rounded-lg bg-background">
                                            <User className="w-4 h-4 text-muted-foreground" />
                                            <span>{user?.name || 'John Doe'}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-1">Email</label>
                                        <div className="flex items-center gap-2 px-3 py-2 border border-border rounded-lg bg-background">
                                            <Mail className="w-4 h-4 text-muted-foreground" />
                                            <span>{user?.email || 'john@example.com'}</span>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-1">Phone Number</label>
                                    <div className="flex items-center gap-2 px-3 py-2 border border-border rounded-lg bg-background">
                                        <Phone className="w-4 h-4 text-muted-foreground" />
                                        <span>+254 712 345 678</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-card rounded-2xl border border-border p-6">
                            <h3 className="font-semibold text-foreground mb-4">Appointment Details</h3>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">Reason for Visit</label>
                                    <select
                                        value={selectedReason}
                                        onChange={(e) => setSelectedReason(e.target.value)}
                                        className="w-full px-4 py-2.5 border border-border rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                                    >
                                        <option value="">Select a reason</option>
                                        {reasons.map((reason) => (
                                            <option key={reason} value={reason}>{reason}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">Additional Notes (Optional)</label>
                                    <textarea
                                        value={notes}
                                        onChange={(e) => setNotes(e.target.value)}
                                        rows={4}
                                        placeholder="Share any symptoms, concerns, or specific questions for the doctor..."
                                        className="w-full px-4 py-2.5 border border-border rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right - Booking Summary */}
                    <div className="space-y-6">
                        <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl border border-primary/10 p-6 sticky top-24">
                            <h3 className="font-semibold text-foreground mb-4">Booking Summary</h3>

                            <div className="space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Consultation Fee</span>
                                    <span className="font-semibold text-foreground">${selectedDoctor.price}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Platform Fee</span>
                                    <span className="font-semibold text-foreground">$2.00</span>
                                </div>
                                <div className="border-t border-border pt-3">
                                    <div className="flex justify-between font-semibold">
                                        <span>Total Amount</span>
                                        <span className="text-primary">${selectedDoctor.price + 2}</span>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={handleBooking}
                                disabled={!selectedReason || isBooking}
                                className={clsx(
                                    "w-full mt-6 py-3 rounded-xl font-semibold transition-all duration-200",
                                    selectedReason && !isBooking
                                        ? "btn-medical-primary shadow-primary-glow"
                                        : "bg-border text-muted-foreground cursor-not-allowed"
                                )}
                            >
                                {isBooking ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        Processing...
                                    </div>
                                ) : (
                                    'Confirm Booking'
                                )}
                            </button>

                            <p className="text-xs text-muted-foreground text-center mt-4">
                                By confirming, you agree to our Terms of Service and Cancellation Policy
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
