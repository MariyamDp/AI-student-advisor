import { useState, useCallback } from 'react';
import { sendChatMessage } from '../services/api.service';
import { formatAiResponse, formatUserMessage } from '../utils/messageFormatting';
import { useAuth } from '../context/AuthContext';

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  isHtml?: boolean;
}

export const useChat = () => {
  const { user, refreshProfile } = useAuth();
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
        content: formatUserMessage(content.trim()),
        sender: 'user',
        timestamp: new Date(),
        isHtml: true,
      };

      setMessages(prev => [...prev, userMessage]);
      setIsLoading(true);

      try {
        // Refresh profile data if missing to ensure we have latest data from JWT
        let currentUser = user;
        if (!user?.major || !user?.yearOfStudy) {
          console.log('Profile data missing, refreshing...');
          if (refreshProfile) {
            await refreshProfile();
            // Get updated user from context - we'll need to wait for next render
            // For now, try to get it from localStorage token
            const { getProfile } = await import('../services/auth.service');
            const token = localStorage.getItem('auth_token');
            if (token) {
              const profileResponse = await getProfile(token);
              currentUser = profileResponse.user;
            }
          }
        }

        // Debug: Log user object to see what data we have
        console.log('Current user object:', currentUser);
        console.log('User yearOfStudy:', currentUser?.yearOfStudy);
        console.log('User major:', currentUser?.major);

        // Prepare inputs for Dify API - student_year and major are used to personalize responses
        const inputs: Record<string, string | number | boolean | null | undefined> = {};
        if (currentUser?.yearOfStudy) {
          inputs.student_year = currentUser.yearOfStudy;
        } else {
          // If yearOfStudy is not set, show a helpful error message
          throw new Error(
            'Please complete your profile with your year of study to use the chat assistant.'
          );
        }
        if (currentUser?.major) {
          inputs.student_major = currentUser.major;
        } else {
          // If major is not set, show a helpful error message
          throw new Error(
            'Please complete your profile with your major to use the chat assistant.'
          );
        }

        // Debug: Log inputs being sent to API
        console.log('Sending chat message with inputs:', inputs);

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
          content: formatAiResponse(answer || "I'm not sure about that yet."),
          sender: 'ai',
          timestamp: new Date(),
          isHtml: true,
        };

        setMessages(prev => [...prev, aiMessage]);
      } catch (error) {
        console.error('Error sending message:', error);
        const details = error instanceof Error ? error.message : 'Unknown error';
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: formatAiResponse(`I'm sorry, I encountered an error. ${details}`),
          sender: 'ai',
          timestamp: new Date(),
          isHtml: true,
        };
        setMessages(prev => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    },
    [conversationId, user, refreshProfile]
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
