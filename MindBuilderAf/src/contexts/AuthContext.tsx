import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState } from '@/types';
import { getCurrentUser, loginUser, logoutUser, initializeStorage } from '@/lib/localStorage';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true
  });

  useEffect(() => {
    // Initialize storage and check for existing session
    initializeStorage();
    const user = getCurrentUser();
    setState({
      user,
      isAuthenticated: !!user,
      isLoading: false
    });
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    const user = loginUser(email, password);
    if (user) {
      setState({
        user,
        isAuthenticated: true,
        isLoading: false
      });
      return { success: true };
    }
    return { success: false, error: 'Invalid email or password' };
  };

  const logout = () => {
    logoutUser();
    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false
    });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
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
