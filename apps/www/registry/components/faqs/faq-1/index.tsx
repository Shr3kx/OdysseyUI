'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Link from 'next/link';

const faqItems = [
  {
    id: 'item-1',
    question: 'How do I get started with my first project?',
    answer:
      'Sign up for a free account, choose a template or start from scratch, and follow the guided onboarding flow. Most users have their first project live within minutes. Our interactive walkthrough covers everything from setup to first deployment.',
  },
  {
    id: 'item-2',
    question: 'Can I collaborate with my team in real time?',
    answer:
      'Yes. Invite teammates via email or shareable link. Everyone on the project sees live updates, can leave inline comments, and can edit simultaneously. Role-based permissions let you control who can view, edit, or publish.',
  },
  {
    id: 'item-3',
    question: 'What integrations are available?',
    answer:
      'We natively integrate with GitHub, GitLab, Figma, Slack, Linear, and Notion. You can also connect any tool via our webhook system or Zapier integration. Custom integrations are available on the Enterprise plan.',
  },
  {
    id: 'item-4',
    question: 'How are deployments handled?',
    answer:
      'Every push to your main branch triggers an automatic deployment with zero downtime. Preview deployments are created for every pull request so you can review changes before they go live. Rollbacks are one click away from the dashboard.',
  },
  {
    id: 'item-5',
    question: 'Is my content backed up automatically?',
    answer:
      'All content is versioned and backed up continuously. You can restore any file or entire project to any point in time from the last 90 days. Enterprise plans extend version history to 12 months.',
  },
  {
    id: 'item-6',
    question: 'How do I cancel or pause my subscription?',
    answer:
      'You can cancel or pause your subscription at any time from your account settings — no need to contact support. If you cancel, you keep access until the end of your billing period. Pausing freezes your data and billing for up to 3 months.',
  },
];

export default function FAQ1() {
  return (
    <section className="w-full">
      <div className="mx-auto max-w-2xl px-6">
        <h2 className="text-center font-serif text-4xl font-medium">
          Everything You Need to Know
        </h2>
        <Accordion type="single" collapsible className="mt-12">
          {faqItems.map((item) => (
            <div className="group" key={item.id}>
              <AccordionItem
                value={item.id}
                className="data-[state=open]:bg-muted/50 peer rounded-xl border-none px-5 py-1 transition-colors"
              >
                <AccordionTrigger className="cursor-pointer py-4 text-sm font-medium hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground pb-2 text-sm">
                    {item.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
              <hr className="mx-5 group-last:hidden peer-data-[state=open]:opacity-0" />
            </div>
          ))}
        </Accordion>
        <p className="text-muted-foreground mt-8 text-center text-sm">
          Still have questions?{' '}
          <Link href="#" className="text-primary font-medium hover:underline">
            Talk to our team
          </Link>
        </p>
      </div>
    </section>
  );
}
