// Core Types for Leyak Plug - AI Agency Dashboard for Beauty & Nail Salons

// ============ SALON TYPES ============
export interface Salon {
  id: string;
  name: string;
  ownerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  status: SalonStatus;
  tier: SalonTier;
  monthlyFee: number;
  aiAgentActive: boolean;
  aiAgentName: string;
  joinedDate: string;
  lastContact: string;
  notes: string;
  services: string[];
  employeeCount: number;
  averageMonthlyRevenue: number;
}

export type SalonStatus = 'active' | 'onboarding' | 'churned' | 'paused' | 'prospect';
export type SalonTier = 'starter' | 'growth' | 'premium' | 'enterprise';

// ============ CLIENT/LEAD TYPES ============
export interface Lead {
  id: string;
  salonName: string;
  contactName: string;
  email: string;
  phone: string;
  source: LeadSource;
  status: LeadStatus;
  assignedTo: string;
  notes: string;
  createdAt: string;
  lastContactedAt: string;
  estimatedValue: number;
  nextFollowUp: string | null;
  tags: string[];
}

export type LeadSource = 'website' | 'referral' | 'social_media' | 'cold_outreach' | 'event' | 'partner';
export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'proposal_sent' | 'negotiation' | 'won' | 'lost';

// ============ DEAL/SALES TYPES ============
export interface Deal {
  id: string;
  leadId: string;
  salonName: string;
  contactName: string;
  value: number;
  stage: DealStage;
  probability: number;
  expectedCloseDate: string;
  assignedTo: string;
  createdAt: string;
  updatedAt: string;
  notes: string;
  tier: SalonTier;
}

export type DealStage = 'discovery' | 'demo_scheduled' | 'demo_completed' | 'proposal' | 'negotiation' | 'closed_won' | 'closed_lost';

// ============ APPOINTMENT/TASK TYPES ============
export interface Appointment {
  id: string;
  title: string;
  type: AppointmentType;
  salonId: string | null;
  salonName: string;
  contactName: string;
  assignedTo: string;
  date: string;
  time: string;
  duration: number; // in minutes
  status: AppointmentStatus;
  notes: string;
  meetingLink: string | null;
}

export type AppointmentType = 'demo' | 'onboarding' | 'support' | 'review' | 'sales_call' | 'training';
export type AppointmentStatus = 'scheduled' | 'completed' | 'cancelled' | 'no_show' | 'rescheduled';

// ============ TEAM TYPES ============
export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: TeamRole;
  avatar: string;
  phone: string;
  department: Department;
  status: 'active' | 'inactive';
  joinedDate: string;
  salesTarget: number;
  currentSales: number;
}

export type TeamRole = 'admin' | 'sales_rep' | 'account_manager' | 'support' | 'onboarding_specialist';
export type Department = 'sales' | 'operations' | 'support' | 'management';

// ============ METRICS TYPES ============
export interface DashboardMetrics {
  totalRevenue: number;
  monthlyRecurringRevenue: number;
  totalSalons: number;
  activeSalons: number;
  churnedSalons: number;
  newSalonsThisMonth: number;
  averageRevenuePerSalon: number;
  churnRate: number;
  netRevenueRetention: number;
  totalLeads: number;
  conversionRate: number;
  averageDealSize: number;
  salesPipelineValue: number;
  appointmentsThisWeek: number;
  taskCompletionRate: number;
}

export interface RevenueData {
  month: string;
  revenue: number;
  newRevenue: number;
  churnedRevenue: number;
}

export interface SalonGrowthData {
  month: string;
  totalSalons: number;
  newSalons: number;
  churned: number;
}

export interface SalesPipelineData {
  stage: string;
  count: number;
  value: number;
}

// ============ ACTIVITY/NOTIFICATION TYPES ============
export interface Activity {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  timestamp: string;
  userId: string;
  userName: string;
  relatedEntityId: string | null;
  relatedEntityType: 'salon' | 'lead' | 'deal' | 'appointment' | null;
}

export type ActivityType = 'deal_won' | 'deal_lost' | 'new_lead' | 'salon_onboarded' | 'salon_churned' | 'appointment_completed' | 'note_added' | 'status_changed';

// ============ AI AGENT TYPES ============
export interface AIAgentStats {
  salonId: string;
  totalConversations: number;
  appointmentsBooked: number;
  questionsAnswered: number;
  averageResponseTime: number; // in seconds
  customerSatisfactionScore: number; // 1-5
  lastActiveAt: string;
}

// ============ TASK TYPES ============
export interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  relatedSalonId: string | null;
  createdAt: string;
  completedAt: string | null;
}

// ============ FILTER/SEARCH TYPES ============
export interface SalonFilters {
  status?: SalonStatus[];
  tier?: SalonTier[];
  search?: string;
  dateRange?: { start: string; end: string };
}

export interface LeadFilters {
  status?: LeadStatus[];
  source?: LeadSource[];
  assignedTo?: string;
  search?: string;
}
