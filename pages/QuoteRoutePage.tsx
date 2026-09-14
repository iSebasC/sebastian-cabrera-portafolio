import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { QuotePage } from '../components/QuotePage';
import { SITE_URL, OG_IMAGE } from '../config/seo';

const schemaBreadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Cotizar', item: `${SITE_URL}/cotizar` },
  ],
};

export function QuoteRoutePage() {
  const navigate = useNavigate();
  const title = 'Cotiza tu Proyecto Web | Sebastián Cabrera — Lima';
  const description = 'Calcula el precio de tu proyecto web en minutos. Landing pages, sistemas web y desarrollo a medida en Lima, Perú. Respuesta en 24 horas.';

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`${SITE_URL}/cotizar`} />
        <meta property="og:url" content={`${SITE_URL}/cotizar`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={OG_IMAGE} />
        <script type="application/ld+json">{JSON.stringify(schemaBreadcrumb)}</script>
      </Helmet>

      <QuotePage
        onNavigateToContact={() => navigate('/contacto')}
        headingLevel="h1"
      />
    </>
  );
}
