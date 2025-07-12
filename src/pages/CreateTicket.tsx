
import React from 'react';
import { useNavigate } from 'react-router-dom';
import CreateTicketModal from '@/components/tickets/CreateTicketModal';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CreateTicket = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Create Support Ticket</h1>
          <p className="text-gray-600 mt-1">
            Describe your issue and we'll help you resolve it quickly.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Submit a New Ticket</CardTitle>
          <CardDescription>
            Please provide as much detail as possible to help us assist you effectively.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CreateTicketModal 
            onTicketCreated={() => navigate('/tickets')}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateTicket;
