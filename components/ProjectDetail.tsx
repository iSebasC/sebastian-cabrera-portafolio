import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User2, Target, Palette, Code, ExternalLink, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';
import { Project } from '../types/sanity';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
  onContact: () => void;
  isDark: boolean;
  toggleTheme: () => void;
}

export function ProjectDetail({ project, onBack, onContact, isDark, toggleTheme }: ProjectDetailProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Fixed Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.button
              onClick={onBack}
              className="flex items-center gap-2 px-4 py-2 hover:bg-accent rounded-xl transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Volver al Portfolio</span>
            </motion.button>

            <motion.button
              onClick={toggleTheme}
              className="p-2 hover:bg-accent rounded-lg transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isDark ? '☀️' : '🌙'}
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-background via-background to-accent/20">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            {/* Project Info */}
            <div className="space-y-8">
              <motion.div variants={itemVariants} className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
                  <span className="text-sm text-primary font-medium">{project.category}</span>
                </div>
                
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  {project.title}
                </h1>
                
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
              </motion.div>

              {/* Project Meta */}
              <motion.div variants={itemVariants} className="grid grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-accent/50 rounded-lg">
                    <User2 className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Cliente</div>
                    <div className="font-medium">{project.client}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-accent/50 rounded-lg">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Año</div>
                    <div className="font-medium">{project.year}</div>
                  </div>
                </div>
              </motion.div>

              {/* Services */}
              <motion.div variants={itemVariants} className="space-y-3">
                <h3 className="font-semibold">Servicios Incluidos</h3>
                <div className="flex flex-wrap gap-2">
                  {project.services.map((service) => (
                    <span
                      key={service}
                      className="px-3 py-1 bg-accent/50 rounded-full text-sm border border-border/50"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Hero Image */}
            <motion.div
              variants={itemVariants}
              className="relative"
            >
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative overflow-hidden rounded-3xl shadow-2xl"
              >
                <ImageWithFallback
                  src={project.image}
                  alt={project.title}
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/20" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Challenge & Solution */}
      <section className="py-20 bg-gradient-to-b from-accent/5 to-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-destructive/10 rounded-xl">
                  <Target className="w-6 h-6 text-destructive" />
                </div>
                <h2 className="text-3xl font-bold">El Desafío</h2>
              </div>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                {project.challenge}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <Palette className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-3xl font-bold">La Solución</h2>
              </div>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                {project.solution}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-gradient-to-b from-background to-accent/10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Proceso de <span className="text-primary">Diseño</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Un enfoque estructurado que garantiza resultados excepcionales
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {project.process.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative p-6 bg-gradient-to-br from-accent/30 to-background border border-border/50 rounded-3xl"
              >
                <div className="absolute -top-4 left-6">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                </div>
                
                <div className="pt-4 space-y-4">
                  <h3 className="text-xl font-bold">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 bg-gradient-to-b from-accent/10 to-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Galería del <span className="text-primary">Proyecto</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {project.gallery.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-3xl"
                whileHover={{ scale: 1.02 }}
              >
                <ImageWithFallback
                  src={image}
                  alt={`${project.title} - Imagen ${index + 1}`}
                  className="w-full h-64 lg:h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools & Results */}
      <section className="py-20 bg-gradient-to-b from-background to-accent/5">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Tools */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-accent/50 rounded-xl">
                  <Code className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-3xl font-bold">Herramientas Utilizadas</h2>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {project.tools.map((tool) => (
                  <div
                    key={tool}
                    className="p-4 bg-accent/30 rounded-2xl border border-border/50 text-center"
                  >
                    <span className="font-medium">{tool}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Results */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-3xl font-bold">Resultados</h2>
              </div>
              
              <div className="space-y-4">
                {project.results.map((result, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3 p-4 bg-primary/5 rounded-2xl border border-primary/20"
                  >
                    <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0" />
                    <p className="text-muted-foreground">{result}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-8"
          >
            <h2 className="text-3xl lg:text-5xl font-bold">
              ¿Te Gusta Este <span className="text-primary">Proyecto?</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Hablemos sobre cómo puedo ayudarte a crear algo igual de impactante para tu marca.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={onContact}
                className="px-8 py-4 bg-primary text-primary-foreground hover:bg-primary/90 rounded-2xl h-auto"
              >
                Trabajemos Juntos
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
              
              <Button
                variant="outline"
                onClick={onBack}
                className="px-8 py-4 rounded-2xl h-auto"
              >
                Ver Más Proyectos
                <ExternalLink className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}