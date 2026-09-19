import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { addActivity } from '../lib/activityLog';

export interface UserData {
  accountType: string;
  countryCode: string;
  phone: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  twoFactorEnabled: boolean;
  createdAt: string;
}

interface AuthContextType {
  user: UserData | null;
  isAuthenticated: boolean;
  login: (formData: {
    accountType: string;
    countryCode: string;
    phone: string;
    firstName: string;
    lastName: string;
  }) => void;
  logout: () => void;
  updateProfile: (data: Partial<UserData>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'auth_user';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserData | null>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  const login = useCallback((formData: {
    accountType: string;
    countryCode: string;
    phone: string;
    firstName: string;
    lastName: string;
  }) => {
    const userData: UserData = {
      ...formData,
      twoFactorEnabled: false,
      createdAt: new Date().toISOString(),
    };
    setUser(userData);
    addActivity('account_created', 'Account created successfully');
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const updateProfile = useCallback((data: Partial<UserData>) => {
    setUser(prev => {
      if (!prev) return prev;
      return { ...prev, ...data };
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
