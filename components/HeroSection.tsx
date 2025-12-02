import { motion } from 'framer-motion';
import { Sparkles, Star, Award } from 'lucide-react';

interface HeroSectionProps {
  setActiveSection: (section: string) => void;
  portfolioMode?: 'employee' | 'freelance';
}

export function HeroSection({ setActiveSection, portfolioMode = 'freelance' }: HeroSectionProps) {
  return (
    <section className="min-h-screen relative overflow-hidden bg-background flex items-center">
      {/* Subtle 3D Background Visual */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <motion.div
          animate={{ 
            rotateY: [0, 360],
            rotateX: [0, 15, 0]
          }}
          transition={{ 
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] sm:w-[600px] sm:h-[600px] md:w-[800px] md:h-[800px] lg:w-[1000px] lg:h-[1000px]"
          style={{ perspective: "1000px" }}
        >
          <div className="w-full h-full bg-gradient-to-br from-primary/20 via-accent/20 to-primary/10 rounded-full blur-3xl"></div>
        </motion.div>
        
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-10 right-10 sm:top-20 sm:right-20 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-accent/10 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-0 relative z-10 flex items-center min-h-screen">
        {/* Main Content Grid - Full width */}
        <div className="w-full">
          {/* Etiqueta de disponibilidad - Top Right */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="absolute top-4 sm:top-6 md:top-8 right-4 sm:right-6 lg:right-8 flex items-center gap-2 text-[10px] sm:text-xs text-muted-foreground"
          >
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="uppercase tracking-wider hidden sm:inline">Disponible para Proyectos</span>
            <span className="uppercase tracking-wider sm:hidden">Disponible</span>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 xl:gap-16 items-center">
          {/* Left: Giant Title */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="space-y-0.5 sm:space-y-1 md:space-y-2 lg:order-1"
          >
            <h1 className="text-[40px] xs:text-[50px] sm:text-[60px] md:text-[80px] lg:text-[100px] xl:text-[120px] 2xl:text-[140px] font-bold leading-[0.85] tracking-tighter">
              LANDING
            </h1>
            <h1 className="text-[40px] xs:text-[50px] sm:text-[60px] md:text-[80px] lg:text-[100px] xl:text-[120px] 2xl:text-[140px] font-bold leading-[0.85] tracking-tighter">
              PAGES
              <motion.span 
                className="inline-block w-2 h-2 xs:w-2.5 xs:h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 bg-primary ml-1.5 xs:ml-2 sm:ml-3 md:ml-4 mb-2 xs:mb-3 sm:mb-4 md:mb-5 lg:mb-7 xl:mb-9"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              ></motion.span>
            </h1>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="text-[40px] xs:text-[50px] sm:text-[60px] md:text-[80px] lg:text-[100px] xl:text-[120px] 2xl:text-[140px] font-bold leading-[0.85] tracking-tighter text-primary/20"
            >
              QUE VENDEN
            </motion.div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="space-y-5 sm:space-y-6 lg:space-y-8 lg:pl-8 xl:pl-12 lg:order-2"
          >
            {/* Mini-argumento de autoridad */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-primary/5 border border-primary/10 rounded-full"
            >
              <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
              <span className="text-xs sm:text-sm text-foreground font-medium">+3 años • +10 proyectos exitosos</span>
            </motion.div>

            {/* Subtexto orientado a ventas */}
            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed max-w-md">
              Desarrollo plataformas web modernas con <span className="text-foreground font-semibold">Next.js, Astro y Node.js</span> que 
              convierten visitantes en clientes reales. Diseño + código que genera resultados medibles.
            </p>

            {/* Botones de acción */}
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                onClick={() => {
                  setActiveSection('projects');
                  document.getElementById('projects')?.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                  });
                }}
                className="group px-6 sm:px-8 py-3 sm:py-4 bg-primary text-primary-foreground rounded-2xl hover:bg-primary/90 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl text-sm sm:text-base"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Cotiza Tu Proyecto Hoy
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.div>
              </motion.button>
              
              {/* Contact button - text changes based on mode */}
              <motion.button
                onClick={() => {
                  setActiveSection('contact');
                  document.getElementById('contact')?.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                  });
                }}
                className="px-6 sm:px-8 py-3 sm:py-4 border border-border hover:bg-accent transition-all duration-300 rounded-2xl font-medium text-sm sm:text-base"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {portfolioMode === 'freelance' ? 'Conversemos sobre tu proyecto' : 'Contáctame'}
              </motion.button>
            </div>

            {/* Testimonio real */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="pt-4 sm:pt-6 border-t border-border/30"
            >
              <div className="flex items-start gap-2 sm:gap-3">
                <div className="flex-shrink-0 pt-0.5">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-xs sm:text-sm text-muted-foreground italic leading-relaxed">
                    "Excelente diseñador de páginas web. Muy responsable, puntual, dedicado y atento a los mensajes"
                  </p>
                  <div className="text-[10px] sm:text-xs text-muted-foreground/70">
                    Sebastian Flores - Cliente de Perú
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.5 }}
            className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
          >
            <motion.button
              onClick={() => setActiveSection('projects')}
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider"
            >
              Explorar Portfolio
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
