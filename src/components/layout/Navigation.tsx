
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Home, 
  Ticket, 
  Plus, 
  BarChart3, 
  Settings, 
  User,
  LogOut
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const Navigation = () => {
  const { currentUser, logout, switchRole } = useAuth();

  if (!currentUser) return null;

  const navItems = [
    { path: '/', label: 'Dashboard', icon: Home },
    { path: '/tickets', label: 'Tickets', icon: Ticket },
    ...(currentUser.role === 'customer' 
      ? [{ path: '/create-ticket', label: 'New Ticket', icon: Plus }]
      : []
    ),
    ...(currentUser.role !== 'customer' 
      ? [{ path: '/analytics', label: 'Analytics', icon: BarChart3 }]
      : []
    ),
    ...(currentUser.role === 'admin' 
      ? [{ path: '/settings', label: 'Settings', icon: Settings }]
      : []
    )
  ];

  return (
    <nav className="bg-white border-b border-gray-200 px-4 lg:px-6 py-2.5">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
        <div className="flex items-center">
          <Ticket className="h-8 w-8 text-blue-600 mr-3" />
          <span className="text-xl font-semibold text-gray-900">HelpDesk Pro</span>
        </div>
        
        <div className="flex items-center space-x-6">
          <div className="hidden lg:flex space-x-6">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`
                }
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-blue-100 text-blue-600">
                    {currentUser.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-white" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{currentUser.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {currentUser.email}
                  </p>
                  <p className="text-xs leading-none text-blue-600 capitalize">
                    {currentUser.role}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => switchRole('customer')}>
                Switch to Customer
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => switchRole('support')}>
                Switch to Support
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => switchRole('admin')}>
                Switch to Admin
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
