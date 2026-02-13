import { motion } from 'framer-motion';
import { ArrowRight, Rocket, Sparkles, Target, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function FinalCTASection() {
  const navigate = useNavigate();

  return (
    <section className="py-16 sm:py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Wide Horizontal CTA Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative p-8 sm:p-10 lg:p-12 rounded-3xl bg-gradient-to-br from-primary via-primary to-accent text-primary-foreground overflow-hidden">
              {/* Background decorations */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/20 rounded-full blur-3xl" />

              {/* Content - Horizontal Layout */}
              <div className="relative z-10 grid lg:grid-cols-[1fr_auto] gap-8 items-center">
                {/* Left Side - Text Content */}
                <div className="text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 mb-4">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <Rocket className="w-5 h-5" />
                    </div>
                  </div>

                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-3 leading-tight">
                    ¿LISTO PARA EMPEZAR?
                  </h2>

                  <p className="text-base sm:text-lg mb-6 lg:mb-0 max-w-2xl opacity-95 leading-relaxed">
                    Transforma tu idea en una plataforma web que genere ingresos reales. Cotización en
                    menos de 24h.
                  </p>
                </div>

                {/* Right Side - Buttons & Trust Badges */}
                <div className="flex flex-col items-center lg:items-end gap-5">
                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
                    {/* Primary */}
                    <motion.button
                      onClick={() => navigate('/cotizar')}
                      className="w-full sm:w-auto px-6 py-3.5 bg-background text-foreground rounded-xl font-bold text-base flex items-center justify-center gap-2.5 shadow-xl whitespace-nowrap"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Sparkles className="w-4 h-4" />
                      Cotizar Proyecto
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>

                    {/* Secondary */}
                    <motion.button
                      onClick={() => navigate('/proyectos')}
                      className="w-full sm:w-auto px-6 py-3.5 border-2 border-white/40 rounded-xl font-bold text-base flex items-center justify-center gap-2 backdrop-blur-sm hover:bg-white/10 transition-colors whitespace-nowrap"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Target className="w-4 h-4" />
                      Ver Proyectos
                    </motion.button>
                  </div>

                  {/* Trust badges - Horizontal */}
                  <div className="flex items-center justify-center lg:justify-end gap-4 text-xs opacity-90 flex-wrap">
                    <div className="flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5" />
                      <span>Respuesta en 24h</span>
                    </div>
                    <div className="w-1 h-1 bg-white/40 rounded-full" />
                    <div className="flex items-center gap-1.5">
                      <Target className="w-3.5 h-3.5" />
                      <span>Sin compromiso</span>
                    </div>
                    <div className="w-1 h-1 bg-white/40 rounded-full" />
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Cotización gratuita</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
