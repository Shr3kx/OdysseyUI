import { TextReveal } from '@/registry/components/texts/text-reveal';

interface TextRevealDemoProps {
  children?: string;
  speed?: number;
  delay?: number;
  triggerOnView?: boolean;
  once?: boolean;
  preset?: 'default' | 'binary' | 'cyberpunk' | 'minimal';
}

export const TextRevealDemo = ({
  children = 'Odyssey UI',
  speed = 20,
  delay = 0,
  triggerOnView = false,
  once = true,
  preset = 'default',
}: TextRevealDemoProps) => {
  return (
    <div className="flex items-center justify-center p-10">
      <TextReveal
        key={`${children}-${speed}-${delay}-${triggerOnView}-${once}-${preset}`}
        speed={speed}
        delay={delay}
        triggerOnView={triggerOnView}
        once={once}
        preset={preset}
        className="text-4xl"
      >
        {children}
      </TextReveal>
    </div>
  );
};
