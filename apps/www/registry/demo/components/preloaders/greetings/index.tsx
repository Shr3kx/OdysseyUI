import GreetingPreloader from '@/registry/components/preloaders/greetings';

export default function DemoComponentsPreloadersGreetings() {
  return (
    <div className="relative flex min-h-50 w-full items-center justify-center overflow-hidden bg-background">
      <p className="text-md text-muted-foreground">
        Refresh to view loader again
      </p>

      <GreetingPreloader
        fullPage={false}
        greetings={[
          { text: 'Hello', language: 'English' },
          { text: 'Bonjour', language: 'French' },
          { text: '안녕하세요', language: 'Korean' },
          { text: 'Ciao', language: 'Italian' },
          { text: 'Hallo', language: 'German' },
          { text: 'नमस्ते', language: 'Hindi' },
          { text: 'こんにちは', language: 'Japanese' },
        ]}
      />
    </div>
  );
}
