'use client';

import React from 'react';
import { SidebarProvider } from '@workspace/ui/components/ui/sidebar';
import { TooltipProvider } from '@/components/ui/tooltip';
import {
  AppShell2,
  AppShell2PageHeader,
} from '@/registry/components/app-shells/app-shell-2';

const demoUser = {
  name: 'Jane Smith',
  email: 'jane@acme.com',
  avatar: '',
};

export default function AppShell2Demo() {
  return (
    <div
      className="h-170 w-full overflow-hidden rounded-xl border"
      style={{ transform: 'translate(0)' }}
    >
      <TooltipProvider>
        <SidebarProvider className="bg-muted">
          <AppShell2 user={demoUser} collapsibleSubsections />
          <main className="relative flex min-h-0 w-full flex-1 flex-col overflow-hidden bg-background md:my-2 md:mr-2 md:rounded-xl md:shadow-sm">
            <div className="flex h-full flex-1 flex-col overflow-hidden">
              <AppShell2PageHeader
                pageName="Data Fetching"
                breadcrumbs={[
                  { label: 'Platform', href: '/playground' },
                  { label: 'Data Fetching' },
                ]}
                user={demoUser}
              />
              <div className="flex flex-1 flex-col gap-4 overflow-auto p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                  <div className="aspect-video rounded-xl bg-muted/70" />
                  <div className="aspect-video rounded-xl bg-muted/70" />
                  <div className="aspect-video rounded-xl bg-muted/70" />
                </div>
                <div className="min-h-75 flex-1 rounded-xl bg-muted/70" />
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                  <div className="aspect-video rounded-xl bg-muted/70" />
                  <div className="aspect-video rounded-xl bg-muted/70" />
                  <div className="aspect-video rounded-xl bg-muted/70" />
                </div>
              </div>
            </div>
          </main>
        </SidebarProvider>
      </TooltipProvider>
    </div>
  );
}
