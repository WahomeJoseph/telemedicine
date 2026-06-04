/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import {
  Users,
  Award,
  Activity,
  Stethoscope,
  Star,
  Quote,
  Heart,
  Phone,
  Mail,
  ChevronDown,
} from 'lucide-react'
import { FaLinkedinIn } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"
import { RiDoubleQuotesL } from "react-icons/ri"
import Image from 'next/image'

const STATS = [
  { value: '150+', label: 'Best Doctors', icon: Stethoscope, sub: 'Expert physicians' },
  { value: '200+', label: 'Professional Nurses', icon: Users, sub: 'Caring staff' },
  { value: '24/7', label: 'Patient Capacity', icon: Activity, sub: 'Always available' },
  { value: '50+', label: 'Available Doctors', icon: Award, sub: 'Ready to help' },
]

const SERVICES = [
  { icon: '🩺', title: 'Primary Care', desc: 'Board-certified physicians for everyday health concerns.', color: 'from-blue-500 to-cyan-500' },
  { icon: '⚡', title: 'Emergency Care', desc: '24/7 emergency services for critical conditions.', color: 'from-red-500 to-orange-500' },
  { icon: '🧠', title: 'Mental Health', desc: 'Licensed therapists and psychiatrists.', color: 'from-purple-500 to-pink-500' },
  { icon: '👶', title: 'Pediatrics', desc: 'Specialized care for children.', color: 'from-green-500 to-teal-500' },
  { icon: '💊', title: 'Pharmacy', desc: 'Prescription medications delivered.', color: 'from-indigo-500 to-blue-500' },
  { icon: '🔬', title: 'Lab Services', desc: 'Fast and accurate diagnostic tests.', color: 'from-cyan-500 to-teal-500' },
]

const DOCTORS = [
  {
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiologist',
    experience: '12 years',
    rating: 4.9,
    image: '/doctor-lab.jpg',
    linkedin: "http://www.linkedin.com/in/joseph-wachira-202a70237",
    twitter: "https://x.com/WachiraJoseph17",
    email: "josephwachira589@gmail.com",
  },
  {
    name: 'Dr. Michael Chen',
    specialty: 'Neurologist',
    experience: '15 years',
    rating: 4.8,
    image: '/doctor-lab.jpg',
    linkedin: "http://www.linkedin.com/in/joseph-wachira-202a70237",
    twitter: "https://x.com/WachiraJoseph17",
    email: "josephwachira589@gmail.com",
  },
  {
    name: 'Dr. Amina Hassan',
    specialty: 'Pediatrician',
    experience: '10 years',
    rating: 5.0,
    image: '/doctor-lab.jpg',
    linkedin: "http://www.linkedin.com/in/joseph-wachira-202a70237",
    twitter: "https://x.com/WachiraJoseph17",
    email: "josephwachira589@gmail.com",
  },
]

const TESTIMONIALS = [
  { name: 'John Mwangi', role: 'Patient', content: 'Excellent service! The doctors are very professional and caring.', rating: 5 },
  { name: 'Mary Wanjiku', role: 'Patient', content: 'Best healthcare experience I\'ve ever had. Highly recommended!', rating: 5 },
  { name: 'Peter Ochieng', role: 'Patient', content: 'State-of-the-art facilities and wonderful staff.', rating: 5 },
]

const PARTNERS = [
  { name: 'AAR Insurance', logo: '/aar.png' },
  { name: 'Jubilee Insurance', logo: '/jubilee.png' },
  { name: 'NHIF', logo: '/nhif.png' },
  { name: 'CIC Insurance', logo: '/cic.png' },
]

