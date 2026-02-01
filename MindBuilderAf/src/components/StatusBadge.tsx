import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: string;
  className?: string;
}

const statusConfig: Record<string, { label: string; variant: 'default' | 'success' | 'warning' | 'info' | 'destructive' }> = {
  // Programme status
  upcoming: { label: 'Upcoming', variant: 'info' },
  ongoing: { label: 'Ongoing', variant: 'success' },
  completed: { label: 'Completed', variant: 'default' },
  
  // Enrollment status
  active: { label: 'Active', variant: 'success' },
  dropped: { label: 'Dropped', variant: 'destructive' },
  
  // Attendance status
  present: { label: 'Present', variant: 'success' },
  absent: { label: 'Absent', variant: 'destructive' },
  late: { label: 'Late', variant: 'warning' },
  excused: { label: 'Excused', variant: 'info' },
  
  // Mentorship status
  paused: { label: 'Paused', variant: 'warning' },
  
  // User status
  true: { label: 'Active', variant: 'success' },
  false: { label: 'Inactive', variant: 'destructive' },
};

const variantStyles = {
  default: 'bg-muted text-muted-foreground border-muted',
  success: 'bg-success/10 text-success border-success/20',
  warning: 'bg-warning/10 text-warning border-warning/20',
  info: 'bg-info/10 text-info border-info/20',
  destructive: 'bg-destructive/10 text-destructive border-destructive/20',
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const config = statusConfig[status] || { label: status, variant: 'default' as const };
  
  return (
    <Badge 
      variant="outline"
      className={cn(
        'font-medium border',
        variantStyles[config.variant],
        className
      )}
    >
      {config.label}
    </Badge>
  );
};
