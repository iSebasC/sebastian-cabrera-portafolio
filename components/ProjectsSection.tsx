import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Eye, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { getAllProjects } from '../services/sanityService';
import { Project } from '../types/sanity';

interface ProjectsSectionProps {
  onProjectSelect?: (projectId: string) => void;
  portfolioMode?: 'employee' | 'freelance';
  headingLevel?: 'h1' | 'h2';
  showHeading?: boolean;
}

export function ProjectsSection({ onProjectSelect, portfolioMode = 'freelance', headingLevel = 'h2', showHeading = true }: ProjectsSectionProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState(t('projects.categories.all'));
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const HeadingTag = headingLevel as 'h1' | 'h2';

  // Cargar proyectos de Sanity
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        const sanityProjects = await getAllProjects();
        setProjects(sanityProjects);
      } catch (err) {
        console.error('Error loading projects:', err);
        setError(t('projects.errorMessage'));
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [t]);

  // Categorías traducidas
  const categories = [
    t('projects.categories.all'),
    t('projects.categories.uiux'),
    t('projects.categories.frontend'),
    t('projects.categories.backend'),
    t('projects.categories.fullstack'),
    t('projects.categories.app')
  ];

  const filteredProjects = selectedCategory === t('projects.categories.all') 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const getGridClass = (layout: string) => {
    // Original desktop layout with responsive improvements
    switch (layout) {
      case 'wide':
        return 'lg:col-span-2 h-80 sm:h-96 lg:h-80';
      case 'tall':
        return 'lg:row-span-2 h-80 sm:h-96 lg:h-[640px]';
      case 'square':
        return 'h-80 sm:h-96 lg:h-80';
      default:
        return 'h-80 sm:h-96 lg:h-80';
    }
  };



  return (
    <section id="projects" className={`scroll-mt-24 pb-16 sm:pb-20 lg:pb-24 bg-gradient-to-b from-background to-accent/5 ${showHeading ? 'pt-24 md:pt-32 lg:pt-40' : 'pt-2'}`}>
      <div className="container mx-auto px-4">
        {/* Header */}
        {showHeading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="max-w-5xl">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 mb-6"
              >
                <span className="font-mono text-6xl lg:text-8xl font-bold text-muted-foreground opacity-30">{t('projects.magazineNumber')}</span>
                <div className="h-px flex-1 bg-border" />
              </motion.div>

              <HeadingTag className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold mb-8 leading-tight">
                {t('projects.title')}
              </HeadingTag>

              <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-3xl">
                {t('projects.subtitle')}
              </p>
            </div>
          </motion.div>
        )}

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`flex flex-wrap gap-2 mb-8 ${portfolioMode === 'employee' ? 'justify-start' : 'justify-center px-2 sm:gap-3 mb-12'}`}
        >
          {categories.map((category, index) => (
            portfolioMode === 'employee' ? (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
                  selectedCategory === category
                    ? 'bg-foreground text-background border-foreground'
                    : 'border-border/60 text-muted-foreground hover:text-foreground hover:border-border'
                }`}
              >
                {selectedCategory === category && <span className="mr-1">·</span>}{category}
              </button>
            ) : (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`relative px-4 sm:px-6 py-2 sm:py-3 rounded-full transition-all duration-300 overflow-hidden text-sm sm:text-base ${
                  selectedCategory === category
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : 'bg-accent/50 hover:bg-accent text-muted-foreground hover:text-foreground border border-border/50'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  y: [0, -2, 0],
                  rotate: [0, 1, -1, 0]
                }}
                transition={{
                  y: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 },
                  rotate: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 }
                }}
              >
                {category}
                {selectedCategory === category && [...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                      rotate: [0, 360],
                      x: [0, (Math.random() - 0.5) * 60],
                      y: [0, (Math.random() - 0.5) * 60]
                    }}
                    transition={{
                      duration: 2,
                      delay: i * 0.3,
                      repeat: Infinity,
                      repeatDelay: 3,
                      ease: "easeInOut"
                    }}
                    className="absolute top-1/2 left-1/2 w-1 h-1 bg-primary-foreground rounded-full"
                  />
                ))}
              </motion.button>
            )
          ))}
        </motion.div>

        {/* Loading State */}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center py-20"
          >
            <div className="flex items-center gap-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full"
              />
              <span className="text-muted-foreground">{t('projects.loading')}</span>
            </div>
          </motion.div>
        )}

        {/* Error State */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 text-center max-w-md mx-auto mb-12"
          >
            <p className="text-destructive font-medium mb-2">{t('projects.error')}</p>
            <p className="text-muted-foreground text-sm">{error}</p>
          </motion.div>
        )}

        {/* Projects Grid */}
        {!loading && !error && (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:auto-rows-[320px]"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`group relative overflow-hidden rounded-3xl ${getGridClass(project.layout)} cursor-pointer`}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                onClick={() => {
                  if (onProjectSelect) onProjectSelect(project.id);
                  else navigate(`/proyecto/${project.id}`);
                }}
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Overlay Gradients */}
                  <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/40" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Content */}
                <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-between">
                  {/* Top Badge */}
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: hoveredProject === project.id ? 1 : 0, y: hoveredProject === project.id ? 0 : -20 }}
                    className="self-start"
                  >
                    <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm border border-white/20">
                      {project.category}
                    </span>
                  </motion.div>

                  {/* Bottom Content */}
                  <div className="space-y-4">
                    {/* Basic Info - Always Visible */}
                    <div className="space-y-2">
                      <motion.h3 
                        className="text-xl lg:text-2xl font-bold text-white"
                        animate={{ 
                          scale: hoveredProject === project.id ? [1, 1.02, 1] : 1,
                          rotate: hoveredProject === project.id ? [0, 0.5, -0.5, 0] : 0
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: hoveredProject === project.id ? Infinity : 0,
                          ease: "easeInOut"
                        }}
                      >
                        {project.title}
                      </motion.h3>
                      <motion.p 
                        className="text-white/80 text-sm"
                        animate={{ 
                          y: hoveredProject === project.id ? [0, -1, 1, 0] : 0
                        }}
                        transition={{ 
                          duration: 1.5,
                          repeat: hoveredProject === project.id ? Infinity : 0,
                          ease: "easeInOut",
                          delay: 0.3
                        }}
                      >
                        {project.client} • {project.year}
                      </motion.p>
                    </div>

                    {/* Detailed Info - Show on Hover */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ 
                        opacity: hoveredProject === project.id ? 1 : 0,
                        y: hoveredProject === project.id ? 0 : 20
                      }}
                      transition={{ delay: 0.1 }}
                      className="space-y-4"
                    >
                      <p className="text-white/90 text-sm leading-relaxed line-clamp-2">
                        {project.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2">
                        {project.services.map((service) => (
                          <span
                            key={service}
                            className="px-2 py-1 bg-white/10 backdrop-blur-sm rounded-md text-white text-xs border border-white/20"
                          >
                            {service}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-3">
                        <motion.button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (onProjectSelect) onProjectSelect(project.id);
                            else navigate(`/proyecto/${project.id}`);
                          }}
                          className="relative flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors text-sm border border-white/20 overflow-hidden"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          aria-label={`${t('projects.viewProject')} ${project.title}`}
                        >
                          <motion.div
                            animate={{ 
                              rotate: [0, 360],
                              scale: [1, 1.2, 1]
                            }}
                            transition={{ 
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          >
                            <Eye className="w-4 h-4" />
                          </motion.div>
                          {t('projects.viewProject')}
                          
                          {/* Sparkle effect */}
                          {hoveredProject === project.id && [...Array(3)].map((_, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                              animate={{ 
                                opacity: [0, 1, 0],
                                scale: [0, 1, 0],
                                x: [0, (Math.random() - 0.5) * 40],
                                y: [0, (Math.random() - 0.5) * 40]
                              }}
                              transition={{ 
                                duration: 1.5,
                                delay: i * 0.2,
                                repeat: Infinity,
                                repeatDelay: 2
                              }}
                              className="absolute top-1/2 left-1/2 w-1 h-1 bg-white rounded-full"
                            />
                          ))}
                        </motion.button>
                        
                        <motion.button
                          className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors border border-white/20"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          aria-label={t('projects.openExternal')}
                        >
                          <motion.div
                            animate={{ 
                              rotate: [0, -10, 10, 0],
                              scale: [1, 1.1, 1]
                            }}
                            transition={{ 
                              duration: 2.5,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          >
                            <ExternalLink className="w-4 h-4" />
                          </motion.div>
                        </motion.button>
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Hover Border Effect */}
                <motion.div
                  className="absolute inset-0 border-2 border-primary/50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ scale: 0.95 }}
                  whileHover={{ scale: 1 }}
                />
              </motion.div>
            ))}
          </AnimatePresence>
          </motion.div>
        )}

        {/* Project Impact Banner - Only show in freelance mode */}
        {portfolioMode === 'freelance' && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20"
          >
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary/10 via-accent/20 to-primary/10 border border-border/50 backdrop-blur-sm">
            <div className="absolute inset-0">
              <motion.div
                animate={{
                  x: [-100, 100, -100],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-full h-full bg-gradient-to-r from-transparent via-primary/5 to-transparent"
              />
            </div>
            
            <div className="relative z-10 p-8 lg:p-12">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div className="text-center lg:text-left">
                  <motion.h3 
                    className="text-2xl lg:text-3xl font-bold mb-4"
                    whileHover={{ scale: 1.02 }}
                  >
                    Cada Proyecto es una 
                    <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"> Inversión Estratégica</span>
                  </motion.h3>
                  <p className="text-lg text-muted-foreground mb-6">
                    No solo entrego diseños, sino herramientas que impulsan el crecimiento de tu negocio a largo plazo.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <motion.button
                      className="group inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-2xl hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Ver Case Studies Completos
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ChevronRight className="w-5 h-5" />
                      </motion.div>
                    </motion.button>
                    
                    <motion.button
                      onClick={() => navigate('/contacto')}
                      className="px-8 py-4 border border-border hover:bg-accent transition-all duration-300 rounded-2xl"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Solicitar Propuesta
                    </motion.button>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Incremento Promedio en Ventas', value: '+185%', icon: '📈' },
                    { label: 'Reducción en Tiempo de Desarrollo', value: '-60%', icon: '⚡' },
                    { label: 'Mejora en Brand Recognition', value: '+240%', icon: '🎯' },
                    { label: 'ROI en Primer Año', value: '+320%', icon: '💎' }
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05, rotate: 1 }}
                      className="p-4 bg-background/50 backdrop-blur-sm rounded-2xl border border-border/50 text-center"
                    >
                      <div className="text-2xl mb-2">{stat.icon}</div>
                      <div className="text-xl lg:text-2xl font-bold text-primary mb-1">{stat.value}</div>
                      <div className="text-xs text-muted-foreground leading-tight">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        )}
      </div>
    </section>
  );
}