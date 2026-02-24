import { SplittingText } from '@/registry/primitives/texts/splitting';
import ReactIcon from '@workspace/ui/components/icons/react-icon';
import TSIcon from '@workspace/ui/components/icons/ts-icon';
import TailwindIcon from '@workspace/ui/components/icons/tailwind-icon';
import MotionIcon from '@workspace/ui/components/icons/motion-icon';
import ShadcnIcon from '@workspace/ui/components/icons/shadcn-icon';
import Link from 'next/link';
import { MotionEffect } from './effects/motion-effect';
import { PartyPopper } from '@/registry/icons/party-popper';

const ICONS = [ReactIcon, TSIcon, TailwindIcon, MotionIcon, ShadcnIcon];
const TITLE = 'Animate your UI with smooth style';

export const Hero = () => {
  return (
    <div className="relative overflow-x-hidden flex flex-col items-center px-5">
      <div className="relative z-10 flex flex-col items-center justify-center pt-30">
        <MotionEffect
          slide={{
            direction: 'down',
          }}
          fade
          zoom
          inView
        >
          <div className="mb-8 rounded-full bg-accent py-1 pl-1 pr-3 text-sm flex items-center gap-2">
            <Link
              href="/docs/primitives/effects/image-zoom"
              className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400"
            >
              <span className="h-6 px-2 bg-primary text-xs text-primary-foreground rounded-full flex gap-1 items-center justify-center">
                New
                <PartyPopper delay={500} className="size-3.5" animate />
              </span>{' '}
              <span>Image Zoom Effect</span>
            </Link>
          </div>
        </MotionEffect>

        <MotionEffect
          slide={{
            direction: 'down',
          }}
          fade
          zoom
          inView
          delay={0.15}
        >
          <div className="relative z-10">
            <h1 className="md:max-w-200 max-w-[320px]">
              <SplittingText
                text={TITLE}
                aria-hidden="true"
                className="block md:text-5xl text-4xl font-medium text-center text-neutral-200 dark:text-neutral-800"
                disableAnimation
              />
            </h1>
            <div className="md:max-w-200 max-w-[320px] absolute inset-0 flex items-center justify-center">
              <SplittingText
                text={TITLE}
                className="block md:text-5xl text-4xl font-medium text-center"
                type="chars"
                delay={400}
                initial={{ y: 0, opacity: 0, x: 0, filter: 'blur(10px)' }}
                animate={{ y: 0, opacity: 1, x: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              />
            </div>
          </div>
        </MotionEffect>

        <MotionEffect
          slide={{
            direction: 'down',
          }}
          fade
          zoom
          inView
          delay={0.3}
        >
          <p className="block font-normal md:text-lg sm:text-base text-sm text-center mt-3 text-muted-foreground md:max-w-165 sm:max-w-112.5 text-balance">
            A fully animated, open-source React component distribution. Browse a
            list of animated primitives, components and icons you can install
            and use in your projects.
          </p>
        </MotionEffect>

        <div className="flex sm:flex-row flex-col sm:gap-4 gap-3 mt-5 mb-8 max-sm:w-full">
          <MotionEffect
            slide={{
              direction: 'down',
            }}
            fade
            zoom
            delay={0.45}
          >
            <Link
              href="/docs/components"
              className="group relative flex flex-col items-center justify-center w-45 max-sm:w-full h-12.5 no-underline transition-transform active:scale-95 cursor-pointer outline-none [--glow:rgb(2,132,199)]  [--btn-bg:rgba(0,0,0,0.05)] dark:[--btn-bg:rgba(255,255,255,0.05)]"
              style={{ backgroundColor: 'var(--btn-bg)', borderRadius: '8px' }}
            >
              <div
                className="absolute inset-0 pointer-events-none transition-opacity ease-in-out duration-1200 opacity-100 group-hover:opacity-0"
                style={{
                  background:
                    'radial-gradient(15% 50% at 50% 100%, var(--glow) 0%, transparent 100%)',
                  borderRadius: '8px',
                  filter: 'blur(15px)',
                }}
              />
              <div
                className="absolute inset-0 pointer-events-none transition-opacity ease-in-out duration-1200 opacity-0 group-hover:opacity-100"
                style={{
                  background:
                    'radial-gradient(60.6% 50% at 50% 100%, var(--glow) 0%, transparent 100%)',
                  borderRadius: '8px',
                  filter: 'blur(18px)',
                }}
              />
              <div
                className="absolute inset-0 pointer-events-none will-change-auto transition-opacity ease-in-out duration-1200 opacity-100 group-hover:opacity-0"
                style={{
                  background:
                    'radial-gradient(10.7% 50% at 50% 100%, var(--glow) 0%, transparent 100%)',
                  borderRadius: '8px',
                }}
              />
              <div
                className="absolute inset-0 pointer-events-none will-change-auto transition-opacity ease-in-out duration-1200 opacity-0 group-hover:opacity-100"
                style={{
                  background:
                    'radial-gradient(60.1% 50% at 50% 100%, var(--glow) 0%, transparent 100%)',
                  borderRadius: '8px',
                }}
              />
              <div className="absolute inset-px pointer-events-none z-10 rounded-[7px] bg-neutral-50 dark:bg-black border" />
              <div className="relative z-20 flex flex-col items-center justify-center">
                <p
                  className="m-0 p-0 font-sans text-[15px] font-semibold text-black dark:text-white tracking-wide"
                  style={{ WebkitFontSmoothing: 'antialiased' }}
                >
                  Browse Components
                </p>
              </div>
            </Link>
          </MotionEffect>

          <MotionEffect
            slide={{
              direction: 'down',
            }}
            fade
            zoom
            delay={0.6}
          >
            <Link
              href="/docs/templates"
              className="group relative flex flex-col items-center justify-center w-45 max-sm:w-full h-12.5 no-underline transition-transform active:scale-95 cursor-pointer outline-none [--glow:rgb(0,0,0)] dark:[--glow:rgb(255,255,255)] [--btn-bg:rgba(0,0,0,0.05)] dark:[--btn-bg:rgba(255,255,255,0.05)]"
              style={{ backgroundColor: 'var(--btn-bg)', borderRadius: '8px' }}
            >
              <div
                className="absolute inset-0 pointer-events-none transition-opacity ease-in-out duration-1200 opacity-100 group-hover:opacity-0"
                style={{
                  background:
                    'radial-gradient(15% 50% at 50% 100%, var(--glow) 0%, transparent 100%)',
                  borderRadius: '8px',
                  filter: 'blur(15px)',
                }}
              />
              <div
                className="absolute inset-0 pointer-events-none transition-opacity ease-in-out duration-1200 opacity-0 group-hover:opacity-100"
                style={{
                  background:
                    'radial-gradient(60.6% 50% at 50% 100%, var(--glow) 0%, transparent 100%)',
                  borderRadius: '8px',
                  filter: 'blur(18px)',
                }}
              />
              <div
                className="absolute inset-0 pointer-events-none will-change-auto transition-opacity ease-in-out duration-1200 opacity-100 group-hover:opacity-0"
                style={{
                  background:
                    'radial-gradient(10.7% 50% at 50% 100%, var(--glow) 0%, transparent 100%)',
                  borderRadius: '8px',
                }}
              />
              <div
                className="absolute inset-0 pointer-events-none will-change-auto transition-opacity ease-in-out duration-1200 opacity-0 group-hover:opacity-100"
                style={{
                  background:
                    'radial-gradient(60.1% 50% at 50% 100%, var(--glow) 0%, transparent 100%)',
                  borderRadius: '8px',
                }}
              />
              <div className="absolute inset-px pointer-events-none z-10 rounded-[7px] bg-neutral-50 border dark:bg-black" />
              <div className="relative z-20 flex flex-col items-center justify-center">
                <p
                  className="m-0 p-0 font-sans text-[15px] font-semibold text-black dark:text-white tracking-wide"
                  style={{ WebkitFontSmoothing: 'antialiased' }}
                >
                  View Templates
                </p>
              </div>
            </Link>
          </MotionEffect>
        </div>

        <div className="flex items-center gap-4 justify-center sm:justify-start">
          {ICONS.map((Icon, index) => (
            <MotionEffect
              key={index}
              slide={{
                direction: 'down',
              }}
              fade
              zoom
              delay={0.75 + index * 0.1}
            >
              <Icon className="size-8" />
            </MotionEffect>
          ))}
        </div>
      </div>
    </div>
  );
};
