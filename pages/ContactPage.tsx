import { Helmet } from 'react-helmet-async';
import { ContactSection } from '../components/ContactSection';
import { SITE_URL, OG_IMAGE } from '../config/seo';

interface ContactPageProps {
  portfolioMode?: 'employee' | 'freelance';
}

const schemaBreadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Contacto', item: `${SITE_URL}/contacto` },
  ],
};

export function ContactPage({ portfolioMode = 'freelance' }: ContactPageProps) {
  const title = 'Contacto | Sebastián Cabrera — Desarrollador Web Lima';
  const description = 'Contáctame para cotizar tu proyecto web en Lima. Landing pages, sistemas web y desarrollo a medida. Respondo en menos de 24 horas.';

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`${SITE_URL}/contacto`} />
        <meta property="og:url" content={`${SITE_URL}/contacto`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={OG_IMAGE} />
        <script type="application/ld+json">{JSON.stringify(schemaBreadcrumb)}</script>
      </Helmet>

      <ContactSection portfolioMode={portfolioMode} headerVariant="magazine" headingLevel="h1" />
    </>
  );
}
