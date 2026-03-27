'use client';

import { useState } from 'react';
import {
  ChatContainer,
  ChatContainerContent,
  ChatContainerMessage,
  ChatContainerEmptyState,
  ChatContainerDivider,
} from '@/registry/components/ai/chat-container';
import { Button } from '@/components/ui/button';
import PromptInput from '@/registry/components/ai/prompt-input';

type Message = {
  id: number;
  text: string;
  role: 'user' | 'ai';
};

const SAMPLE_MESSAGES: Omit<Message, 'id'>[] = [
  { role: 'user', text: 'Can you help me refactor this component?' },
  {
    role: 'ai',
    text: "Of course! Please share the component and I'll suggest improvements.",
  },
  { role: 'user', text: 'Here it is — it feels too verbose.' },
  {
    role: 'ai',
    text: 'I see a few places we can simplify. Let me walk you through them.',
  },
];

export const ChatContainerDemo = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [index, setIndex] = useState(0);

  const addMessage = () => {
    if (index >= SAMPLE_MESSAGES.length) return;
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), ...SAMPLE_MESSAGES[index] },
    ]);
    setIndex((i) => i + 1);
  };

  const reset = () => {
    setMessages([]);
    setIndex(0);
  };

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <ChatContainer className="h-96 w-full max-w-2xl">
        <ChatContainerContent>
          <ChatContainerEmptyState
            title="Ask me anything"
            description="Click the button below to simulate a conversation."
          />
          {messages.length > 0 && <ChatContainerDivider label="Today" />}
          {messages.map((msg) => (
            <ChatContainerMessage key={msg.id}>
              <div
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs rounded-2xl px-4 py-2 text-sm ${
                    msg.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-foreground'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            </ChatContainerMessage>
          ))}
        </ChatContainerContent>
      </ChatContainer>

      <div className="flex gap-2">
        <Button
          onClick={addMessage}
          disabled={index >= SAMPLE_MESSAGES.length}
          size="sm"
        >
          Add Message
        </Button>
        <Button onClick={reset} variant="outline" size="sm">
          Reset
        </Button>
      </div>
    </div>
  );
};
