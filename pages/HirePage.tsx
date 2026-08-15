import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { CheckCircle2, Github, Linkedin, ArrowUpRight } from 'lucide-react';
import { ProjectsSection } from '../components/ProjectsSection';
import { ContactSection } from '../components/ContactSection';

const stack = [
  {
    id: 'frontend',
    category: 'Frontend',
    color: 'bg-blue-50 dark:bg-blue-950/30 border-blue-100 dark:border-blue-900/40',
    dot: 'bg-blue-500',
    span: 'lg:col-span-2',
    items: ['React', 'Next.js', 'TypeScript', 'Astro', 'Vue', 'Tailwind CSS', 'Framer Motion', 'Radix UI'],
  },
  {
    id: 'backend',
    category: 'Backend',
    color: 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-100 dark:border-emerald-900/40',
    dot: 'bg-emerald-500',
    span: 'lg:col-span-1',
    items: ['Laravel', 'NestJS', 'Node.js', 'REST APIs', 'WebSocket', 'Prisma'],
  },
  {
    id: 'db',
    category: 'Base de datos',
    color: 'bg-violet-50 dark:bg-violet-950/30 border-violet-100 dark:border-violet-900/40',
    dot: 'bg-violet-500',
    span: 'lg:col-span-1',
    items: ['PostgreSQL', 'MySQL', 'Prisma ORM', 'Sanity CMS'],
  },
  {
    id: 'cloud',
    category: 'Cloud & DevOps',
    color: 'bg-amber-50 dark:bg-amber-950/30 border-amber-100 dark:border-amber-900/40',
    dot: 'bg-amber-500',
    span: 'lg:col-span-2',
    items: ['Azure', 'Docker', 'Vercel', 'Railway', 'Git', 'CI/CD', 'Azure Functions'],
  },
];

