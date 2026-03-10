import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight, Loader2, Quote, RefreshCcw, Star } from 'lucide-react';
import { useTestimonials } from '../hooks/useTestimonials';
import { useTranslation } from 'react-i18next';

interface TestimonialsSectionProps {
  portfolioMode?: 'employee' | 'freelance';
  headingLevel?: 'h1' | 'h2';
  headerVariant?: 'default' | 'magazine';
}

export function TestimonialsSection({
  portfolioMode = 'freelance',
  headingLevel = 'h2',
  headerVariant = 'default',
}: TestimonialsSectionProps) {
  const { t } = useTranslation();
  const { data: testimonials, loading, error, refetch } = useTestimonials();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const HeadingTag = headingLevel as 'h1' | 'h2';
  const magazineNumber = portfolioMode === 'freelance' ? '05' : '04';

  const gradientColors = useMemo(
    () => [
      'from-blue-600 to-blue-700',
      'from-purple-600 to-purple-700',
      'from-green-600 to-green-700',
      'from-orange-600 to-orange-700',
      'from-pink-600 to-pink-700',
      'from-teal-600 to-teal-700',
    ],
    [],
  );

  const checkScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testimonials.length]);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = 400;
    const newScrollLeft =
      direction === 'left'
        ? scrollContainerRef.current.scrollLeft - scrollAmount
        : scrollContainerRef.current.scrollLeft + scrollAmount;

    scrollContainerRef.current.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
    setTimeout(checkScroll, 300);
  };

  return (
    <section
      id="testimonials"
      className={
        headerVariant === 'magazine'
          ? 'scroll-mt-24 pt-24 md:pt-32 lg:pt-40 pb-16 sm:pb-20 lg:pb-24 bg-gradient-to-b from-background to-accent/5'
          : 'py-20 lg:py-32 relative overflow-hidden bg-background'
      }
    >
      <div className={headerVariant === 'magazine' ? 'container mx-auto px-4' : 'container mx-auto px-4 sm:px-6 lg:px-8'}>
        {headerVariant === 'magazine' ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <div className="max-w-5xl">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 mb-6"
              >
                <span className="font-mono text-6xl lg:text-8xl font-bold text-muted-foreground opacity-30">
                  {magazineNumber}
                </span>
                <div className="h-px flex-1 bg-border" />
              </motion.div>

              <HeadingTag className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold mb-8 leading-tight">
                {t('testimonials.realTestimonials')}
              </HeadingTag>

              <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-3xl">
                {t('testimonials.pageDescription')}
              </p>
            </div>
          </motion.div>
        ) : (
          <div className="flex flex-col sm:flex-row items-start justify-between mb-12 gap-6 sm:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="max-w-xl"
            >
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-4 leading-tight">
                <span className="text-primary">{t('testimonials.title')}</span>
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                {t('testimonials.description')}
              </p>
            </motion.div>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={headerVariant === 'magazine' ? 'flex items-center justify-end gap-3 mb-12' : 'flex items-center gap-3 flex-shrink-0 sm:ml-auto mb-12'}
        >
            <motion.button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all ${
                canScrollLeft
                  ? 'bg-foreground text-background hover:scale-110'
                  : 'bg-muted text-muted-foreground cursor-not-allowed'
              }`}
              whileHover={canScrollLeft ? { scale: 1.1 } : {}}
              whileTap={canScrollLeft ? { scale: 0.95 } : {}}
              aria-label={t('testimonials.previous')}
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.button>

            <motion.button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all ${
                canScrollRight
                  ? 'bg-foreground text-background hover:scale-110'
                  : 'bg-muted text-muted-foreground cursor-not-allowed'
              }`}
              whileHover={canScrollRight ? { scale: 1.1 } : {}}
              whileTap={canScrollRight ? { scale: 0.95 } : {}}
              aria-label={t('testimonials.next')}
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.button>
        </motion.div>

        {loading && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>{t('testimonials.loading')}</span>
          </div>
        )}

        {error && !loading && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-muted/30 rounded-2xl p-4">
            <div className="text-sm text-muted-foreground">{error}</div>
            <button
              onClick={refetch}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-foreground text-background"
            >
              <RefreshCcw className="w-4 h-4" />
              {t('testimonials.retry')}
            </button>
          </div>
        )}

        {!loading && !error && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div
              ref={scrollContainerRef}
              onScroll={checkScroll}
              className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
            >
              {testimonials.map((testimonial, index) => {
                const gradient = gradientColors[index % gradientColors.length];
                return (
                  <motion.div
                    key={testimonial.id}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex-shrink-0 w-[calc(100vw-2rem)] sm:w-[500px] lg:w-[600px] snap-start"
                  >
                    <motion.div
                      whileHover={{ y: -8 }}
                      transition={{ duration: 0.3 }}
                      className={`group relative h-full min-h-[300px] rounded-3xl bg-gradient-to-br ${gradient} text-white p-6 sm:p-8 flex flex-col justify-between overflow-hidden`}
                    >
                      <div>
                        <Quote className="w-8 h-8 mb-4 opacity-60" />

                        <p className="text-sm sm:text-base leading-relaxed mb-4 opacity-95 testimonial-clamp">
                          “{testimonial.comment}”
                        </p>

                        <div className="flex items-center gap-1 mb-4">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-white" />
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                            <span className="text-sm font-bold">{testimonial.initials}</span>
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="font-bold text-sm">{testimonial.name}</div>
                            <div className="text-xs opacity-80">{testimonial.position}</div>
                          </div>
                        </div>

                        {testimonial.linkedin ? (
                          <a
                            href={testimonial.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-shrink-0 w-9 h-9 rounded-xl bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all flex items-center justify-center group/link"
                            aria-label="Abrir LinkedIn"
                          >
                            <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                          </a>
                        ) : (
                          <div className="w-9 h-9" />
                        )}
                      </div>

                      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>

            <div className="hidden sm:block absolute top-0 left-0 bottom-8 w-20 bg-gradient-to-r from-background to-transparent pointer-events-none" />
            <div className="hidden sm:block absolute top-0 right-0 bottom-8 w-20 bg-gradient-to-l from-background to-transparent pointer-events-none" />
          </motion.div>
        )}

        {!loading && !error && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-20 max-w-5xl mx-auto"
          >
            <div className="text-center mb-12">
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 tracking-tight">
                {t('testimonials.whyTrust')}
              </h3>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                {t('testimonials.whyTrustDescription')}
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { value: '95%', label: t('testimonials.metrics.successful'), gradient: 'from-green-500 to-emerald-500' },
                { value: '100%', label: t('testimonials.metrics.delivery'), gradient: 'from-blue-500 to-cyan-500' },
                { value: '+250%', label: t('testimonials.metrics.roi'), gradient: 'from-purple-500 to-pink-500' },
                { value: '98%', label: t('testimonials.metrics.recommendation'), gradient: 'from-orange-500 to-yellow-500' },
              ].map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="text-center p-6 rounded-2xl bg-muted/30"
                >
                  <div
                    className={`text-4xl sm:text-5xl font-black mb-2 bg-gradient-to-br ${metric.gradient} bg-clip-text text-transparent`}
                  >
                    {metric.value}
                  </div>
                  <div className="text-sm font-medium text-muted-foreground">{metric.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .testimonial-clamp {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}
