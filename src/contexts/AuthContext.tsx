
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '@/types/ticket';

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  switchRole: (role: 'customer' | 'support' | 'admin') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User>({
    id: '1',
    name: 'John Admin',
    email: 'admin@company.com',
    role: 'admin'
  });

  const login = async (email: string, password: string) => {
    // Mock login - in real app this would call your auth API
    console.log('Login attempt:', email, password);
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const switchRole = (role: 'customer' | 'support' | 'admin') => {
    if (currentUser) {
      setCurrentUser({ ...currentUser, role });
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
};
