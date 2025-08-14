'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { loginUser, registerUser } from '@/lib/api/auth';
import type { LoginCredentials, RegisterCredentials, User } from '@/types';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

interface AuthContextType {
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get('access_token');
    if (token) {
      try {
        const decodedToken: { sub: string; email: string; name?: string } = jwtDecode(token);
        setUser({ id: decodedToken.sub, email: decodedToken.email, name: decodedToken.name || '' });
      } catch (error) {
        console.error("Token inválido:", error);
        Cookies.remove('access_token');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials: LoginCredentials) => {
    const response = await loginUser(credentials);
    const { access_token } = response;
    
    Cookies.set('access_token', access_token, { expires: 7, secure: true, sameSite: 'strict' });
    
    const decodedToken: { sub: string; email: string; name?: string } = jwtDecode(access_token);
    setUser({ id: decodedToken.sub, email: decodedToken.email, name: decodedToken.name || '' });
  };
  
  const register = async (credentials: RegisterCredentials) => {
    await registerUser(credentials);
  };

  const logout = () => {
    Cookies.remove('access_token');
    setUser(null);
  };

  const value = {
    user,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isLoading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}