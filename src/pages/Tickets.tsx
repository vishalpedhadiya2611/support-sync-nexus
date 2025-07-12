
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import TicketCard from '@/components/tickets/TicketCard';
import TicketFilters from '@/components/tickets/TicketFilters';
import TicketDetail from '@/components/tickets/TicketDetail';
import CreateTicketModal from '@/components/tickets/CreateTicketModal';
import { Button } from '@/components/ui/button';
import { Plus, Filter, LayoutGrid, List } from 'lucide-react';
import { mockTickets } from '@/data/mockData';
import { Ticket } from '@/types/ticket';

const Tickets = () => {
  const { currentUser } = useAuth();
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter states
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([]);
  const [selectedAgent, setSelectedAgent] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter tickets based on user role and current filters
  let filteredTickets = mockTickets;

  // Role-based filtering
  if (currentUser?.role === 'customer') {
    filteredTickets = filteredTickets.filter(ticket => ticket.customerId === currentUser.id);
  } else if (currentUser?.role === 'support') {
    filteredTickets = filteredTickets.filter(ticket => 
      !ticket.assignedTo || ticket.assignedTo === currentUser.id
    );
  }

  // Apply filters
  if (selectedStatus.length > 0) {
    filteredTickets = filteredTickets.filter(ticket => selectedStatus.includes(ticket.status));
  }

  if (selectedPriorities.length > 0) {
    filteredTickets = filteredTickets.filter(ticket => selectedPriorities.includes(ticket.priority));
  }

  if (selectedAgent !== 'all') {
    if (selectedAgent === 'unassigned') {
      filteredTickets = filteredTickets.filter(ticket => !ticket.assignedTo);
    } else {
      filteredTickets = filteredTickets.filter(ticket => ticket.assignedTo === selectedAgent);
    }
  }

  if (searchQuery) {
    filteredTickets = filteredTickets.filter(ticket =>
      ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  if (selectedTicket) {
    return (
      <TicketDetail 
        ticket={selectedTicket} 
        onBack={() => setSelectedTicket(null)} 
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {currentUser?.role === 'customer' ? 'My Tickets' : 'Support Tickets'}
          </h1>
          <p className="text-gray-600 mt-1">
            {currentUser?.role === 'customer' 
              ? 'Track and manage your support requests'
              : 'Manage and respond to customer support tickets'
            }
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* View Mode Toggle */}
          <div className="hidden sm:flex border border-gray-300 rounded-lg p-1">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="px-3"
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="px-3"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>

          {/* Filter Toggle (Mobile) */}
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>

          {/* Create Ticket Button */}
          {currentUser?.role === 'customer' && (
            <CreateTicketModal />
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters Sidebar */}
        <div className={`${showFilters ? 'block' : 'hidden'} lg:block`}>
          <TicketFilters
            selectedStatus={selectedStatus}
            selectedPriorities={selectedPriorities}
            selectedAgent={selectedAgent}
            searchQuery={searchQuery}
            onStatusChange={setSelectedStatus}
            onPriorityChange={setSelectedPriorities}
            onAgentChange={setSelectedAgent}
            onSearchChange={setSearchQuery}
          />
        </div>

        {/* Tickets List */}
        <div className="flex-1">
          <div className="mb-4 flex justify-between items-center">
            <p className="text-sm text-gray-600">
              Showing {filteredTickets.length} tickets
            </p>
          </div>

          {filteredTickets.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V4a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No tickets found</h3>
              <p className="text-gray-500 mb-4">
                {currentUser?.role === 'customer' 
                  ? "You haven't created any tickets yet."
                  : "No tickets match your current filters."
                }
              </p>
              {currentUser?.role === 'customer' && (
                <CreateTicketModal 
                  trigger={
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Create Your First Ticket
                    </Button>
                  }
                />
              )}
            </div>
          ) : (
            <div className={`
              ${viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'
                : 'space-y-4'
              }
            `}>
              {filteredTickets.map((ticket) => (
                <TicketCard
                  key={ticket.id}
                  ticket={ticket}
                  onClick={() => setSelectedTicket(ticket)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tickets;
