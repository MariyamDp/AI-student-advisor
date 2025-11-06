import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getProfile, login as loginApi, signup as signupApi, loginWithGoogle } from '../services/auth.service';

interface User { email: string }

interface AuthContextValue {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  loginWithGoogle: (idToken: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

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
        });
    }
  }, []);

  const login = async (email: string) => {
    const res = await loginApi(email);
    localStorage.setItem('auth_token', res.token);
    setToken(res.token);
    setUser(res.user);
  };

  const signup = async (email: string, password: string) => {
    const res = await signupApi(email, password);
    localStorage.setItem('auth_token', res.token);
    setToken(res.token);
    setUser(res.user);
  };

  const handleGoogleLogin = async (idToken: string) => {
    const res = await loginWithGoogle(idToken);
    localStorage.setItem('auth_token', res.token);
    setToken(res.token);
    setUser(res.user);
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    setToken(null);
    setUser(null);
  };

  const value = useMemo<AuthContextValue>(() => ({
    user,
    token,
    isAuthenticated: Boolean(token),
    login,
    signup,
    loginWithGoogle: handleGoogleLogin,
    logout,
  }), [user, token]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};


