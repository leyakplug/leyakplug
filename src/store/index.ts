import { create } from 'zustand';
import {
  Salon, Lead, Deal, Appointment, TeamMember, Task, Activity,
  DashboardMetrics, RevenueData, SalonGrowthData, SalesPipelineData
} from '@/types';

// ============ MOCK DATA ============

const mockTeamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    email: 'sarah@leyakplug.com',
    role: 'admin',
    avatar: '/avatars/sarah.jpg',
    phone: '(555) 123-4567',
    department: 'management',
    status: 'active',
    joinedDate: '2024-01-15',
    salesTarget: 50000,
    currentSales: 42500,
  },
  {
    id: '2',
    name: 'Marcus Johnson',
    email: 'marcus@leyakplug.com',
    role: 'sales_rep',
    avatar: '/avatars/marcus.jpg',
    phone: '(555) 234-5678',
    department: 'sales',
    status: 'active',
    joinedDate: '2024-03-01',
    salesTarget: 40000,
    currentSales: 38000,
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    email: 'emily@leyakplug.com',
    role: 'account_manager',
    avatar: '/avatars/emily.jpg',
    phone: '(555) 345-6789',
    department: 'operations',
    status: 'active',
    joinedDate: '2024-02-10',
    salesTarget: 35000,
    currentSales: 31000,
  },
  {
    id: '4',
    name: 'David Kim',
    email: 'david@leyakplug.com',
    role: 'onboarding_specialist',
    avatar: '/avatars/david.jpg',
    phone: '(555) 456-7890',
    department: 'operations',
    status: 'active',
    joinedDate: '2024-04-15',
    salesTarget: 0,
    currentSales: 0,
  },
  {
    id: '5',
    name: 'Jessica Taylor',
    email: 'jessica@leyakplug.com',
    role: 'support',
    avatar: '/avatars/jessica.jpg',
    phone: '(555) 567-8901',
    department: 'support',
    status: 'active',
    joinedDate: '2024-05-01',
    salesTarget: 0,
    currentSales: 0,
  },
];

