export const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': 'https://animate-ui.com/#website',
      url: 'https://animate-ui.com',
      name: 'Odyssey UI',
      description:
        'Fully animated, open-source component distribution built with React, TypeScript, Tailwind CSS, Motion and Shadcn CLI. Browse a list of components you can install, modify, and use in your projects.',
      inLanguage: 'en',
      publisher: {
        '@id': 'https://animate-ui.com/#organization',
      },
    },
    {
      '@type': 'Organization',
      '@id': 'https://animate-ui.com/#organization',
      name: 'Odyssey UI',
      url: 'https://animate-ui.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://animate-ui.com/icon-logo.png',
        width: 512,
        height: 512,
      },
    },
  ],
};
