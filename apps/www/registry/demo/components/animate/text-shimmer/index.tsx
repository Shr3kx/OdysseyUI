import { ShimmerText } from '@/registry/components/animate/text-shimmer';

interface TextShimmerDemoProps {
  text?: string;
  duration?: number;
  delay?: number;
  spread?: number;
  repeat?: boolean;
  repeatDelay?: number;
  startOnView?: boolean;
  once?: boolean;
  color?: string;
  shimmerColor?: string;
}

export const TextShimmerDemo = ({
  text = 'Odyssey UI',
  duration = 1,
  delay = 0,
  spread = 2,
  repeat = true,
  repeatDelay = 0.5,
  startOnView = true,
  once = false,
  color,
  shimmerColor,
}: TextShimmerDemoProps) => {
  return (
    <ShimmerText
      key={`${text}-${duration}-${delay}-${spread}-${repeat}-${repeatDelay}-${startOnView}-${once}-${color}-${shimmerColor}`}
      text={text}
      duration={duration}
      delay={delay}
      spread={spread}
      repeat={repeat}
      repeatDelay={repeatDelay}
      startOnView={startOnView}
      once={once}
      color={color}
      shimmerColor={shimmerColor}
      className="text-4xl font-semibold"
    />
  );
};
