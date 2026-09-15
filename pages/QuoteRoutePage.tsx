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

const schemaFAQ = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Incluyen revisiones?',
      acceptedAnswer: { '@type': 'Answer', text: 'Sí, revisiones ilimitadas hasta tu satisfacción completa.' },
    },
    {
      '@type': 'Question',
      name: '¿Cuánto demora?',
      acceptedAnswer: { '@type': 'Answer', text: 'Landing pages: 1-2 semanas. Proyectos complejos: 3-4 semanas.' },
    },
    {
      '@type': 'Question',
      name: '¿Formas de pago?',
      acceptedAnswer: { '@type': 'Answer', text: 'Transferencias, Yape, Plin, tarjetas. Plan: 50% inicio, 50% final.' },
    },
    {
      '@type': 'Question',
      name: '¿Qué incluye el soporte?',
      acceptedAnswer: { '@type': 'Answer', text: '30 días post-entrega para ajustes menores y resolución de dudas.' },
    },
  ],
};

export function QuoteRoutePage() {
  const navigate = useNavigate();
  const title = 'Precios de Páginas Web en Lima | Cotiza con Sebastián Cabrera';
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
        <script type="application/ld+json">{JSON.stringify(schemaFAQ)}</script>
      </Helmet>

      <QuotePage
        onNavigateToContact={() => navigate('/contacto')}
        headingLevel="h1"
      />
    </>
  );
}
