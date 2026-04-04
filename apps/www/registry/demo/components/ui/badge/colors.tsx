import { Badge } from '@/registry/components/ui/badge';

const COLOR_VARIANTS = [
  'red',
  'blue',
  'green',
  'yellow',
  'purple',
  'pink',
  'orange',
  'cyan',
  'indigo',
  'violet',
  'rose',
  'amber',
  'lime',
  'emerald',
  'sky',
  'slate',
  'fuchsia',
] as const;

export const BadgeColorsDemo = () => {
  return (
    <div className="flex flex-wrap gap-2 p-4 justify-center">
      {COLOR_VARIANTS.map((variant) => (
        <Badge key={variant} variant={variant}>
          {variant.charAt(0).toUpperCase() + variant.slice(1)}
        </Badge>
      ))}
    </div>
  );
};
