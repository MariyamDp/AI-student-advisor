import { useState, useCallback } from 'react';
import { sendChatMessage } from '../services/api.service';
import { useAuth } from '../context/AuthContext';

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export const useChat = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your MNU Academic Assistant. How can I help you today?",
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | undefined>(undefined);

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim()) return;

      const userMessage: Message = {
        id: Date.now().toString(),
        content: content.trim(),
        sender: 'user',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, userMessage]);
      setIsLoading(true);

      try {
        // Prepare inputs for Dify API - student_year is required
        const inputs: Record<string, string | number | boolean | null | undefined> = {};
        if (user?.yearOfStudy) {
          inputs.student_year = user.yearOfStudy;
        } else {
          // If yearOfStudy is not set, show a helpful error message
          throw new Error('Please complete your profile with your year of study to use the chat assistant.');
        }

        const { answer, conversationId: newConversationId } = await sendChatMessage(
          content.trim(),
          conversationId,
          inputs
        );
        if (newConversationId && newConversationId !== conversationId) {
          setConversationId(newConversationId);
        }

        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: answer || "I'm not sure about that yet.",
          sender: 'ai',
          timestamp: new Date(),
        };

        setMessages(prev => [...prev, aiMessage]);
      } catch (error) {
        console.error('Error sending message:', error);
        const details = error instanceof Error ? error.message : 'Unknown error';
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: `I'm sorry, I encountered an error. ${details}`,
          sender: 'ai',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    },
    [conversationId, user]
  );

  const clearMessages = useCallback(() => {
    setMessages([
      {
        id: '1',
        content: "Hello! I'm your MNU Academic Assistant. How can I help you today?",
        sender: 'ai',
        timestamp: new Date(),
      },
    ]);
    setConversationId(undefined);
  }, []);

  return {
    messages,
    isLoading,
    sendMessage,
    clearMessages,
    conversationId,
  };
};
