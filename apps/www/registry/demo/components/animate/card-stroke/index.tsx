import CardStroke from '@/registry/components/animate/card-stroke';

interface CardStrokeDemoProps {
  accentStrokeColor: string;
  baseStrokeColor: string;
  textColor: string;
}

export function CardStrokeDemo({
  accentStrokeColor,
  baseStrokeColor,
  textColor,
}: CardStrokeDemoProps) {
  return (
    <div className="mx-auto w-full max-w-xl">
      <CardStroke
        accentStrokeColor={accentStrokeColor}
        baseStrokeColor={baseStrokeColor}
        textColor={textColor}
        imageSrc="/templateImages/placeholder.png"
        imageAlt="Placeholder preview image"
      />
    </div>
  );
}
