'use client';

import { useState } from 'react';
import {
  HelpCircle,
  Search,
  Book,
  MessageCircle,
  Mail,
  Phone,
  Video,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Zap,
  Users,
  Building2,
  DollarSign,
} from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

const faqs = [
  {
    category: 'Getting Started',
    icon: Zap,
    questions: [
      {
        q: 'How do I add a new salon to the platform?',
        a: 'Navigate to the Salons page and click "Add Salon" in the top right corner. Fill in the salon details including contact information, tier selection, and services offered.',
      },
      {
        q: 'How does the AI agent work for salons?',
        a: 'Our AI agents are custom-trained chatbots that handle customer inquiries, book appointments, and answer FAQs for your salon clients. Each salon gets a personalized agent that can be configured with their specific services and policies.',
      },
      {
        q: 'What are the different tier levels?',
        a: 'We offer four tiers: Starter ($149/mo) for basic AI support, Growth ($299/mo) with advanced features, Premium ($499/mo) with priority support, and Enterprise ($999/mo) for multi-location salons with custom solutions.',
      },
    ],
  },
  {
    category: 'Sales & Pipeline',
    icon: DollarSign,
    questions: [
      {
        q: 'How do I move deals through the pipeline?',
        a: 'In the Sales Pipeline view, you can drag and drop deals between stages in Kanban view, or update the stage directly from the deal details modal. The system automatically tracks stage history and timestamps.',
      },
      {
        q: 'How is the conversion rate calculated?',
        a: 'Conversion rate is calculated as (Closed Won deals / Total Closed deals) × 100. This gives you the percentage of deals that successfully convert to paying customers.',
      },
    ],
  },
  {
    category: 'Team Management',
    icon: Users,
    questions: [
      {
        q: 'How do I assign leads to team members?',
        a: 'When creating or editing a lead, use the "Assigned To" dropdown to select a team member. You can also bulk-assign leads from the leads list view.',
      },
      {
        q: 'How are sales targets set?',
        a: 'Sales targets are set per team member in the Team settings. Admins can update monthly targets which are used to calculate individual and team performance metrics.',
      },
    ],
  },
  {
    category: 'Salon Operations',
    icon: Building2,
    questions: [
      {
        q: 'How do I track salon health and engagement?',
        a: 'The Salons dashboard shows key metrics including AI agent activity, appointment volume, and last contact date. Salons with declining engagement are flagged for follow-up.',
      },
      {
        q: 'What happens when a salon churns?',
        a: 'When a salon cancels, update their status to "Churned" with notes about the reason. They remain in the system for win-back campaigns and historical reporting.',
      },
    ],
  },
];

const resources = [
  {
    title: 'Documentation',
    description: 'Complete guides and API reference',
    icon: Book,
    link: '#',
  },
  {
    title: 'Video Tutorials',
    description: 'Step-by-step walkthroughs',
    icon: Video,
    link: '#',
  },
  {
    title: 'Community Forum',
    description: 'Connect with other users',
    icon: MessageCircle,
    link: '#',
  },
];

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  return (
    <DashboardLayout>
      <Header title="Help Center" subtitle="Find answers and get support" />

      <div className="pt-20 px-6 pb-6">
        {/* Search */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for help..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 text-lg rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
        </div>

        {/* Quick Resources */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {resources.map((resource) => (
            <Card key={resource.title} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-pink-100 flex items-center justify-center flex-shrink-0">
                    <resource.icon className="w-6 h-6 text-pink-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 flex items-center gap-1">
                      {resource.title}
                      <ExternalLink className="w-4 h-4 text-gray-400" />
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">{resource.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQs */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>

          <div className="space-y-6">
            {faqs.map((category) => (
              <Card key={category.category}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <category.icon className="w-5 h-5 text-pink-600" />
                    {category.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {category.questions.map((faq, index) => {
                      const faqId = `${category.category}-${index}`;
                      const isExpanded = expandedFaq === faqId;

                      return (
                        <div
                          key={index}
                          className="border border-gray-100 rounded-lg overflow-hidden"
                        >
                          <button
                            onClick={() => setExpandedFaq(isExpanded ? null : faqId)}
                            className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                          >
                            <span className="font-medium text-gray-900">{faq.q}</span>
                            {isExpanded ? (
                              <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                            ) : (
                              <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                            )}
                          </button>
                          {isExpanded && (
                            <div className="px-4 pb-4 text-gray-600">{faq.a}</div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Support */}
        <div className="max-w-3xl mx-auto mt-12">
          <Card className="bg-gradient-to-br from-pink-50 to-purple-50 border-pink-200">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center mx-auto mb-4">
                <HelpCircle className="w-8 h-8 text-pink-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Still need help?</h2>
              <p className="text-gray-600 mb-6">
                Our support team is here to help you with any questions or issues.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="primary">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Start Live Chat
                </Button>
                <Button variant="outline">
                  <Mail className="w-4 h-4 mr-2" />
                  Email Support
                </Button>
                <Button variant="outline">
                  <Phone className="w-4 h-4 mr-2" />
                  Schedule Call
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