export function HirePage() {
  return (
    <>
      <Helmet>
        <title>Sebastian Cabrera — Fullstack Developer · Disponible</title>
        <meta
          name="description"
          content="Desarrollador Fullstack con +4 años de experiencia en React, Next.js, Laravel y NestJS. Disponible para oportunidades remotas y presenciales."
        />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="container mx-auto px-6 py-12 space-y-6">

        {/* ── Header card ── */}
        <motion.div
          id="hire-home"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-border/60 bg-card p-8 lg:p-10"
        >
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
            {/* Left: identity */}
            <div className="flex-1 max-w-2xl">

              {/* Badge row — foto inline en mobile */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-medium whitespace-nowrap">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                    </span>
                    Disponible para trabajar
                    <CheckCircle2 className="w-3 h-3" />
                  </div>
                  <span className="text-xs text-muted-foreground font-mono whitespace-nowrap">Fullstack Developer · +4 años</span>
                </div>
                {/* Foto — solo mobile */}
                <div className="lg:hidden w-14 h-14 rounded-xl overflow-hidden border-2 border-border/60 shadow-sm flex-shrink-0">
                  <img
                    src="/img/profilesebastian_2026.webp"
                    alt="Sebastian Cabrera"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4">
                Sebastian Cabrera
              </h1>

              <p className="text-base text-muted-foreground leading-relaxed mb-2">
                Desarrollador Full Stack especializado en <strong className="text-foreground font-semibold">React</strong>, <strong className="text-foreground font-semibold">Next.js</strong> y <strong className="text-foreground font-semibold">Laravel</strong>, con experiencia en <strong className="text-foreground font-semibold">Node.js</strong> y <strong className="text-foreground font-semibold">NestJS</strong>.
              </p>
              <p className="text-base text-muted-foreground leading-relaxed">
                He entregado productos en <strong className="text-foreground font-semibold">Perú y México</strong> — desde landing pages hasta plataformas <strong className="text-foreground font-semibold">SaaS</strong> con WhatsApp Business, pagos y comunicación en tiempo real.
              </p>

              {/* Stats */}
              <div className="flex items-center gap-6 mt-6 pt-6 border-t border-border/50">
                <div>
                  <div className="text-2xl font-bold text-foreground">4+</div>
                  <div className="text-xs text-muted-foreground">Años de exp.</div>
                </div>
                <div className="h-8 w-px bg-border" />
                <div>
                  <div className="text-2xl font-bold text-foreground">12+</div>
                  <div className="text-xs text-muted-foreground">Proyectos</div>
                </div>
                <div className="h-8 w-px bg-border" />
                <div>
                  <div className="text-sm font-bold text-foreground whitespace-nowrap">Perú · México</div>
                  <div className="text-xs text-muted-foreground">Países</div>
                </div>
              </div>

              {/* Botones — solo mobile, debajo de stats */}
              <div className="flex gap-2 mt-4 lg:hidden">
                <a
                  href="https://github.com/iSebasC"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border border-border hover:bg-accent transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  GitHub
                </a>
                <a
                  href="https://linkedin.com/in/sebastian-cabrera-alcala"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  LinkedIn
                </a>
              </div>
            </div>

            {/* Right: photo + actions — solo desktop */}
            <div className="hidden lg:flex flex-col items-end gap-4 flex-shrink-0">
              <div className="w-28 h-28 rounded-2xl overflow-hidden border-2 border-border/60 shadow-sm">
                <img
                  src="/img/profilesebastian_2026.webp"
                  alt="Sebastian Cabrera"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex gap-2">
                <a
                  href="https://github.com/iSebasC"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border border-border hover:bg-accent transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  GitHub
                </a>
                <a
                  href="https://linkedin.com/in/sebastian-cabrera-alcala"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Stack bento grid ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-3">Stack tecnológico</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {stack.map((col, i) => (
              <motion.div
                key={col.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className={`rounded-2xl border p-6 ${col.color} ${col.span}`}
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className={`w-2 h-2 rounded-full ${col.dot}`} />
                  <span className="text-sm font-semibold text-foreground">{col.category}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {col.items.map((item) => (
                    <span
                      key={item}
                      className="px-2.5 py-1 text-xs rounded-lg bg-background/70 border border-border/50 text-muted-foreground font-medium"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Sobre Mí card ── */}
        <motion.div
          id="hire-about"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-border/60 bg-card p-8 lg:p-10 scroll-mt-20 relative overflow-hidden"
        >
          {/* Foto esquina superior derecha */}
          <div className="absolute top-6 right-6 w-16 h-16 rounded-xl overflow-hidden border border-border/60 shadow-sm hidden sm:block">
            <img
              src="/img/profilesebastian_2026.webp"
              alt="Sebastian Cabrera"
              className="w-full h-full object-cover"
            />
          </div>

          <h2 className="text-xl font-bold text-foreground mb-6 pr-20">Sobre mí</h2>

          <div className="space-y-4 text-base text-muted-foreground leading-relaxed max-w-2xl">
            <p>
              Soy un desarrollador fullstack con enfoque en <strong className="text-foreground font-semibold">producto y experiencia de usuario</strong>. Me especializo en construir sistemas que no solo funcionan — sino que escalan y son fáciles de mantener.
            </p>
            <p>
              He trabajado en proyectos que van desde <strong className="text-foreground font-semibold">marketplaces</strong> y <strong className="text-foreground font-semibold">sistemas de facturación electrónica</strong> hasta <strong className="text-foreground font-semibold">plataformas SaaS con WhatsApp Business API</strong> y comunicación en tiempo real con WebSocket.
            </p>
            <p>
              Me muevo igual de bien en <strong className="text-foreground font-semibold">frontend</strong> (React, Next.js, Astro) que en <strong className="text-foreground font-semibold">backend</strong> (Laravel, NestJS, Prisma). Prefiero equipos donde se discuten decisiones técnicas y el código importa.
            </p>
          </div>
        </motion.div>

        {/* ── Proyectos ── */}
        <motion.div
          id="hire-projects"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="scroll-mt-20"
        >
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Proyectos destacados</p>
            <a
              href="/proyectos"
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Ver todos <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
          <ProjectsSection portfolioMode="employee" headingLevel="h2" showHeading={false} />
        </motion.div>

        {/* ── Contacto ── */}
        <section id="hire-contact" className="scroll-mt-20">
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-4 px-6 lg:px-0">Contacto</p>
          <ContactSection portfolioMode="employee" headingLevel="h2" showHeading={false} />
        </section>

      </div>
    </>
  );
}
