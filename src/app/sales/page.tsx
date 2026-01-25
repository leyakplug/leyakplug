'use client';

import { useState, useMemo } from 'react';
import {
  DollarSign,
  TrendingUp,
  Target,
  Calendar,
  MoreVertical,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { TierBadge } from '@/components/ui/Badge';
import { useStore } from '@/store';
import { Deal, DealStage } from '@/types';
import { format, parseISO } from 'date-fns';

const stageOrder: DealStage[] = [
  'discovery',
  'demo_scheduled',
  'demo_completed',
  'proposal',
  'negotiation',
  'closed_won',
  'closed_lost',
];

const stageLabels: Record<DealStage, string> = {
  discovery: 'Discovery',
  demo_scheduled: 'Demo Scheduled',
  demo_completed: 'Demo Completed',
  proposal: 'Proposal',
  negotiation: 'Negotiation',
  closed_won: 'Closed Won',
  closed_lost: 'Closed Lost',
};

const stageColors: Record<DealStage, string> = {
  discovery: 'bg-gray-100 border-gray-300',
  demo_scheduled: 'bg-blue-50 border-blue-300',
  demo_completed: 'bg-purple-50 border-purple-300',
  proposal: 'bg-yellow-50 border-yellow-300',
  negotiation: 'bg-orange-50 border-orange-300',
  closed_won: 'bg-green-50 border-green-300',
  closed_lost: 'bg-red-50 border-red-300',
};

export default function SalesPage() {
  const { deals, teamMembers, metrics, updateDeal } = useStore();
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [draggedDeal, setDraggedDeal] = useState<Deal | null>(null);

  const activeStages = stageOrder.filter((s) => s !== 'closed_won' && s !== 'closed_lost');

  const dealsByStage = useMemo(() => {
    const grouped: Record<DealStage, Deal[]> = {
      discovery: [],
      demo_scheduled: [],
      demo_completed: [],
      proposal: [],
      negotiation: [],
      closed_won: [],
      closed_lost: [],
    };
    deals.forEach((deal) => {
      grouped[deal.stage].push(deal);
    });
    return grouped;
  }, [deals]);

  const pipelineValue = useMemo(() => {
    return deals
      .filter((d) => d.stage !== 'closed_won' && d.stage !== 'closed_lost')
      .reduce((sum, d) => sum + d.value * (d.probability / 100), 0);
  }, [deals]);

  const getAssigneeName = (id: string) => {
    const member = teamMembers.find((m) => m.id === id);
    return member?.name || 'Unassigned';
  };

  const handleDragStart = (deal: Deal) => {
    setDraggedDeal(deal);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (stage: DealStage) => {
    if (draggedDeal && draggedDeal.stage !== stage) {
      updateDeal(draggedDeal.id, { stage, updatedAt: new Date().toISOString() });
    }
    setDraggedDeal(null);
  };

  return (
    <DashboardLayout>
      <Header
        title="Sales Pipeline"
        subtitle="Track and manage your deals"
        action={{
          label: 'Add Deal',
          onClick: () => console.log('Add deal'),
        }}
      />

      <div className="pt-20 px-6 pb-6">
        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Pipeline Value</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ${pipelineValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Active Deals</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {deals.filter((d) => d.stage !== 'closed_won' && d.stage !== 'closed_lost').length}
                  </p>
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
                  <p className="text-sm text-gray-500">Avg Deal Size</p>
                  <p className="text-2xl font-bold text-gray-900">${metrics.averageDealSize.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Win Rate</p>
                  <p className="text-2xl font-bold text-gray-900">{metrics.conversionRate}%</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center">
                  <ArrowUpRight className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* View Toggle */}
        <div className="flex justify-end mb-4">
          <div className="bg-gray-100 rounded-lg p-1 flex gap-1">
            <button
              onClick={() => setViewMode('kanban')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'kanban' ? 'bg-white shadow text-gray-900' : 'text-gray-600'
              }`}
            >
              Kanban
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'list' ? 'bg-white shadow text-gray-900' : 'text-gray-600'
              }`}
            >
              List
            </button>
          </div>
        </div>

        {/* Kanban View */}
        {viewMode === 'kanban' && (
          <div className="flex gap-4 overflow-x-auto pb-4">
            {activeStages.map((stage) => (
              <div
                key={stage}
                className="flex-shrink-0 w-80"
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(stage)}
              >
                <div className={`rounded-xl border-2 ${stageColors[stage]} p-4`}>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900">{stageLabels[stage]}</h3>
                      <p className="text-sm text-gray-500">
                        {dealsByStage[stage].length} deals · $
                        {dealsByStage[stage].reduce((sum, d) => sum + d.value, 0).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {dealsByStage[stage].map((deal) => (
                      <div
                        key={deal.id}
                        draggable
                        onDragStart={() => handleDragStart(deal)}
                        onClick={() => setSelectedDeal(deal)}
                        className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="font-medium text-gray-900">{deal.salonName}</p>
                            <p className="text-sm text-gray-500">{deal.contactName}</p>
                          </div>
                          <TierBadge tier={deal.tier} />
                        </div>

                        <div className="flex items-center justify-between mt-3">
                          <span className="text-lg font-bold text-gray-900">
                            ${deal.value.toLocaleString()}
                          </span>
                          <span className="text-sm text-gray-500">{deal.probability}%</span>
                        </div>

                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                          <span className="text-xs text-gray-500">
                            Close: {format(parseISO(deal.expectedCloseDate), 'MMM d')}
                          </span>
                          <span className="text-xs text-gray-500">
                            {getAssigneeName(deal.assignedTo)}
                          </span>
                        </div>
                      </div>
                    ))}

                    {dealsByStage[stage].length === 0 && (
                      <div className="text-center py-8 text-gray-400 text-sm">
                        No deals in this stage
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* List View */}
        {viewMode === 'list' && (
          <Card>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                      Deal
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                      Stage
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                      Value
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                      Probability
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                      Close Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                      Owner
                    </th>
                    <th className="px-6 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {deals.map((deal) => (
                    <tr
                      key={deal.id}
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => setSelectedDeal(deal)}
                    >
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-900">{deal.salonName}</p>
                          <p className="text-sm text-gray-500">{deal.contactName}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${stageColors[deal.stage].replace('bg-', 'bg-').replace('border-', 'text-')}`}
                        >
                          {stageLabels[deal.stage]}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900">
                        ${deal.value.toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-pink-500 rounded-full"
                              style={{ width: `${deal.probability}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-600">{deal.probability}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {format(parseISO(deal.expectedCloseDate), 'MMM d, yyyy')}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {getAssigneeName(deal.assignedTo)}
                      </td>
                      <td className="px-6 py-4">
                        <button className="p-2 rounded-lg hover:bg-gray-100">
                          <MoreVertical className="w-4 h-4 text-gray-400" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>

      {/* Deal Detail Modal */}
      {selectedDeal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-lg">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{selectedDeal.salonName}</h2>
                  <p className="text-gray-500">{selectedDeal.contactName}</p>
                </div>
                <button
                  onClick={() => setSelectedDeal(null)}
                  className="p-2 rounded-lg hover:bg-gray-100"
                >
                  <span className="text-xl">&times;</span>
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Deal Value</span>
                  <span className="text-2xl font-bold text-gray-900">
                    ${selectedDeal.value.toLocaleString()}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Stage</p>
                    <p className="font-medium">{stageLabels[selectedDeal.stage]}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Probability</p>
                    <p className="font-medium">{selectedDeal.probability}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Expected Close</p>
                    <p className="font-medium">
                      {format(parseISO(selectedDeal.expectedCloseDate), 'MMM d, yyyy')}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Tier</p>
                    <TierBadge tier={selectedDeal.tier} />
                  </div>
                </div>
              </div>

              {selectedDeal.notes && (
                <div className="mb-6">
                  <p className="text-sm text-gray-500 mb-1">Notes</p>
                  <p className="text-sm bg-gray-50 p-3 rounded-lg">{selectedDeal.notes}</p>
                </div>
              )}

              <div className="flex gap-3">
                <Button variant="primary" className="flex-1">
                  Update Deal
                </Button>
                <Button variant="outline">Schedule Call</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </DashboardLayout>
  );
}
