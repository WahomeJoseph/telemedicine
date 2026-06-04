'use client';

import { 
  Users, 
  Calendar, 
  Activity, 
  TrendingUp,
  Clock,
  UserPlus,
  Stethoscope,
  AlertCircle,
  CheckCircle,
  ChevronRight,
  Download,
  Filter
} from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboardPage() {

  // Stats with trends
  const stats = [
    { 
      label: "Total Patients", 
      value: "2,847", 
      change: "+12.5%", 
      trend: "up",
      description: "Active patients in system",
      icon: Users,
      color: "primary"
    },
    { 
      label: "Appointments", 
      value: "1,432", 
      change: "+8.2%", 
      trend: "up",
      description: "This month",
      icon: Calendar,
      color: "accent"
    },
    { 
      label: "Active Staff", 
      value: "48", 
      change: "+2", 
      trend: "up",
      description: "Currently on duty",
      icon: Stethoscope,
      color: "teal"
    },
    { 
      label: "Revenue", 
      value: "$124,500", 
      change: "+23.1%", 
      trend: "up",
      description: "This quarter",
      icon: TrendingUp,
      color: "warm"
    },
  ];

  const recentAppointments = [
    { id: 1, patient: "John Mwangi", doctor: "Dr. Sarah Johnson", time: "10:00 AM", status: "completed", type: "Video Call" },
    { id: 2, patient: "Mary Wanjiku", doctor: "Dr. Michael Chen", time: "11:30 AM", status: "in-progress", type: "In-person" },
    { id: 3, patient: "Peter Ochieng", doctor: "Dr. Amina Hassan", time: "1:00 PM", status: "scheduled", type: "Video Call" },
    { id: 4, patient: "Grace Muthoni", doctor: "Dr. James Wilson", time: "2:30 PM", status: "scheduled", type: "In-person" },
    { id: 5, patient: "Robert Kimani", doctor: "Dr. Sarah Johnson", time: "4:00 PM", status: "cancelled", type: "Video Call" },
  ];

  const pendingTasks = [
    { id: 1, task: "Verify new patient documents", priority: "high", deadline: "Today", assignee: "Admin Team" },
    { id: 2, task: "Review insurance claims", priority: "medium", deadline: "Tomorrow", assignee: "Billing Dept" },
    { id: 3, task: "Update clinic schedule", priority: "low", deadline: "Dec 15", assignee: "Operations" },
  ];

  const systemMetrics = [
    { label: "System Uptime", value: "99.98%", status: "operational" },
    { label: "Response Time", value: "245ms", status: "good" },
    { label: "Active Sessions", value: "1,432", status: "normal" },
    { label: "Error Rate", value: "0.03%", status: "low" },
  ];

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'completed': return 'bg-accent/10 text-accent';
      case 'in-progress': return 'bg-primary/10 text-primary';
      case 'scheduled': return 'bg-teal-500/10 text-teal-600';
      case 'cancelled': return 'bg-destructive/10 text-destructive';
      default: return 'bg-secondary text-muted-foreground';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'high': return 'bg-destructive/10 text-destructive';
      case 'medium': return 'bg-warm/10 text-warm';
      case 'low': return 'bg-accent/10 text-accent';
      default: return 'bg-secondary text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">

      <div className="bg-gradient-to-r from-primary to-accent-teal rounded-2xl p-6 text-white shadow-strong">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-2xl font-bold mb-2">
              Welcome back, Admin! 👋
            </h2>
            <p className="text-white/90 text-sm">
              Here&apos;s what&apos;s happening with your clinic today. System health is optimal.
            </p>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-white/20 rounded-xl hover:bg-white/30 transition-all flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export Report
            </button>
            <button className="px-4 py-2 bg-white text-primary rounded-xl font-semibold hover:shadow-lg transition-all">
              + New Appointment
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-card rounded-2xl border border-border p-6 hover:shadow-professional transition-all group">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 bg-${stat.color}/10 rounded-xl group-hover:bg-${stat.color}/20 transition-colors`}>
                  <Icon className={`w-6 h-6 text-${stat.color}`} />
                </div>
                <span className={`text-sm font-semibold ${stat.trend === 'up' ? 'text-accent' : 'text-destructive'}`}>
                  {stat.change} ↑
                </span>
              </div>
              <h3 className="text-3xl font-bold text-foreground mb-1">{stat.value}</h3>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="text-xs text-muted-foreground mt-2">{stat.description}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            <div className="px-6 py-4 border-b border-border bg-gradient-to-r from-secondary/50 to-transparent">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                  <h3 className="font-semibold text-foreground">Today&apos;s Appointments</h3>
                  <p className="text-xs text-muted-foreground mt-1">Schedule for today</p>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 rounded-lg hover:bg-secondary transition-colors">
                    <Filter className="w-4 h-4 text-muted-foreground" />
                  </button>
                  <Link href="/dashboard/admin/appointments" className="text-primary text-sm font-medium hover:underline">
                    View all →
                  </Link>
                </div>
              </div>
            </div>
            <div className="divide-y divide-border">
              {recentAppointments.map((appointment) => (
                <div key={appointment.id} className="p-4 hover:bg-secondary/30 transition-colors">
                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Users className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{appointment.patient}</p>
                          <p className="text-xs text-muted-foreground">{appointment.doctor}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-medium text-foreground">{appointment.time}</p>
                        <p className="text-xs text-muted-foreground">{appointment.type}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                        {appointment.status}
                      </span>
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            <div className="px-6 py-4 border-b border-border bg-gradient-to-r from-secondary/50 to-transparent">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-foreground">Pending Tasks</h3>
                  <p className="text-xs text-muted-foreground mt-1">Requires attention</p>
                </div>
                <Link href="/dashboard/admin/tasks" className="text-primary text-sm font-medium hover:underline">
                  Manage tasks →
                </Link>
              </div>
            </div>
            <div className="divide-y divide-border">
              {pendingTasks.map((task) => (
                <div key={task.id} className="p-4 hover:bg-secondary/30 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{task.task}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                        <span className="text-xs text-muted-foreground">Due: {task.deadline}</span>
                      </div>
                    </div>
                    <button className="ml-4 px-3 py-1 text-xs bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors">
                      Assign
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-card rounded-2xl border border-border p-6">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-foreground">System Health</h3>
            </div>
            <div className="space-y-4">
              {systemMetrics.map((metric) => (
                <div key={metric.label} className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{metric.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-foreground">{metric.value}</span>
                    {metric.status === 'operational' && <CheckCircle className="w-4 h-4 text-accent" />}
                    {metric.status === 'good' && <CheckCircle className="w-4 h-4 text-accent" />}
                    {metric.status === 'normal' && <Activity className="w-4 h-4 text-primary" />}
                    {metric.status === 'low' && <AlertCircle className="w-4 h-4 text-warm" />}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-card rounded-2xl border border-border p-4 text-center">
              <UserPlus className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">28</p>
              <p className="text-xs text-muted-foreground">New Patients<br />This Week</p>
            </div>
            <div className="bg-card rounded-2xl border border-border p-4 text-center">
              <Clock className="w-8 h-8 text-accent mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">94%</p>
              <p className="text-xs text-muted-foreground">Attendance<br />Rate</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl border border-primary/10 p-6">
            <h3 className="font-semibold text-foreground mb-3">Admin Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full text-left px-3 py-2 text-sm text-foreground hover:bg-white/50 rounded-lg transition-colors">
                👥 Add new staff member
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-foreground hover:bg-white/50 rounded-lg transition-colors">
                📊 Generate monthly report
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-foreground hover:bg-white/50 rounded-lg transition-colors">
                🏥 Update clinic hours
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-foreground hover:bg-white/50 rounded-lg transition-colors">
                📋 Review pending verifications
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-foreground hover:bg-white/50 rounded-lg transition-colors">
                🔐 Manage user permissions
              </button>
            </div>
          </div>

          {/* Support Contact */}
          <div className="bg-card rounded-2xl border border-border p-6 text-center">
            <p className="text-sm text-muted-foreground mb-2">Need help?</p>
            <p className="font-semibold text-foreground">24/7 Admin Support</p>
            <p className="text-xs text-primary mt-1">+254 797 596 9757</p>
          </div>
        </div>
      </div>
    </div>
  );
}
