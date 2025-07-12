
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'support' | 'admin';
  avatar?: string;
}

export interface Ticket {
  id: string;
  subject: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  category: 'technical' | 'billing' | 'others';
  status: 'new' | 'open' | 'in_progress' | 'resolved' | 'closed';
  createdAt: string;
  updatedAt: string;
  customerId: string;
  customer: User;
  assignedTo?: string;
  assignedAgent?: User;
  attachments?: string[];
}

export interface Message {
  id: string;
  ticketId: string;
  content: string;
  author: User;
  timestamp: string;
  type: 'user' | 'staff' | 'internal';
  attachments?: string[];
}

export interface TicketStats {
  total: number;
  new: number;
  open: number;
  inProgress: number;
  resolved: number;
  closed: number;
}
