'use client';

import { Plus, UserPlus, Calendar, FileText, Phone, Building2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

interface QuickAction {
  icon: React.ElementType;
  label: string;
  description: string;
  onClick: () => void;
  color: string;
}

interface QuickActionsProps {
  onAction?: (action: string) => void;
}

export function QuickActions({ onAction }: QuickActionsProps) {
  const actions: QuickAction[] = [
    {
      icon: Building2,
      label: 'Add Salon',
      description: 'Register a new salon',
      onClick: () => onAction?.('add-salon'),
      color: 'bg-pink-100 text-pink-600 hover:bg-pink-200',
    },
    {
      icon: UserPlus,
      label: 'Add Lead',
      description: 'Create a new lead',
      onClick: () => onAction?.('add-lead'),
      color: 'bg-blue-100 text-blue-600 hover:bg-blue-200',
    },
    {
      icon: Calendar,
      label: 'Schedule Call',
      description: 'Book an appointment',
      onClick: () => onAction?.('schedule'),
      color: 'bg-purple-100 text-purple-600 hover:bg-purple-200',
    },
    {
      icon: FileText,
      label: 'Create Task',
      description: 'Add a new task',
      onClick: () => onAction?.('add-task'),
      color: 'bg-green-100 text-green-600 hover:bg-green-200',
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action) => (
            <button
              key={action.label}
              onClick={action.onClick}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-colors ${action.color}`}
            >
              <action.icon className="w-6 h-6" />
              <div className="text-center">
                <p className="font-medium text-sm">{action.label}</p>
              </div>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
