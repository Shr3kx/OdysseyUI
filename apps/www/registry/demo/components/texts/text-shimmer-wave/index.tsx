import { TextShimmerWave } from '@/registry/components/texts/text-shimmer-wave';

interface TextShimmerWaveDemoProps {
  children?: string;
  color?: string;
  shimmerColor?: string;
  duration?: number;
  zDistance?: number;
  xDistance?: number;
  yDistance?: number;
  spread?: number;
  scaleDistance?: number;
  rotateYDistance?: number;
}

export const TextShimmerWaveDemo = ({
  children = 'Odyssey UI',
  color = '#a1a1aa',
  shimmerColor = '#ffffff',
  duration = 1,
  zDistance = 10,
  xDistance = 2,
  yDistance = -2,
  spread = 1,
  scaleDistance = 1.1,
  rotateYDistance = 10,
}: TextShimmerWaveDemoProps) => {
  return (
    <div className="flex items-center justify-center p-10">
      <TextShimmerWave
        key={`${children}-${color}-${shimmerColor}-${duration}-${zDistance}-${xDistance}-${yDistance}-${spread}-${scaleDistance}-${rotateYDistance}`}
        color={color}
        shimmerColor={shimmerColor}
        duration={duration}
        zDistance={zDistance}
        xDistance={xDistance}
        yDistance={yDistance}
        spread={spread}
        scaleDistance={scaleDistance}
        rotateYDistance={rotateYDistance}
        className="text-4xl font-semibold tracking-tight"
      >
        {children}
      </TextShimmerWave>
    </div>
  );
};
