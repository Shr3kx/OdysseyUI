import Footer from '@/registry/components/animate/footer';

export const FooterDemo = () => {
  const footerColors = {
    text: '#451A03',
    gradient: [
      '#FEF3C7',
      '#FCD34D',
      '#F59E0B',
      '#D97706',
      '#B45309',
      '#92400E',
      '#78350F',
      '#451A03',
    ],
  };
  return (
    <Footer
      colors={footerColors}
      copyrightText={`copyright © ${new Date().getFullYear()} — Odyssey UI`}
    />
  );
};
