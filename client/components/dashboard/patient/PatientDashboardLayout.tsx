'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/libs/hooks/useAuthStore';
import {
  LayoutDashboard,
  Calendar,
  FileText,
  Settings,
  MessageSquare,
  Pill,
  Heart,
  LogOut,
  Menu,
  X,
  Bell,
  User,
  ClipboardList
} from 'lucide-react';
import { useState, useEffect } from 'react';
import clsx from 'clsx';
import Image from 'next/image';

export default function PatientDashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, clearAuth } = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleLogout = () => {
    clearAuth();
    window.location.href = '/';
  };

  // Patient-specific navigation items only
  const patientNavItems = [
    { href: '/dashboard/patient', label: 'Overview', icon: LayoutDashboard },
    { href: '/dashboard/patient/appointments', label: 'My Appointments', icon: Calendar },
    { href: '/dashboard/patient/health-records', label: 'Health Records', icon: FileText },
    { href: '/dashboard/patient/prescriptions', label: 'Prescriptions', icon: Pill },
    { href: '/dashboard/patient/vitals', label: 'Vital Signs', icon: Heart },
    { href: '/dashboard/patient/medical-history', label: 'Medical History', icon: ClipboardList },
    { href: '/dashboard/patient/messages', label: 'Messages', icon: MessageSquare },
    { href: '/dashboard/patient/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-teal-50/20">
      {sidebarOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={clsx(
        'fixed md:relative z-50 flex flex-col transition-all duration-300 bg-gradient-to-b from-card to-secondary/50 border-r border-border',
        'md:translate-x-0',
        sidebarOpen ? 'translate-x-0 w-72' : '-translate-x-full w-72',
        isMobile && 'h-full'
      )}>
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            {/* Fixed: Removed nested Link - single Link component for the entire logo area */}
            <Link href="/" className="flex items-center gap-1.5 group">
              <div className="shrink-0 flex items-center justify-center px-0" style={{ minHeight: "80px" }}>
                <Image
                  src="/logo.png"
                  alt="BioMedPharm"
                  width={100}
                  height={100}
                  className="object-contain"
                  priority
                />
              </div>
              <div>
                <span className="font-bold text-foreground text-lg">BioMedPharm</span>
                <span className="text-xs text-primary block -mt-1">Patient Portal</span>
              </div>
            </Link>
            {isMobile && (
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-1 rounded-lg hover:bg-secondary transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            )}
          </div>
        </div>

        {/* User Profile Section */}
        <div className="p-4 mx-3 mt-4 rounded-xl bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent-teal flex items-center justify-center text-white font-bold text-lg shadow-md">
              {user?.name?.charAt(0).toUpperCase() || 'P'}
            </div>
            <div className="flex-1">
              <p className="font-semibold text-foreground">{user?.name || 'Patient User'}</p>
              <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
              <span className="inline-block mt-1 px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">
                Patient
              </span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
          {patientNavItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => isMobile && setSidebarOpen(false)}
                className={clsx(
                  'flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group',
                  isActive
                    ? 'bg-gradient-to-r from-primary to-accent-teal text-white shadow-primary-glow'
                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                )}
              >
                <Icon className={clsx(
                  'w-5 h-5 transition-transform duration-200',
                  !isActive && 'group-hover:scale-110'
                )} />
                {item.label}
                {isActive && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/10 transition-all duration-200"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-h-screen">
        <header className="sticky top-0 z-30 bg-card/80 backdrop-blur-md border-b border-border">
          <div className="flex items-center justify-between px-4 md:px-8 py-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
              >
                <Menu className="w-5 h-5 text-muted-foreground" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-foreground capitalize">
                  {pathname === '/dashboard/patient' ? 'Overview' : pathname.split('/').pop()?.replace(/-/g, ' ') || 'Dashboard'}
                </h1>
                <p className="text-xs text-muted-foreground">
                  Welcome back, {user?.name?.split(' ')[0] || 'Patient'} 👋
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="p-2 rounded-lg hover:bg-secondary transition-colors relative">
                <Bell className="w-5 h-5 text-muted-foreground" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full animate-pulse" />
              </button>
              <button className="p-2 rounded-lg hover:bg-secondary transition-colors">
                <MessageSquare className="w-5 h-5 text-muted-foreground" />
              </button>
              <Link
                href="/dashboard/patient/settings"
                className="p-2 rounded-lg hover:bg-secondary transition-colors"
              >
                <User className="w-5 h-5 text-muted-foreground" />
              </Link>
            </div>
          </div>
        </header>

        <div className="flex-1 p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
