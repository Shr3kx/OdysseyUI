import { Button } from '@/registry/components/buttons/button';

const VARIANTS = [
  'default',
  'accent',
  'outline',
  'secondary',
  'ghost',
  'destructive',
  'link',
  'odysseyui',
] as const;

export const ButtonDemo = () => {
  return (
    <div className="flex flex-wrap gap-3 p-4 justify-center items-center">
      {VARIANTS.map((variant) => (
        <Button key={variant} variant={variant} size="default">
          {variant.charAt(0).toUpperCase() + variant.slice(1)}
        </Button>
      ))}
    </div>
  );
};
