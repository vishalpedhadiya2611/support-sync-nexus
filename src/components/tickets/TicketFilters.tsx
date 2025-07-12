
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Search, Filter } from 'lucide-react';

interface TicketFiltersProps {
  selectedStatus: string[];
  selectedPriorities: string[];
  selectedAgent: string;
  searchQuery: string;
  onStatusChange: (status: string[]) => void;
  onPriorityChange: (priorities: string[]) => void;
  onAgentChange: (agent: string) => void;
  onSearchChange: (query: string) => void;
}

const TicketFilters = ({
  selectedStatus,
  selectedPriorities,
  selectedAgent,
  searchQuery,
  onStatusChange,
  onPriorityChange,
  onAgentChange,
  onSearchChange
}: TicketFiltersProps) => {
  const statusOptions = [
    { value: 'new', label: 'New', count: 5 },
    { value: 'open', label: 'Open', count: 8 },
    { value: 'in_progress', label: 'In Progress', count: 12 },
    { value: 'resolved', label: 'Resolved', count: 25 },
    { value: 'closed', label: 'Closed', count: 42 }
  ];

  const priorityOptions = [
    { value: 'high', label: 'High Priority', color: 'bg-red-100 text-red-800' },
    { value: 'medium', label: 'Medium Priority', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'low', label: 'Low Priority', color: 'bg-green-100 text-green-800' }
  ];

  const handleStatusToggle = (status: string) => {
    if (selectedStatus.includes(status)) {
      onStatusChange(selectedStatus.filter(s => s !== status));
    } else {
      onStatusChange([...selectedStatus, status]);
    }
  };

  const handlePriorityToggle = (priority: string) => {
    if (selectedPriorities.includes(priority)) {
      onPriorityChange(selectedPriorities.filter(p => p !== priority));
    } else {
      onPriorityChange([...selectedPriorities, priority]);
    }
  };

  return (
    <Card className="w-full lg:w-80">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Filter className="h-5 w-5" />
          <span>Filters</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Search */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Search</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search tickets..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Status Filter */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-700">Status</label>
          <div className="space-y-2">
            {statusOptions.map((status) => (
              <div key={status.value} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={status.value}
                    checked={selectedStatus.includes(status.value)}
                    onCheckedChange={() => handleStatusToggle(status.value)}
                  />
                  <label htmlFor={status.value} className="text-sm text-gray-700 cursor-pointer">
                    {status.label}
                  </label>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {status.count}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Priority Filter */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-700">Priority</label>
          <div className="space-y-2">
            {priorityOptions.map((priority) => (
              <div key={priority.value} className="flex items-center space-x-2">
                <Checkbox
                  id={priority.value}
                  checked={selectedPriorities.includes(priority.value)}
                  onCheckedChange={() => handlePriorityToggle(priority.value)}
                />
                <label htmlFor={priority.value} className="text-sm text-gray-700 cursor-pointer">
                  <Badge className={priority.color}>
                    {priority.label}
                  </Badge>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Assigned Agent Filter */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-700">Assigned To</label>
          <Select value={selectedAgent} onValueChange={onAgentChange}>
            <SelectTrigger className="bg-white">
              <SelectValue placeholder="Select agent" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="all">All Agents</SelectItem>
              <SelectItem value="unassigned">Unassigned</SelectItem>
              <SelectItem value="2">Sarah Support</SelectItem>
              <SelectItem value="1">John Admin</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default TicketFilters;
