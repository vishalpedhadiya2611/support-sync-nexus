
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Clock, User, Paperclip } from 'lucide-react';
import { Ticket } from '@/types/ticket';
import { formatDistanceToNow } from 'date-fns';

interface TicketCardProps {
  ticket: Ticket;
  onClick: () => void;
}

const TicketCard = ({ ticket, onClick }: TicketCardProps) => {
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
    <Card 
      className="hover:shadow-md transition-all cursor-pointer border-l-4 border-l-blue-500"
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-1">{ticket.subject}</h3>
            <p className="text-sm text-gray-600 line-clamp-2">{ticket.description}</p>
          </div>
          <div className="flex flex-col items-end space-y-1 ml-4">
            <Badge className={getPriorityColor(ticket.priority)}>
              {ticket.priority.toUpperCase()}
            </Badge>
            <Badge variant="outline" className={getStatusColor(ticket.status)}>
              {formatStatus(ticket.status)}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <User className="h-4 w-4" />
              <span>{ticket.customer.name}</span>
            </div>
            
            {ticket.assignedAgent && (
              <div className="flex items-center space-x-1">
                <Avatar className="h-5 w-5">
                  <AvatarFallback className="text-xs bg-blue-100 text-blue-600">
                    {ticket.assignedAgent.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <span>{ticket.assignedAgent.name}</span>
              </div>
            )}
            
            {ticket.attachments && ticket.attachments.length > 0 && (
              <div className="flex items-center space-x-1">
                <Paperclip className="h-4 w-4" />
                <span>{ticket.attachments.length}</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{formatDistanceToNow(new Date(ticket.updatedAt), { addSuffix: true })}</span>
          </div>
        </div>
        
        <div className="mt-2 flex items-center justify-between">
          <span className="text-xs font-mono text-gray-400">{ticket.id}</span>
          <Badge variant="secondary" className="text-xs">
            {ticket.category}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default TicketCard;
