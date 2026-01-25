'use client';

import { useState } from 'react';
import {
  CheckSquare,
  Square,
  Clock,
  AlertCircle,
  Plus,
  Filter,
  MoreVertical,
  Calendar,
  User,
  Building2,
} from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { StatusBadge, PriorityBadge } from '@/components/ui/Badge';
import { useStore } from '@/store';
import { Task } from '@/types';
import { format, parseISO, isPast, isToday, isTomorrow } from 'date-fns';

export default function TasksPage() {
  const { tasks, teamMembers, salons, updateTask } = useStore();
  const [filter, setFilter] = useState<'all' | 'pending' | 'in_progress' | 'completed'>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');

  const filteredTasks = tasks.filter((task) => {
    const matchesStatus = filter === 'all' || task.status === filter;
    const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
    return matchesStatus && matchesPriority;
  });

  const getAssigneeName = (id: string) => {
    const member = teamMembers.find((m) => m.id === id);
    return member?.name || 'Unassigned';
  };

  const getSalonName = (id: string | null) => {
    if (!id) return null;
    const salon = salons.find((s) => s.id === id);
    return salon?.name || null;
  };

  const getDueDateLabel = (dateStr: string) => {
    const date = parseISO(dateStr);
    if (isPast(date) && !isToday(date)) return { label: 'Overdue', color: 'text-red-600' };
    if (isToday(date)) return { label: 'Today', color: 'text-orange-600' };
    if (isTomorrow(date)) return { label: 'Tomorrow', color: 'text-yellow-600' };
    return { label: format(date, 'MMM d'), color: 'text-gray-500' };
  };

  const toggleTaskStatus = (task: Task) => {
    const newStatus = task.status === 'completed' ? 'pending' : 'completed';
    updateTask(task.id, {
      status: newStatus,
      completedAt: newStatus === 'completed' ? new Date().toISOString() : null,
    });
  };

  const taskStats = {
    total: tasks.length,
    pending: tasks.filter((t) => t.status === 'pending').length,
    inProgress: tasks.filter((t) => t.status === 'in_progress').length,
    completed: tasks.filter((t) => t.status === 'completed').length,
    overdue: tasks.filter((t) => t.status !== 'completed' && isPast(parseISO(t.dueDate)) && !isToday(parseISO(t.dueDate))).length,
  };

  return (
    <DashboardLayout>
      <Header
        title="Tasks"
        subtitle={`${taskStats.pending + taskStats.inProgress} tasks pending`}
        action={{
          label: 'Add Task',
          onClick: () => console.log('Add task'),
        }}
      />

      <div className="pt-20 px-6 pb-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <Card
            className={`cursor-pointer transition-all ${filter === 'all' ? 'ring-2 ring-pink-500' : ''}`}
            onClick={() => setFilter('all')}
          >
            <CardContent className="p-4">
              <p className="text-xs text-gray-500 uppercase">All Tasks</p>
              <p className="text-2xl font-bold text-gray-900">{taskStats.total}</p>
            </CardContent>
          </Card>
          <Card
            className={`cursor-pointer transition-all ${filter === 'pending' ? 'ring-2 ring-pink-500' : ''}`}
            onClick={() => setFilter('pending')}
          >
            <CardContent className="p-4">
              <p className="text-xs text-gray-500 uppercase">Pending</p>
              <p className="text-2xl font-bold text-gray-900">{taskStats.pending}</p>
            </CardContent>
          </Card>
          <Card
            className={`cursor-pointer transition-all ${filter === 'in_progress' ? 'ring-2 ring-pink-500' : ''}`}
            onClick={() => setFilter('in_progress')}
          >
            <CardContent className="p-4">
              <p className="text-xs text-gray-500 uppercase">In Progress</p>
              <p className="text-2xl font-bold text-blue-600">{taskStats.inProgress}</p>
            </CardContent>
          </Card>
          <Card
            className={`cursor-pointer transition-all ${filter === 'completed' ? 'ring-2 ring-pink-500' : ''}`}
            onClick={() => setFilter('completed')}
          >
            <CardContent className="p-4">
              <p className="text-xs text-gray-500 uppercase">Completed</p>
              <p className="text-2xl font-bold text-green-600">{taskStats.completed}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-gray-500 uppercase">Overdue</p>
              <p className="text-2xl font-bold text-red-600">{taskStats.overdue}</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-6">
          <div className="flex gap-2">
            {['all', 'low', 'medium', 'high', 'urgent'].map((priority) => (
              <button
                key={priority}
                onClick={() => setPriorityFilter(priority)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  priorityFilter === priority
                    ? 'bg-pink-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {priority.charAt(0).toUpperCase() + priority.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Tasks List */}
        <Card>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-100">
              {filteredTasks.length === 0 ? (
                <div className="text-center py-12">
                  <CheckSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No tasks found</p>
                </div>
              ) : (
                filteredTasks.map((task) => {
                  const dueInfo = getDueDateLabel(task.dueDate);
                  const salonName = getSalonName(task.relatedSalonId);
                  const isCompleted = task.status === 'completed';

                  return (
                    <div
                      key={task.id}
                      className={`flex items-start gap-4 p-4 hover:bg-gray-50 transition-colors ${
                        isCompleted ? 'opacity-60' : ''
                      }`}
                    >
                      <button
                        onClick={() => toggleTaskStatus(task)}
                        className="mt-1 flex-shrink-0"
                      >
                        {isCompleted ? (
                          <CheckSquare className="w-5 h-5 text-green-600" />
                        ) : (
                          <Square className="w-5 h-5 text-gray-400 hover:text-pink-600" />
                        )}
                      </button>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className={`font-medium text-gray-900 ${isCompleted ? 'line-through' : ''}`}>
                              {task.title}
                            </p>
                            <p className="text-sm text-gray-500 mt-0.5">{task.description}</p>
                          </div>
                          <PriorityBadge priority={task.priority} />
                        </div>

                        <div className="flex items-center gap-4 mt-3">
                          <span className={`text-sm flex items-center gap-1 ${dueInfo.color}`}>
                            <Calendar className="w-4 h-4" />
                            {dueInfo.label}
                          </span>
                          <span className="text-sm text-gray-500 flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {getAssigneeName(task.assignedTo)}
                          </span>
                          {salonName && (
                            <span className="text-sm text-gray-500 flex items-center gap-1">
                              <Building2 className="w-4 h-4" />
                              {salonName}
                            </span>
                          )}
                          <StatusBadge status={task.status} />
                        </div>
                      </div>

                      <button className="p-2 rounded-lg hover:bg-gray-100 flex-shrink-0">
                        <MoreVertical className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