const mockSalons: Salon[] = [
  {
    id: 's1',
    name: 'Glamour Nails Studio',
    ownerName: 'Maria Santos',
    email: 'maria@glamournails.com',
    phone: '(555) 111-2222',
    address: '123 Beauty Lane',
    city: 'Los Angeles',
    state: 'CA',
    zipCode: '90001',
    status: 'active',
    tier: 'premium',
    monthlyFee: 499,
    aiAgentActive: true,
    aiAgentName: 'Bella',
    joinedDate: '2024-06-15',
    lastContact: '2025-01-20',
    notes: 'VIP client, very satisfied with AI agent performance',
    services: ['Manicure', 'Pedicure', 'Nail Art', 'Gel Extensions'],
    employeeCount: 8,
    averageMonthlyRevenue: 45000,
  },
  {
    id: 's2',
    name: 'Luxe Beauty Bar',
    ownerName: 'Jennifer Wu',
    email: 'jennifer@luxebeauty.com',
    phone: '(555) 222-3333',
    address: '456 Spa Street',
    city: 'Miami',
    state: 'FL',
    zipCode: '33101',
    status: 'active',
    tier: 'enterprise',
    monthlyFee: 999,
    aiAgentActive: true,
    aiAgentName: 'Luna',
    joinedDate: '2024-04-01',
    lastContact: '2025-01-22',
    notes: 'Multi-location salon chain, considering expansion',
    services: ['Full Service Salon', 'Nails', 'Hair', 'Makeup', 'Facials'],
    employeeCount: 25,
    averageMonthlyRevenue: 120000,
  },
  {
    id: 's3',
    name: 'Polished Perfection',
    ownerName: 'Ashley Brown',
    email: 'ashley@polishedperfection.com',
    phone: '(555) 333-4444',
    address: '789 Nail Avenue',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    status: 'active',
    tier: 'growth',
    monthlyFee: 299,
    aiAgentActive: true,
    aiAgentName: 'Sophie',
    joinedDate: '2024-08-20',
    lastContact: '2025-01-18',
    notes: 'Growing fast, interested in upgrading tier',
    services: ['Manicure', 'Pedicure', 'Dip Powder'],
    employeeCount: 5,
    averageMonthlyRevenue: 28000,
  },
  {
    id: 's4',
    name: 'Nail Paradise',
    ownerName: 'Tiffany Nguyen',
    email: 'tiffany@nailparadise.com',
    phone: '(555) 444-5555',
    address: '321 Glam Road',
    city: 'Houston',
    state: 'TX',
    zipCode: '77001',
    status: 'onboarding',
    tier: 'starter',
    monthlyFee: 149,
    aiAgentActive: false,
    aiAgentName: 'Mia',
    joinedDate: '2025-01-10',
    lastContact: '2025-01-23',
    notes: 'New client, onboarding in progress',
    services: ['Basic Manicure', 'Basic Pedicure'],
    employeeCount: 3,
    averageMonthlyRevenue: 15000,
  },
  {
    id: 's5',
    name: 'Divine Nails Spa',
    ownerName: 'Christina Lee',
    email: 'christina@divinenails.com',
    phone: '(555) 555-6666',
    address: '654 Elegance Blvd',
    city: 'Chicago',
    state: 'IL',
    zipCode: '60601',
    status: 'active',
    tier: 'premium',
    monthlyFee: 499,
    aiAgentActive: true,
    aiAgentName: 'Grace',
    joinedDate: '2024-05-12',
    lastContact: '2025-01-21',
    notes: 'Excellent retention, refers other salons',
    services: ['Luxury Manicure', 'Spa Pedicure', 'Nail Art', 'Waxing'],
    employeeCount: 10,
    averageMonthlyRevenue: 55000,
  },
  {
    id: 's6',
    name: 'Velvet Touch Salon',
    ownerName: 'Amanda White',
    email: 'amanda@velvettouch.com',
    phone: '(555) 666-7777',
    address: '987 Style Street',
    city: 'Phoenix',
    state: 'AZ',
    zipCode: '85001',
    status: 'paused',
    tier: 'growth',
    monthlyFee: 299,
    aiAgentActive: false,
    aiAgentName: 'Ruby',
    joinedDate: '2024-07-01',
    lastContact: '2025-01-05',
    notes: 'Temporarily paused due to renovation',
    services: ['Manicure', 'Pedicure', 'Acrylics'],
    employeeCount: 6,
    averageMonthlyRevenue: 32000,
  },
  {
    id: 's7',
    name: 'Serenity Nails',
    ownerName: 'Rachel Green',
    email: 'rachel@serenitynails.com',
    phone: '(555) 777-8888',
    address: '147 Peace Lane',
    city: 'Seattle',
    state: 'WA',
    zipCode: '98101',
    status: 'churned',
    tier: 'starter',
    monthlyFee: 0,
    aiAgentActive: false,
    aiAgentName: 'Ivy',
    joinedDate: '2024-03-15',
    lastContact: '2024-11-30',
    notes: 'Churned - budget constraints. May return in Q2',
    services: ['Manicure', 'Pedicure'],
    employeeCount: 4,
    averageMonthlyRevenue: 18000,
  },
];

