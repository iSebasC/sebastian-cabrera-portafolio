import { QuoteSection } from './QuoteSection';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowLeft, Moon, Sun } from 'lucide-react';

interface QuotePageProps {
  onNavigateToContact?: (serviceId?: string, specialty?: string, calculatedPrice?: number) => void;
  onBack?: () => void;
  isDark?: boolean;
  toggleTheme?: () => void;
}

export function QuotePage({ onNavigateToContact, onBack, isDark, toggleTheme }: QuotePageProps = {}) {
  const scrollToServices = () => {
    const servicesSection = document.getElementById('services-section');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-background text-foreground">
      {/* Header Navigation */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border"
      >
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <motion.button
            onClick={onBack}
            whileHover={{ x: -5 }}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Volver al Portfolio</span>
          </motion.button>
          
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">Cotización</span>
            {toggleTheme && (
              <motion.button
                onClick={toggleTheme}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </motion.button>
            )}
          </div>
        </div>
      </motion.header>

      {/* Hero Section - Compact */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative min-h-[60vh] flex items-center justify-center px-4 overflow-hidden pt-16"
      >
        {/* Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
              opacity: [0.05, 0.1, 0.05]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl"
          />
        </div>

        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-full mb-6"
          >
            <span className="text-xl">💰</span>
            <span className="text-sm">Precios Transparentes</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-6xl lg:text-7xl mb-4"
          >
            <span className="bg-gradient-to-r from-foreground via-primary to-accent-foreground bg-clip-text text-transparent">
              Cotiza tu Proyecto
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
          >
            Inversión transparente en resultados reales
          </motion.p>

          {/* Scroll Indicator */}
          <motion.button
            onClick={scrollToServices}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            whileHover={{ y: 5 }}
            className="inline-flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <span className="text-sm">Ver servicios</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowDown className="w-5 h-5" />
            </motion.div>
          </motion.button>
        </div>
      </motion.section>

      {/* Services Section */}
      <div id="services-section">
        <QuoteSection onNavigateToContact={onNavigateToContact} />
      </div>

      {/* Why Section - Compact */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-16 px-4"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl mb-2">
              <span className="bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                ¿Por qué invertir?
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div
              whileHover={{ scale: 1.02, y: -3 }}
              className="p-5 rounded-xl bg-gradient-to-br from-primary/5 to-transparent border border-border/50"
            >
              <div className="text-3xl mb-2">📈</div>
              <h3 className="text-base mb-2">ROI Comprobado</h3>
              <p className="text-sm text-muted-foreground">
                +40% conversión promedio en proyectos
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02, y: -3 }}
              className="p-5 rounded-xl bg-gradient-to-br from-accent/5 to-transparent border border-border/50"
            >
              <div className="text-3xl mb-2">⚡</div>
              <h3 className="text-base mb-2">Entregas Ágiles</h3>
              <p className="text-sm text-muted-foreground">
                De 2 a 4 semanas según complejidad
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02, y: -3 }}
              className="p-5 rounded-xl bg-gradient-to-br from-primary/5 to-transparent border border-border/50"
            >
              <div className="text-3xl mb-2">🎯</div>
              <h3 className="text-base mb-2">Estrategia Clara</h3>
              <p className="text-sm text-muted-foreground">
                Diseño orientado a objetivos medibles
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02, y: -3 }}
              className="p-5 rounded-xl bg-gradient-to-br from-accent/5 to-transparent border border-border/50"
            >
              <div className="text-3xl mb-2">🔄</div>
              <h3 className="text-base mb-2">Soporte Continuo</h3>
              <p className="text-sm text-muted-foreground">
                Revisiones ilimitadas incluidas
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* FAQ Section - Compact */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-16 px-4 bg-gradient-to-b from-background to-accent/5"
      >
        <div className="container mx-auto max-w-3xl">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl mb-2">
              <span className="bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                Preguntas Frecuentes
              </span>
            </h2>
          </div>

          <div className="space-y-3">
            <motion.div
              whileHover={{ x: 5 }}
              className="p-4 rounded-xl bg-background/80 backdrop-blur-sm border border-border/50"
            >
              <h3 className="text-sm mb-1">¿Incluyen revisiones?</h3>
              <p className="text-xs text-muted-foreground">
                Sí, revisiones ilimitadas hasta tu satisfacción completa.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ x: 5 }}
              className="p-4 rounded-xl bg-background/80 backdrop-blur-sm border border-border/50"
            >
              <h3 className="text-sm mb-1">¿Cuánto demora?</h3>
              <p className="text-xs text-muted-foreground">
                Landing pages: 1-2 semanas. Proyectos complejos: 3-4 semanas.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ x: 5 }}
              className="p-4 rounded-xl bg-background/80 backdrop-blur-sm border border-border/50"
            >
              <h3 className="text-sm mb-1">¿Formas de pago?</h3>
              <p className="text-xs text-muted-foreground">
                Transferencias, Yape, Plin, tarjetas. Plan: 50% inicio, 50% final.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ x: 5 }}
              className="p-4 rounded-xl bg-background/80 backdrop-blur-sm border border-border/50"
            >
              <h3 className="text-sm mb-1">¿Qué incluye el soporte?</h3>
              <p className="text-xs text-muted-foreground">
                30 días post-entrega para ajustes menores y resolución de dudas.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
