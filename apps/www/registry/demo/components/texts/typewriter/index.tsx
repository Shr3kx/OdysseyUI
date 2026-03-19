import { Typewriter } from '@/registry/components/texts/typewriter';

type TypewriterDemoProps = {
  typingSpeed?: number;
  deleteSpeed?: number;
  pauseBeforeDelete?: number;
  loopDelay?: number;
  autoLoop?: boolean;
  naturalVariance?: boolean;
};

export const TypewriterDemo = ({
  typingSpeed = 100,
  deleteSpeed = 40,
  pauseBeforeDelete = 1600,
  loopDelay = 1200,
  autoLoop = true,
  naturalVariance = true,
}: TypewriterDemoProps) => {
  return (
    <div className="flex items-center justify-center p-10">
      <Typewriter
        key={`${typingSpeed}-${deleteSpeed}-${pauseBeforeDelete}-${loopDelay}-${autoLoop}-${naturalVariance}`}
        sequences={[
          { text: 'Full-Stack Developer', deleteAfter: true },
          { text: 'UI/UX Enthusiast', deleteAfter: true },
          { text: 'Open to remote work', deleteAfter: false },
        ]}
        typingSpeed={typingSpeed}
        deleteSpeed={deleteSpeed}
        pauseBeforeDelete={pauseBeforeDelete}
        loopDelay={loopDelay}
        autoLoop={autoLoop}
        naturalVariance={naturalVariance}
        className="font-mono text-3xl tracking-tight text-foreground md:text-5xl"
      />
    </div>
  );
};
