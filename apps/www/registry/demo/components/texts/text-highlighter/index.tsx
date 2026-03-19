import { TextHighlighter } from '@/registry/components/texts/text-highlighter';

interface TextHighlighterDemoProps {
  action?:
    | 'highlight'
    | 'underline'
    | 'box'
    | 'circle'
    | 'strike-through'
    | 'crossed-off'
    | 'bracket';
  color?: string;
  strokeWidth?: number;
  animationDuration?: number;
  iterations?: number;
  padding?: number;
  multiline?: boolean;
}

export const TextHighlighterDemo = ({
  action = 'highlight',
  color = '#51A2FF',
  strokeWidth = 1.5,
  animationDuration = 600,
  iterations = 2,
  padding = 2,
  multiline = true,
}: TextHighlighterDemoProps) => {
  return (
    <p className="text-2xl font-heading font-semibold leading-snug text-center p-10">
      <TextHighlighter
        key={`${action}-${color}-${strokeWidth}-${animationDuration}-${iterations}-${padding}-${multiline}`}
        action={action}
        color={color}
        strokeWidth={strokeWidth}
        animationDuration={animationDuration}
        iterations={iterations}
        padding={padding}
        multiline={multiline}
      >
        Good Design Whispers.
      </TextHighlighter>
    </p>
  );
};
