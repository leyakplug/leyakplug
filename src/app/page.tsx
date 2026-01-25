'use client';

import {
  Building2,
  DollarSign,
  TrendingUp,
  Users,
  Calendar,
  Target,
  Zap,
  Award,
} from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Header } from '@/components/layout/Header';
import { MetricCard, MiniMetric } from '@/components/dashboard/MetricCard';
import { RevenueChart, SalonGrowthChart, PipelineChart, TierDistributionChart } from '@/components/dashboard/Charts';
import { ActivityFeed } from '@/components/dashboard/ActivityFeed';
import { UpcomingAppointments } from '@/components/dashboard/UpcomingAppointments';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { useStore } from '@/store';

export default function Dashboard() {
  const {
    metrics,
    salons,
    activities,
    appointments,
    revenueData,
    salonGrowthData,
    pipelineData,
  } = useStore();

  // Calculate tier distribution
  const tierDistribution = [
    { name: 'Starter', value: salons.filter((s) => s.tier === 'starter').length, color: '#9ca3af' },
    { name: 'Growth', value: salons.filter((s) => s.tier === 'growth').length, color: '#06b6d4' },
    { name: 'Premium', value: salons.filter((s) => s.tier === 'premium').length, color: '#8b5cf6' },
    { name: 'Enterprise', value: salons.filter((s) => s.tier === 'enterprise').length, color: '#10b981' },
  ];

  return (
    <DashboardLayout>
      <Header
        title="Dashboard"
        subtitle="Welcome back! Here's what's happening with your agency."
      />

      <div className="pt-20 px-6 pb-6">
        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <MetricCard
            title="Monthly Recurring Revenue"
            value={metrics.monthlyRecurringRevenue}
            prefix="$"
            change={8.2}
            icon={<DollarSign className="w-6 h-6 text-green-600" />}
            iconBg="bg-green-100"
          />
          <MetricCard
            title="Active Salons"
            value={metrics.activeSalons}
            change={12}
            icon={<Building2 className="w-6 h-6 text-pink-600" />}
            iconBg="bg-pink-100"
          />
          <MetricCard
            title="Sales Pipeline"
            value={metrics.salesPipelineValue}
            prefix="$"
            change={15.5}
            icon={<TrendingUp className="w-6 h-6 text-purple-600" />}
            iconBg="bg-purple-100"
          />
          <MetricCard
            title="Conversion Rate"
            value={metrics.conversionRate}
            suffix="%"
            change={3.2}
            icon={<Target className="w-6 h-6 text-blue-600" />}
            iconBg="bg-blue-100"
          />
        </div>

        {/* Secondary Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
          <MiniMetric label="Total Revenue" value={`$${(metrics.totalRevenue / 1000).toFixed(0)}k`} color="green" />
          <MiniMetric label="Avg Deal Size" value={`$${metrics.averageDealSize.toLocaleString()}`} color="purple" />
          <MiniMetric label="Churn Rate" value={`${metrics.churnRate}%`} color="red" />
          <MiniMetric label="NRR" value={`${metrics.netRevenueRetention}%`} color="blue" />
          <MiniMetric label="Total Leads" value={metrics.totalLeads} color="yellow" />
          <MiniMetric label="Appointments" value={metrics.appointmentsThisWeek} color="gray" />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <RevenueChart data={revenueData} />
          <SalonGrowthChart data={salonGrowthData} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <PipelineChart data={pipelineData} />
          <TierDistributionChart data={tierDistribution} />

          {/* AI Agent Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-500" />
                AI Agents Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600">Active Agents</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {salons.filter((s) => s.aiAgentActive).length}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-xs text-blue-600 font-medium">Conversations</p>
                    <p className="text-lg font-bold text-blue-900">2,847</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-xs text-green-600 font-medium">Bookings Made</p>
                    <p className="text-lg font-bold text-green-900">412</p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <p className="text-xs text-purple-600 font-medium">Avg Response</p>
                    <p className="text-lg font-bold text-purple-900">1.2s</p>
                  </div>
                  <div className="p-3 bg-yellow-50 rounded-lg">
                    <p className="text-xs text-yellow-600 font-medium">Satisfaction</p>
                    <p className="text-lg font-bold text-yellow-900">4.8/5</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ActivityFeed activities={activities} limit={6} />
          </div>
          <div className="space-y-6">
            <UpcomingAppointments appointments={appointments} limit={4} />
            <QuickActions />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
