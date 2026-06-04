'use client';

import { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  MessageSquare,
} from 'lucide-react';
import { FaFacebookF, FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";

const branches =
{
  name: 'Nairobi Main Branch',
  location: 'Upper Hill, Nairobi, Kenya',
  address: 'BioMedPharm Tower, 5th Floor, Upper Hill Road',
  phone: '+254 797 596 9757',
  email: 'nairobi@biomedpharm.com',
  hours: {
    weekdays: '8:00 AM - 8:00 PM',
    saturday: '9:00 AM - 5:00 PM',
    sunday: '10:00 AM - 2:00 PM'
  },
  coordinates: { lat: -1.2921, lng: 36.8219 },
  features: ['24/7 Emergency', 'Pharmacy', 'Lab Services', 'Parking Available', 'Radiology', 'Physiotherapy'],
  isMain: true
}

// Departments
const departments = [
  { name: 'Emergency Care', phone: '+254 797 596 9700', email: 'emergency@biomedpharm.com', available: '24/7' },
  { name: 'Appointments', phone: '+254 797 596 9701', email: 'appointments@biomedpharm.com', available: '8AM - 8PM' },
  { name: 'Billing & Insurance', phone: '+254 797 596 9702', email: 'billing@biomedpharm.com', available: '9AM - 5PM' },
  { name: 'Medical Records', phone: '+254 797 596 9703', email: 'records@biomedpharm.com', available: '8AM - 6PM' },
  { name: 'Pharmacy', phone: '+254 797 596 9704', email: 'pharmacy@biomedpharm.com', available: '24/7' },
  { name: 'Customer Support', phone: '+254 797 596 9705', email: 'support@biomedpharm.com', available: '24/7' },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    message: '',
    preferredContact: 'email'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
    setFormData({
      name: '',
      email: '',
      phone: '',
      department: '',
      message: '',
      preferredContact: 'email'
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-teal-50/20">

      <section className="relative pt-32 pb-20 md:pb-24 lg:pb-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1638202993928-7267aad84c31?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bnVyc2V8ZW58MHx8MHx8fDA%3D')`
            }}
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center text-white">
          <div className="animate-fade-up">
            <span className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-4">
              Get in Touch
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Contact Us</h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              We&apos;re here to help. Reach out to us through any of the channels below,
              and our team will get back to you promptly.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Information Cards */}
            <div className="space-y-6">
              <div className="bg-card rounded-2xl border border-border p-6 hover:shadow-strong transition-all group">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground text-lg mb-2">Phone Numbers</h3>
                <div className="space-y-2">
                  <a href="tel:+2547975969757" className="block text-muted-foreground hover:text-primary transition-colors">
                    Main Line: +254 797 596 9757
                  </a>
                  <a href="tel:+2547975969758" className="block text-muted-foreground hover:text-primary transition-colors">
                    Emergency: +254 797 596 9758
                  </a>
                  <a href="tel:+2547975969759" className="block text-muted-foreground hover:text-primary transition-colors">
                    Appointments: +254 797 596 9759
                  </a>
                </div>
              </div>

              <div className="bg-card rounded-2xl border border-border p-6 hover:shadow-strong transition-all group">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground text-lg mb-2">Email Us</h3>
                <div className="space-y-2">
                  <a href="mailto:info@biomedpharm.com" className="block text-muted-foreground hover:text-primary transition-colors">
                    info@biomedpharm.com
                  </a>
                  <a href="mailto:support@biomedpharm.com" className="block text-muted-foreground hover:text-primary transition-colors">
                    support@biomedpharm.com
                  </a>
                  <a href="mailto:careers@biomedpharm.com" className="block text-muted-foreground hover:text-primary transition-colors">
                    careers@biomedpharm.com
                  </a>
                </div>
              </div>

              <div className="bg-card rounded-2xl border border-border p-6 hover:shadow-strong transition-all group">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground text-lg mb-2">Working Hours</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Monday - Friday:</span>
                    <span className="font-medium text-foreground">8:00 AM - 8:00 PM</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Saturday:</span>
                    <span className="font-medium text-foreground">9:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Sunday:</span>
                    <span className="font-medium text-foreground">10:00 AM - 2:00 PM</span>
                  </div>
                  <div className="flex justify-between text-sm pt-2 text-accent">
                    <span>Emergency:</span>
                    <span className="font-medium">24/7 Available</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-2xl border border-border p-8 shadow-strong">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-foreground mb-2">Send us a Message</h2>
                  <p className="text-muted-foreground">Fill out the form below and we&apos;ll get back to you within 24 hours.</p>
                </div>

                {isSubmitted && (
                  <div className="mb-6 p-4 bg-accent/10 border border-accent/20 rounded-xl flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-accent" />
                    <p className="text-sm text-accent">Message sent successfully! We&apos;ll contact you soon.</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-border rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-border rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-border rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                        placeholder="+254 XXX XXX XXX"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Department</label>
                      <select
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-border rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                      >
                        <option value="">Select Department</option>
                        {departments.map((dept) => (
                          <option key={dept.name} value={dept.name}>{dept.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Preferred Contact Method</label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="preferredContact"
                          value="email"
                          checked={formData.preferredContact === 'email'}
                          onChange={handleChange}
                          className="w-4 h-4 text-primary"
                        />
                        <span className="text-sm text-foreground">Email</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="preferredContact"
                          value="phone"
                          checked={formData.preferredContact === 'phone'}
                          onChange={handleChange}
                          className="w-4 h-4 text-primary"
                        />
                        <span className="text-sm text-foreground">Phone</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Message *</label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-border rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-medical-primary py-3.5 shadow-primary-glow flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>

                <div className="mt-6 pt-6 border-t border-border">
                  <p className="text-xs text-center text-muted-foreground">
                    By submitting this form, you agree to our Privacy Policy and Terms of Service.
                    Your information will be kept confidential.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Main branches</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Visit our centrally located branches in Nairobi for all your healthcare needs
            </p>
          </div>

          {branches && (
            <div className="max-w-5xl mx-auto">
              <div className="bg-card rounded-2xl border border-border overflow-hidden mb-8">
                <div className="p-6 md:p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-2">{branches.name}</h3>
                      <p className="text-primary font-medium mb-4">{branches.location}</p>

                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-muted-foreground">{branches.address}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                          <a href={`tel:${branches.phone}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                            {branches.phone}
                          </a>
                        </div>
                        <div className="flex items-center gap-3">
                          <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                          <a href={`mailto:${branches.email}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                            {branches.email}
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Right Column - Working Hours */}
                    <div>
                      <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                        <Clock className="w-4 h-4 text-primary" />
                        Working Hours
                      </h4>
                      <div className="space-y-2 text-sm bg-secondary/30 rounded-xl p-4">
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Monday - Friday:</span>
                          <span className="font-semibold text-foreground">{branches.hours.weekdays}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Saturday:</span>
                          <span className="font-semibold text-foreground">{branches.hours.saturday}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Sunday:</span>
                          <span className="font-semibold text-foreground">{branches.hours.sunday}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Services Available */}
                  <div className="mt-6 pt-6 border-t border-border">
                    <h4 className="font-semibold text-foreground mb-3">Services Available</h4>
                    <div className="flex flex-wrap gap-2">
                      {branches.features.map((feature) => (
                        <span key={feature} className="px-3 py-1.5 bg-primary/10 text-primary text-sm rounded-full">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Section Below */}
              <div className="bg-card rounded-2xl border border-border overflow-hidden">
                <div className="p-6 border-b border-border bg-gradient-to-r from-secondary/50 to-transparent">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-foreground text-lg">Location Map</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Find us easily using the map below
                      </p>
                    </div>
                    <a
                      href="https://www.google.com/maps/place/Nairobi,+Kenya"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary-dark transition-colors"
                    >
                      <MapPin className="w-4 h-4" />
                      Open in Google Maps
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>

                <div className="p-6">
                  <div className="overflow-hidden rounded-xl border border-border shadow-md">
                    <iframe
                      title="Nairobi Main Branch Map"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.846508040243!2d36.819404!3d-1.292065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10c56cb2d8cf%3A0xf95f7520d3b5b2e!2sNairobi!5e0!3m2!1sen!2ske!4v1669033190723!5m2!1sen!2ske"
                      width="100%"
                      height="400"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="w-full"
                    />
                  </div>

                  <div className="mt-4 flex items-start gap-2 text-sm text-muted-foreground bg-secondary/30 rounded-lg p-3">
                    <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-foreground">Address:</strong> {branches.address}
                    </span>
                  </div>

                  {/* Directions Info */}
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-start gap-2 text-sm">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs text-primary font-bold">1</span>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">By Car</p>
                        <p className="text-xs text-muted-foreground">Ample parking available with 24/7 security</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs text-primary font-bold">2</span>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Public Transport</p>
                        <p className="text-xs text-muted-foreground">Multiple matatu routes stop near Upper Hill</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Department Contacts */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Direct Department Contacts</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Contact our departments directly for specialized assistance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((dept) => (
              <div key={dept.name} className="bg-card rounded-xl border border-border p-5 hover:shadow-strong transition-all group">
                <MessageSquare className="w-8 h-8 text-primary mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-foreground mb-2">{dept.name}</h3>
                <div className="space-y-1 text-sm">
                  <a href={`tel:${dept.phone}`} className="block text-muted-foreground hover:text-primary transition-colors">
                    📞 {dept.phone}
                  </a>
                  <a href={`mailto:${dept.email}`} className="block text-muted-foreground hover:text-primary transition-colors">
                    ✉️ {dept.email}
                  </a>
                  <p className="text-xs text-accent mt-2">Available: {dept.available}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="py-16 bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Connect With Us</h2>
          <p className="text-muted-foreground mb-8">Follow us on social media for health tips, updates, and news</p>
          <div className="flex justify-center gap-4">
            <a href="#" className="w-12 h-12 bg-card rounded-full flex items-center justify-center hover:bg-[#1877f2] hover:text-white transition-all group">
              <FaFacebookF className="w-5 h-5 text-primary group-hover:text-white" />
            </a>
            <a href="#" className="w-12 h-12 bg-card rounded-full flex items-center justify-center hover:bg-[#1da1f2] hover:text-white transition-all group">
              <FaTwitter className="w-5 h-5 text-primary group-hover:text-white" />
            </a>
            <a href="#" className="w-12 h-12 bg-card rounded-full flex items-center justify-center hover:bg-[#0a66c2] hover:text-white transition-all group">
              <FaLinkedin className="w-5 h-5 text-primary group-hover:text-white" />
            </a>
            <a href="#" className="w-12 h-12 bg-card rounded-full flex items-center justify-center hover:bg-gradient-to-br from-[#f58529] via-[#dd2a7b] to-[#8134af] transition-all group">
              <FaInstagram className="w-5 h-5 text-primary group-hover:text-white" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

