import { QuoteSection } from './QuoteSection';
import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';

interface QuotePageProps {
  onNavigateToContact?: (serviceId?: string, specialty?: string, calculatedPrice?: number) => void;
  headingLevel?: 'h1' | 'h2';
}

export function QuotePage({ onNavigateToContact, headingLevel = 'h1' }: QuotePageProps = {}) {
  const HeadingTag = headingLevel as 'h1' | 'h2';

  return (
    <div className="bg-background text-foreground">
      {/* Header / Hero */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="scroll-mt-24 pt-24 md:pt-32 lg:pt-40 pb-16 sm:pb-20 lg:pb-24 bg-gradient-to-b from-background to-accent/5"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-5xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              className="flex items-center gap-4 mb-6"
            >
              <span className="font-mono text-6xl lg:text-8xl font-bold text-muted-foreground opacity-30">04</span>
              <div className="h-px flex-1 bg-border" />
            </motion.div>

            <HeadingTag className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold mb-8 leading-tight">
              Cotizar<br />Proyecto
            </HeadingTag>

            <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-3xl">
              Precios claros y una estimación orientativa para transformar tu idea en una{' '}
              <span className="text-foreground font-semibold">solución funcional</span>, con foco en{' '}
              <span className="text-primary font-semibold">resultados medibles</span>.
            </p>
          </div>
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
        <div className="container mx-auto">
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
        <div className="container mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl mb-2">
              <span className="bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                Preguntas Frecuentes
              </span>
            </h2>
          </div>

          <div className="rounded-xl bg-background/80 backdrop-blur-sm border border-border/50 px-4">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="rev">
                <AccordionTrigger className="text-base">
                  ¿Incluyen revisiones?
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  Sí, revisiones ilimitadas hasta tu satisfacción completa.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="time">
                <AccordionTrigger className="text-base">
                  ¿Cuánto demora?
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  Landing pages: 1-2 semanas. Proyectos complejos: 3-4 semanas.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="pay">
                <AccordionTrigger className="text-base">
                  ¿Formas de pago?
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  Transferencias, Yape, Plin, tarjetas. Plan: 50% inicio, 50% final.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="support">
                <AccordionTrigger className="text-base">
                  ¿Qué incluye el soporte?
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  30 días post-entrega para ajustes menores y resolución de dudas.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
