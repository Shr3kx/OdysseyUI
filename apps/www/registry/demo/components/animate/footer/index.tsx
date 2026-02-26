import Footer from '@/registry/components/animate/footer';
import { ArrowDown } from 'lucide-react';

interface FooterDemoProps {
  theme: 'ocean' | 'amber' | 'emerald' | 'violet' | 'rose';
}

export const FooterDemo = ({ theme = 'amber' }: FooterDemoProps) => {
  return (
    <div className="relative mx-auto h-100 w-full overflow-hidden rounded-lg transform-[translateZ(0)]">
      <div className="sticky top-3 z-30 flex flex-col items-center gap-2 mx-auto w-fit font-medium text-muted-foreground">
        <span>Scroll down</span>
        <ArrowDown className="animate-bounce size-4" />
      </div>
      <div className="h-24" />
      <Footer
        theme={theme}
        copyrightText={`copyright © ${new Date().getFullYear()} — Odyssey UI`}
      />
    </div>
  );
};