const mockLeads: Lead[] = [
  {
    id: 'l1',
    salonName: 'Bliss Nail Lounge',
    contactName: 'Natalie Foster',
    email: 'natalie@blissnails.com',
    phone: '(555) 888-9999',
    source: 'website',
    status: 'qualified',
    assignedTo: '2',
    notes: 'Very interested in AI booking system',
    createdAt: '2025-01-15',
    lastContactedAt: '2025-01-22',
    estimatedValue: 499,
    nextFollowUp: '2025-01-28',
    tags: ['hot lead', 'premium potential'],
  },
  {
    id: 'l2',
    salonName: 'Elegant Nails & Spa',
    contactName: 'Victoria Adams',
    email: 'victoria@elegantnails.com',
    phone: '(555) 999-0000',
    source: 'referral',
    status: 'proposal_sent',
    assignedTo: '2',
    notes: 'Referred by Glamour Nails Studio',
    createdAt: '2025-01-10',
    lastContactedAt: '2025-01-20',
    estimatedValue: 999,
    nextFollowUp: '2025-01-25',
    tags: ['referral', 'enterprise potential', 'multi-location'],
  },
  {
    id: 'l3',
    salonName: 'Pretty Nails NYC',
    contactName: 'Sophie Martinez',
    email: 'sophie@prettynails.com',
    phone: '(555) 000-1111',
    source: 'social_media',
    status: 'new',
    assignedTo: '3',
    notes: 'Found us on Instagram',
    createdAt: '2025-01-23',
    lastContactedAt: '2025-01-23',
    estimatedValue: 299,
    nextFollowUp: '2025-01-26',
    tags: ['social media', 'small salon'],
  },
  {
    id: 'l4',
    salonName: 'Chic Beauty Studio',
    contactName: 'Lauren Davis',
    email: 'lauren@chicbeauty.com',
    phone: '(555) 111-0000',
    source: 'cold_outreach',
    status: 'contacted',
    assignedTo: '2',
    notes: 'Responded positively to cold email',
    createdAt: '2025-01-18',
    lastContactedAt: '2025-01-21',
    estimatedValue: 499,
    nextFollowUp: '2025-01-27',
    tags: ['cold outreach', 'interested'],
  },
  {
    id: 'l5',
    salonName: 'Royal Nails Academy',
    contactName: 'Diana Thompson',
    email: 'diana@royalnails.com',
    phone: '(555) 222-1111',
    source: 'event',
    status: 'negotiation',
    assignedTo: '1',
    notes: 'Met at Beauty Expo 2025, very engaged',
    createdAt: '2025-01-05',
    lastContactedAt: '2025-01-24',
    estimatedValue: 999,
    nextFollowUp: '2025-01-26',
    tags: ['event lead', 'enterprise', 'training school'],
  },
];

const mockDeals: Deal[] = [
  {
    id: 'd1',
    leadId: 'l2',
    salonName: 'Elegant Nails & Spa',
    contactName: 'Victoria Adams',
    value: 11988,
    stage: 'proposal',
    probability: 60,
    expectedCloseDate: '2025-02-15',
    assignedTo: '2',
    createdAt: '2025-01-12',
    updatedAt: '2025-01-22',
    notes: 'Enterprise deal, annual contract',
    tier: 'enterprise',
  },
  {
    id: 'd2',
    leadId: 'l5',
    salonName: 'Royal Nails Academy',
    contactName: 'Diana Thompson',
    value: 11988,
    stage: 'negotiation',
    probability: 80,
    expectedCloseDate: '2025-01-31',
    assignedTo: '1',
    createdAt: '2025-01-08',
    updatedAt: '2025-01-24',
    notes: 'Negotiating multi-year deal',
    tier: 'enterprise',
  },
  {
    id: 'd3',
    leadId: 'l1',
    salonName: 'Bliss Nail Lounge',
    contactName: 'Natalie Foster',
    value: 5988,
    stage: 'demo_completed',
    probability: 40,
    expectedCloseDate: '2025-02-28',
    assignedTo: '2',
    createdAt: '2025-01-16',
    updatedAt: '2025-01-23',
    notes: 'Demo went well, following up on questions',
    tier: 'premium',
  },
  {
    id: 'd4',
    leadId: '',
    salonName: 'Crystal Nails Atlanta',
    contactName: 'Michelle Park',
    value: 3588,
    stage: 'discovery',
    probability: 20,
    expectedCloseDate: '2025-03-15',
    assignedTo: '3',
    createdAt: '2025-01-20',
    updatedAt: '2025-01-20',
    notes: 'Initial discovery call scheduled',
    tier: 'growth',
  },
  {
    id: 'd5',
    leadId: '',
    salonName: 'Sunshine Beauty Bar',
    contactName: 'Kelly Wong',
    value: 1788,
    stage: 'demo_scheduled',
    probability: 30,
    expectedCloseDate: '2025-02-20',
    assignedTo: '2',
    createdAt: '2025-01-19',
    updatedAt: '2025-01-21',
    notes: 'Demo scheduled for next week',
    tier: 'starter',
  },
];

