'use client';

import { format, parseISO, isToday, isTomorrow, isThisWeek } from 'date-fns';
import { Calendar, Clock, Video, Phone, User } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Appointment } from '@/types';

const typeIcons: Record<string, React.ElementType> = {
  demo: Video,
  onboarding: User,
  support: Phone,
  review: Calendar,
  sales_call: Phone,
  training: User,
};

const typeColors: Record<string, string> = {
  demo: 'bg-blue-100 text-blue-600',
  onboarding: 'bg-purple-100 text-purple-600',
  support: 'bg-green-100 text-green-600',
  review: 'bg-yellow-100 text-yellow-600',
  sales_call: 'bg-pink-100 text-pink-600',
  training: 'bg-cyan-100 text-cyan-600',
};

interface UpcomingAppointmentsProps {
  appointments: Appointment[];
  limit?: number;
}

export function UpcomingAppointments({ appointments, limit = 5 }: UpcomingAppointmentsProps) {
  const sortedAppointments = [...appointments]
    .filter((a) => a.status === 'scheduled')
    .sort((a, b) => {
      const dateA = new Date(`${a.date} ${a.time}`);
      const dateB = new Date(`${b.date} ${b.time}`);
      return dateA.getTime() - dateB.getTime();
    })
    .slice(0, limit);

  const getDateLabel = (dateStr: string) => {
    const date = parseISO(dateStr);
    if (isToday(date)) return 'Today';
    if (isTomorrow(date)) return 'Tomorrow';
    return format(date, 'EEE, MMM d');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Appointments</CardTitle>
      </CardHeader>
      <CardContent>
        {sortedAppointments.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-4">
            No upcoming appointments
          </p>
        ) : (
          <div className="space-y-3">
            {sortedAppointments.map((appointment) => {
              const Icon = typeIcons[appointment.type] || Calendar;
              const colorClass = typeColors[appointment.type] || 'bg-gray-100 text-gray-600';

              return (
                <div
                  key={appointment.id}
                  className="flex gap-3 p-3 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors"
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${colorClass}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">{appointment.title}</p>
                    <p className="text-sm text-gray-500 truncate">{appointment.contactName}</p>
                    <div className="flex items-center gap-3 mt-1.5">
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {getDateLabel(appointment.date)}
                      </span>
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {appointment.time}
                      </span>
                    </div>
                  </div>
                  {appointment.meetingLink && (
                    <a
                      href={appointment.meetingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors self-center"
                    >
                      <Video className="w-4 h-4" />
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        )}

        <button className="w-full mt-4 py-2 text-sm text-pink-600 hover:text-pink-700 font-medium">
          View all appointments
        </button>
      </CardContent>
    </Card>
  );
}
