'use client';

import { useState } from 'react';
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Users,
  Building2,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  RefreshCw,
} from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { RevenueChart, SalonGrowthChart, PipelineChart, PerformanceChart } from '@/components/dashboard/Charts';
import { useStore } from '@/store';

export default function MetricsPage() {
  const { metrics, salons, deals, teamMembers, revenueData, salonGrowthData, pipelineData } = useStore();
  const [timeRange, setTimeRange] = useState('30d');

  const timeRanges = [
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' },
    { value: '12m', label: '12 Months' },
  ];

  // Calculate team performance data
  const performanceData = teamMembers
    .filter((m) => m.salesTarget > 0)
    .map((m) => ({
      name: m.name.split(' ')[0],
      target: m.salesTarget,
      actual: m.currentSales,
    }));

  // Calculate revenue by tier
  const revenueByTier = [
    {
      tier: 'Starter',
      revenue: salons.filter((s) => s.tier === 'starter' && s.status === 'active').reduce((sum, s) => sum + s.monthlyFee, 0),
      count: salons.filter((s) => s.tier === 'starter' && s.status === 'active').length,
    },
    {
      tier: 'Growth',
      revenue: salons.filter((s) => s.tier === 'growth' && s.status === 'active').reduce((sum, s) => sum + s.monthlyFee, 0),
      count: salons.filter((s) => s.tier === 'growth' && s.status === 'active').length,
    },
    {
      tier: 'Premium',
      revenue: salons.filter((s) => s.tier === 'premium' && s.status === 'active').reduce((sum, s) => sum + s.monthlyFee, 0),
      count: salons.filter((s) => s.tier === 'premium' && s.status === 'active').length,
    },
    {
      tier: 'Enterprise',
      revenue: salons.filter((s) => s.tier === 'enterprise' && s.status === 'active').reduce((sum, s) => sum + s.monthlyFee, 0),
      count: salons.filter((s) => s.tier === 'enterprise' && s.status === 'active').length,
    },
  ];

  return (
    <DashboardLayout>
      <Header title="Metrics & Analytics" subtitle="Deep dive into your agency's performance" />

      <div className="pt-20 px-6 pb-6">
        {/* Time Range Filter */}
        <div className="flex justify-end mb-6">
          <div className="bg-gray-100 rounded-lg p-1 flex gap-1">
            {timeRanges.map((range) => (
              <button
                key={range.value}
                onClick={() => setTimeRange(range.value)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  timeRange === range.value ? 'bg-white shadow text-gray-900' : 'text-gray-600'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>

        {/* Key Metrics */}
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
            title="Total Revenue (LTD)"
            value={metrics.totalRevenue}
            prefix="$"
            change={15.3}
            icon={<TrendingUp className="w-6 h-6 text-blue-600" />}
            iconBg="bg-blue-100"
          />
          <MetricCard
            title="Active Salons"
            value={metrics.activeSalons}
            change={12}
            icon={<Building2 className="w-6 h-6 text-pink-600" />}
            iconBg="bg-pink-100"
          />
          <MetricCard
            title="Net Revenue Retention"
            value={metrics.netRevenueRetention}
            suffix="%"
            change={3.5}
            icon={<RefreshCw className="w-6 h-6 text-purple-600" />}
            iconBg="bg-purple-100"
          />
        </div>

        {/* Secondary Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-gray-500 uppercase tracking-wide">Avg Revenue/Salon</p>
              <p className="text-xl font-bold text-gray-900">
                ${metrics.averageRevenuePerSalon.toLocaleString()}
              </p>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <ArrowUpRight className="w-3 h-3" /> +5.2%
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-gray-500 uppercase tracking-wide">Churn Rate</p>
              <p className="text-xl font-bold text-gray-900">{metrics.churnRate}%</p>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <ArrowDownRight className="w-3 h-3" /> -0.8%
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-gray-500 uppercase tracking-wide">Conversion Rate</p>
              <p className="text-xl font-bold text-gray-900">{metrics.conversionRate}%</p>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <ArrowUpRight className="w-3 h-3" /> +2.1%
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-gray-500 uppercase tracking-wide">Avg Deal Size</p>
              <p className="text-xl font-bold text-gray-900">${metrics.averageDealSize.toLocaleString()}</p>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <ArrowUpRight className="w-3 h-3" /> +12%
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-gray-500 uppercase tracking-wide">Pipeline Value</p>
              <p className="text-xl font-bold text-gray-900">${(metrics.salesPipelineValue / 1000).toFixed(1)}k</p>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <ArrowUpRight className="w-3 h-3" /> +18%
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-gray-500 uppercase tracking-wide">Task Completion</p>
              <p className="text-xl font-bold text-gray-900">{metrics.taskCompletionRate}%</p>
              <p className="text-xs text-red-600 flex items-center mt-1">
                <ArrowDownRight className="w-3 h-3" /> -3%
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <RevenueChart data={revenueData} />
          <SalonGrowthChart data={salonGrowthData} />
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <PipelineChart data={pipelineData} />
          <PerformanceChart data={performanceData} />
        </div>

        {/* Revenue by Tier */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Revenue by Tier</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {revenueByTier.map((tier) => (
                <div
                  key={tier.tier}
                  className="p-4 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">{tier.tier}</span>
                    <span className="text-xs text-gray-500">{tier.count} salons</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">${tier.revenue.toLocaleString()}</p>
                  <p className="text-xs text-gray-500 mt-1">Monthly Revenue</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Key Insights */}
        <Card>
          <CardHeader>
            <CardTitle>Key Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-green-900">Strong MRR Growth</h4>
                  <p className="text-sm text-green-700">
                    Monthly recurring revenue increased by 8.2% this month, driven by new enterprise clients and tier upgrades.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-blue-900">High Conversion Pipeline</h4>
                  <p className="text-sm text-blue-700">
                    2 enterprise deals in negotiation stage with 80% probability. Expected close value: $23,976 annual.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
                  <Target className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-yellow-900">Team Performance</h4>
                  <p className="text-sm text-yellow-700">
                    Marcus is at 95% of monthly target. Sarah exceeded quota. Consider redistributing leads for optimal coverage.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
