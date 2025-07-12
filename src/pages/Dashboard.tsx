
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import StatsCards from '@/components/dashboard/StatsCards';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';
import { Clock, User, Ticket, TrendingUp } from 'lucide-react';
import { mockTickets } from '@/data/mockData';
import CreateTicketModal from '@/components/tickets/CreateTicketModal';

const Dashboard = () => {
  const { currentUser } = useAuth();

  const stats = {
    total: mockTickets.length,
    new: mockTickets.filter(t => t.status === 'new').length,
    open: mockTickets.filter(t => t.status === 'open').length,
    inProgress: mockTickets.filter(t => t.status === 'in_progress').length,
    resolved: mockTickets.filter(t => t.status === 'resolved').length,
    closed: mockTickets.filter(t => t.status === 'closed').length
  };

  const pieData = [
    { name: 'New', value: stats.new, color: '#3B82F6' },
    { name: 'Open', value: stats.open, color: '#8B5CF6' },
    { name: 'In Progress', value: stats.inProgress, color: '#F59E0B' },
    { name: 'Resolved', value: stats.resolved, color: '#10B981' },
    { name: 'Closed', value: stats.closed, color: '#6B7280' }
  ];

  const barData = [
    { name: 'Mon', tickets: 12 },
    { name: 'Tue', tickets: 19 },
    { name: 'Wed', tickets: 8 },
    { name: 'Thu', tickets: 15 },
    { name: 'Fri', tickets: 22 },
    { name: 'Sat', tickets: 6 },
    { name: 'Sun', tickets: 4 }
  ];

  const recentTickets = mockTickets
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {currentUser?.name}!
          </h1>
          <p className="text-gray-600 mt-1">
            Here's what's happening with your support tickets today.
          </p>
        </div>
        
        {currentUser?.role === 'customer' && (
          <CreateTicketModal />
        )}
      </div>

      {/* Stats Cards */}
      <StatsCards stats={stats} />

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status Distribution Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Ticket Status Distribution</CardTitle>
            <CardDescription>Current ticket status breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Weekly Tickets Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Ticket Volume</CardTitle>
            <CardDescription>Tickets created this week</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="tickets" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity and Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Tickets */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span>Recent Activity</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTickets.map((ticket) => (
                <div key={ticket.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-sm">{ticket.subject}</span>
                      <Badge 
                        variant="secondary" 
                        className={`text-xs ${
                          ticket.priority === 'high' ? 'bg-red-100 text-red-800' :
                          ticket.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}
                      >
                        {ticket.priority}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {ticket.customer.name} • {ticket.id}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge className={`text-xs ${
                      ticket.status === 'new' ? 'bg-blue-100 text-blue-800' :
                      ticket.status === 'open' ? 'bg-purple-100 text-purple-800' :
                      ticket.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
                      ticket.status === 'resolved' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {ticket.status.replace('_', ' ')}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Quick Stats</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Avg. Response Time</span>
              <span className="font-semibold">2.4 hours</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Resolution Rate</span>
              <span className="font-semibold text-green-600">94%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Customer Satisfaction</span>
              <span className="font-semibold text-blue-600">4.8/5</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Active Agents</span>
              <span className="font-semibold">12</span>
            </div>
            
            {currentUser?.role !== 'customer' && (
              <>
                <hr className="my-3" />
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-700">Unassigned Tickets</h4>
                  <div className="space-y-1">
                    {mockTickets.filter(t => !t.assignedTo).slice(0, 3).map(ticket => (
                      <div key={ticket.id} className="text-xs p-2 bg-orange-50 rounded border-l-2 border-orange-400">
                        <div className="font-medium">{ticket.subject}</div>
                        <div className="text-gray-500">{ticket.id}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
