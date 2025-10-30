import { useState, useCallback } from 'react';
import { sendChatMessage } from '../services/api.service';

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export const useChat = () => {
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
        const { answer, conversationId: newConversationId } = await sendChatMessage(
          content.trim(),
          conversationId
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
    [conversationId]
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
