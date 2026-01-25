'use client';

import { useState, useMemo } from 'react';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
  Video,
  Phone,
  User,
  Clock,
} from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { StatusBadge } from '@/components/ui/Badge';
import { useStore } from '@/store';
import { Appointment } from '@/types';
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
  isSameMonth,
  isSameDay,
  parseISO,
  isToday,
} from 'date-fns';

const typeIcons: Record<string, React.ElementType> = {
  demo: Video,
  onboarding: User,
  support: Phone,
  review: CalendarIcon,
  sales_call: Phone,
  training: User,
};

const typeColors: Record<string, string> = {
  demo: 'bg-blue-100 text-blue-700 border-blue-200',
  onboarding: 'bg-purple-100 text-purple-700 border-purple-200',
  support: 'bg-green-100 text-green-700 border-green-200',
  review: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  sales_call: 'bg-pink-100 text-pink-700 border-pink-200',
  training: 'bg-cyan-100 text-cyan-700 border-cyan-200',
};

export default function CalendarPage() {
  const { appointments, teamMembers } = useStore();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [viewMode, setViewMode] = useState<'month' | 'week'>('month');

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);

  const calendarDays = useMemo(() => {
    const days: Date[] = [];
    let day = calendarStart;
    while (day <= calendarEnd) {
      days.push(day);
      day = addDays(day, 1);
    }
    return days;
  }, [currentDate]);

  const getAppointmentsForDate = (date: Date) => {
    return appointments.filter((apt) => isSameDay(parseISO(apt.date), date));
  };

  const selectedDateAppointments = selectedDate ? getAppointmentsForDate(selectedDate) : [];

  const getAssigneeName = (id: string) => {
    const member = teamMembers.find((m) => m.id === id);
    return member?.name || 'Unassigned';
  };

  const upcomingAppointments = appointments
    .filter((apt) => apt.status === 'scheduled' && parseISO(apt.date) >= new Date())
    .sort((a, b) => new Date(a.date + ' ' + a.time).getTime() - new Date(b.date + ' ' + b.time).getTime())
    .slice(0, 5);

  return (
    <DashboardLayout>
      <Header
        title="Calendar"
        subtitle="Manage your appointments and schedule"
        action={{
          label: 'New Appointment',
          onClick: () => console.log('Add appointment'),
        }}
      />

      <div className="pt-20 px-6 pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex items-center gap-4">
                  <CardTitle>{format(currentDate, 'MMMM yyyy')}</CardTitle>
                  <div className="flex gap-1">
                    <button
                      onClick={() => setCurrentDate(subMonths(currentDate, 1))}
                      className="p-2 rounded-lg hover:bg-gray-100"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setCurrentDate(addMonths(currentDate, 1))}
                      className="p-2 rounded-lg hover:bg-gray-100"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>
                  Today
                </Button>
              </CardHeader>
              <CardContent>
                {/* Week days header */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                    <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar grid */}
                <div className="grid grid-cols-7 gap-1">
                  {calendarDays.map((day, index) => {
                    const dayAppointments = getAppointmentsForDate(day);
                    const isCurrentMonth = isSameMonth(day, currentDate);
                    const isSelected = selectedDate && isSameDay(day, selectedDate);

                    return (
                      <div
                        key={index}
                        onClick={() => setSelectedDate(day)}
                        className={`
                          min-h-24 p-2 rounded-lg border cursor-pointer transition-all
                          ${isCurrentMonth ? 'bg-white' : 'bg-gray-50'}
                          ${isSelected ? 'ring-2 ring-pink-500 border-pink-500' : 'border-gray-100 hover:border-gray-200'}
                          ${isToday(day) ? 'bg-pink-50' : ''}
                        `}
                      >
                        <div className={`text-sm font-medium mb-1 ${isCurrentMonth ? 'text-gray-900' : 'text-gray-400'} ${isToday(day) ? 'text-pink-600' : ''}`}>
                          {format(day, 'd')}
                        </div>
                        <div className="space-y-1">
                          {dayAppointments.slice(0, 2).map((apt) => {
                            const Icon = typeIcons[apt.type] || CalendarIcon;
                            return (
                              <div
                                key={apt.id}
                                className={`text-xs px-1.5 py-0.5 rounded truncate flex items-center gap-1 ${typeColors[apt.type]}`}
                              >
                                <Icon className="w-3 h-3 flex-shrink-0" />
                                <span className="truncate">{apt.time}</span>
                              </div>
                            );
                          })}
                          {dayAppointments.length > 2 && (
                            <div className="text-xs text-gray-500 px-1.5">
                              +{dayAppointments.length - 2} more
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Selected Date Details */}
            {selectedDate && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5 text-pink-600" />
                    {format(selectedDate, 'EEEE, MMMM d')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedDateAppointments.length === 0 ? (
                    <div className="text-center py-6 text-gray-500">
                      <CalendarIcon className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                      <p className="text-sm">No appointments scheduled</p>
                      <Button variant="outline" size="sm" className="mt-3">
                        <Plus className="w-4 h-4 mr-1" />
                        Add Appointment
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {selectedDateAppointments.map((apt) => {
                        const Icon = typeIcons[apt.type] || CalendarIcon;
                        return (
                          <div
                            key={apt.id}
                            className={`p-3 rounded-lg border ${typeColors[apt.type]}`}
                          >
                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center flex-shrink-0">
                                <Icon className="w-4 h-4" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-sm truncate">{apt.title}</p>
                                <p className="text-xs opacity-75">{apt.contactName}</p>
                                <div className="flex items-center gap-2 mt-1">
                                  <span className="text-xs flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {apt.time} ({apt.duration} min)
                                  </span>
                                </div>
                              </div>
                            </div>
                            {apt.meetingLink && (
                              <a
                                href={apt.meetingLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-2 text-xs flex items-center gap-1 text-blue-600 hover:text-blue-700"
                              >
                                <Video className="w-3 h-3" />
                                Join Meeting
                              </a>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Upcoming Appointments */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingAppointments.map((apt) => {
                    const Icon = typeIcons[apt.type] || CalendarIcon;
                    return (
                      <div
                        key={apt.id}
                        className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
                        onClick={() => setSelectedDate(parseISO(apt.date))}
                      >
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${typeColors[apt.type]}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm text-gray-900 truncate">{apt.title}</p>
                          <p className="text-xs text-gray-500">
                            {format(parseISO(apt.date), 'MMM d')} at {apt.time}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Legend */}
            <Card>
              <CardHeader>
                <CardTitle>Appointment Types</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Object.entries(typeColors).map(([type, color]) => {
                    const Icon = typeIcons[type] || CalendarIcon;
                    return (
                      <div key={type} className="flex items-center gap-2">
                        <div className={`w-6 h-6 rounded flex items-center justify-center ${color}`}>
                          <Icon className="w-3 h-3" />
                        </div>
                        <span className="text-sm text-gray-600 capitalize">
                          {type.replace('_', ' ')}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
