import { MessageSquare, Phone, Mail, Clock } from 'lucide-react';
import { departments } from '@/libs/constants/ContactData';
import { Card } from '@/components/ui/Card';

type Department = (typeof departments)[number];

interface DepartmentListProps {
  departments: Department[];
}

export function DepartmentList({ departments }: DepartmentListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {departments.map((dept) => (
        <Card key={dept.name} className="p-5 hover:shadow-strong transition-all group">
          <div className="flex items-start justify-between mb-3">
            <MessageSquare className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
            {dept.available === '24/7' && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                24/7 Available
              </span>
            )}
          </div>
          
          <h3 className="font-semibold text-foreground mb-2 text-lg">{dept.name}</h3>
          
          {dept.description && (
            <p className="text-sm text-muted-foreground mb-3">{dept.description}</p>
          )}
          
          <div className="space-y-2 text-sm pt-3 border-t border-border">
            <a 
              href={`tel:${dept.phone}`} 
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group/link"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{dept.phone}</span>
            </a>
            <a 
              href={`mailto:${dept.email}`} 
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group/link"
            >
              <Mail className="w-3.5 h-3.5" />
              <span className="text-sm truncate">{dept.email}</span>
            </a>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-3.5 h-3.5" />
              <span className="text-sm">Available: {dept.available}</span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
