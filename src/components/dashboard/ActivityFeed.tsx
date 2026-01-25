'use client';

import { format, parseISO, formatDistanceToNow } from 'date-fns';
import {
  Trophy,
  UserPlus,
  Calendar,
  Building2,
  AlertCircle,
  MessageSquare,
  RefreshCw,
  XCircle,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Activity, ActivityType } from '@/types';

const activityIcons: Record<ActivityType, React.ElementType> = {
  deal_won: Trophy,
  deal_lost: XCircle,
  new_lead: UserPlus,
  salon_onboarded: Building2,
  salon_churned: AlertCircle,
  appointment_completed: Calendar,
  note_added: MessageSquare,
  status_changed: RefreshCw,
};

const activityColors: Record<ActivityType, string> = {
  deal_won: 'bg-green-100 text-green-600',
  deal_lost: 'bg-red-100 text-red-600',
  new_lead: 'bg-blue-100 text-blue-600',
  salon_onboarded: 'bg-purple-100 text-purple-600',
  salon_churned: 'bg-red-100 text-red-600',
  appointment_completed: 'bg-cyan-100 text-cyan-600',
  note_added: 'bg-gray-100 text-gray-600',
  status_changed: 'bg-yellow-100 text-yellow-600',
};

interface ActivityFeedProps {
  activities: Activity[];
  limit?: number;
  showHeader?: boolean;
}

export function ActivityFeed({ activities, limit = 5, showHeader = true }: ActivityFeedProps) {
  const displayActivities = activities.slice(0, limit);

  return (
    <Card>
      {showHeader && (
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
      )}
      <CardContent className={showHeader ? '' : 'pt-6'}>
        <div className="space-y-4">
          {displayActivities.map((activity) => {
            const Icon = activityIcons[activity.type];
            const colorClass = activityColors[activity.type];

            return (
              <div key={activity.id} className="flex gap-3">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${colorClass}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                  <p className="text-sm text-gray-500 truncate">{activity.description}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-400">
                      {formatDistanceToNow(parseISO(activity.timestamp), { addSuffix: true })}
                    </span>
                    <span className="text-xs text-gray-300">|</span>
                    <span className="text-xs text-gray-400">{activity.userName}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {activities.length > limit && (
          <button className="w-full mt-4 py-2 text-sm text-pink-600 hover:text-pink-700 font-medium">
            View all activity
          </button>
        )}
      </CardContent>
    </Card>
  );
}

interface ActivityItemProps {
  activity: Activity;
}

export function ActivityItem({ activity }: ActivityItemProps) {
  const Icon = activityIcons[activity.type];
  const colorClass = activityColors[activity.type];

  return (
    <div className="flex gap-3 p-4 hover:bg-gray-50 rounded-lg transition-colors">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${colorClass}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1">
        <div className="flex items-start justify-between">
          <div>
            <p className="font-medium text-gray-900">{activity.title}</p>
            <p className="text-sm text-gray-600 mt-0.5">{activity.description}</p>
          </div>
          <span className="text-xs text-gray-400 whitespace-nowrap">
            {format(parseISO(activity.timestamp), 'MMM d, h:mm a')}
          </span>
        </div>
        <p className="text-xs text-gray-400 mt-2">by {activity.userName}</p>
      </div>
    </div>
  );
}
