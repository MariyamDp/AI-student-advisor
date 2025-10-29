import { useState, useCallback } from 'react';

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

  const sendMessage = useCallback(async (content: string) => {
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
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock AI responses based on user input
      let aiResponse = "I understand you're asking about this topic. Let me help you with that.";

      if (content.toLowerCase().includes('gpa')) {
        aiResponse =
          "I understand you're asking about your GPA. Let me help you with that. Based on your current academic progress, I recommend checking your milestones page to see your next steps.";
      } else if (content.toLowerCase().includes('prerequisite')) {
        aiResponse =
          "I can help you check prerequisites for your courses. Please specify which course you're interested in, and I'll provide detailed prerequisite information.";
      } else if (content.toLowerCase().includes('milestone')) {
        aiResponse =
          'Your academic milestones are important for tracking your progress. I can help you understand what milestones you need to complete and when.';
      } else if (content.toLowerCase().includes('course')) {
        aiResponse =
          "I can assist you with course-related questions. Whether it's about registration, prerequisites, or course planning, I'm here to help.";
      } else if (content.toLowerCase().includes('registration')) {
        aiResponse =
          'Course registration can be complex. I can guide you through the process and help you understand the requirements and deadlines.';
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        sender: 'ai',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm sorry, I encountered an error. Please try again.",
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([
      {
        id: '1',
        content: "Hello! I'm your MNU Academic Assistant. How can I help you today?",
        sender: 'ai',
        timestamp: new Date(),
      },
    ]);
  }, []);

  return {
    messages,
    isLoading,
    sendMessage,
    clearMessages,
  };
};
