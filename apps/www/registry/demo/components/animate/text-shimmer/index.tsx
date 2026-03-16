import { ShimmerText } from '@/registry/components/animate/text-shimmer';

interface TextShimmerDemoProps {
  text: string;
  duration: number;
  spread: number;
}

export const TextShimmerDemo = ({
  text = 'Odyssey UI',
  duration = 1,
  spread = 2,
}: TextShimmerDemoProps) => {
  return (
    <ShimmerText
      key={`${text}-${duration}-${spread}`}
      text={text}
      duration={duration}
      spread={spread}
      className="text-4xl font-semibold"
    />
  );
};
