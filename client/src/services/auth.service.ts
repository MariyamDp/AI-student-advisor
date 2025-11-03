const SERVER_URL = (import.meta as any).env?.VITE_SERVER_URL || 'http://localhost:3001';

export interface LoginResponse {
  token: string;
  user: { email: string };
}

export async function login(email: string): Promise<LoginResponse> {
  const res = await fetch(`${SERVER_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Login error (${res.status}): ${text}`);
  }
  return res.json();
}

export async function signup(email: string): Promise<LoginResponse> {
  const res = await fetch(`${SERVER_URL}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Signup error (${res.status}): ${text}`);
  }
  return res.json();
}

export async function getProfile(token: string): Promise<{ user: { email: string } }> {
  const res = await fetch(`${SERVER_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Profile error (${res.status}): ${text}`);
  }
  return res.json();
}


