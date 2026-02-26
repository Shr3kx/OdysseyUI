import CardStroke from '@/registry/components/animate/card-stroke';

interface CardStrokeDemoProps {
  title: string;
  description: string;
  accentStrokeColor: string;
  baseStrokeColor: string;
  textColor: string;
}

export function CardStrokeDemo({
  title,
  description,
  accentStrokeColor,
  baseStrokeColor,
  textColor,
}: CardStrokeDemoProps) {
  return (
    <div className="mx-auto w-full max-w-xl">
      <CardStroke
        title={title}
        description={description}
        accentStrokeColor={accentStrokeColor}
        baseStrokeColor={baseStrokeColor}
        textColor={textColor}
        imageSrc="/templateImages/placeholder.png"
        imageAlt="Placeholder preview image"
      />
    </div>
  );
}
