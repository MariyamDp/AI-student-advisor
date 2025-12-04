import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  getProfile,
  login as loginApi,
  signup as signupApi,
  loginWithGoogle,
} from '../services/auth.service';

interface User {
  email: string;
  name?: string;
  major?: string;
  yearOfStudy?: string;
}

interface AuthContextValue {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  loginWithGoogle: (idToken: string) => Promise<void>;
  logout: () => void;
  updateProfile?: (profileData: { name: string; major: string; yearOfStudy: string }) => void;
  refreshProfile?: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('auth_token');
    if (stored) {
      setToken(stored);
      getProfile(stored)
        .then(r => setUser(r.user))
        .catch(() => {
          localStorage.removeItem('auth_token');
          setToken(null);
          setUser(null);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    const res = await loginApi(email, password);
    localStorage.setItem('auth_token', res.token);
    setToken(res.token);
    setUser(res.user);
    setIsLoading(false);
  };

  const signup = async (email: string, password: string) => {
    setIsLoading(true);
    const res = await signupApi(email, password);
    localStorage.setItem('auth_token', res.token);
    setToken(res.token);
    setUser(res.user);
    setIsLoading(false);
  };

  const handleGoogleLogin = async (idToken: string) => {
    setIsLoading(true);
    const res = await loginWithGoogle(idToken);
    localStorage.setItem('auth_token', res.token);
    setToken(res.token);
    setUser(res.user);
    setIsLoading(false);
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    setToken(null);
    setUser(null);
  };

  const updateProfile = (profileData: { name: string; major: string; yearOfStudy: string }) => {
    if (user) {
      setUser({
        ...user,
        ...profileData,
      });
    }
  };

  const refreshProfile = async () => {
    const stored = localStorage.getItem('auth_token');
    if (stored) {
      try {
        setIsLoading(true);
        const profileResponse = await getProfile(stored);
        setUser(profileResponse.user);
        setToken(stored);
      } catch (error) {
        console.error('Failed to refresh profile:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(token),
      isLoading,
      login,
      signup,
      loginWithGoogle: handleGoogleLogin,
      logout,
      updateProfile,
      refreshProfile,
    }),
    [user, token, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
