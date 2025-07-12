import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft, 
  User, 
  Clock, 
  MessageSquare, 
  Paperclip,
  Send,
  Eye,
  EyeOff
} from 'lucide-react';
import { Ticket, Message } from '@/types/ticket';
import { useAuth } from '@/contexts/AuthContext';
import { formatDistanceToNow, format } from 'date-fns';
import { mockMessages } from '@/data/mockData';

interface TicketDetailProps {
  ticket: Ticket;
  onBack: () => void;
}

const TicketDetail = ({ ticket, onBack }: TicketDetailProps) => {
  const { currentUser } = useAuth();
  const [newMessage, setNewMessage] = useState('');
  const [internalNote, setInternalNote] = useState('');
  const [showInternal, setShowInternal] = useState(true);
  const [newStatus, setNewStatus] = useState(ticket.status);

  const messages = mockMessages.filter(m => m.ticketId === ticket.id);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  const handleSendInternalNote = () => {
    if (internalNote.trim()) {
      console.log('Sending internal note:', internalNote);
      setInternalNote('');
    }
  };

  const handleStatusChange = () => {
    console.log('Changing status to:', newStatus);
  };

  const handleStatusValueChange = (value: string) => {
    const validStatuses = ['new', 'open', 'in_progress', 'resolved', 'closed'] as const;
    if (validStatuses.includes(value as any)) {
      setNewStatus(value as typeof validStatuses[number]);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'open': return 'bg-purple-100 text-purple-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatStatus = (status: string) => {
    return status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="flex items-center space-x-2">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Tickets</span>
        </Button>
        
        <div className="flex items-center space-x-2">
          {currentUser?.role !== 'customer' && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowInternal(!showInternal)}
              className="flex items-center space-x-1"
            >
              {showInternal ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              <span>Internal Notes</span>
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Ticket Information */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Ticket Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Ticket ID</label>
                <p className="font-mono text-sm">{ticket.id}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-500">Status</label>
                <div className="flex items-center space-x-2 mt-1">
                  {currentUser?.role !== 'customer' ? (
                    <Select value={newStatus} onValueChange={handleStatusValueChange}>
                      <SelectTrigger className="bg-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="open">Open</SelectItem>
                        <SelectItem value="in_progress">In Progress</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <Badge className={getStatusColor(ticket.status)}>
                      {formatStatus(ticket.status)}
                    </Badge>
                  )}
                  {newStatus !== ticket.status && (
                    <Button size="sm" onClick={handleStatusChange}>
                      Update
                    </Button>
                  )}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">Priority</label>
                <Badge className={getPriorityColor(ticket.priority)} variant="secondary">
                  {ticket.priority.toUpperCase()}
                </Badge>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">Category</label>
                <p className="capitalize">{ticket.category}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">Customer</label>
                <div className="flex items-center space-x-2 mt-1">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="text-xs bg-blue-100 text-blue-600">
                      {ticket.customer.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{ticket.customer.name}</p>
                    <p className="text-xs text-gray-500">{ticket.customer.email}</p>
                  </div>
                </div>
              </div>

              {ticket.assignedAgent && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Assigned To</label>
                  <div className="flex items-center space-x-2 mt-1">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-xs bg-green-100 text-green-600">
                        {ticket.assignedAgent.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <p className="text-sm font-medium">{ticket.assignedAgent.name}</p>
                  </div>
                </div>
              )}

              <div>
                <label className="text-sm font-medium text-gray-500">Created</label>
                <p className="text-sm">{format(new Date(ticket.createdAt), 'PPp')}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">Last Updated</label>
                <p className="text-sm">{formatDistanceToNow(new Date(ticket.updatedAt), { addSuffix: true })}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Conversation */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5" />
                <span>Conversation</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Initial ticket description */}
              <div className="mb-6">
                <div className="flex items-start space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-blue-100 text-blue-600">
                      {ticket.customer.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium">{ticket.customer.name}</span>
                      <span className="text-xs text-gray-500">
                        {format(new Date(ticket.createdAt), 'PPp')}
                      </span>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <h4 className="font-medium mb-2">{ticket.subject}</h4>
                      <p className="text-gray-700">{ticket.description}</p>
                    </div>
                  </div>
                </div>
              </div>

              <Separator className="my-4" />

              {/* Messages */}
              <div className="space-y-4 mb-6">
                {messages.map((message) => (
                  <div key={message.id}>
                    {message.type === 'internal' && !showInternal && currentUser?.role === 'customer' ? null : (
                      <div className={`flex items-start space-x-3 ${
                        message.type === 'internal' ? 'bg-yellow-50 p-3 rounded-lg border-l-4 border-yellow-400' : ''
                      }`}>
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className={`
                            ${message.type === 'staff' || message.type === 'internal' 
                              ? 'bg-green-100 text-green-600' 
                              : 'bg-blue-100 text-blue-600'
                            }
                          `}>
                            {message.author.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-medium">{message.author.name}</span>
                            {message.type === 'internal' && (
                              <Badge variant="outline" className="text-xs bg-yellow-100 text-yellow-800">
                                Internal Note
                              </Badge>
                            )}
                            <span className="text-xs text-gray-500">
                              {format(new Date(message.timestamp), 'PPp')}
                            </span>
                          </div>
                          <div className="bg-white p-3 rounded-lg border">
                            <p className="text-gray-700">{message.content}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Reply Section */}
              {currentUser && (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Reply to customer
                    </label>
                    <Textarea
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type your response..."
                      rows={3}
                    />
                    <div className="flex justify-end mt-2">
                      <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                        <Send className="h-4 w-4 mr-2" />
                        Send Reply
                      </Button>
                    </div>
                  </div>

                  {/* Internal Notes Section */}
                  {currentUser.role !== 'customer' && (
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        Internal Note (not visible to customer)
                      </label>
                      <Textarea
                        value={internalNote}
                        onChange={(e) => setInternalNote(e.target.value)}
                        placeholder="Add an internal note for your team..."
                        rows={2}
                        className="bg-yellow-50 border-yellow-200"
                      />
                      <div className="flex justify-end mt-2">
                        <Button 
                          variant="outline" 
                          onClick={handleSendInternalNote} 
                          disabled={!internalNote.trim()}
                          className="bg-yellow-50 hover:bg-yellow-100 border-yellow-300"
                        >
                          Add Internal Note
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TicketDetail;
