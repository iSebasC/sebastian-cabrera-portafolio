import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { SITE_URL, OG_IMAGE } from '../config/seo';
import { ArrowRight, Code2, Globe, Layers, Zap } from 'lucide-react';

const schema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Sebastián Cabrera — Desarrollo Web Lima',
  description: 'Desarrollador web freelance en Lima. Landing pages, sistemas web y plataformas digitales.',
  url: `${SITE_URL}/desarrollo-web-lima`,
  areaServed: { '@type': 'City', name: 'Lima', addressCountry: 'PE' },
  serviceType: 'Desarrollo Web',
  provider: {
    '@type': 'Person',
    name: 'Sebastián Cabrera',
    url: SITE_URL,
    address: { '@type': 'PostalAddress', addressLocality: 'Lima', addressCountry: 'PE' },
  },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Desarrollo Web Lima', item: `${SITE_URL}/desarrollo-web-lima` },
    ],
  },
};

export function DesarrolloWebLimaPage() {
  const navigate = useNavigate();
  const title = 'Desarrollo Web en Lima | Sebastián Cabrera — Freelance';
  const description =
    'Desarrollador web freelance en Lima, Perú. Creo landing pages, sistemas web y plataformas digitales modernas adaptadas a tu negocio. Presupuesto en 24 horas.';

  const services = [
    {
      icon: Globe,
      title: 'Landing Pages',
      desc: 'Páginas diseñadas para captar clientes potenciales con estructura persuasiva y velocidad optimizada.',
    },
    {
      icon: Layers,
      title: 'Sistemas Web',
      desc: 'Plataformas y dashboards a medida para gestionar procesos internos y escalar tu negocio.',
    },
    {
      icon: Code2,
      title: 'APIs y Backend',
      desc: 'Arquitecturas backend robustas con Node.js, Laravel y NestJS integradas con cualquier frontend.',
    },
    {
      icon: Zap,
      title: 'Soporte y Mantenimiento',
      desc: 'Actualizaciones, mejoras y soporte técnico continuo para que tu plataforma funcione sin interrupciones.',
    },
  ];

  const stack = [
    'React',
    'Next.js',
    'Laravel',
    'NestJS',
    'TypeScript',
    'Tailwind CSS',
    'MySQL',
    'PostgreSQL',
  ];

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`${SITE_URL}/desarrollo-web-lima`} />
        <meta property="og:url" content={`${SITE_URL}/desarrollo-web-lima`} />
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
            <span className="font-mono text-sm text-primary mb-4 block">Lima, Perú</span>
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight leading-tight mb-6">
              Desarrollo Web<br />en Lima
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
              Soy Sebastián Cabrera, desarrollador web freelance en Lima. Creo landing pages, sistemas web y
              plataformas digitales modernas que ayudan a los negocios a crecer en internet.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-sm font-semibold text-primary">
                Precios desde S/700
              </span>
              <span className="text-sm text-muted-foreground">· Cotización gratuita en 24h</span>
            </div>
            <motion.button
              onClick={() => navigate('/cotizar')}
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Cotizar mi proyecto
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 border border-border rounded-2xl hover:border-primary/50 transition-colors"
              >
                <service.icon className="w-8 h-8 text-primary mb-4" />
                <h2 className="font-bold text-lg mb-2">{service.title}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="border-t border-border pt-16 mb-20"
          >
            <h2 className="text-3xl font-bold mb-8">Stack tecnológico</h2>
            <div className="flex flex-wrap gap-3">
              {stack.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 bg-accent/30 border border-border rounded-lg text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 bg-primary/5 border border-primary/20 rounded-3xl text-center"
          >
            <h2 className="text-3xl font-bold mb-4">¿Listo para empezar?</h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Cuéntame sobre tu proyecto y recibe una propuesta personalizada en menos de 24 horas.
            </p>
            <motion.button
              onClick={() => navigate('/cotizar')}
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-bold hover:bg-primary/90 transition-colors"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Solicitar cotización
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