const mockAppointments: Appointment[] = [
  {
    id: 'a1',
    title: 'Product Demo - Bliss Nail Lounge',
    type: 'demo',
    salonId: null,
    salonName: 'Bliss Nail Lounge',
    contactName: 'Natalie Foster',
    assignedTo: '2',
    date: '2025-01-27',
    time: '10:00',
    duration: 45,
    status: 'scheduled',
    notes: 'Focus on booking automation features',
    meetingLink: 'https://meet.google.com/abc-defg-hij',
  },
  {
    id: 'a2',
    title: 'Onboarding Session - Nail Paradise',
    type: 'onboarding',
    salonId: 's4',
    salonName: 'Nail Paradise',
    contactName: 'Tiffany Nguyen',
    assignedTo: '4',
    date: '2025-01-26',
    time: '14:00',
    duration: 60,
    status: 'scheduled',
    notes: 'Second onboarding session - AI agent setup',
    meetingLink: 'https://meet.google.com/klm-nopq-rst',
  },
  {
    id: 'a3',
    title: 'Quarterly Review - Luxe Beauty Bar',
    type: 'review',
    salonId: 's2',
    salonName: 'Luxe Beauty Bar',
    contactName: 'Jennifer Wu',
    assignedTo: '3',
    date: '2025-01-28',
    time: '11:00',
    duration: 30,
    status: 'scheduled',
    notes: 'Q4 performance review and Q1 goals',
    meetingLink: 'https://meet.google.com/uvw-xyz-123',
  },
  {
    id: 'a4',
    title: 'Support Call - Divine Nails Spa',
    type: 'support',
    salonId: 's5',
    salonName: 'Divine Nails Spa',
    contactName: 'Christina Lee',
    assignedTo: '5',
    date: '2025-01-25',
    time: '15:30',
    duration: 30,
    status: 'scheduled',
    notes: 'Help with custom response configuration',
    meetingLink: null,
  },
  {
    id: 'a5',
    title: 'Sales Call - Royal Nails Academy',
    type: 'sales_call',
    salonId: null,
    salonName: 'Royal Nails Academy',
    contactName: 'Diana Thompson',
    assignedTo: '1',
    date: '2025-01-26',
    time: '09:00',
    duration: 30,
    status: 'scheduled',
    notes: 'Final negotiation for enterprise deal',
    meetingLink: 'https://meet.google.com/456-789-abc',
  },
];

const mockTasks: Task[] = [
  {
    id: 't1',
    title: 'Follow up with Bliss Nail Lounge',
    description: 'Send proposal and pricing details after demo',
    assignedTo: '2',
    dueDate: '2025-01-28',
    priority: 'high',
    status: 'pending',
    relatedSalonId: null,
    createdAt: '2025-01-23',
    completedAt: null,
  },
  {
    id: 't2',
    title: 'Prepare onboarding materials for Nail Paradise',
    description: 'Custom welcome package and training docs',
    assignedTo: '4',
    dueDate: '2025-01-25',
    priority: 'urgent',
    status: 'in_progress',
    relatedSalonId: 's4',
    createdAt: '2025-01-20',
    completedAt: null,
  },
  {
    id: 't3',
    title: 'Create case study for Glamour Nails',
    description: 'Document ROI and success metrics for marketing',
    assignedTo: '3',
    dueDate: '2025-01-31',
    priority: 'medium',
    status: 'pending',
    relatedSalonId: 's1',
    createdAt: '2025-01-15',
    completedAt: null,
  },
  {
    id: 't4',
    title: 'Reach out to churned salon - Serenity Nails',
    description: 'Check if budget situation improved, offer discount',
    assignedTo: '1',
    dueDate: '2025-02-01',
    priority: 'low',
    status: 'pending',
    relatedSalonId: 's7',
    createdAt: '2025-01-10',
    completedAt: null,
  },
  {
    id: 't5',
    title: 'Update AI agent responses for Divine Nails',
    description: 'Add new service offerings to agent knowledge base',
    assignedTo: '5',
    dueDate: '2025-01-26',
    priority: 'medium',
    status: 'pending',
    relatedSalonId: 's5',
    createdAt: '2025-01-22',
    completedAt: null,
  },
];

