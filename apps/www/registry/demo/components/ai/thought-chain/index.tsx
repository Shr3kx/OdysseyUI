import {
  ThoughtChain,
  ThoughtChainStep,
  ThoughtChainTrigger,
  ThoughtChainContent,
  ThoughtChainItem,
} from '@/registry/components/ai/thought-chain';

export const ThoughtChainDemo = () => {
  return (
    <ThoughtChain>
      <ThoughtChainStep status="done">
        <ThoughtChainTrigger>Understanding the codebase</ThoughtChainTrigger>

        <ThoughtChainContent>
          <ThoughtChainItem>
            Scanned 47 files across src/ and packages/
          </ThoughtChainItem>

          <ThoughtChainItem>
            Identified React 18 with TypeScript and Tailwind CSS
          </ThoughtChainItem>

          <ThoughtChainItem>No existing auth layer detected</ThoughtChainItem>
        </ThoughtChainContent>
      </ThoughtChainStep>

      <ThoughtChainStep status="active">
        <ThoughtChainTrigger>Planning the implementation</ThoughtChainTrigger>

        <ThoughtChainContent>
          <ThoughtChainItem>
            Choosing NextAuth.js for session management
          </ThoughtChainItem>

          <ThoughtChainItem>
            Designing protected route middleware
          </ThoughtChainItem>
        </ThoughtChainContent>
      </ThoughtChainStep>

      <ThoughtChainStep status="pending">
        <ThoughtChainTrigger>Writing the code</ThoughtChainTrigger>

        <ThoughtChainContent>
          <ThoughtChainItem>auth.ts — provider config</ThoughtChainItem>

          <ThoughtChainItem>middleware.ts — route protection</ThoughtChainItem>

          <ThoughtChainItem>SessionProvider wrapper</ThoughtChainItem>
        </ThoughtChainContent>
      </ThoughtChainStep>
    </ThoughtChain>
  );
};
