'use client';

import { useState } from 'react';
import {
  Building2,
  Search,
  Filter,
  MoreVertical,
  Phone,
  Mail,
  MapPin,
  Zap,
  Eye,
  Edit,
  Trash2,
} from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Header } from '@/components/layout/Header';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { StatusBadge, TierBadge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { useStore } from '@/store';
import { Salon } from '@/types';

export default function SalonsPage() {
  const { salons } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedSalon, setSelectedSalon] = useState<Salon | null>(null);

  const filteredSalons = salons.filter((salon) => {
    const matchesSearch =
      salon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      salon.ownerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      salon.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || salon.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusCounts = {
    all: salons.length,
    active: salons.filter((s) => s.status === 'active').length,
    onboarding: salons.filter((s) => s.status === 'onboarding').length,
    paused: salons.filter((s) => s.status === 'paused').length,
    churned: salons.filter((s) => s.status === 'churned').length,
  };

  return (
    <DashboardLayout>
      <Header
        title="Salons"
        subtitle={`${salons.length} total salons`}
        action={{
          label: 'Add Salon',
          onClick: () => console.log('Add salon'),
        }}
      />

      <div className="pt-20 px-6 pb-6">
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search salons..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
            {Object.entries(statusCounts).map(([status, count]) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  statusFilter === status
                    ? 'bg-pink-600 text-white'
                    : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)} ({count})
              </button>
            ))}
          </div>
        </div>

        {/* Salons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSalons.map((salon) => (
            <Card key={salon.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-pink-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{salon.name}</h3>
                      <p className="text-sm text-gray-500">{salon.ownerName}</p>
                    </div>
                  </div>
                  <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                    <MoreVertical className="w-4 h-4 text-gray-400" />
                  </button>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    {salon.city}, {salon.state}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4 text-gray-400" />
                    {salon.phone}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4 text-gray-400" />
                    {salon.email}
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <StatusBadge status={salon.status} />
                  <TierBadge tier={salon.tier} />
                  {salon.aiAgentActive && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full bg-yellow-100 text-yellow-700">
                      <Zap className="w-3 h-3" />
                      AI Active
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div>
                    <p className="text-xs text-gray-500">Monthly Fee</p>
                    <p className="text-lg font-bold text-gray-900">${salon.monthlyFee}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedSalon(salon)}
                      className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-lg bg-pink-100 text-pink-600 hover:bg-pink-200 transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredSalons.length === 0 && (
          <div className="text-center py-12">
            <Building2 className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No salons found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Salon Detail Modal */}
      {selectedSalon && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center">
                    <Building2 className="w-8 h-8 text-pink-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{selectedSalon.name}</h2>
                    <p className="text-gray-500">{selectedSalon.ownerName}</p>
                    <div className="flex gap-2 mt-2">
                      <StatusBadge status={selectedSalon.status} />
                      <TierBadge tier={selectedSalon.tier} />
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedSalon(null)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <span className="text-xl">&times;</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Contact Information</h3>
                  <div className="space-y-2">
                    <p className="text-sm"><span className="text-gray-500">Email:</span> {selectedSalon.email}</p>
                    <p className="text-sm"><span className="text-gray-500">Phone:</span> {selectedSalon.phone}</p>
                    <p className="text-sm"><span className="text-gray-500">Address:</span> {selectedSalon.address}</p>
                    <p className="text-sm"><span className="text-gray-500">City:</span> {selectedSalon.city}, {selectedSalon.state} {selectedSalon.zipCode}</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Business Details</h3>
                  <div className="space-y-2">
                    <p className="text-sm"><span className="text-gray-500">Monthly Fee:</span> ${selectedSalon.monthlyFee}</p>
                    <p className="text-sm"><span className="text-gray-500">Employees:</span> {selectedSalon.employeeCount}</p>
                    <p className="text-sm"><span className="text-gray-500">Avg Revenue:</span> ${selectedSalon.averageMonthlyRevenue.toLocaleString()}</p>
                    <p className="text-sm"><span className="text-gray-500">Joined:</span> {selectedSalon.joinedDate}</p>
                  </div>
                </div>
              </div>

              {selectedSalon.aiAgentActive && (
                <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-4 mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-5 h-5 text-yellow-500" />
                    <h3 className="font-semibold text-gray-900">AI Agent: {selectedSalon.aiAgentName}</h3>
                  </div>
                  <p className="text-sm text-gray-600">AI agent is active and handling customer inquiries</p>
                </div>
              )}

              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Services</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedSalon.services.map((service) => (
                    <span key={service} className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">
                      {service}
                    </span>
                  ))}
                </div>
              </div>

              {selectedSalon.notes && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Notes</h3>
                  <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">{selectedSalon.notes}</p>
                </div>
              )}

              <div className="flex gap-3 pt-4 border-t border-gray-100">
                <Button variant="primary" className="flex-1">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Salon
                </Button>
                <Button variant="outline">
                  <Phone className="w-4 h-4 mr-2" />
                  Contact
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </DashboardLayout>
  );
}
