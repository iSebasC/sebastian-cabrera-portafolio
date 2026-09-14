import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { SITE_URL, OG_IMAGE } from '../config/seo';
import { ArrowRight, BarChart3, Settings, ShoppingCart, Users } from 'lucide-react';

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Sistemas Web a Medida — Lima',
  description:
    'Desarrollo de sistemas web personalizados en Lima: dashboards, e-commerce, CRMs y plataformas para automatizar y escalar negocios.',
  provider: { '@type': 'Person', name: 'Sebastián Cabrera', url: SITE_URL },
  areaServed: { '@type': 'City', name: 'Lima', addressCountry: 'PE' },
  url: `${SITE_URL}/sistemas-web`,
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Sistemas Web', item: `${SITE_URL}/sistemas-web` },
    ],
  },
};

const types = [
  {
    icon: BarChart3,
    title: 'Dashboards y Paneles',
    desc: 'Paneles de control con visualización de datos, reportes y gestión de usuarios para tomar mejores decisiones.',
  },
  {
    icon: ShoppingCart,
    title: 'E-Commerce',
    desc: 'Tiendas online con catálogo de productos, carrito, panel de vendedor y pasarela de pago integrada.',
  },
  {
    icon: Users,
    title: 'CRMs y Gestión Interna',
    desc: 'Sistemas para gestionar clientes, prospectos, leads y procesos internos de tu equipo de trabajo.',
  },
  {
    icon: Settings,
    title: 'APIs y Plataformas',
    desc: 'Backends robustos con APIs REST, autenticación JWT, base de datos relacional y documentación completa.',
  },
];

const stackGroups = [
  { label: 'Frontend', stack: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'] },
  { label: 'Backend', stack: ['Laravel (PHP)', 'NestJS (Node.js)', 'API REST', 'JWT Auth'] },
  { label: 'Base de datos', stack: ['MySQL', 'PostgreSQL', 'Redis'] },
  { label: 'Deploy', stack: ['Vercel', 'Railway', 'Docker', 'Azure'] },
];

export function SistemasWebPage() {
  const navigate = useNavigate();
  const title = 'Sistemas Web a Medida en Lima | Sebastián Cabrera';
  const description =
    'Desarrollo de sistemas web personalizados en Lima, Perú. Dashboards, e-commerce, CRMs y plataformas para automatizar y escalar tu negocio.';

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`${SITE_URL}/sistemas-web`} />
        <meta property="og:url" content={`${SITE_URL}/sistemas-web`} />
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
              Sistemas Web<br />
              <span className="text-muted-foreground opacity-60">a Medida</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
              Desarrollo sistemas web personalizados para negocios en Lima y toda Latinoamérica. Plataformas,
              dashboards, e-commerce y APIs diseñadas para automatizar procesos y escalar.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-sm font-semibold text-primary">
                desde S/1,600
              </span>
              <span className="text-sm text-muted-foreground">· Según complejidad</span>
            </div>
            <motion.button
              onClick={() => navigate('/cotizar')}
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Cotizar mi sistema
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 mb-20">
            {types.map((type, i) => (
              <motion.div
                key={type.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 border border-border rounded-2xl hover:border-primary/50 transition-colors"
              >
                <type.icon className="w-8 h-8 text-primary mb-4" />
                <h2 className="font-bold text-xl mb-2">{type.title}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">{type.desc}</p>
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
            <div className="grid sm:grid-cols-2 gap-6">
              {stackGroups.map((group) => (
                <div key={group.label} className="p-5 border border-border rounded-xl">
                  <h3 className="text-xs font-mono text-primary uppercase tracking-wider mb-3">
                    {group.label}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {group.stack.map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-accent/30 rounded-lg text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 bg-primary/5 border border-primary/20 rounded-3xl text-center"
          >
            <h2 className="text-3xl font-bold mb-4">¿Tienes un sistema en mente?</h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Cuéntame qué necesitas y te preparo una propuesta personalizada con tecnología adecuada a tu
              presupuesto.
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
