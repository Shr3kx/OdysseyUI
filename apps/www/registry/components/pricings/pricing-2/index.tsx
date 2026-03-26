'use client';

import Link from 'next/link';
import { Tick02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Button } from '@/components/ui/button';

export type Plan2 = {
  name: string;
  price: string;
  priceNote?: string;
  description: string;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
  footnote?: string;
  featured?: boolean;
};

const DEFAULT_PLANS: Plan2[] = [
  {
    name: 'Starter',
    price: 'Free Forever',
    description:
      'Launch your product with essential tools and credits for lean teams.',
    features: [
      '100 resume analysis credits',
      '3 AI interview credits*',
      'AI scoring and recommendations',
      'Team dashboards and heatmaps',
      'Email support',
    ],
    ctaLabel: 'Get Started',
    ctaHref: '#',
    footnote: '*one-time usage only',
  },
  {
    name: 'Pro',
    price: '$99',
    priceNote: '/ month',
    description:
      'Scale automation with deeper analytics, ATS workflows, and compliance reports.',
    features: [
      'Everything in Starter',
      '200 AI interview credits monthly',
      'Anti-fraud compliance reports',
      'Executive-ready hiring summaries',
      'Increased job posting limits',
    ],
    ctaLabel: 'Get Started',
    ctaHref: '#',
    featured: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description:
      'For global organizations requiring white-label controls, security reviews, and dedicated pods.',
    features: [
      'Everything in Pro',
      'Billing based AI interview credits',
      'White-label candidate experience',
      'Custom security and compliance reviews',
      'Dedicated support manager',
    ],
    ctaLabel: 'Contact Sales',
    ctaHref: '#',
  },
];