export default function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [showContactBar, setShowContactBar] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      setShowContactBar(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <Head>
        <title>MediConnect — Professional Healthcare Services | 24/7 Medical Care</title>
        <meta name="description" content="Expert doctors and modern facilities. Book appointments, access emergency care, and get quality healthcare services." />
        <meta name="keywords" content="hospital, doctors, healthcare, medical clinic, emergency care, pharmacy" />
        <meta property="og:title" content="MediConnect — Professional Healthcare Services" />
        <meta property="og:description" content="Expert medical care at your service. Book appointments with top doctors." />
        <meta property="og:type" content="website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-white">

        {/* Hero  */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.1.0&auto=format&fit=crop&w=1920&q=80"
              alt="Medical professionals"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-primary/60" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-up">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                  Healthcare that comes
                  <span className="text-accent-light"> to you</span>
                </h1>
                <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
                  The effect of the treatment on the physical, emotional, and
                  cognitive functions of the individual.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/book-appointment"
                    className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-primary bg-white rounded-full hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    Book An Appointment
                  </Link>
                  <Link
                    href="/services"
                    className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white border-2 border-white/30 rounded-full hover:bg-white/10 transition-all duration-300"
                  >
                    Our Services
                  </Link>
                </div>

                {/* Stats Section in Hero */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-8 border-t border-white/20">
                  {STATS.map((stat, idx) => {
                    const Icon = stat.icon
                    return (
                      <div key={idx} className="text-center">
                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <p className="text-2xl font-bold text-white">{stat.value}</p>
                        <p className="text-xs text-white/80">{stat.label}</p>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="hidden lg:block relative animate-slide-right">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-primary/20 to-accent/20 backdrop-blur-sm border border-white/20">
                  <div className="relative aspect-video">
                    <video
                      className="w-full h-full object-cover"
                      autoPlay
                      muted
                      loop
                      playsInline
                    >
                      <source src="/MediConnect-Demo.mp4" type="video/mp4" />
                      <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                        <div className="text-center">
                          <p className="text-white">Video consultation preview</p>
                        </div>
                      </div>
                    </video>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center mb-12">
              <div className="flex-grow h-px bg-gradient-to-r from-transparent via-primary to-transparent max-w-[150px]" />
              <h2 className="mx-6 text-3xl md:text-4xl font-bold text-foreground">
                What We <span className="text-primary">Offer</span>
              </h2>
              <div className="flex-grow h-px bg-gradient-to-r from-transparent via-primary to-transparent max-w-[150px]" />
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">

                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20" />
                  <div className="h-[500px] bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                    <Image
                      src="/surgery.jpg"
                      width={800}
                      height={600}
                      alt="Professional trucking fleet"
                      className="w-full h-[600px] object-cover rounded-2xl shadow-2xl"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">Modern Medical Facility</h3>
                    <p className="text-white/90">State-of-the-art equipment and care</p>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    Comprehensive Healthcare Solutions for All Your Needs
                  </h3>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                    At BioMedPharm, we provide comprehensive medical services designed to meet the unique
                    healthcare needs of every patient. Our modern facilities, experienced doctors, and advanced
                    medical technology ensure you receive the best possible care.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    From routine checkups to specialized treatments, we handle it all with the professionalism
                    and compassion that has made us the trusted choice for over 10,000 patients across Kenya.
                  </p>
                </div>

                {/* Service Cards Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {SERVICES.slice(0, 4).map((service) => (
                    <div key={service.title} className="bg-gray-50 rounded-xl p-4 hover:shadow-lg transition-all duration-300">
                      <div className="text-3xl mb-2">{service.icon}</div>
                      <h4 className="font-semibold text-foreground text-sm">{service.title}</h4>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section - Why Choose Us */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center mb-12">
              <div className="flex-grow h-px bg-gradient-to-r from-transparent via-primary to-transparent max-w-[150px]" />
              <h2 className="mx-6 text-3xl md:text-4xl font-bold text-foreground">
                Why Choose <span className="text-primary">BioMedPharm</span>
              </h2>
              <div className="flex-grow h-px bg-gradient-to-r from-transparent via-primary to-transparent max-w-[150px]" />
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <p className="text-lg text-muted-foreground text-justify leading-relaxed">
                  Founded in 2010 with a vision to revolutionize healthcare in Kenya, BioMedPharm has grown into
                  the region&aposs most trusted medical facility. Our journey began when our founder recognized the
                  critical need for quality, accessible healthcare services.
                </p>
                <p className="text-lg text-muted-foreground text-justify leading-relaxed">
                  Today, we operate a modern medical facility with over 50 experienced doctors, employ more than
                  200 healthcare professionals, and have successfully treated over 50,000 patients across Kenya.
                </p>

                <div className="grid grid-cols-2 gap-5 mt-8">
                  <div className="text-center bg-white p-6 rounded-xl shadow-lg border border-border/25">
                    <div className="text-4xl font-bold text-primary mb-2">10k+</div>
                    <div className="text-sm text-muted-foreground font-medium">Happy Patients</div>
                  </div>
                  <div className="text-center bg-white p-6 rounded-xl shadow-lg border border-border/25">
                    <div className="text-4xl font-bold text-primary mb-2">15+</div>
                    <div className="text-sm text-muted-foreground font-medium">Years Experience</div>
                  </div>
                  <div className="text-center bg-white p-6 rounded-xl shadow-lg border border-border/25">
                    <div className="text-4xl font-bold text-primary mb-2">50+</div>
                    <div className="text-sm text-muted-foreground font-medium">Expert Doctors</div>
                  </div>
                  <div className="text-center bg-white p-6 rounded-xl shadow-lg border border-border/25">
                    <div className="text-4xl font-bold text-primary mb-2">98%</div>
                    <div className="text-sm text-muted-foreground font-medium">Patient Satisfaction</div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl h-[500px] bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <Image
                    src="/doctors-ops.jpg"
                    width={800}
                    height={600}
                    alt="Professional trucking fleet"
                    className="w-full h-[600px] object-cover rounded-2xl shadow-2xl"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-2xl p-4 max-w-[200px]">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Award className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-bold text-foreground">Accredited</p>
                      <p className="text-xs text-muted-foreground">By KMPDC & NHIF</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Doctors Section - Team */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-left mb-8">
              <h2 className="text-xl md:text-lg uppercase font-bold text-foreground">
                Our <span className="text-primary">Team</span>
              </h2>
              <p className="text-3xl text-muted-foreground capitalizel">
                Meet the dedicated professionals driving our healthcare services
              </p>
            </div>

            {/* Doctors Section - Team */}
            <section className="py-6 bg-white">
              <div className="grid md:grid-cols-3 gap-10">
                {DOCTORS.map((doctor) => (
                  <div key={doctor.name} className="relative group">
                    <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                      <Image
                        src={doctor.image || "/placeholder.svg"}
                        width={400}
                        height={400}
                        alt={doctor.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                      {/* Snack bar */}
                      <div className="absolute bottom-4 left-4 right-4 bg-primary/50 text-white p-4 border-l border-accent rounded-2xl shadow-2xl backdrop-blur-xs">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-lg font-bold mb-1">{doctor.name}</h3>
                            <p className="text-white/90 text-sm">{doctor.specialty}</p>
                          </div>

                          {/* Social links */}
                          <div className="flex space-x-2">
                            <a
                              href={doctor.linkedin}
                              className="w-8 h-8 bg-white rounded-full flex items-center justify-center transition-all duration-300"
                            >
                              <FaLinkedinIn className="w-4 h-4 text-accent" />
                            </a>
                            <a
                              href={doctor.twitter}
                              className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300"
                            >
                              <FaXTwitter className="w-4 h-4 text-accent" />
                            </a>
                            <a
                              href={`mailto:${doctor.email}`}
                              className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300"
                            >
                              <Mail className="w-4 h-4 text-accent" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center mb-12">
              <div className="flex-grow h-px bg-gradient-to-r from-transparent via-primary to-transparent max-w-[150px]" />
              <h2 className="mx-6 text-3xl md:text-4xl font-bold text-foreground">
                How It <span className="text-primary">Works</span>
              </h2>
              <div className="flex-grow h-px bg-gradient-to-r from-transparent via-primary to-transparent max-w-[150px]" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { step: '01', title: 'Book Appointment', desc: 'Schedule your visit online or by phone' },
                { step: '02', title: 'Visit Our Clinic', desc: 'Meet with our expert doctors' },
                { step: '03', title: 'Get Treatment', desc: 'Receive quality medical care' },
              ].map((item, idx) => (
                <div key={idx} className="text-center group">
                  <div className="relative w-24 h-24 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                    <span className="text-2xl font-bold text-primary group-hover:text-white">{item.step}</span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Stats Banner */}
            <div className="mt-16 bg-gradient-to-r from-primary to-accent rounded-2xl p-8 text-center text-white">
              <p className="text-lg font-semibold">
                ⚡ Average wait time: <span className="font-bold">under 15 minutes</span>
              </p>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Trusted by <span className="text-primary">Patients</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Don&apost just take our word for it. Here&apos;s what our patients have to say
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {TESTIMONIALS.map((testimonial, idx) => (
                <div key={idx} className="group bg-gray-50 border border-gray-100 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:border-primary/30 hover:scale-[1.02]">
                  <RiDoubleQuotesL size={30} />
                  <p className="text-foreground leading-relaxed mb-4 italic">
                    {testimonial.content}
                  </p>
                  <div className="flex mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <div className="flex items-center pt-4 border-t border-gray-200">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-xl">👤</span>
                    </div>
                    <div className="ml-3">
                      <p className="font-semibold text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Partners Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center mb-12">
              <div className="flex-grow h-px bg-gradient-to-r from-transparent via-primary to-transparent max-w-[150px]" />
              <h2 className="mx-6 text-3xl md:text-4xl font-bold text-foreground">
                Our <span className="text-primary">Insurance Partners</span>
              </h2>
              <div className="flex-grow h-px bg-gradient-to-r from-transparent via-primary to-transparent max-w-[150px]" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {PARTNERS.map((partner, index) => (
                <div key={index} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-20 h-20 mb-4 flex items-center justify-center bg-gray-50 rounded-xl group-hover:bg-gray-100 transition-colors">
                      <Image
                        width={64}
                        height={64}
                        src={partner.logo || "/placeholder.svg"}
                        alt={partner.name || "Partner logo"}
                        className="max-h-16 max-w-16 object-contain opacity-80 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110"
                      />
                    </div>
                    <h3 className="text-sm font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                      {partner.name}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-10 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center mb-8">
              <div className="flex-grow h-px bg-gradient-to-r from-transparent via-primary to-transparent max-w-[150px]" />
              <h2 className="mx-6 text-3xl md:text-4xl font-bold text-foreground">
                Frequently Asked <span className="text-primary">Questions</span>
              </h2>
              <div className="flex-grow h-px bg-gradient-to-r from-transparent via-primary to-transparent max-w-[150px]" />
            </div>
            <p className="text-xl text-muted-foreground text-center max-w-2xl mx-auto mb-12">
              Get answers to common questions about our medical services
            </p>

            <section className="py-8">
              <div className="max-w-4xl mx-auto px-4">
                <div className="space-y-4">
                  {[
                    {
                      q: 'How do I schedule an appointment?',
                      a: 'You can schedule an appointment through multiple channels: (1) Online through our booking system on the website, (2) By calling our appointment desk at +254 797 596 9701, (3) By visiting any of our brancheses in person, or (4) Through our mobile app available on iOS and Android. We recommend booking at least 2-3 days in advance for regular checkups.'
                    },
                    {
                      q: 'What insurance plans do you accept?',
                      a: 'We accept most major insurance plans including AAR, Jubilee, APA, CIC, Resolution Health, and NHIF. We also accept international insurance plans for medical tourists. Please contact our billing department at +254 797 596 9702 to verify your specific insurance coverage before your visit.'
                    },
                    {
                      q: 'Do you offer telemedicine services?',
                      a: 'Yes, we offer comprehensive telemedicine services including video consultations, phone consultations, and online prescription refills. You can book a virtual appointment through our website or mobile app. Telemedicine is available for follow-up visits, prescription management, mental health consultations, and minor acute conditions.'
                    },
                    {
                      q: 'What are your emergency services?',
                      a: 'We provide 24/7 emergency services at our Nairobi Main Branch with dedicated emergency physicians, trauma care, cardiac emergency unit, and ambulance services. For immediate emergency assistance, call our emergency hotline at +254 797 596 9758. Our average emergency response time is under 10 minutes within Nairobi.'
                    },
                    {
                      q: 'How do I access my medical records?',
                      a: 'You can access your medical records through our secure patient portal. After creating an account, you can view lab results, download prescriptions, access visit summaries, and request record transfers. For assistance, contact our medical records department at +254 797 596 9703.'
                    },
                    {
                      q: 'What payment methods do you accept?',
                      a: 'We accept cash, credit/debit cards (Visa, Mastercard, American Express), mobile money (M-Pesa), bank transfers, and all major insurance cards. We also offer flexible payment plans for qualifying patients. Our billing department can help you understand your payment options.'
                    },
                    {
                      q: 'Do you offer home healthcare services?',
                      a: 'Yes, we offer home healthcare services including nursing care, physiotherapy, lab sample collection, and doctor home visits. These services are available within Nairobi and surrounding areas. Additional fees apply for home visits.'
                    },
                    {
                      q: 'How do I prepare for my first visit?',
                      a: 'For your first visit, please bring: (1) A valid ID, (2) Your insurance card (if applicable), (3) Any relevant medical records or test results, (4) A list of current medications, and (5) Arrive 15 minutes early to complete registration. You can also pre-register online to save time.'
                    },
                  ].map((faq, index) => (
                    <details key={index} className="group bg-card rounded-xl border border-border hover:shadow-md transition-all">
                      <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
                        <span className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          <Heart className="w-4 h-4 text-primary inline mr-2" />
                          {faq.q}
                        </span>
                        <ChevronDown className="w-5 h-5 text-muted-foreground group-open:rotate-90 transition-transform" />
                      </summary>
                      <div className="px-5 pb-5">
                        <p className="text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            </section>

            {/* CTA Panel */}
            <div className="text-center mt-12">
              <div className="bg-gradient-to-r from-primary to-accent rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
                <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                  Our medical experts are here to help. Contact us now for personalized assistance.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <div className="flex items-center justify-center gap-6">
                    <Link href="tel:+2547975969757" className="w-12 h-12 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition duration-300">
                      <Phone className="w-5 h-5 text-white" />
                    </Link>
                    <Link href="mailto:info@biomedpharm.com" className="w-12 h-12 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition duration-300">
                      <Mail className="w-5 h-5 text-white" />
                    </Link>
                    <Link href="https://wa.me/2547975969757" target="_blank" className="w-12 h-12 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition duration-300">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448L.057 24zm6.164-4.146l.362.215c1.562.926 3.36 1.417 5.205 1.417 5.424 0 9.839-4.414 9.841-9.838.001-2.627-1.022-5.099-2.879-6.958-1.856-1.858-4.327-2.882-6.955-2.882-5.424 0-9.839 4.415-9.841 9.84 0 2.131.673 4.206 1.94 5.934l.252.342-.997 3.637 3.852-1.012zm9.618-5.957c-.176-.293-.646-.469-1.322-.822-.676-.353-3.987-1.956-4.609-2.176-.622-.22-1.07-.33-1.52.33-.451.66-1.748 2.157-2.139 2.597-.391.44-.782.497-1.459.147-.676-.35-2.855-1.046-5.435-3.334-2.009-1.782-3.366-3.983-3.762-4.658-.396-.675-.044-1.041.297-1.376.306-.302.674-.783 1.01-1.173.336-.39.448-.66.672-1.102.224-.44.112-.826-.056-1.155-.168-.33-1.52-3.63-2.077-4.96-.546-1.3-1.104-1.14-1.52-1.155-.398-.016-.857-.017-1.317-.017-.46 0-1.206.176-1.836.877-.63.702-2.402 2.327-2.402 5.669 0 3.342 2.45 6.57 2.79 7.02.34.45 4.812 7.31 11.66 10.25 1.63.7 2.9 1.12 3.89 1.43 1.63.52 3.11.45 4.28.27 1.31-.2 3.99-1.62 4.55-3.18.56-1.56.56-2.89.39-3.17-.17-.28-.62-.45-1.28-.79z" />
                      </svg>
                    </Link>
                  </div>
                  <Link href="/contact-us" className="px-6 py-3 bg-white text-primary font-semibold rounded-full hover:shadow-lg transition-all duration-300">
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <style jsx>{`
        @keyframes fade-up {
          from {
            opacity: 0
            transform: translateY(30px)
          }
          to {
            opacity: 1
            transform: translateY(0)
          }
        }
        
        @keyframes slide-right {
          from {
            opacity: 0
            transform: translateX(30px)
          }
          to {
            opacity: 1
            transform: translateX(0)
          }
        }
        
        .animate-fade-up {
          animation: fade-up 0.8s ease-out
        }
        
        .animate-slide-right {
          animation: slide-right 0.8s ease-out
        }
      `}</style>
    </>
  )
}
