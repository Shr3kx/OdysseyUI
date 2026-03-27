import {
  ChatContainer,
  ChatContainerContent,
  ChatContainerMessage,
  ChatContainerEmptyState,
  ChatContainerDivider,
} from '@/registry/components/ai/chat-container';
import {
  MessageBubble,
  MessageBubbleAvatar,
  MessageBubbleContent,
  MessageBubbleTimestamp,
} from '@/registry/components/ai/message-bubble';

type Role = 'user' | 'assistant';

interface Message {
  id: string;
  role: Role;
  content: string;
  timestamp: string;
}

const MESSAGES: Message[] = [
  {
    id: '1',
    role: 'user',
    content: 'Hey! Can you explain how compound components work in React?',
    timestamp: '10:41 AM',
  },
  {
    id: '2',
    role: 'assistant',
    content:
      'Sure! Compound components is a pattern where a parent component shares implicit state with its children via React Context. You export multiple sub-components that only make sense together — the parent owns the state, and children consume it without requiring you to thread props manually.',
    timestamp: '10:41 AM',
  },
  {
    id: '3',
    role: 'user',
    content: "That's clean. What's the main benefit over prop drilling?",
    timestamp: '10:42 AM',
  },
  {
    id: '4',
    role: 'assistant',
    content:
      "The API stays flexible without exploding the parent's prop surface. Consumers can reorder, omit, or swap sub-components freely. shadcn/ui is built almost entirely on this pattern.",
    timestamp: '10:42 AM',
  },
  {
    id: '5',
    role: 'user',
    content: 'This has been super helpful. Any recommended reading?',
    timestamp: '10:43 AM',
  },
  {
    id: '6',
    role: 'assistant',
    content:
      'Kent C. Dodds wrote the canonical article on his blog. The Radix UI source is also excellent reading — every primitive is a compound component with a clean context boundary.',
    timestamp: '10:43 AM',
  },
];

export const MessageBubbleDemo = () => {
  return (
    <ChatContainer className="h-[500px] w-full max-w-2xl">
      <ChatContainerContent>
        <ChatContainerEmptyState title="Ask me anything" />
        <ChatContainerDivider label="Today" />
        {MESSAGES.map((message) => (
          <ChatContainerMessage key={message.id}>
            <MessageBubble role={message.role}>
              <MessageBubbleAvatar
                src={
                  message.role === 'user'
                    ? 'https://github.com/shadcn.png'
                    : undefined
                }
              />
              <MessageBubbleContent>
                {message.content}
                <MessageBubbleTimestamp>
                  {message.timestamp}
                </MessageBubbleTimestamp>
              </MessageBubbleContent>
            </MessageBubble>
          </ChatContainerMessage>
        ))}
      </ChatContainerContent>
    </ChatContainer>
  );
};
