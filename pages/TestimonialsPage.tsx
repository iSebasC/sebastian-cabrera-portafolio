import { Helmet } from 'react-helmet-async';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { FinalCTASection } from '../components/FinalCTASection';
import { SITE_URL, OG_IMAGE } from '../config/seo';

interface TestimonialsPageProps {
  portfolioMode?: 'employee' | 'freelance';
}

const schemaBreadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Testimonios', item: `${SITE_URL}/testimonios` },
  ],
};

export function TestimonialsPage({ portfolioMode = 'freelance' }: TestimonialsPageProps) {
  const title = 'Testimonios | Sebastián Cabrera — Desarrollo Web Lima';
  const description = 'Opiniones reales de clientes sobre proyectos de desarrollo web, landing pages y sistemas web en Lima, Perú.';

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`${SITE_URL}/testimonios`} />
        <meta property="og:url" content={`${SITE_URL}/testimonios`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={OG_IMAGE} />
        <script type="application/ld+json">{JSON.stringify(schemaBreadcrumb)}</script>
      </Helmet>

      <TestimonialsSection portfolioMode={portfolioMode} headerVariant="magazine" headingLevel="h1" />

      <FinalCTASection />
    </>
  );
}
