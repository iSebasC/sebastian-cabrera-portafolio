import { QuoteSection } from './QuoteSection';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';

interface QuotePageProps {
  onNavigateToContact?: (serviceId?: string, specialty?: string, calculatedPrice?: number) => void;
  headingLevel?: 'h1' | 'h2';
}

export function QuotePage({ onNavigateToContact, headingLevel = 'h1' }: QuotePageProps = {}) {
  const HeadingTag = headingLevel as 'h1' | 'h2';
  const { t } = useTranslation();

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
              <span className="font-mono text-6xl lg:text-8xl font-bold text-muted-foreground opacity-30">{t('quote.magazineNumber')}</span>
              <div className="h-px flex-1 bg-border" />
            </motion.div>

            <HeadingTag className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold mb-8 leading-tight">
              {t('quote.title')}
            </HeadingTag>

            <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-3xl">
              {t('quote.subtitle')}
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
                {t('quote.whyInvest')}
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div
              whileHover={{ scale: 1.02, y: -3 }}
              className="p-5 rounded-xl bg-gradient-to-br from-primary/5 to-transparent border border-border/50"
            >
              <div className="text-3xl mb-2">📈</div>
              <h3 className="text-base mb-2">{t('quote.benefits.roi.title')}</h3>
              <p className="text-sm text-muted-foreground">
                {t('quote.benefits.roi.description')}
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02, y: -3 }}
              className="p-5 rounded-xl bg-gradient-to-br from-accent/5 to-transparent border border-border/50"
            >
              <div className="text-3xl mb-2">⚡</div>
              <h3 className="text-base mb-2">{t('quote.benefits.agile.title')}</h3>
              <p className="text-sm text-muted-foreground">
                {t('quote.benefits.agile.description')}
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02, y: -3 }}
              className="p-5 rounded-xl bg-gradient-to-br from-primary/5 to-transparent border border-border/50"
            >
              <div className="text-3xl mb-2">🎯</div>
              <h3 className="text-base mb-2">{t('quote.benefits.strategy.title')}</h3>
              <p className="text-sm text-muted-foreground">
                {t('quote.benefits.strategy.description')}
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02, y: -3 }}
              className="p-5 rounded-xl bg-gradient-to-br from-accent/5 to-transparent border border-border/50"
            >
              <div className="text-3xl mb-2">🔄</div>
              <h3 className="text-base mb-2">{t('quote.benefits.support.title')}</h3>
              <p className="text-sm text-muted-foreground">
                {t('quote.benefits.support.description')}
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
                {t('quote.faq.title')}
              </span>
            </h2>
          </div>

          <div className="rounded-xl bg-background/80 backdrop-blur-sm border border-border/50 px-4">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="rev">
                <AccordionTrigger className="text-base">
                  {t('quote.faq.revisions.question')}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  {t('quote.faq.revisions.answer')}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="time">
                <AccordionTrigger className="text-base">
                  {t('quote.faq.time.question')}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  {t('quote.faq.time.answer')}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="pay">
                <AccordionTrigger className="text-base">
                  {t('quote.faq.payment.question')}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  {t('quote.faq.payment.answer')}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="support">
                <AccordionTrigger className="text-base">
                  {t('quote.faq.support.question')}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  {t('quote.faq.support.answer')}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
