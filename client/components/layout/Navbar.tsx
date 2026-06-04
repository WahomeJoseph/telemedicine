'use client';

import Link from 'next/link';
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect, useRef } from 'react';
import { useAuthStore } from '@/libs/hooks/useAuthStore';
import { authApi } from '@/services/apis';
import clsx from 'clsx';
import Image from 'next/image';
import { Phone, Mail, MapPin, ChevronDown, UserCircle, LogOut, LayoutDashboard, Calendar, FileText } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, user, clearAuth, refreshToken } = useAuthStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    try {
      if (refreshToken) await authApi.logout(refreshToken);
    } finally {
      clearAuth();
      router.push('/');
    }
  };

  const navLinks = [
    { href: '/about', label: 'About Us' },
    { href: '/services', label: 'Services' },
    { href: '/how-it-works', label: 'How it works' },
    { href: '/contact-us', label: 'Contact Us' },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className={clsx(
      'fixed top-0 w-full z-50 transition-all duration-500',
      isScrolled
        ? 'bg-background/95 backdrop-blur-md shadow-professional'
        : 'bg-transparent shadow-none'
    )}>

      <div className={clsx(
        'overflow-hidden transition-all duration-500 ease-in-out border-b border-border/30',
        isScrolled ? 'max-h-16 opacity-100' : 'max-h-0 opacity-0'
      )}>
        <div className="hidden lg:flex items-center justify-end py-3 text-sm text-muted-foreground">
          <div className="flex items-center space-x-8 mr-6">
            <div className="flex flex-row items-center space-x-2">
              <Link
                href="tel:+2547975969757"
                className="flex flex-row items-center space-x-2 hover:text-primary transition-all duration-200 group"
              >
                <Phone className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                <span className="group-hover:text-primary">+254 797 596 9757</span>
              </Link>
            </div>
            <div className="flex flex-row items-center space-x-2">
              <Link
                href="mailto:josephwachira589@gmail.com"
                className="flex flex-row items-center space-x-2 hover:text-primary transition-all duration-200 group"
              >
                <Mail className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                <span className="group-hover:text-primary">josephwachira589@gmail.com</span>
              </Link>
            </div>
            <div className="flex flex-row items-center space-x-2">
              <Link
                href="https://www.google.com/maps/place/Nairobi,+Kenya"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-row items-center space-x-2 hover:text-primary transition-all duration-200 group"
              >
                <MapPin className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                <span className="group-hover:text-primary">Nairobi, Kenya</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto my-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between p-2 h-20">

          <Link
            href="/"
            className="shrink-0 flex items-center justify-center px-5"
            style={{ minHeight: "80px" }}
          >
            <Image
              src="/logo.png"
              alt="BioMedPharm"
              width={100}
              height={100}
              className="object-contain scale-120"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex bg-white backdrop-blur-md p-3 rounded-full shadow-sm items-center gap-8">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={clsx(
                  'relative text-sm font-medium transition-all duration-200 py-2 group',
                  pathname.startsWith(l.href)
                    ? 'text-primary'
                    : 'text-gray-950 hover:text-foreground'
                )}
              >
                {l.label}
                <span className={clsx(
                  'absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-accent transform transition-transform duration-300',
                  pathname.startsWith(l.href) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                )} />
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 p-1 pr-3 rounded-full hover:bg-secondary transition-all duration-200 border border-transparent hover:border-border group"
                >
                  <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-primary to-accent-teal flex items-center justify-center text-white text-sm font-bold shadow-md group-hover:scale-105 transition-transform">
                    {user?.name?.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2) || 'U'}
                  </div>
                  <span className="text-sm font-medium text-foreground">{user?.name?.split(' ')[0]}</span>
                  <ChevronDown className={clsx(
                    'h-4 w-4 text-muted-foreground transition-transform duration-200',
                    isProfileOpen && 'rotate-180'
                  )} />
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-3 w-64 bg-card rounded-xl shadow-strong border border-border py-2 z-20 animate-fade-in-down">
                    <div className="px-4 py-3 border-b border-border mb-1 bg-gradient-to-r from-primary/5 to-accent-teal/5">
                      <p className="text-xs text-muted-foreground">Signed in as</p>
                      <p className="text-sm font-semibold text-foreground truncate">{user?.email}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full capitalize">
                        {user?.role || 'Patient'}
                      </span>
                    </div>

                    <Link
                      href="/dashboard/patient"
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-muted-foreground hover:bg-secondary hover:text-primary transition-all duration-200"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      Dashboard
                    </Link>

                    <Link
                      href="/dashboard/appointments"
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-muted-foreground hover:bg-secondary hover:text-primary transition-all duration-200"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <Calendar className="h-4 w-4" />
                      My Appointments
                    </Link>

                    <Link
                      href="/dashboard/health-records"
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-muted-foreground hover:bg-secondary hover:text-primary transition-all duration-200"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <FileText className="h-4 w-4" />
                      Health Records
                    </Link>

                    <Link
                      href="/profile"
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-muted-foreground hover:bg-secondary hover:text-primary transition-all duration-200"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <UserCircle className="h-4 w-4" />
                      My Profile
                    </Link>

                    <div className="border-t border-border my-1"></div>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-destructive hover:bg-destructive/10 transition-all duration-200"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <Link
                  href="/login"
                  className="text-md px-4 py-3 bg-white rounded-full font-medium text-gray-900 hover:text-primary transition-all duration-200 hover:scale-105 hover:shadow-md"
                >
                  Sign in
                </Link>
                
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg text-muted-foreground hover:bg-secondary transition-all duration-200"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={clsx(
        'md:hidden bg-card border-t border-border overflow-hidden transition-all duration-300',
        menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      )}>
        <div className="px-4 py-4 flex flex-col gap-3">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-muted-foreground py-2 hover:text-primary transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <hr className="border-border" />

          {isAuthenticated ? (
            <>
              <div className="flex items-center gap-3 py-2">
                <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-primary to-accent-teal flex items-center justify-center text-white font-semibold">
                  {user?.name?.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2) || 'U'}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{user?.name}</p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
              </div>
              <Link href="/dashboard" className="text-sm text-muted-foreground py-2 hover:text-primary" onClick={() => setMenuOpen(false)}>
                Dashboard
              </Link>
              <Link href="/profile" className="text-sm text-muted-foreground py-2 hover:text-primary" onClick={() => setMenuOpen(false)}>
                My Profile
              </Link>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  handleLogout();
                }}
                className="text-sm text-left text-destructive py-2"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm text-muted-foreground py-2" onClick={() => setMenuOpen(false)}>
                Sign in
              </Link>
              <Link
                href="/auth/register"
                className="btn-medical-primary text-center"
                onClick={() => setMenuOpen(false)}
              >
                Book Appointment
              </Link>
            </>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-down {
          animation: fade-in-down 0.2s ease-out;
        }
      `}</style>
    </nav>
  );
}
