import { motion } from 'framer-motion';
import { Sparkles, Star, Award, TrendingUp, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HeroSectionProps {
  portfolioMode?: 'employee' | 'freelance';
}

export function HeroSection({ portfolioMode = 'freelance' }: HeroSectionProps) {
  const navigate = useNavigate();

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
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 xl:gap-16 items-center">
          {/* Left: Giant Title */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-0.5 sm:space-y-1 md:space-y-2 lg:order-1"
          >
            <h1 className="text-[clamp(40px,8vw,120px)] font-bold leading-[0.85] tracking-tighter">
              <span className="block">Desarrollo</span>
              <span className="block">Web</span>
              <span className="block">
                que Convierte
                <motion.span
                  className="inline-block w-2 h-2 xs:w-2.5 xs:h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 bg-primary ml-1.5 xs:ml-2 sm:ml-3 md:ml-4 mb-2 xs:mb-3 sm:mb-4 md:mb-5 lg:mb-7 xl:mb-9"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                ></motion.span>
              </span>
            </h1>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-5 sm:space-y-6 lg:space-y-8 lg:pl-8 xl:pl-12 lg:order-2"
          >
            {/* Stats row */}
            <div className="flex items-center gap-4 flex-wrap">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/5 border border-primary/10 rounded-full">
                <Award className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs font-medium">+5 proyectos exitosos</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-500/5 border border-green-500/10 rounded-full">
                <TrendingUp className="w-3.5 h-3.5 text-green-500" />
                <span className="text-xs font-medium">95% tasa de éxito</span>
              </div>
            </div>

            {/* Value Proposition mejorada */}
            <div className="space-y-3">
              <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed">
                Desarrollo páginas web, sistemas web y plataformas digitales modernas con <span className="text-foreground font-semibold">Next.js, Astro y Node.js</span> que<span className="text-primary font-bold"> convierten visitantes en clientes reales</span> en Perú y Latinoamérica.
              </p>

              {/* Benefits list */}
              {portfolioMode === 'freelance' && (
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                    Diseño optimizado para conversión
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                    Entrega en 7-14 días
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                    Soporte post-lanzamiento incluido
                  </li>
                </ul>
              )}
            </div>

            {/* CTAs con jerarquía clara */}
            <div className="space-y-3">
              {/* CTA Principal - MUY prominente */}
              <motion.button
                onClick={() => {
                  if (portfolioMode === 'freelance') {
                    navigate('/cotizar');
                  } else {
                    navigate('/contacto');
                  }
                }}
                aria-label={portfolioMode === 'freelance' ? 'Ver precios y solicitar cotización desde 189 dólares' : 'Solicitar entrevista laboral'}
                className="group w-full sm:w-auto px-8 py-4 bg-primary text-primary-foreground rounded-2xl hover:bg-primary/90 transition-all duration-300 shadow-2xl hover:shadow-primary/50 relative overflow-hidden"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="relative z-10 flex items-center justify-center gap-3">
                  <div className="flex flex-col items-start">
                    <span className="text-base sm:text-lg font-bold">
                      {portfolioMode === 'freelance' ? 'Ver Precios y Cotizar' : 'Solicitar Entrevista'}
                    </span>
                    {portfolioMode === 'freelance' && (
                      <span className="text-xs opacity-90">Desde $189 USD</span>
                    )}
                  </div>
                  <motion.div
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <Sparkles className="w-5 h-5" />
                  </motion.div>
                </div>
                
                {/* Subtle gradient animation */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
              </motion.button>
              
              {/* CTA Secundario - Menos prominente */}
              <div className="flex gap-3">
                <motion.button
                  onClick={() => {
                    navigate('/proyectos');
                  }}
                  aria-label="Ver portfolio de proyectos"
                  className="flex-1 px-6 py-3 border border-border hover:bg-accent transition-all duration-300 rounded-xl font-medium text-sm"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Ver Portfolio
                </motion.button>
                
                <motion.button
                  onClick={() => {
                    navigate('/contacto');
                  }}
                  aria-label={portfolioMode === 'freelance' ? 'Contactar para consulta de proyecto' : 'Enviar mensaje de contacto'}
                  className="flex-1 px-6 py-3 border border-border hover:bg-accent transition-all duration-300 rounded-xl font-medium text-sm"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {portfolioMode === 'freelance' ? 'Contactar' : 'Contáctame'}
                </motion.button>
              </div>
            </div>

            {/* Testimonio con más contexto */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="pt-4 border-t border-border/30"
            >
              <div className="flex items-start gap-3 bg-accent/20 rounded-xl p-4">
                <div className="flex-1 space-y-2">
                  <p className="text-xs sm:text-sm text-foreground font-medium leading-relaxed">
                    "Excelente diseñador de páginas web. Muy responsable, puntual, dedicado y atento a los mensajes"
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="text-[10px] sm:text-xs text-muted-foreground">
                      <span className="font-semibold">Sebastian Flores</span> • Cliente de Perú
                    </div>
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                      ))}
                    </div>
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
            className="absolute bottom-2 lg:bottom-6 left-1/2 -translate-x-1/2 hidden md:block"
          >
            <motion.button
              onClick={() => {
                navigate('/sobre-mi');
              }}
              aria-label="Desplazarse a la sección Sobre Mí"
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
