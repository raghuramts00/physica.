
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  deductCredits: (amount: number) => Promise<boolean>;
  addCredits: (amount: number) => Promise<void>;
  isAuthenticated: boolean;
  showAuthModal: boolean;
  setShowAuthModal: (show: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DAILY_CREDITS = 300;

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    // Initialize "Guest" user with local persistence
    const stored = localStorage.getItem('physica_guest_v1');
    if (stored) {
        setUser(JSON.parse(stored));
    } else {
        const newUser: User = {
            id: 'guest',
            email: 'guest@physica.img',
            credits: DAILY_CREDITS,
            isPro: false,
            lastReset: new Date().toISOString()
        };
        setUser(newUser);
        localStorage.setItem('physica_guest_v1', JSON.stringify(newUser));
    }
  }, []);

  // No-op functions for removed auth
  const loginWithGoogle = async () => {};
  const logout = async () => {};

  const deductCredits = async (amount: number): Promise<boolean> => {
    if (!user) return false;
    
    // Check if user has enough credits
    if (user.credits < amount) {
      return false;
    }

    // Local update
    const newCreditAmount = user.credits - amount;
    const updatedUser = { ...user, credits: newCreditAmount };
    setUser(updatedUser);
    localStorage.setItem('physica_guest_v1', JSON.stringify(updatedUser));
    return true;
  };

  const addCredits = async (amount: number) => {
    if (!user) return;
    
    const newCreditAmount = user.credits + amount;
    const updatedUser = { ...user, credits: newCreditAmount };
    setUser(updatedUser);
    localStorage.setItem('physica_guest_v1', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loginWithGoogle, 
      logout, 
      deductCredits, 
      addCredits,
      isAuthenticated: true, // Always authenticated
      showAuthModal,
      setShowAuthModal
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