export default function Pricing2({
  plans = DEFAULT_PLANS,
}: {
  plans?: Plan2[];
}) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {plans.map((plan, index) =>
        plan.featured ? (
          <div key={index} className="relative">
            <span className="absolute inset-x-0 -top-3 z-10 mx-auto flex h-6 w-fit items-center rounded-full bg-linear-to-br/increasing from-purple-400 to-amber-300 px-3 py-1 text-xs font-medium text-amber-950 ring-1 ring-white/20 ring-offset-1 ring-offset-gray-950/5 ring-inset">
              Most Popular
            </span>
            <div className="h-full overflow-hidden rounded-2xl bg-linear-to-br/increasing from-purple-400 to-amber-300 p-0.5">
              <div className="flex h-full flex-col gap-6 rounded-3xl bg-card py-6 text-sm text-card-foreground">
                <div className="grid auto-rows-min items-start gap-2 px-6">
                  <div className="text-base font-medium">{plan.name}</div>
                  <span className="my-3 block font-mono text-2xl font-semibold">
                    {plan.price}{' '}
                    {plan.priceNote && (
                      <span className="text-base font-normal text-muted-foreground">
                        {plan.priceNote}
                      </span>
                    )}
                  </span>
                  <div className="text-sm text-muted-foreground">
                    {plan.description}
                  </div>
                </div>
                <div className="space-y-4 px-6">
                  <hr className="border-dashed" />
                  <ul className="list-outside space-y-3 text-sm">
                    {plan.features.map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <HugeiconsIcon
                          icon={Tick02Icon}
                          className="size-4 shrink-0"
                          strokeWidth={2}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                  {plan.footnote && (
                    <span className="text-xs text-muted-foreground">
                      {plan.footnote}
                    </span>
                  )}
                </div>
                <div className="mt-auto flex items-center px-6">
                  <Button asChild className="w-full">
                    <Link href={plan.ctaHref}>{plan.ctaLabel}</Link>
                  </Button>
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute right-0 bottom-0 z-10">
              <svg
                width="68"
                height="73"
                viewBox="0 0 100 107"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_16289_6901)">
                  <mask
                    id="mask0_16289_6901"
                    maskUnits="userSpaceOnUse"
                    x="40"
                    y="50"
                    width="56"
                    height="57"
                  >
                    <path
                      d="M39.9998 50.5806H95.6973V107H39.9998V50.5806Z"
                      fill="white"
                    />
                  </mask>
                  <g mask="url(#mask0_16289_6901)">
                    <path
                      d="M69.9252 89.58C73.0704 93.0761 76.0324 96.3914 79.0249 99.6765C80.7043 101.515 82.4449 103.293 84.1549 105.101C84.2465 105.222 84.3687 105.343 84.5213 105.433C86.8726 107.121 87.5749 107.422 89.6819 105.343C90.8728 104.137 92.2164 103.142 93.4684 101.997C94.0485 101.485 94.5676 100.942 95.0257 100.34C95.8196 99.345 95.7891 98.5614 94.9646 97.5969C94.476 97.0243 93.9875 96.4215 93.4684 95.879C89.1933 91.4185 84.9183 86.958 80.6433 82.4975C80.3074 82.1659 80.002 81.8043 79.6967 81.4727C81.8036 79.2425 83.8801 77.1328 85.926 74.9628C87.0253 73.7573 88.094 72.5517 89.1628 71.316C89.8651 70.5023 89.8651 69.779 89.0406 69.0858C88.491 68.6337 87.9108 68.272 87.239 68.0008C82.6586 66.0418 78.0783 63.9923 73.4063 62.2142C65.8639 59.3208 58.2299 56.6084 50.657 53.8055C48.7638 53.0822 46.9316 52.2985 45.0689 51.5752C44.3361 51.2437 43.5421 51.0026 42.7482 50.882C40.7634 50.6711 39.7557 51.9067 40.3969 53.8055C40.8855 55.222 41.4962 56.6084 42.0153 58.0249C45.7713 68.1213 49.4661 78.2479 53.2831 88.3444C54.474 91.4788 55.8176 94.5228 57.1306 97.5969C57.6192 98.7723 58.6574 99.134 59.8178 98.5011C60.459 98.1093 61.0392 97.6271 61.5889 97.0846C64.3676 94.6132 67.1464 92.1117 69.9557 89.58H69.9252Z"
                      fill="#FC787D"
                    />
                  </g>
                  <path
                    d="M74.3226 85.7219C77.4678 89.218 80.4298 92.5332 83.4223 95.8183C85.1018 97.6568 86.8424 99.435 88.5524 101.243C88.6745 101.364 88.7661 101.484 88.9188 101.575C91.2701 103.263 91.9724 103.564 94.0794 101.484C95.2703 100.279 96.6138 99.2843 97.8658 98.139C98.446 97.6266 98.9651 97.0842 99.4231 96.4814C100.217 95.4868 100.187 94.7032 99.3621 93.7388C98.8735 93.1661 98.3849 92.5634 97.8658 92.0209C93.5908 87.5603 89.3158 83.0998 85.0407 78.6393C84.7048 78.3078 84.3995 77.9461 84.0941 77.6146C86.2011 75.3843 88.2775 73.2746 90.3234 71.1047C91.4227 69.8991 92.4915 68.6936 93.5603 67.4579C94.2626 66.6441 94.2626 65.9208 93.4381 65.2276C92.8885 64.7755 92.3083 64.4139 91.6365 64.1426C87.0561 62.1836 82.4757 60.1342 77.8037 58.356C70.2614 55.4627 62.6274 52.7502 55.0545 49.9473C53.1612 49.224 51.3291 48.4404 49.4664 47.7171C48.7335 47.3855 47.9396 47.1444 47.1457 47.0239C45.1608 46.8129 44.1532 48.0486 44.7944 49.9473C45.283 51.3638 45.8632 52.7502 46.4128 54.1667C50.1687 64.2632 53.8636 74.3898 57.6806 84.4862C58.8715 87.6206 60.215 90.6646 61.5281 93.7388C62.0167 94.9142 63.0549 95.2758 64.2152 94.6429C64.8565 94.2511 65.4367 93.7689 65.9863 93.2264C68.7651 90.755 71.5439 88.2535 74.3532 85.7219H74.3226ZM90.4151 66.6743C87.0561 69.8388 84.033 72.7623 80.9184 75.6254C79.758 76.6803 79.5748 77.2228 80.4603 78.4886C80.6436 78.7599 80.8573 79.001 81.0711 79.2421C83.8804 82.3162 86.6591 85.4205 89.499 88.4946C91.6365 90.7852 93.8351 93.0154 96.1253 95.3964L91.3922 99.2843C90.1097 97.928 88.8883 96.7225 87.7279 95.4567C84.0636 91.4482 80.4603 87.4097 76.796 83.4314C75.2692 81.7737 74.3837 81.7134 72.5821 83.0998C70.5972 84.6068 68.643 86.1438 66.6887 87.6809C65.8947 88.3138 65.1619 89.007 64.2458 89.7906C59.36 77.042 54.5659 64.5043 49.7107 51.7858C63.3297 56.5175 76.8266 61.1589 90.4151 66.6743Z"
                    fill="#111827"
                  />
                </g>
                <path
                  d="M22.3014 47.4174C23.6909 47.8716 26.4496 48.0598 27.0463 49.2452C27.6431 50.4305 26.9813 53.9096 25.7888 54.676C19.6864 58.5783 13.2774 62.054 6.90495 65.42C5.97889 65.8862 4.51603 65.1369 3.2233 65.0407C3.55608 63.8771 3.55221 62.2273 4.31829 61.5926C9.89734 56.966 15.6997 52.6336 22.3047 47.4075L22.3014 47.4174Z"
                  fill="#FC787D"
                />
                <path
                  d="M1.49353 12.6065C4.64891 13.4167 6.04155 13.3796 6.97132 14.0653C11.7201 17.5428 16.499 21.0966 20.948 24.8081C21.8112 25.5273 21.8784 27.3196 22.2753 28.6055C20.8826 28.6426 19.1837 29.249 18.2273 28.6597C13.1155 25.7716 7.93373 22.761 3.2482 19.2433C2.08517 18.4261 2.28749 15.6764 1.48347 12.4373L1.48353 12.6032L1.49353 12.6065Z"
                  fill="#FC787D"
                />
                <path
                  d="M41.8549 0.723043C43.3847 2.43467 45.9407 4.04471 45.6712 5.16814C44.6468 10.5645 43.0893 15.8973 41.3253 21.168C41.0924 22.0324 39.3001 22.6027 38.0741 22.8049C37.6077 22.8737 36.4444 21.3925 36.4775 20.7948C37.3019 15.1671 38.3029 9.5418 39.3272 3.97943C39.4603 3.24842 40.253 2.6833 41.7483 0.859704L41.8482 0.726398L41.8549 0.723043Z"
                  fill="#FC787D"
                />
                <path
                  d="M48.3079 34.5076C49.7003 33.8066 50.6662 32.9053 51.8256 32.7366C57.366 32.0141 62.913 31.2882 68.4535 31.0636C69.6796 31.0273 71.5426 32.7372 72.1394 34.0885C72.4728 34.7507 70.4113 37.4404 69.5185 37.4749C62.9483 37.3131 56.3747 36.6468 49.8644 36.1228C49.5312 36.1246 49.1978 35.4624 48.3013 34.511L48.3079 34.5076Z"
                  fill="#FC787D"
                />
                <defs>
                  <clipPath id="clip0_16289_6901">
                    <rect
                      width="60"
                      height="60"
                      fill="white"
                      transform="matrix(-1 0 0 1 100 47)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>
        ) : (
          <div
            key={index}
            className="flex flex-col gap-6 rounded-2xl bg-card py-6 text-sm text-card-foreground ring-1 ring-foreground/10"
          >
            <div className="grid auto-rows-min items-start gap-2 px-6">
              <div className="text-base font-medium">{plan.name}</div>
              <span className="my-3 block font-mono text-2xl font-semibold">
                {plan.price}{' '}
                {plan.priceNote && (
                  <span className="text-base font-normal text-muted-foreground">
                    {plan.priceNote}
                  </span>
                )}
              </span>
              <div className="text-sm text-muted-foreground">
                {plan.description}
              </div>
            </div>
            <div className="space-y-4 px-6">
              <hr className="border-dashed" />
              <ul className="list-outside space-y-3 text-sm">
                {plan.features.map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <HugeiconsIcon
                      icon={Tick02Icon}
                      className="size-4 shrink-0 text-muted-foreground"
                      strokeWidth={2}
                    />
                    {item}
                  </li>
                ))}
              </ul>
              {plan.footnote && (
                <span className="text-xs text-muted-foreground">
                  {plan.footnote}
                </span>
              )}
            </div>
            <div className="mt-auto flex items-center px-6">
              <Button asChild variant="outline" className="w-full">
                <Link href={plan.ctaHref}>{plan.ctaLabel}</Link>
              </Button>
            </div>
          </div>
        ),
      )}
    </div>
  );
}
