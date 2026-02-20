export const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': 'https://odysseyui.com/#website',
      url: 'https://odysseyui.com',
      name: 'Odyssey UI',
      description:
        'Fully animated, open-source component distribution built with React, TypeScript, Tailwind CSS, Motion and Shadcn CLI. Browse a list of components you can install, modify, and use in your projects.',
      inLanguage: 'en',
      publisher: {
        '@id': 'https://odysseyui.com/#organization',
      },
    },
    {
      '@type': 'Organization',
      '@id': 'https://odysseyui.com/#organization',
      name: 'Odyssey UI',
      url: 'https://odysseyui.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://odysseyui.com/icon-logo.png',
        width: 512,
        height: 512,
      },
    },
  ],
};