const mockActivities: Activity[] = [
  {
    id: 'act1',
    type: 'deal_won',
    title: 'Deal Closed',
    description: 'Nail Paradise signed up for Starter plan',
    timestamp: '2025-01-10T14:30:00Z',
    userId: '2',
    userName: 'Marcus Johnson',
    relatedEntityId: 's4',
    relatedEntityType: 'salon',
  },
  {
    id: 'act2',
    type: 'new_lead',
    title: 'New Lead',
    description: 'Pretty Nails NYC submitted inquiry via website',
    timestamp: '2025-01-23T09:15:00Z',
    userId: '3',
    userName: 'Emily Rodriguez',
    relatedEntityId: 'l3',
    relatedEntityType: 'lead',
  },
  {
    id: 'act3',
    type: 'appointment_completed',
    title: 'Demo Completed',
    description: 'Completed product demo with Bliss Nail Lounge',
    timestamp: '2025-01-22T11:00:00Z',
    userId: '2',
    userName: 'Marcus Johnson',
    relatedEntityId: 'd3',
    relatedEntityType: 'deal',
  },
  {
    id: 'act4',
    type: 'salon_onboarded',
    title: 'Onboarding Started',
    description: 'Nail Paradise onboarding initiated',
    timestamp: '2025-01-12T10:00:00Z',
    userId: '4',
    userName: 'David Kim',
    relatedEntityId: 's4',
    relatedEntityType: 'salon',
  },
  {
    id: 'act5',
    type: 'status_changed',
    title: 'Deal Stage Updated',
    description: 'Royal Nails Academy moved to Negotiation stage',
    timestamp: '2025-01-24T16:45:00Z',
    userId: '1',
    userName: 'Sarah Chen',
    relatedEntityId: 'd2',
    relatedEntityType: 'deal',
  },
];

const mockMetrics: DashboardMetrics = {
  totalRevenue: 287500,
  monthlyRecurringRevenue: 23946,
  totalSalons: 7,
  activeSalons: 5,
  churnedSalons: 1,
  newSalonsThisMonth: 1,
  averageRevenuePerSalon: 4789,
  churnRate: 2.5,
  netRevenueRetention: 108,
  totalLeads: 5,
  conversionRate: 28,
  averageDealSize: 6500,
  salesPipelineValue: 35340,
  appointmentsThisWeek: 5,
  taskCompletionRate: 72,
};

const mockRevenueData: RevenueData[] = [
  { month: 'Aug', revenue: 15000, newRevenue: 2500, churnedRevenue: 0 },
  { month: 'Sep', revenue: 18500, newRevenue: 4000, churnedRevenue: 500 },
  { month: 'Oct', revenue: 20000, newRevenue: 2500, churnedRevenue: 1000 },
  { month: 'Nov', revenue: 21500, newRevenue: 2000, churnedRevenue: 500 },
  { month: 'Dec', revenue: 22500, newRevenue: 1500, churnedRevenue: 500 },
  { month: 'Jan', revenue: 23946, newRevenue: 1946, churnedRevenue: 500 },
];

const mockSalonGrowthData: SalonGrowthData[] = [
  { month: 'Aug', totalSalons: 3, newSalons: 1, churned: 0 },
  { month: 'Sep', totalSalons: 4, newSalons: 1, churned: 0 },
  { month: 'Oct', totalSalons: 5, newSalons: 2, churned: 1 },
  { month: 'Nov', totalSalons: 6, newSalons: 1, churned: 0 },
  { month: 'Dec', totalSalons: 6, newSalons: 1, churned: 1 },
  { month: 'Jan', totalSalons: 7, newSalons: 1, churned: 0 },
];

const mockPipelineData: SalesPipelineData[] = [
  { stage: 'Discovery', count: 1, value: 3588 },
  { stage: 'Demo Scheduled', count: 1, value: 1788 },
  { stage: 'Demo Completed', count: 1, value: 5988 },
  { stage: 'Proposal', count: 1, value: 11988 },
  { stage: 'Negotiation', count: 1, value: 11988 },
];

