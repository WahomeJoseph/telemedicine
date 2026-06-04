export const branch = {
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
};

export const departments = [
    {
        name: 'Emergency Care',
        phone: '+254 797 596 9700',
        email: 'emergency@biomedpharm.com',
        available: '24/7',
        description: 'Immediate medical attention for critical conditions'
    },
    {
        name: 'Appointments',
        phone: '+254 797 596 9701',
        email: 'appointments@biomedpharm.com',
        available: '8AM - 8PM',
        description: 'Schedule consultations with our specialists'
    },
    {
        name: 'Billing & Insurance',
        phone: '+254 797 596 9702',
        email: 'billing@biomedpharm.com',
        available: '9AM - 5PM',
        description: 'Payment inquiries and insurance claims'
    },
    {
        name: 'Medical Records',
        phone: '+254 797 596 9703',
        email: 'records@biomedpharm.com',
        available: '8AM - 6PM',
        description: 'Request your medical history and reports'
    },
    {
        name: 'Pharmacy',
        phone: '+254 797 596 9704',
        email: 'pharmacy@biomedpharm.com',
        available: '24/7',
        description: 'Prescription refills and medication inquiries'
    },
    {
        name: 'Customer Support',
        phone: '+254 797 596 9705',
        email: 'support@biomedpharm.com',
        available: '24/7',
        description: 'General inquiries and feedback'
    },
];

export const socialLinks = [
    {
        name: 'Facebook',
        url: 'https://facebook.com/mediconnect',
        icon: 'FaFacebookF',
        color: '#1877f2',
        hoverColor: '#1877f2'
    },
    {
        name: 'Twitter',
        url: 'https://twitter.com/mediconnect',
        icon: 'FaTwitter',
        color: '#1da1f2',
        hoverColor: '#1da1f2'
    },
    {
        name: 'LinkedIn',
        url: 'https://linkedin.com/company/mediconnect',
        icon: 'FaLinkedin',
        color: '#0a66c2',
        hoverColor: '#0a66c2'
    },
    {
        name: 'Instagram',
        url: 'https://instagram.com/mediconnect',
        icon: 'FaInstagram',
        color: '#e4405f',
        hoverColor: 'gradient'
    }
];

export const contactInfo = {
    phoneNumbers: {
        main: '+254 797 596 9757',
        emergency: '+254 797 596 9758',
        appointments: '+254 797 596 9759'
    },
    emails: {
        info: 'info@biomedpharm.com',
        support: 'support@biomedpharm.com',
        careers: 'careers@biomedpharm.com'
    }
};
