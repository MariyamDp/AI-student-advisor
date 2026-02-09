// Get server URL - always use localhost in development mode
const getServerUrl = () => {
  // In development mode, always use localhost
  if (import.meta.env.MODE === 'development' || import.meta.env.DEV) {
    return 'http://localhost:3001';
  }
  // In production, use VITE_SERVER_URL if set, otherwise default to localhost
  return (
    (import.meta.env as { VITE_SERVER_URL?: string }).VITE_SERVER_URL || 'http://localhost:3001'
  );
};

const SERVER_URL = getServerUrl();

export interface LoginResponse {
  token: string;
  user: { 
    email: string;
    id?: string;
    name?: string;
    major?: string;
    yearOfStudy?: string;
  };
}

export async function login(email: string, password: string): Promise<LoginResponse> {
  const res = await fetch(`${SERVER_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ error: 'Login failed' }));
    throw new Error(errorData.error || `Login error (${res.status})`);
  }
  return res.json();
}

export async function signup(email: string, password: string): Promise<LoginResponse> {
  const res = await fetch(`${SERVER_URL}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Signup error (${res.status}): ${text}`);
  }
  return res.json();
}

export async function getProfile(token: string): Promise<{ 
  user: { 
    email: string;
    id?: string;
    name?: string;
    major?: string;
    yearOfStudy?: string;
  } 
}> {
  const res = await fetch(`${SERVER_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Profile error (${res.status}): ${text}`);
  }
  return res.json();
}

export async function loginWithGoogle(idToken: string): Promise<LoginResponse> {
  const res = await fetch(`${SERVER_URL}/auth/google`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ idToken }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Google login error (${res.status}): ${text}`);
  }
  return res.json();
}

export interface ProfileUpdateData {
  name: string;
  major: string;
  yearOfStudy: string;
}

export async function updateProfile(
  token: string,
  data: ProfileUpdateData
): Promise<{ user: { email: string; name?: string; major?: string; yearOfStudy?: string }; token?: string }> {
  const res = await fetch(`${SERVER_URL}/auth/profile`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Profile update error (${res.status}): ${text}`);
  }
  return res.json();
}
