'use client';

import {
  SidebarProvider,
  SidebarInset,
} from '@workspace/ui/components/ui/sidebar';
import { TooltipProvider } from '@/components/ui/tooltip';
import {
  AppShell1,
  AppShell1PageHeader,
} from '@/registry/components/app-shells/app-shell-1';

const demoUser = {
  name: 'John Doe',
  email: 'john@acme.com',
  avatar: '',
};

export function AppShell1Demo() {
  return (
    <div
      className="h-170 w-full overflow-hidden rounded-xl border"
      style={{ transform: 'translate(0)' }}
    >
      <TooltipProvider>
        <SidebarProvider>
          <AppShell1 user={demoUser} collapsibleSubsections />
          <SidebarInset>
            <AppShell1PageHeader
              pageName="Data Fetching"
              breadcrumbs={[
                { label: 'Build Your Application', href: '#' },
                { label: 'Data Fetching' },
              ]}
              user={demoUser}
            />
            <div className="flex flex-1 flex-col gap-4 p-4">
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
          </SidebarInset>
        </SidebarProvider>
      </TooltipProvider>
    </div>
  );
}

export default AppShell1Demo;
