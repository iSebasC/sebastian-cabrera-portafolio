import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { SITE_URL, OG_IMAGE } from '../config/seo';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Landing Pages de Alta Conversión — Lima',
  description: 'Diseño y desarrollo de landing pages de alta conversión en Lima, Perú.',
  provider: { '@type': 'Person', name: 'Sebastián Cabrera', url: SITE_URL },
  areaServed: { '@type': 'City', name: 'Lima', addressCountry: 'PE' },
  url: `${SITE_URL}/landing-pages`,
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Landing Pages', item: `${SITE_URL}/landing-pages` },
    ],
  },
};

const included = [
  'Diseño responsivo para móvil, tablet y desktop',
  'Estructura persuasiva orientada a conversión',
  'Formulario de contacto o captura de leads',
  'SEO técnico básico (meta, canonical, schema)',
  'Velocidad optimizada (Core Web Vitals)',
  'Animaciones y microinteracciones',
  'Entrega en 1 a 2 semanas',
  '30 días de soporte post-entrega',
];

const useCases = [
  {
    title: 'Negocios que quieren captar clientes online',
    desc: 'Si tu negocio necesita presencia digital para generar leads o ventas, una landing page bien estructurada es el punto de partida.',
  },
  {
    title: 'Lanzamiento de productos o servicios',
    desc: 'Comunica el valor de lo que ofreces con una página enfocada, sin distracciones y orientada a la acción.',
  },
  {
    title: 'Campañas publicitarias (Google Ads / Meta)',
    desc: 'Una landing específica para cada campaña maximiza la tasa de conversión y reduce el costo por lead.',
  },
];

export function LandingPagesPage() {
  const navigate = useNavigate();
  const title = 'Landing Pages de Alta Conversión en Lima | Sebastián Cabrera';
  const description =
    'Diseño y desarrollo de landing pages optimizadas para captar clientes en Lima, Perú. Estructura persuasiva, velocidad máxima y adaptación móvil completa.';

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`${SITE_URL}/landing-pages`} />
        <meta property="og:url" content={`${SITE_URL}/landing-pages`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={OG_IMAGE} />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mb-20"
          >
            <span className="font-mono text-sm text-primary mb-4 block">Servicio</span>
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight leading-tight mb-6">
              Landing Pages<br />
              <span className="text-muted-foreground opacity-60">de Alta Conversión</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
              Diseño y desarrollo landing pages optimizadas para captar clientes potenciales en Lima y toda
              Latinoamérica. Velocidad máxima, diseño responsivo y estructura persuasiva.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-sm font-semibold text-primary">
                desde S/700
              </span>
              <span className="text-sm text-muted-foreground">· Entrega en 1–2 semanas</span>
            </div>
            <motion.button
              onClick={() => navigate('/cotizar')}
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Cotizar mi landing page
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 mb-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-8">¿Qué incluye?</h2>
              <ul className="space-y-4">
                {included.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold">¿Para quién es?</h2>
              {useCases.map((item) => (
                <div key={item.title} className="p-5 border border-border rounded-2xl">
                  <h3 className="font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 bg-primary/5 border border-primary/20 rounded-3xl text-center"
          >
            <h2 className="text-3xl font-bold mb-4">¿Cuánto cuesta?</h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Usa la calculadora de precios para obtener una estimación personalizada en minutos.
            </p>
            <motion.button
              onClick={() => navigate('/cotizar')}
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-bold hover:bg-primary/90 transition-colors"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Ver precios
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
