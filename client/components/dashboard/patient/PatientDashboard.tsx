'use client';

import { useAuthStore } from '@/libs/hooks/useAuthStore';
import { 
  Calendar, 
  Stethoscope, 
  Pill, 
  Heart, 
  Activity,
  ChevronRight,
  FileText,
  Bell
} from 'lucide-react';
import Link from 'next/link';

export default function PatientDashboard() {
  const { user } = useAuthStore();

  const upcomingAppointments = [
    { 
      id: 1, 
      doctor: 'Dr. Sarah Johnson', 
      specialty: 'Cardiologist',
      date: 'Tomorrow', 
      time: '10:00 AM',
      type: 'Video Call',
      status: 'confirmed'
    },
    { 
      id: 2, 
      doctor: 'Dr. Michael Chen', 
      specialty: 'General Physician',
      date: 'Dec 15, 2024', 
      time: '2:30 PM',
      type: 'In-person',
      status: 'pending'
    },
  ];

  const recentPrescriptions = [
    { id: 1, name: 'Amoxicillin', dosage: '500mg', frequency: 'Twice daily', refills: 2 },
    { id: 2, name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', refills: 0 },
  ];

  const healthMetrics = [
    { label: 'Blood Pressure', value: '120/80', status: 'normal', trend: 'stable' },
    { label: 'Heart Rate', value: '72 bpm', status: 'normal', trend: 'down' },
    { label: 'Blood Sugar', value: '98 mg/dL', status: 'normal', trend: 'stable' },
    { label: 'Weight', value: '70 kg', status: 'normal', trend: 'up' },
  ];

  const recentActivities = [
    { id: 1, action: 'Prescription refill requested', date: '2 hours ago', icon: Pill },
    { id: 2, action: 'Appointment scheduled with Dr. Johnson', date: 'Yesterday', icon: Calendar },
    { id: 3, action: 'Lab results received', date: '2 days ago', icon: FileText },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-primary to-accent-teal rounded-2xl p-6 text-white shadow-strong">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-2xl font-bold mb-2">
              Welcome back, {user?.name?.split(' ')[0]}! 👋
            </h2>
            <p className="text-white/90 text-sm">
              Your next appointment is tomorrow at 10:00 AM. Ready for your checkup?
            </p>
          </div>
          <Link
            href="/dashboard/appointments/new"
            className="px-6 py-3 bg-white text-primary rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105"
          >
            Book Appointment →
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-card rounded-2xl border border-border p-6 hover:shadow-professional transition-all group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
              <Calendar className="w-6 h-6 text-primary" />
            </div>
            <span className="text-xs text-accent font-semibold">Upcoming</span>
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-1">2</h3>
          <p className="text-sm text-muted-foreground">Appointments this month</p>
        </div>

        <div className="bg-card rounded-2xl border border-border p-6 hover:shadow-professional transition-all group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-accent/10 rounded-xl group-hover:bg-accent/20 transition-colors">
              <Pill className="w-6 h-6 text-accent" />
            </div>
            <span className="text-xs text-warm font-semibold">Active</span>
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-1">3</h3>
          <p className="text-sm text-muted-foreground">Active prescriptions</p>
        </div>

        <div className="bg-card rounded-2xl border border-border p-6 hover:shadow-professional transition-all group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-teal-500/10 rounded-xl group-hover:bg-teal-500/20 transition-colors">
              <Heart className="w-6 h-6 text-teal-600" />
            </div>
            <span className="text-xs text-accent font-semibold">Good</span>
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-1">98%</h3>
          <p className="text-sm text-muted-foreground">Health score</p>
        </div>

        <div className="bg-card rounded-2xl border border-border p-6 hover:shadow-professional transition-all group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-amber-500/10 rounded-xl group-hover:bg-amber-500/20 transition-colors">
              <Activity className="w-6 h-6 text-amber-600" />
            </div>
            <span className="text-xs text-muted-foreground">Last 30 days</span>
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-1">4</h3>
          <p className="text-sm text-muted-foreground">Health records added</p>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Appointments & Prescriptions */}
        <div className="lg:col-span-2 space-y-6">
          {/* Upcoming Appointments */}
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            <div className="px-6 py-4 border-b border-border bg-gradient-to-r from-secondary/50 to-transparent">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-foreground">Upcoming Appointments</h3>
                  <p className="text-xs text-muted-foreground mt-1">Your scheduled visits</p>
                </div>
                <Link href="/dashboard/appointments" className="text-primary text-sm font-medium hover:underline">
                  View all →
                </Link>
              </div>
            </div>
            <div className="divide-y divide-border">
              {upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="p-4 hover:bg-secondary/30 transition-colors">
                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Stethoscope className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{appointment.doctor}</p>
                        <p className="text-xs text-muted-foreground">{appointment.specialty}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-medium text-foreground">{appointment.date}</p>
                        <p className="text-xs text-muted-foreground">{appointment.time}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        appointment.status === 'confirmed' 
                          ? 'bg-accent/10 text-accent' 
                          : 'bg-warm/10 text-warm'
                      }`}>
                        {appointment.status}
                      </span>
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Prescriptions */}
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            <div className="px-6 py-4 border-b border-border bg-gradient-to-r from-secondary/50 to-transparent">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-foreground">Recent Prescriptions</h3>
                  <p className="text-xs text-muted-foreground mt-1">Active and recent medications</p>
                </div>
                <Link href="/dashboard/prescriptions" className="text-primary text-sm font-medium hover:underline">
                  Manage →
                </Link>
              </div>
            </div>
            <div className="divide-y divide-border">
              {recentPrescriptions.map((prescription) => (
                <div key={prescription.id} className="p-4 hover:bg-secondary/30 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">{prescription.name}</p>
                      <p className="text-xs text-muted-foreground">{prescription.dosage} • {prescription.frequency}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-muted-foreground">Refills left</span>
                      <p className="font-semibold text-foreground">{prescription.refills}</p>
                    </div>
                    <button className="ml-4 px-3 py-1 text-xs bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors">
                      Refill
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Health Metrics & Activity */}
        <div className="space-y-6">
          {/* Health Metrics */}
          <div className="bg-card rounded-2xl border border-border p-6">
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-foreground">Health Metrics</h3>
            </div>
            <div className="space-y-4">
              {healthMetrics.map((metric) => (
                <div key={metric.label} className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{metric.label}</span>
                  <div className="text-right">
                    <span className="font-semibold text-foreground">{metric.value}</span>
                    <span className="text-xs text-muted-foreground ml-1">
                      {metric.trend === 'up' ? '↑' : metric.trend === 'down' ? '↓' : '→'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-4 w-full text-center text-primary text-sm font-medium hover:underline">
              View detailed report →
            </button>
          </div>

          {/* Recent Activity */}
          <div className="bg-card rounded-2xl border border-border p-6">
            <div className="flex items-center gap-2 mb-4">
              <Bell className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-foreground">Recent Activity</h3>
            </div>
            <div className="space-y-3">
              {recentActivities.map((activity) => {
                const Icon = activity.icon;
                return (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className="p-1.5 bg-secondary rounded-lg">
                      <Icon className="w-3 h-3 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-foreground">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.date}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl border border-primary/10 p-6">
            <h3 className="font-semibold text-foreground mb-3">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full text-left px-3 py-2 text-sm text-foreground hover:bg-white/50 rounded-lg transition-colors">
                📋 Request prescription refill
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-foreground hover:bg-white/50 rounded-lg transition-colors">
                📅 Schedule follow-up
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-foreground hover:bg-white/50 rounded-lg transition-colors">
                💬 Message your doctor
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-foreground hover:bg-white/50 rounded-lg transition-colors">
                📊 View lab results
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
