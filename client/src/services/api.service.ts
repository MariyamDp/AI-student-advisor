// Create an API service for chatting with the backend
const SERVER_URL =
  (import.meta.env as { VITE_SERVER_URL?: string }).VITE_SERVER_URL ||
  'https://ai-student-advisor.onrender.com';

function getAuthHeader() {
  const token = localStorage.getItem('auth_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export interface ChatResponse {
  answer: string;
  conversationId?: string;
}

export async function sendChatMessage(
  query: string,
  conversationId?: string,
  inputs?: Record<string, string | number | boolean | null | undefined>
): Promise<ChatResponse> {
  const res = await fetch(`${SERVER_URL}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...getAuthHeader() } as HeadersInit | undefined,
    body: JSON.stringify({ query, conversationId, inputs }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Chat API error (${res.status}): ${text}`);
  }

  return res.json();
}