// ============ STORE INTERFACE ============
interface AppState {
  // Data
  salons: Salon[];
  leads: Lead[];
  deals: Deal[];
  appointments: Appointment[];
  teamMembers: TeamMember[];
  tasks: Task[];
  activities: Activity[];
  metrics: DashboardMetrics;
  revenueData: RevenueData[];
  salonGrowthData: SalonGrowthData[];
  pipelineData: SalesPipelineData[];

  // UI State
  sidebarOpen: boolean;
  currentUser: TeamMember | null;

  // Actions
  setSidebarOpen: (open: boolean) => void;
  setCurrentUser: (user: TeamMember) => void;

  // Salon Actions
  addSalon: (salon: Salon) => void;
  updateSalon: (id: string, updates: Partial<Salon>) => void;
  deleteSalon: (id: string) => void;

  // Lead Actions
  addLead: (lead: Lead) => void;
  updateLead: (id: string, updates: Partial<Lead>) => void;
  deleteLead: (id: string) => void;

  // Deal Actions
  addDeal: (deal: Deal) => void;
  updateDeal: (id: string, updates: Partial<Deal>) => void;
  deleteDeal: (id: string) => void;

  // Appointment Actions
  addAppointment: (appointment: Appointment) => void;
  updateAppointment: (id: string, updates: Partial<Appointment>) => void;
  deleteAppointment: (id: string) => void;

  // Task Actions
  addTask: (task: Task) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;

  // Activity Actions
  addActivity: (activity: Activity) => void;
}

// ============ CREATE STORE ============
export const useStore = create<AppState>((set) => ({
  // Initial Data
  salons: mockSalons,
  leads: mockLeads,
  deals: mockDeals,
  appointments: mockAppointments,
  teamMembers: mockTeamMembers,
  tasks: mockTasks,
  activities: mockActivities,
  metrics: mockMetrics,
  revenueData: mockRevenueData,
  salonGrowthData: mockSalonGrowthData,
  pipelineData: mockPipelineData,

  // UI State
  sidebarOpen: true,
  currentUser: mockTeamMembers[0],

  // UI Actions
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setCurrentUser: (user) => set({ currentUser: user }),

  // Salon Actions
  addSalon: (salon) => set((state) => ({ salons: [...state.salons, salon] })),
  updateSalon: (id, updates) => set((state) => ({
    salons: state.salons.map((s) => (s.id === id ? { ...s, ...updates } : s)),
  })),
  deleteSalon: (id) => set((state) => ({
    salons: state.salons.filter((s) => s.id !== id),
  })),

  // Lead Actions
  addLead: (lead) => set((state) => ({ leads: [...state.leads, lead] })),
  updateLead: (id, updates) => set((state) => ({
    leads: state.leads.map((l) => (l.id === id ? { ...l, ...updates } : l)),
  })),
  deleteLead: (id) => set((state) => ({
    leads: state.leads.filter((l) => l.id !== id),
  })),

  // Deal Actions
  addDeal: (deal) => set((state) => ({ deals: [...state.deals, deal] })),
  updateDeal: (id, updates) => set((state) => ({
    deals: state.deals.map((d) => (d.id === id ? { ...d, ...updates } : d)),
  })),
  deleteDeal: (id) => set((state) => ({
    deals: state.deals.filter((d) => d.id !== id),
  })),

  // Appointment Actions
  addAppointment: (appointment) => set((state) => ({
    appointments: [...state.appointments, appointment],
  })),
  updateAppointment: (id, updates) => set((state) => ({
    appointments: state.appointments.map((a) => (a.id === id ? { ...a, ...updates } : a)),
  })),
  deleteAppointment: (id) => set((state) => ({
    appointments: state.appointments.filter((a) => a.id !== id),
  })),

  // Task Actions
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
  updateTask: (id, updates) => set((state) => ({
    tasks: state.tasks.map((t) => (t.id === id ? { ...t, ...updates } : t)),
  })),
  deleteTask: (id) => set((state) => ({
    tasks: state.tasks.filter((t) => t.id !== id),
  })),

  // Activity Actions
  addActivity: (activity) => set((state) => ({
    activities: [activity, ...state.activities],
  })),
}));
