// Create an API service for chatting with the backend
const getServerUrl = () => {
  // Check if VITE_SERVER_URL is explicitly set
  if ((import.meta.env as { VITE_SERVER_URL?: string }).VITE_SERVER_URL) {
    return (import.meta.env as { VITE_SERVER_URL?: string }).VITE_SERVER_URL;
  }
  // Use production URL in production mode, localhost in dev mode
  return import.meta.env.MODE === 'production'
    ? 'https://ai-student-advisor.onrender.com'
    : 'http://localhost:3001';
};

const SERVER_URL = getServerUrl();

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
