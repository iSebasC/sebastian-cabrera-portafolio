import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Brain, Rocket, Sparkles, Zap, Palette,
  Coffee, Heart,
  Eye, Lightbulb, Target,
  ChevronLeft, ChevronRight
} from 'lucide-react';

interface AboutSectionProps {
  setActiveSection?: (section: string) => void;
  portfolioMode?: 'employee' | 'freelance';
}

export function AboutSection({ setActiveSection, portfolioMode = 'freelance' }: AboutSectionProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const designPrinciples = [
    {
      id: 'creativity',
      icon: Sparkles,
      title: t('about.principles.creativity.title'),
      description: t('about.principles.creativity.description'),
      value: 98
    },
    {
      id: 'strategy',
      icon: Brain,
      title: t('about.principles.strategy.title'),
      description: t('about.principles.strategy.description'),
      value: 95
    },
    {
      id: 'execution',
      icon: Zap,
      title: t('about.principles.execution.title'),
      description: t('about.principles.execution.description'),
      value: 92
    },
    {
      id: 'innovation',
      icon: Rocket,
      title: t('about.principles.innovation.title'),
      description: t('about.principles.innovation.description'),
      value: 90
    }
  ];

  const tools = [
    { name: 'Laravel (PHP)', level: 95, category: 'Backend', color: 'from-orange-500 to-red-500' },
    { name: 'Node.js / NestJS', level: 90, category: 'Backend', color: 'from-orange-400 to-yellow-500' },
    { name: 'MySQL / SQL Server', level: 88, category: 'Database', color: 'from-green-500 to-emerald-500' },
    { name: 'Next.js', level: 92, category: 'Frontend', color: 'from-cyan-500 to-blue-500' },
    { name: 'React', level: 95, category: 'Frontend', color: 'from-blue-500 to-cyan-500' },
    { name: 'Astro', level: 85, category: 'Frontend', color: 'from-indigo-500 to-purple-500' },
    { name: 'Figma', level: 98, category: 'Design', color: 'from-purple-500 to-pink-500' }
  ];

  const workProcess = [
    {
      step: '01',
      title: t('about.process.discover.title'),
      description: t('about.process.discover.description'),
      icon: Eye,
      color: 'from-blue-400 to-blue-600'
    },
    {
      step: '02',
      title: t('about.process.conceptualize.title'),
      description: t('about.process.conceptualize.description'),
      icon: Lightbulb,
      color: 'from-yellow-400 to-orange-500'
    },
    {
      step: '03',
      title: t('about.process.design.title'),
      description: t('about.process.design.description'),
      icon: Palette,
      color: 'from-purple-400 to-pink-500'
    },
    {
      step: '04',
      title: t('about.process.deliver.title'),
      description: t('about.process.deliver.description'),
      icon: Target,
      color: 'from-green-400 to-emerald-500'
    }
  ];
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = 300;
    const newScrollLeft =
      scrollContainerRef.current.scrollLeft + (direction === 'right' ? scrollAmount : -scrollAmount);
    scrollContainerRef.current.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
  };

  return (
    <section id="about" className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background subtle */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/5 to-background" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Hero Magazine Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <div className="max-w-4xl">
            {/* Magazine Number */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-6"
            >
              <span className="font-mono text-6xl lg:text-8xl font-bold text-muted-foreground opacity-30">02</span>
              <div className="h-px flex-1 bg-border" />
            </motion.div>

            <h1 className="text-5xl lg:text-7xl xl:text-8xl font-bold mb-8 leading-tight">{t('about.title')}</h1>

            <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-3xl">
              {t('about.subtitle')}
            </p>

            {/* Quick Stats Inline */}
            <div className="flex flex-wrap items-center gap-8 mt-10">
              {[
                { label: t('about.stats.years'), value: '+3' },
                { label: t('about.stats.projects'), value: '+6' },
                { label: t('about.stats.satisfaction'), value: '98%' }
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-baseline gap-2"
                >
                  <span className="text-3xl font-bold text-primary">{stat.value}</span>
                  <span className="text-sm text-muted-foreground uppercase tracking-wider">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Layout Magazine Asimétrico - Foto + Bio */}
        <div className="grid lg:grid-cols-12 gap-12 mb-32">
          {/* Foto Grande - 7 columnas */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <div className="relative group">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
                className="relative overflow-hidden rounded-2xl"
              >
                <img
                  src="/img/profilesebastian_2026.webp"
                  alt="Sebastian Cabrera - Desarrollador y Diseñador Web"
                  className="w-full h-[450px] lg:h-[550px] object-cover"
                  loading="eager"
                />

                {/* Gradient overlay bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Badge flotante */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="absolute bottom-6 left-6 right-6"
                >
                  <div className="bg-white/95 backdrop-blur-md rounded-xl p-4 flex items-center justify-between">
                    <div>
                      <h2 className="font-bold text-gray-900">Sebastian Cabrera</h2>
                      <p className="text-sm text-gray-600">Desarrollador y Diseñador Web</p>
                    </div>
                    {portfolioMode === 'freelance' && (
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-xs text-gray-600 font-medium">Disponible</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Bio + Filosofía - 5 columnas */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-8"
          >
            {/* Título de sección */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-sm text-primary">{t('about.bio')}</span>
                <div className="h-px flex-1 bg-border" />
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t('about.bioDescription')}
              </p>
            </div>

            {/* Filosofía Card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-6 bg-gradient-to-br from-primary/5 to-accent/10 rounded-2xl border border-border/50"
            >
              <div className="flex items-start gap-3 mb-3">
                <Heart className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <h3 className="font-bold text-lg">{t('about.philosophy')}</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {t('about.philosophyText')}
              </p>
            </motion.div>

            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                navigate('/contacto');
                setActiveSection?.('contact');
              }}
              className="w-full px-6 py-4 bg-primary text-primary-foreground rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-shadow"
            >
              <Coffee className="w-5 h-5" />
              {portfolioMode === 'freelance' ? t('about.conversationBtn') : t('about.contactBtn')}
            </motion.button>
          </motion.div>
        </div>

        {/* Mi Proceso - Magazine Layout Asimétrico */}
        <div className="grid lg:grid-cols-2 gap-16 mb-32">
          {/* Left: Título */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              {t('about.process.title')}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t('about.process.description')}
            </p>
          </motion.div>

          {/* Right: Steps */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {workProcess.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ x: 8 }}
                className="flex items-start gap-4 group cursor-pointer"
              >
                {/* Número */}
                <div className="font-mono text-2xl font-bold text-primary/30 group-hover:text-primary transition-colors flex-shrink-0 w-12">
                  {step.step}
                </div>

                {/* Contenido */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-10 h-10 bg-gradient-to-r ${step.color} rounded-lg flex items-center justify-center`}>
                      <step.icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-bold text-xl">{step.title}</h3>
                  </div>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Arsenal Creativo - Horizontal Scroll con Flechas */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-32"
        >
          <div className="flex items-center justify-between gap-4 mb-12">
            <div className="flex items-center gap-4 flex-1">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold">{t('about.arsenal')}</h2>
              </div>
              <div className="hidden lg:block h-px flex-1 bg-gradient-to-r from-border to-transparent" />
            </div>

            {/* Navigation Arrows */}
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => scroll('left')}
                className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors"
                aria-label="Scroll izquierda"
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => scroll('right')}
                className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors"
                aria-label="Scroll derecha"
              >
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>
          </div>

          {/* Scroll Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory hide-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {tools.map((tool, index) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -4 }}
                className="relative group flex-shrink-0 w-[180px] snap-start"
              >
                <div className="p-4 bg-background border border-border rounded-xl hover:border-primary/50 transition-all duration-300 aspect-square flex flex-col items-center justify-center text-center">
                  {/* Icon */}
                  <div className={`w-12 h-12 bg-gradient-to-r ${tool.color} rounded-lg flex items-center justify-center text-white font-bold text-xl mb-3`}>
                    {tool.name.charAt(0)}
                  </div>

                  {/* Name */}
                  <h4 className="font-semibold text-sm mb-1">{tool.name}</h4>

                  {/* Category */}
                  <span className="text-xs text-muted-foreground">{tool.category}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Pilares - Magazine Grid */}
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold">{t('about.principles.title')}</h2>
            <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {designPrinciples.map((principle, index) => (
              <motion.div
                key={principle.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="relative group"
              >
                <div className="p-6 bg-gradient-to-br from-background to-accent/10 border border-border rounded-2xl hover:border-primary/50 transition-all duration-300">
                  <principle.icon className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-bold text-lg mb-2">{principle.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{principle.description}</p>

                  {/* Progress bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Nivel</span>
                      <span className="text-sm font-bold text-primary">{principle.value}%</span>
                    </div>
                    <div className="w-full bg-border rounded-full h-1.5">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${principle.value}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: index * 0.2 }}
                        className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
}