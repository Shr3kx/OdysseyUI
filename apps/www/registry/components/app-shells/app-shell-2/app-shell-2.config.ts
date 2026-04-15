export interface SidebarMenuItem {
  title: string;
  href: string;
  icon: string;
  keywords?: string[];
}

export interface SidebarSection {
  label: string;
  items: SidebarMenuItem[];
}

export interface SidebarCompany {
  name: string;
  subtitle: string;
  logo?: string;
}

export interface AppShell2Config {
  company: SidebarCompany;
  sections: SidebarSection[];
}

export const appShell2Config: AppShell2Config = {
  company: {
    name: 'Acme Inc',
    subtitle: 'Enterprise',
    logo: '',
  },
  sections: [
    {
      label: 'Platform',
      items: [
        {
          title: 'Playground',
          href: '/playground',
          icon: 'SquareTerminal',
          keywords: ['playground', 'terminal', 'code'],
        },
        {
          title: 'Models',
          href: '/models',
          icon: 'Bot',
          keywords: ['models', 'ai', 'machine learning'],
        },
        {
          title: 'Documentation',
          href: '/documentation',
          icon: 'BookOpen',
          keywords: ['docs', 'documentation', 'guides'],
        },
        {
          title: 'Settings',
          href: '/settings',
          icon: 'Settings2',
          keywords: ['settings', 'preferences', 'config'],
        },
      ],
    },
    {
      label: 'Projects',
      items: [
        {
          title: 'Design Engineering',
          href: '/projects/design-engineering',
          icon: 'Frame',
          keywords: ['design', 'engineering', 'ui'],
        },
        {
          title: 'Sales & Marketing',
          href: '/projects/sales-marketing',
          icon: 'PieChart',
          keywords: ['sales', 'marketing', 'analytics'],
        },
        {
          title: 'Travel',
          href: '/projects/travel',
          icon: 'Map',
          keywords: ['travel', 'trips', 'locations'],
        },
      ],
    },
    {
      label: 'Platform 2',
      items: [
        {
          title: 'Playground',
          href: '/playground',
          icon: 'SquareTerminal',
          keywords: ['playground', 'terminal', 'code'],
        },
        {
          title: 'Models',
          href: '/models',
          icon: 'Bot',
          keywords: ['models', 'ai', 'machine learning'],
        },
        {
          title: 'Documentation',
          href: '/documentation',
          icon: 'BookOpen',
          keywords: ['docs', 'documentation', 'guides'],
        },
        {
          title: 'Settings',
          href: '/settings',
          icon: 'Settings2',
          keywords: ['settings', 'preferences', 'config'],
        },
      ],
    },
    {
      label: 'Projects 2',
      items: [
        {
          title: 'Design Engineering',
          href: '/projects/design-engineering',
          icon: 'Frame',
          keywords: ['design', 'engineering', 'ui'],
        },
        {
          title: 'Sales & Marketing',
          href: '/projects/sales-marketing',
          icon: 'PieChart',
          keywords: ['sales', 'marketing', 'analytics'],
        },
        {
          title: 'Travel',
          href: '/projects/travel',
          icon: 'Map',
          keywords: ['travel', 'trips', 'locations'],
        },
      ],
    },
    {
      label: 'Platform 3',
      items: [
        {
          title: 'Playground',
          href: '/playground',
          icon: 'SquareTerminal',
          keywords: ['playground', 'terminal', 'code'],
        },
        {
          title: 'Models',
          href: '/models',
          icon: 'Bot',
          keywords: ['models', 'ai', 'machine learning'],
        },
        {
          title: 'Documentation',
          href: '/documentation',
          icon: 'BookOpen',
          keywords: ['docs', 'documentation', 'guides'],
        },
        {
          title: 'Settings',
          href: '/settings',
          icon: 'Settings2',
          keywords: ['settings', 'preferences', 'config'],
        },
      ],
    },
    {
      label: 'Projects 3',
      items: [
        {
          title: 'Design Engineering',
          href: '/projects/design-engineering',
          icon: 'Frame',
          keywords: ['design', 'engineering', 'ui'],
        },
        {
          title: 'Sales & Marketing',
          href: '/projects/sales-marketing',
          icon: 'PieChart',
          keywords: ['sales', 'marketing', 'analytics'],
        },
        {
          title: 'Travel',
          href: '/projects/travel',
          icon: 'Map',
          keywords: ['travel', 'trips', 'locations'],
        },
      ],
    },
  ],
};
