import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col">

      <section className="flex flex-1 items-center justify-center px-4 pt-32 pb-20">
        <div className="max-w-2xl w-full text-center">
          <div className="flex items-center justify-center mb-8">
            <Image
              src="/not-found.svg"
              alt="404 Page Not Found"
              width={280}
              height={280}
              priority
              className="object-contain"
            />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Page Not Found
          </h1>

          <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
            The page you&apos;re looking for doesn&apos;t exist or may have been moved.
            Please check the URL or navigate back to continue browsing.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">

            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-xl shadow-lg hover:bg-primary/90 transition-all duration-300"
            >
              <Home className="w-4 h-4" />
              Back to Home
            </Link>

            <Link
              href="/our-services"
              className="inline-flex items-center justify-center gap-2 border border-primary text-primary px-6 py-3 rounded-xl hover:bg-primary/10 transition-all duration-300"
            >
              <ArrowLeft className="w-4 h-4" />
              View Services
            </Link>

          </div>
        </div>
      </section>
    </div>
  )
}
