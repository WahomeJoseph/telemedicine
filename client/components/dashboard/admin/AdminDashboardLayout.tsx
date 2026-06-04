'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/libs/hooks/useAuthStore';
import {
    LayoutDashboard,
    Calendar,
    Users,
    Settings,
    LogOut,
    BarChart3,
    FileText,
    Activity,
    Clock,
    Shield,
    Menu,
    X,
    Bell
} from 'lucide-react';
import { useState, useEffect } from 'react';
import clsx from 'clsx';
import Image from 'next/image';

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const { user, isAuthenticated, clearAuth } = useAuthStore();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuth = () => {
            if (!isAuthenticated) {
                router.push('/login');
                return;
            }
            
            if (user?.role !== 'admin') {
                if (user?.role === 'doctor' || user?.role === 'clinician') {
                    router.push('/dashboard/clinician');
                } else if (user?.role === 'patient') {
                    router.push('/dashboard/patient');
                } else {
                    router.push('/login');
                }
                return;
            }
            
            setIsLoading(false);
        };
        
        checkAuth();
    }, [isAuthenticated, user, router]);

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

    const handleLogout = async () => {
        await clearAuth();
        router.push('/login');
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50/20 to-teal-50/20">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Verifying access...</p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated || user?.role !== 'admin') {
        return null;
    }

    const adminNavItems = [
        { href: '/dashboard/admin', label: 'Overview', icon: LayoutDashboard },
        { href: '/dashboard/admin/appointments', label: 'Appointments', icon: Calendar },
        { href: '/dashboard/admin/patients', label: 'Patients', icon: Users },
        { href: '/dashboard/admin/staff', label: 'Staff', icon: Shield },
        { href: '/dashboard/admin/analytics', label: 'Analytics', icon: BarChart3 },
        { href: '/dashboard/admin/reports', label: 'Reports', icon: FileText },
        { href: '/dashboard/admin/activity', label: 'Activity Logs', icon: Activity },
        { href: '/dashboard/admin/schedule', label: 'Schedule', icon: Clock },
        { href: '/dashboard/admin/settings', label: 'Settings', icon: Settings },
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
                            <div>
                                <span className="font-bold text-foreground text-lg">BioMedPharm</span>
                                <span className="text-xs text-primary block -mt-1">Admin Portal</span>
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

                <div className="p-4 mx-3 mt-4 rounded-xl bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/10">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent-teal flex items-center justify-center text-white font-bold text-lg shadow-md">
                            {user?.name?.charAt(0).toUpperCase() || 'A'}
                        </div>
                        <div className="flex-1">
                            <p className="font-semibold text-foreground">{user?.name || 'Admin User'}</p>
                            <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                            <span className="inline-block mt-1 px-2 py-0.5 bg-destructive/10 text-destructive text-xs rounded-full font-semibold">
                                Administrator
                            </span>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
                    {adminNavItems.map((item) => {
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
                                    {pathname.split('/').pop() === 'admin' ? 'Overview' : pathname.split('/').pop() || 'Admin Dashboard'}
                                </h1>
                                <p className="text-xs text-muted-foreground">
                                    Admin access • Full system control
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <button className="p-2 rounded-lg hover:bg-secondary transition-colors relative">
                                    <Bell className="w-5 h-5 text-muted-foreground" />
                                    <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full animate-pulse" />
                                </button>
                            </div>
                            <div className="hidden md:block text-right">
                                <p className="text-sm font-medium text-foreground">System Health</p>
                                <p className="text-xs text-accent">All systems operational</p>
                            </div>
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
