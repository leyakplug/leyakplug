'use client';

import { useState } from 'react';
import {
  Settings,
  User,
  Bell,
  Lock,
  Palette,
  Globe,
  Zap,
  CreditCard,
  Database,
  Shield,
  Mail,
} from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useStore } from '@/store';

const settingsSections = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Lock },
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'integrations', label: 'Integrations', icon: Zap },
  { id: 'billing', label: 'Billing', icon: CreditCard },
];

export default function SettingsPage() {
  const { currentUser } = useStore();
  const [activeSection, setActiveSection] = useState('profile');
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    deals: true,
    appointments: true,
    tasks: false,
    weekly: true,
  });

  return (
    <DashboardLayout>
      <Header title="Settings" subtitle="Manage your account and preferences" />

      <div className="pt-20 px-6 pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-4">
                <nav className="space-y-1">
                  {settingsSections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        activeSection === section.id
                          ? 'bg-pink-50 text-pink-600'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <section.icon className="w-5 h-5" />
                      <span className="font-medium">{section.label}</span>
                    </button>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Content */}
          <div className="lg:col-span-3 space-y-6">
            {activeSection === 'profile' && (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-6 mb-6">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center text-white font-bold text-2xl">
                        {currentUser?.name.charAt(0) || 'U'}
                      </div>
                      <div>
                        <Button variant="outline" size="sm">
                          Change Photo
                        </Button>
                        <p className="text-sm text-gray-500 mt-1">JPG, PNG or GIF. Max 2MB.</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input label="Full Name" defaultValue={currentUser?.name} />
                      <Input label="Email" type="email" defaultValue={currentUser?.email} />
                      <Input label="Phone" type="tel" defaultValue={currentUser?.phone} />
                      <Input label="Role" defaultValue={currentUser?.role?.replace('_', ' ')} disabled />
                    </div>

                    <div className="flex justify-end mt-6">
                      <Button>Save Changes</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Agency Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input label="Agency Name" defaultValue="Leyak Plug" />
                      <Input label="Business Email" defaultValue="hello@leyakplug.com" />
                      <Input label="Website" defaultValue="https://leyakplug.com" />
                      <Input label="Industry" defaultValue="Beauty & Nail Salons" disabled />
                    </div>

                    <div className="flex justify-end mt-6">
                      <Button>Save Changes</Button>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {activeSection === 'notifications' && (
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium text-gray-900 mb-4">Channels</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <Mail className="w-5 h-5 text-gray-500" />
                            <div>
                              <p className="font-medium text-gray-900">Email Notifications</p>
                              <p className="text-sm text-gray-500">Receive updates via email</p>
                            </div>
                          </div>
                          <button
                            onClick={() => setNotifications({ ...notifications, email: !notifications.email })}
                            className={`w-12 h-6 rounded-full transition-colors ${notifications.email ? 'bg-pink-600' : 'bg-gray-300'}`}
                          >
                            <div className={`w-5 h-5 rounded-full bg-white shadow transform transition-transform ${notifications.email ? 'translate-x-6' : 'translate-x-0.5'}`} />
                          </button>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <Bell className="w-5 h-5 text-gray-500" />
                            <div>
                              <p className="font-medium text-gray-900">Push Notifications</p>
                              <p className="text-sm text-gray-500">Receive push notifications</p>
                            </div>
                          </div>
                          <button
                            onClick={() => setNotifications({ ...notifications, push: !notifications.push })}
                            className={`w-12 h-6 rounded-full transition-colors ${notifications.push ? 'bg-pink-600' : 'bg-gray-300'}`}
                          >
                            <div className={`w-5 h-5 rounded-full bg-white shadow transform transition-transform ${notifications.push ? 'translate-x-6' : 'translate-x-0.5'}`} />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium text-gray-900 mb-4">Activity Notifications</h3>
                      <div className="space-y-3">
                        {[
                          { key: 'deals', label: 'Deal updates', desc: 'When deals change status' },
                          { key: 'appointments', label: 'Appointment reminders', desc: 'Before scheduled meetings' },
                          { key: 'tasks', label: 'Task assignments', desc: 'When tasks are assigned to you' },
                          { key: 'weekly', label: 'Weekly summary', desc: 'Weekly performance digest' },
                        ].map((item) => (
                          <div key={item.key} className="flex items-center justify-between py-3 border-b border-gray-100">
                            <div>
                              <p className="font-medium text-gray-900">{item.label}</p>
                              <p className="text-sm text-gray-500">{item.desc}</p>
                            </div>
                            <button
                              onClick={() => setNotifications({ ...notifications, [item.key]: !notifications[item.key as keyof typeof notifications] })}
                              className={`w-12 h-6 rounded-full transition-colors ${notifications[item.key as keyof typeof notifications] ? 'bg-pink-600' : 'bg-gray-300'}`}
                            >
                              <div className={`w-5 h-5 rounded-full bg-white shadow transform transition-transform ${notifications[item.key as keyof typeof notifications] ? 'translate-x-6' : 'translate-x-0.5'}`} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeSection === 'security' && (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle>Change Password</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 max-w-md">
                      <Input label="Current Password" type="password" />
                      <Input label="New Password" type="password" />
                      <Input label="Confirm New Password" type="password" />
                      <Button>Update Password</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Two-Factor Authentication</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Shield className="w-5 h-5 text-gray-500" />
                        <div>
                          <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                          <p className="text-sm text-gray-500">Add an extra layer of security</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Enable</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Active Sessions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                        <div>
                          <p className="font-medium text-gray-900">Current Session</p>
                          <p className="text-sm text-gray-500">Chrome on macOS - San Francisco, CA</p>
                        </div>
                        <span className="text-xs text-green-600 font-medium">Active now</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {activeSection === 'integrations' && (
              <Card>
                <CardHeader>
                  <CardTitle>Connected Integrations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: 'Google Calendar', desc: 'Sync appointments with Google Calendar', connected: true, icon: '📅' },
                      { name: 'Slack', desc: 'Get notifications in Slack', connected: true, icon: '💬' },
                      { name: 'Stripe', desc: 'Process payments and subscriptions', connected: true, icon: '💳' },
                      { name: 'Zapier', desc: 'Connect with 5,000+ apps', connected: false, icon: '⚡' },
                      { name: 'Twilio', desc: 'Send SMS notifications', connected: false, icon: '📱' },
                    ].map((integration) => (
                      <div key={integration.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{integration.icon}</span>
                          <div>
                            <p className="font-medium text-gray-900">{integration.name}</p>
                            <p className="text-sm text-gray-500">{integration.desc}</p>
                          </div>
                        </div>
                        <Button variant={integration.connected ? 'secondary' : 'primary'} size="sm">
                          {integration.connected ? 'Manage' : 'Connect'}
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {activeSection === 'billing' && (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle>Current Plan</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="p-6 bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl border border-pink-200">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">Agency Pro</h3>
                          <p className="text-gray-600">For growing agencies</p>
                        </div>
                        <div className="text-right">
                          <p className="text-3xl font-bold text-gray-900">$299</p>
                          <p className="text-gray-500">/month</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <Button variant="outline">Change Plan</Button>
                        <Button variant="ghost">Cancel Subscription</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Payment Method</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-400 rounded flex items-center justify-center text-white text-xs font-bold">
                          VISA
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Visa ending in 4242</p>
                          <p className="text-sm text-gray-500">Expires 12/2026</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Update</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Billing History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { date: 'Jan 1, 2025', amount: '$299.00', status: 'Paid' },
                        { date: 'Dec 1, 2024', amount: '$299.00', status: 'Paid' },
                        { date: 'Nov 1, 2024', amount: '$299.00', status: 'Paid' },
                      ].map((invoice, i) => (
                        <div key={i} className="flex items-center justify-between py-3 border-b border-gray-100">
                          <div>
                            <p className="font-medium text-gray-900">{invoice.date}</p>
                            <p className="text-sm text-gray-500">{invoice.amount}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-green-600 font-medium">{invoice.status}</span>
                            <Button variant="ghost" size="sm">Download</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {activeSection === 'appearance' && (
              <Card>
                <CardHeader>
                  <CardTitle>Appearance Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium text-gray-900 mb-4">Theme</h3>
                      <div className="grid grid-cols-3 gap-4">
                        {['Light', 'Dark', 'System'].map((theme) => (
                          <button
                            key={theme}
                            className={`p-4 rounded-lg border-2 text-center transition-all ${
                              theme === 'Light' ? 'border-pink-500 bg-pink-50' : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <div className={`w-12 h-12 mx-auto rounded-lg mb-2 ${
                              theme === 'Dark' ? 'bg-gray-900' : theme === 'System' ? 'bg-gradient-to-br from-white to-gray-900' : 'bg-white border'
                            }`} />
                            <span className="text-sm font-medium">{theme}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium text-gray-900 mb-4">Accent Color</h3>
                      <div className="flex gap-3">
                        {['#ec4899', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'].map((color) => (
                          <button
                            key={color}
                            className={`w-10 h-10 rounded-full ${color === '#ec4899' ? 'ring-2 ring-offset-2 ring-gray-900' : ''}`}
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
