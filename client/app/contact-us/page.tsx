import { Metadata } from 'next';
import { ContactPageSection } from '@/components/pages/ContactPage';

export const metadata: Metadata = {
  title: 'Contact Us - BioMedLink',
  description:
    'Get in touch with BioMedLink for appointments, inquiries, or support. Available 24/7 via virtual care.',
  openGraph: {
    title: 'Contact BioMedLink',
    description: 'Reach our healthcare team anytime',
    type: 'website',
  },
};

export default function ContactPage() {
  return <ContactPageSection />;
}
