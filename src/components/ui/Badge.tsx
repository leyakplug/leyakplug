'use client';

import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'purple';
  size?: 'sm' | 'md';
  className?: string;
}

export function Badge({ children, variant = 'default', size = 'sm', className = '' }: BadgeProps) {
  const variants = {
    default: 'bg-gray-100 text-gray-700',
    success: 'bg-green-100 text-green-700',
    warning: 'bg-yellow-100 text-yellow-700',
    danger: 'bg-red-100 text-red-700',
    info: 'bg-blue-100 text-blue-700',
    purple: 'bg-purple-100 text-purple-700',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
  };

  return (
    <span className={`inline-flex items-center font-medium rounded-full ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </span>
  );
}

// Status-specific badges
export function StatusBadge({ status }: { status: string }) {
  const statusConfig: Record<string, { variant: BadgeProps['variant']; label: string }> = {
    active: { variant: 'success', label: 'Active' },
    onboarding: { variant: 'info', label: 'Onboarding' },
    churned: { variant: 'danger', label: 'Churned' },
    paused: { variant: 'warning', label: 'Paused' },
    prospect: { variant: 'purple', label: 'Prospect' },
    // Lead statuses
    new: { variant: 'info', label: 'New' },
    contacted: { variant: 'default', label: 'Contacted' },
    qualified: { variant: 'purple', label: 'Qualified' },
    proposal_sent: { variant: 'warning', label: 'Proposal Sent' },
    negotiation: { variant: 'info', label: 'Negotiation' },
    won: { variant: 'success', label: 'Won' },
    lost: { variant: 'danger', label: 'Lost' },
    // Deal stages
    discovery: { variant: 'default', label: 'Discovery' },
    demo_scheduled: { variant: 'info', label: 'Demo Scheduled' },
    demo_completed: { variant: 'purple', label: 'Demo Completed' },
    proposal: { variant: 'warning', label: 'Proposal' },
    closed_won: { variant: 'success', label: 'Closed Won' },
    closed_lost: { variant: 'danger', label: 'Closed Lost' },
    // Task statuses
    pending: { variant: 'default', label: 'Pending' },
    in_progress: { variant: 'info', label: 'In Progress' },
    completed: { variant: 'success', label: 'Completed' },
    cancelled: { variant: 'danger', label: 'Cancelled' },
    // Appointment statuses
    scheduled: { variant: 'info', label: 'Scheduled' },
    no_show: { variant: 'danger', label: 'No Show' },
    rescheduled: { variant: 'warning', label: 'Rescheduled' },
  };

  const config = statusConfig[status] || { variant: 'default', label: status };
  return <Badge variant={config.variant}>{config.label}</Badge>;
}

export function TierBadge({ tier }: { tier: string }) {
  const tierConfig: Record<string, { variant: BadgeProps['variant']; label: string }> = {
    starter: { variant: 'default', label: 'Starter' },
    growth: { variant: 'info', label: 'Growth' },
    premium: { variant: 'purple', label: 'Premium' },
    enterprise: { variant: 'success', label: 'Enterprise' },
  };

  const config = tierConfig[tier] || { variant: 'default', label: tier };
  return <Badge variant={config.variant}>{config.label}</Badge>;
}

export function PriorityBadge({ priority }: { priority: string }) {
  const priorityConfig: Record<string, { variant: BadgeProps['variant']; label: string }> = {
    low: { variant: 'default', label: 'Low' },
    medium: { variant: 'info', label: 'Medium' },
    high: { variant: 'warning', label: 'High' },
    urgent: { variant: 'danger', label: 'Urgent' },
  };

  const config = priorityConfig[priority] || { variant: 'default', label: priority };
  return <Badge variant={config.variant}>{config.label}</Badge>;
}
