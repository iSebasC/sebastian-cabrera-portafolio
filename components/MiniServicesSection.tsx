import { motion } from 'framer-motion';
import { CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function MiniServicesSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  const { t } = useTranslation();

  const services = [
    {
      title: t('services.service1.title'),
      items: [
        t('services.service1.item1'),
        t('services.service1.item2'),
      ],
    },
    {
      title: t('services.service2.title'),
      items: [
        t('services.service2.item1'),
      ],
    },
    {
      title: t('services.service3.title'),
      items: [
        t('services.service3.item1'),
      ],
    },
    {
      title: t('services.service4.title'),
      items: [
        t('services.service4.item1'),
      ],
    },
  ];

  return (
    <section className="py-24 sm:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-6">
                {t('services.title')}
              </h2>
              <p className="text-base text-muted-foreground max-w-lg">
                {t('services.description')}
              </p>
            </motion.div>

            <div className="space-y-4">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="border-b border-border pb-4"
                >
                  <button
                    onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                    className="w-full flex items-center justify-between text-left group"
                    aria-expanded={expandedIndex === index}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-lg font-bold flex items-center gap-2 transition-colors ${
                          expandedIndex === index ? 'text-blue-600' : 'text-muted-foreground'
                        }`}
                      >
                        {index + 1}
                        {expandedIndex === index && (
                          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-2 h-2 rounded-full bg-blue-600" />
                        )}
                      </span>

                      <h3
                        className={`text-xl sm:text-2xl font-bold tracking-tight transition-colors ${
                          expandedIndex === index ? 'text-blue-600' : 'text-foreground'
                        }`}
                      >
                        {service.title}
                      </h3>
                    </div>

                    <div className="flex-shrink-0">
                      {expandedIndex === index ? (
                        <ChevronUp className="w-6 h-6 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="w-6 h-6 text-muted-foreground" />
                      )}
                    </div>
                  </button>

                  <motion.div
                    initial={false}
                    animate={{
                      height: expandedIndex === index ? 'auto' : 0,
                      opacity: expandedIndex === index ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 pl-8 space-y-3">
                      {service.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-muted-foreground">{item}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 3 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 6 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:flex relative justify-center items-center"
          >
            <div
              className="rounded-3xl overflow-hidden shadow-2xl max-w-xs mx-auto"
              style={{
                transform: 'rotate(6deg) translateY(60px)',
                transformOrigin: 'center center',
              }}
            >
              <ImageWithFallback
                src="/img/servicios.webp"
                alt="Servicios"
                className="w-full h-auto object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
