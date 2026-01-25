'use client';

import { useState } from 'react';
import {
  Users,
  Search,
  Phone,
  Mail,
  Calendar,
  Tag,
  MoreVertical,
  ArrowRight,
  UserPlus,
} from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { StatusBadge, Badge } from '@/components/ui/Badge';
import { DataTable } from '@/components/dashboard/DataTable';
import { useStore } from '@/store';
import { Lead } from '@/types';
import { format, parseISO } from 'date-fns';

const sourceLabels: Record<string, string> = {
  website: 'Website',
  referral: 'Referral',
  social_media: 'Social Media',
  cold_outreach: 'Cold Outreach',
  event: 'Event',
  partner: 'Partner',
};

const sourceColors: Record<string, string> = {
  website: 'bg-blue-100 text-blue-700',
  referral: 'bg-green-100 text-green-700',
  social_media: 'bg-purple-100 text-purple-700',
  cold_outreach: 'bg-orange-100 text-orange-700',
  event: 'bg-pink-100 text-pink-700',
  partner: 'bg-cyan-100 text-cyan-700',
};

export default function LeadsPage() {
  const { leads, teamMembers } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.salonName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusCounts = {
    all: leads.length,
    new: leads.filter((l) => l.status === 'new').length,
    contacted: leads.filter((l) => l.status === 'contacted').length,
    qualified: leads.filter((l) => l.status === 'qualified').length,
    proposal_sent: leads.filter((l) => l.status === 'proposal_sent').length,
    negotiation: leads.filter((l) => l.status === 'negotiation').length,
  };

  const getAssigneeName = (id: string) => {
    const member = teamMembers.find((m) => m.id === id);
    return member?.name || 'Unassigned';
  };

  const columns = [
    {
      key: 'salonName',
      header: 'Salon',
      render: (lead: Lead) => (
        <div>
          <p className="font-medium text-gray-900">{lead.salonName}</p>
          <p className="text-sm text-gray-500">{lead.contactName}</p>
        </div>
      ),
    },
    {
      key: 'contact',
      header: 'Contact',
      render: (lead: Lead) => (
        <div className="space-y-1">
          <p className="text-sm flex items-center gap-1">
            <Mail className="w-3 h-3 text-gray-400" />
            {lead.email}
          </p>
          <p className="text-sm flex items-center gap-1">
            <Phone className="w-3 h-3 text-gray-400" />
            {lead.phone}
          </p>
        </div>
      ),
    },
    {
      key: 'source',
      header: 'Source',
      render: (lead: Lead) => (
        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${sourceColors[lead.source]}`}>
          {sourceLabels[lead.source]}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (lead: Lead) => <StatusBadge status={lead.status} />,
    },
    {
      key: 'value',
      header: 'Est. Value',
      render: (lead: Lead) => (
        <span className="font-medium text-gray-900">${lead.estimatedValue}/mo</span>
      ),
    },
    {
      key: 'assignedTo',
      header: 'Assigned To',
      render: (lead: Lead) => (
        <span className="text-sm text-gray-600">{getAssigneeName(lead.assignedTo)}</span>
      ),
    },
    {
      key: 'nextFollowUp',
      header: 'Next Follow-up',
      render: (lead: Lead) => (
        <span className="text-sm text-gray-600">
          {lead.nextFollowUp ? format(parseISO(lead.nextFollowUp), 'MMM d, yyyy') : '-'}
        </span>
      ),
    },
    {
      key: 'actions',
      header: '',
      render: (lead: Lead) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSelectedLead(lead);
          }}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <MoreVertical className="w-4 h-4 text-gray-400" />
        </button>
      ),
    },
  ];

  return (
    <DashboardLayout>
      <Header
        title="Leads"
        subtitle={`${leads.length} total leads`}
        action={{
          label: 'Add Lead',
          onClick: () => console.log('Add lead'),
        }}
      />

      <div className="pt-20 px-6 pb-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
          {Object.entries(statusCounts).map(([status, count]) => (
            <Card
              key={status}
              className={`cursor-pointer transition-all ${
                statusFilter === status ? 'ring-2 ring-pink-500' : ''
              }`}
              onClick={() => setStatusFilter(status)}
            >
              <CardContent className="p-4">
                <p className="text-xs text-gray-500 uppercase tracking-wide">
                  {status.replace('_', ' ')}
                </p>
                <p className="text-2xl font-bold text-gray-900">{count}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search */}
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search leads..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
        </div>

        {/* Leads Table */}
        <DataTable
          columns={columns}
          data={filteredLeads}
          onRowClick={(lead) => setSelectedLead(lead)}
          emptyMessage="No leads found"
        />
      </div>

      {/* Lead Detail Modal */}
      {selectedLead && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{selectedLead.salonName}</h2>
                  <p className="text-gray-500">{selectedLead.contactName}</p>
                  <div className="flex gap-2 mt-2">
                    <StatusBadge status={selectedLead.status} />
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${sourceColors[selectedLead.source]}`}>
                      {sourceLabels[selectedLead.source]}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedLead(null)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <span className="text-xl">&times;</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Contact Information</h3>
                  <div className="space-y-2">
                    <p className="text-sm flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      {selectedLead.email}
                    </p>
                    <p className="text-sm flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      {selectedLead.phone}
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Lead Details</h3>
                  <div className="space-y-2">
                    <p className="text-sm">
                      <span className="text-gray-500">Estimated Value:</span>{' '}
                      <span className="font-medium">${selectedLead.estimatedValue}/mo</span>
                    </p>
                    <p className="text-sm">
                      <span className="text-gray-500">Assigned To:</span>{' '}
                      {getAssigneeName(selectedLead.assignedTo)}
                    </p>
                    <p className="text-sm">
                      <span className="text-gray-500">Created:</span>{' '}
                      {format(parseISO(selectedLead.createdAt), 'MMM d, yyyy')}
                    </p>
                    {selectedLead.nextFollowUp && (
                      <p className="text-sm">
                        <span className="text-gray-500">Next Follow-up:</span>{' '}
                        {format(parseISO(selectedLead.nextFollowUp), 'MMM d, yyyy')}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {selectedLead.tags.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedLead.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {selectedLead.notes && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Notes</h3>
                  <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">{selectedLead.notes}</p>
                </div>
              )}

              <div className="flex gap-3 pt-4 border-t border-gray-100">
                <Button variant="primary" className="flex-1">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Convert to Deal
                </Button>
                <Button variant="outline">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Call
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </DashboardLayout>
  );
}
