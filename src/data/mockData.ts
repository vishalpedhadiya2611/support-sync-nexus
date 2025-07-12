
import { Ticket, Message, User } from '@/types/ticket';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Admin',
    email: 'admin@company.com',
    role: 'admin'
  },
  {
    id: '2',
    name: 'Sarah Support',
    email: 'sarah@company.com',
    role: 'support'
  },
  {
    id: '3',
    name: 'Mike Customer',
    email: 'mike@client.com',
    role: 'customer'
  },
  {
    id: '4',
    name: 'Lisa Johnson',
    email: 'lisa@client.com',
    role: 'customer'
  }
];

export const mockTickets: Ticket[] = [
  {
    id: 'T-001',
    subject: 'Login Issues with Portal',
    description: 'Unable to access the customer portal after password reset.',
    priority: 'high',
    category: 'technical',
    status: 'open',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T14:20:00Z',
    customerId: '3',
    customer: mockUsers[2],
    assignedTo: '2',
    assignedAgent: mockUsers[1]
  },
  {
    id: 'T-002',
    subject: 'Billing Inquiry - Invoice #12345',
    description: 'Questions about charges on the latest invoice.',
    priority: 'medium',
    category: 'billing',
    status: 'in_progress',
    createdAt: '2024-01-14T09:15:00Z',
    updatedAt: '2024-01-15T11:45:00Z',
    customerId: '4',
    customer: mockUsers[3],
    assignedTo: '2',
    assignedAgent: mockUsers[1]
  },
  {
    id: 'T-003',
    subject: 'Feature Request - Dark Mode',
    description: 'Would like to request a dark mode theme for the application.',
    priority: 'low',
    category: 'others',
    status: 'new',
    createdAt: '2024-01-15T16:00:00Z',
    updatedAt: '2024-01-15T16:00:00Z',
    customerId: '3',
    customer: mockUsers[2]
  },
  {
    id: 'T-004',
    subject: 'Database Connection Error',
    description: 'Getting timeout errors when trying to generate reports.',
    priority: 'high',
    category: 'technical',
    status: 'resolved',
    createdAt: '2024-01-13T08:30:00Z',
    updatedAt: '2024-01-14T15:20:00Z',
    customerId: '4',
    customer: mockUsers[3],
    assignedTo: '2',
    assignedAgent: mockUsers[1]
  }
];

export const mockMessages: Message[] = [
  {
    id: 'M-001',
    ticketId: 'T-001',
    content: 'I tried resetting my password but I still cannot log in to the portal.',
    author: mockUsers[2],
    timestamp: '2024-01-15T10:30:00Z',
    type: 'user'
  },
  {
    id: 'M-002',
    ticketId: 'T-001',
    content: 'Let me check your account settings and verify the password reset process.',
    author: mockUsers[1],
    timestamp: '2024-01-15T11:15:00Z',
    type: 'staff'
  },
  {
    id: 'M-003',
    ticketId: 'T-001',
    content: 'User account shows multiple failed login attempts. May need to unlock.',
    author: mockUsers[1],
    timestamp: '2024-01-15T11:16:00Z',
    type: 'internal'
  }
];
