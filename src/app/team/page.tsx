'use client';

import { useState } from 'react';
import {
  Users,
  Mail,
  Phone,
  Award,
  TrendingUp,
  Target,
  MoreVertical,
  UserPlus,
} from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { PerformanceChart } from '@/components/dashboard/Charts';
import { useStore } from '@/store';
import { TeamMember } from '@/types';

const roleLabels: Record<string, string> = {
  admin: 'Admin',
  sales_rep: 'Sales Rep',
  account_manager: 'Account Manager',
  support: 'Support',
  onboarding_specialist: 'Onboarding Specialist',
};

const roleColors: Record<string, string> = {
  admin: 'bg-purple-100 text-purple-700',
  sales_rep: 'bg-blue-100 text-blue-700',
  account_manager: 'bg-green-100 text-green-700',
  support: 'bg-yellow-100 text-yellow-700',
  onboarding_specialist: 'bg-pink-100 text-pink-700',
};

const departmentColors: Record<string, string> = {
  sales: 'bg-blue-50',
  operations: 'bg-green-50',
  support: 'bg-yellow-50',
  management: 'bg-purple-50',
};

export default function TeamPage() {
  const { teamMembers, deals, salons, tasks } = useStore();
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  // Calculate team stats
  const totalSales = teamMembers.reduce((sum, m) => sum + m.currentSales, 0);
  const totalTarget = teamMembers.reduce((sum, m) => sum + m.salesTarget, 0);
  const teamPerformance = totalTarget > 0 ? Math.round((totalSales / totalTarget) * 100) : 0;

  // Performance chart data
  const performanceData = teamMembers
    .filter((m) => m.salesTarget > 0)
    .map((m) => ({
      name: m.name.split(' ')[0],
      target: m.salesTarget,
      actual: m.currentSales,
    }));

  const getMemberStats = (member: TeamMember) => {
    const memberDeals = deals.filter((d) => d.assignedTo === member.id);
    const activeSalons = salons.filter((s) => s.status === 'active').length;
    const memberTasks = tasks.filter((t) => t.assignedTo === member.id);
    const completedTasks = memberTasks.filter((t) => t.status === 'completed').length;

    return {
      activeDeals: memberDeals.filter((d) => d.stage !== 'closed_won' && d.stage !== 'closed_lost').length,
      wonDeals: memberDeals.filter((d) => d.stage === 'closed_won').length,
      pipelineValue: memberDeals.reduce((sum, d) => sum + d.value, 0),
      tasksCompleted: completedTasks,
      tasksPending: memberTasks.length - completedTasks,
    };
  };

  return (
    <DashboardLayout>
      <Header
        title="Team"
        subtitle={`${teamMembers.length} team members`}
        action={{
          label: 'Add Member',
          onClick: () => console.log('Add member'),
        }}
      />

      <div className="pt-20 px-6 pb-6">
        {/* Team Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Team Size</p>
                  <p className="text-2xl font-bold text-gray-900">{teamMembers.length}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Sales</p>
                  <p className="text-2xl font-bold text-gray-900">${totalSales.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Team Target</p>
                  <p className="text-2xl font-bold text-gray-900">${totalTarget.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                  <Target className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Performance</p>
                  <p className="text-2xl font-bold text-gray-900">{teamPerformance}%</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center">
                  <Award className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Team Members */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Team Members</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {teamMembers.map((member) => {
                    const stats = getMemberStats(member);
                    const progressPercent = member.salesTarget > 0
                      ? Math.min(100, Math.round((member.currentSales / member.salesTarget) * 100))
                      : 0;

                    return (
                      <div
                        key={member.id}
                        onClick={() => setSelectedMember(member)}
                        className={`p-4 rounded-xl border border-gray-100 hover:border-gray-200 cursor-pointer transition-all ${departmentColors[member.department]}`}
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                            {member.name.charAt(0)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <div>
                                <p className="font-semibold text-gray-900">{member.name}</p>
                                <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full ${roleColors[member.role]}`}>
                                  {roleLabels[member.role]}
                                </span>
                              </div>
                              <button className="p-2 rounded-lg hover:bg-white/50">
                                <MoreVertical className="w-4 h-4 text-gray-400" />
                              </button>
                            </div>

                            <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                              <span className="flex items-center gap-1">
                                <Mail className="w-4 h-4" />
                                {member.email}
                              </span>
                              <span className="flex items-center gap-1">
                                <Phone className="w-4 h-4" />
                                {member.phone}
                              </span>
                            </div>

                            {member.salesTarget > 0 && (
                              <div className="mt-3">
                                <div className="flex items-center justify-between text-sm mb-1">
                                  <span className="text-gray-500">Sales Progress</span>
                                  <span className="font-medium">
                                    ${member.currentSales.toLocaleString()} / ${member.salesTarget.toLocaleString()}
                                  </span>
                                </div>
                                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                  <div
                                    className={`h-full rounded-full ${progressPercent >= 100 ? 'bg-green-500' : 'bg-pink-500'}`}
                                    style={{ width: `${progressPercent}%` }}
                                  />
                                </div>
                              </div>
                            )}

                            <div className="flex gap-4 mt-3">
                              <span className="text-xs text-gray-500">
                                {stats.activeDeals} active deals
                              </span>
                              <span className="text-xs text-gray-500">
                                {stats.tasksCompleted}/{stats.tasksCompleted + stats.tasksPending} tasks
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Performance Chart */}
          <div>
            <PerformanceChart data={performanceData} />

            {/* Departments */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>By Department</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {['sales', 'operations', 'support', 'management'].map((dept) => {
                    const count = teamMembers.filter((m) => m.department === dept).length;
                    return (
                      <div key={dept} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 capitalize">{dept}</span>
                        <span className="text-sm font-medium text-gray-900">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Member Detail Modal */}
      {selectedMember && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-lg">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center text-white font-bold text-2xl">
                    {selectedMember.name.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{selectedMember.name}</h2>
                    <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full ${roleColors[selectedMember.role]}`}>
                      {roleLabels[selectedMember.role]}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedMember(null)}
                  className="p-2 rounded-lg hover:bg-gray-100"
                >
                  <span className="text-xl">&times;</span>
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{selectedMember.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{selectedMember.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Department</p>
                    <p className="font-medium capitalize">{selectedMember.department}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Joined</p>
                    <p className="font-medium">{selectedMember.joinedDate}</p>
                  </div>
                </div>

                {selectedMember.salesTarget > 0 && (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-500">Sales Performance</span>
                      <span className="text-sm font-medium">
                        {Math.round((selectedMember.currentSales / selectedMember.salesTarget) * 100)}%
                      </span>
                    </div>
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-pink-500 rounded-full"
                        style={{ width: `${Math.min(100, (selectedMember.currentSales / selectedMember.salesTarget) * 100)}%` }}
                      />
                    </div>
                    <div className="flex justify-between mt-2 text-sm">
                      <span className="text-gray-500">Current: ${selectedMember.currentSales.toLocaleString()}</span>
                      <span className="text-gray-500">Target: ${selectedMember.salesTarget.toLocaleString()}</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-3 mt-6">
                <Button variant="primary" className="flex-1">
                  Edit Profile
                </Button>
                <Button variant="outline">
                  <Mail className="w-4 h-4 mr-2" />
                  Email
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </DashboardLayout>
  );
}
