import { Phone, Mail, MapPin, Clock, CheckCircle } from 'lucide-react';
import { branch, contactInfo } from '@/libs/constants/ContactData'
import { Card } from '@/components/ui/Card';


export function ContactInfo() {
  const contactCards = [
    {
      icon: Phone,
      title: 'Phone Numbers',
      items: [
        { label: 'Main Line', value: contactInfo.phoneNumbers.main, href: `tel:${contactInfo.phoneNumbers.main}` },
        { label: 'Emergency', value: contactInfo.phoneNumbers.emergency, href: `tel:${contactInfo.phoneNumbers.emergency}` },
        { label: 'Appointments', value: contactInfo.phoneNumbers.appointments, href: `tel:${contactInfo.phoneNumbers.appointments}` },
      ]
    },
    {
      icon: Mail,
      title: 'Email Us',
      items: [
        { label: 'General Inquiries', value: contactInfo.emails.info, href: `mailto:${contactInfo.emails.info}` },
        { label: 'Support', value: contactInfo.emails.support, href: `mailto:${contactInfo.emails.support}` },
        { label: 'Careers', value: contactInfo.emails.careers, href: `mailto:${contactInfo.emails.careers}` },
      ]
    },
    {
      icon: Clock,
      title: 'Working Hours',
      items: [
        { label: 'Monday - Friday', value: branch.hours.weekdays },
        { label: 'Saturday', value: branch.hours.saturday },
        { label: 'Sunday', value: branch.hours.sunday },
      ],
      special: { label: 'Emergency', value: '24/7 Available', highlight: true }
    }
  ];

  return (
    <div className="space-y-6">
      {contactCards.map((card, idx) => (
        <Card key={idx} className="p-6 hover:shadow-strong transition-all group">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <card.icon className="w-6 h-6 text-primary" />
          </div>
          <h3 className="font-semibold text-foreground text-lg mb-3">{card.title}</h3>
          <div className="space-y-2">
            {card.items.map((item, itemIdx) => (
              <div key={itemIdx}>
                {'href' in item ? (
                  <a
                    href={item.href}
                    className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <span className="font-medium">{item.label}:</span> {item.value}
                  </a>
                ) : (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{item.label}:</span>
                    <span className="font-medium text-foreground">{item.value}</span>
                  </div>
                )}
              </div>
            ))}
            {card.special && (
              <div className={`flex justify-between text-sm pt-2 ${card.special.highlight ? 'text-accent' : ''}`}>
                <span>{card.special.label}:</span>
                <span className="font-medium">{card.special.value}</span>
              </div>
            )}
          </div>
        </Card>
      ))}
      
      {/* Location Card */}
      <Card className="p-6">
        <div className="flex items-start gap-3">
          <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-foreground mb-1">Visit Us</h3>
            <p className="text-sm text-muted-foreground">{branch.address}</p>
            <p className="text-sm text-muted-foreground mt-1">{branch.location}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              {branch.features.slice(0, 3).map((feature) => (
                <span key={feature} className="inline-flex items-center gap-1 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                  <CheckCircle className="w-3 h-3" />
                  {feature}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
