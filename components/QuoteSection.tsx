import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Code, Server, Layers, Sparkles, Calculator, X, TrendingUp, CheckCircle2, Minus, Plus } from 'lucide-react';
import { Button } from './ui/button';

interface ServiceType {
  id: string;
  name: string;
  description: string;
  priceBase: number;
  specialty: 'frontend' | 'backend' | 'fullstack';
  includesDesign: boolean;
  baseFeatures: {name: string, included: boolean, price?: number}[];
  optionalFeatures: {name: string, price: number}[];
}

const services: ServiceType[] = [
  {
    id: 'landing-basic',
    name: 'Landing Básica',
    description: 'Una sección impactante',
    priceBase: 800,
    specialty: 'frontend',
    includesDesign: false,
    baseFeatures: [
      {name: 'Hero section', included: true},
      {name: 'Diseño responsivo', included: true},
      {name: 'Formulario contacto', included: true}
    ],
    optionalFeatures: [
      {name: 'SEO básico', price: 150},
      {name: 'Animaciones', price: 200},
      {name: 'Analytics', price: 100}
    ]
  },
  {
    id: 'landing-complete',
    name: 'Landing Completa',
    description: 'Scroll largo con animaciones',
    priceBase: 1000,
    specialty: 'frontend',
    includesDesign: false,
    baseFeatures: [
      {name: 'Múltiples secciones', included: true},
      {name: 'Diseño responsivo', included: true},
      {name: 'Formulario avanzado', included: true}
    ],
    optionalFeatures: [
      {name: 'Animaciones Motion', price: 300},
      {name: 'SEO avanzado', price: 250},
      {name: 'Analytics + Tracking', price: 150},
      {name: 'Chat integrado', price: 200}
    ]
  },
  {
    id: 'web-institutional',
    name: 'Web Institucional',
    description: 'Sitio completo profesional',
    priceBase: 1800,
    specialty: 'fullstack',
    includesDesign: true,
    baseFeatures: [
      {name: '4-6 páginas', included: true},
      {name: 'Sistema navegación', included: true},
      {name: 'Panel admin básico', included: true}
    ],
    optionalFeatures: [
      {name: 'Blog integrado', price: 400},
      {name: 'Multi-idioma', price: 500},
      {name: 'Sistema usuarios', price: 600},
      {name: 'SEO completo', price: 350}
    ]
  },
  {
    id: 'ecommerce',
    name: 'E-Commerce',
    description: 'Tienda online funcional',
    priceBase: 3000,
    specialty: 'fullstack',
    includesDesign: true,
    baseFeatures: [
      {name: 'Catálogo productos', included: true},
      {name: 'Carrito compras', included: true},
      {name: 'Panel vendedor', included: true}
    ],
    optionalFeatures: [
      {name: 'Pasarela de pago', price: 800},
      {name: 'Inventario avanzado', price: 600},
      {name: 'Sistema cupones', price: 400},
      {name: 'Envíos automáticos', price: 500}
    ]
  },
  {
    id: 'dashboard',
    name: 'Dashboard',
    description: 'Panel de control empresarial',
    priceBase: 2500,
    specialty: 'fullstack',
    includesDesign: true,
    baseFeatures: [
      {name: 'Visualización datos', included: true},
      {name: 'Gestión usuarios', included: true},
      {name: 'Reportes básicos', included: true}
    ],
    optionalFeatures: [
      {name: 'Charts avanzados', price: 500},
      {name: 'Exportación datos', price: 350},
      {name: 'Notificaciones real-time', price: 450},
      {name: 'API REST', price: 600}
    ]
  },
  {
    id: 'api-backend',
    name: 'API Backend',
    description: 'Sistema backend robusto',
    priceBase: 2000,
    specialty: 'backend',
    includesDesign: false,
    baseFeatures: [
      {name: 'Endpoints REST', included: true},
      {name: 'Base de datos', included: true},
      {name: 'Autenticación JWT', included: true}
    ],
    optionalFeatures: [
      {name: 'Microservicios', price: 800},
      {name: 'Websockets', price: 450},
      {name: 'Caché Redis', price: 350},
      {name: 'Documentación API', price: 300}
    ]
  }
];

const specialties = [
  { id: 'frontend', name: 'Frontend', icon: Code, color: 'from-blue-500 to-cyan-500' },
  { id: 'backend', name: 'Backend', icon: Server, color: 'from-purple-500 to-pink-500' },
  { id: 'fullstack', name: 'Full Stack', icon: Layers, color: 'from-orange-500 to-red-500' }
];

const UI_UX_DESIGN_PRICE = 600;

interface QuoteSectionProps {
  onNavigateToContact?: (serviceId?: string, specialty?: string, calculatedPrice?: number) => void;
}

export function QuoteSection({ onNavigateToContact }: QuoteSectionProps = {}) {
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null);
  const [showCalculator, setShowCalculator] = useState(false);
  const [selectedServiceForCalc, setSelectedServiceForCalc] = useState<ServiceType | null>(null);
  
  // Calculator state
  const [selectedOptionals, setSelectedOptionals] = useState<string[]>([]);
  const [hasDesign, setHasDesign] = useState(false);
  const [extraSections, setExtraSections] = useState(0);

  const filteredServices = selectedSpecialty
    ? services.filter(s => s.specialty === selectedSpecialty)
    : services;

  const handleServiceClick = (serviceId: string, specialty: string) => {
    if (onNavigateToContact) {
      onNavigateToContact(serviceId, specialty);
    }
  };

  const openCalculator = (service: ServiceType) => {
    setSelectedServiceForCalc(service);
    setSelectedOptionals([]);
    setHasDesign(false);
    setExtraSections(0);
    setShowCalculator(true);
  };

  const toggleOptional = (featureName: string) => {
    if (selectedOptionals.includes(featureName)) {
      setSelectedOptionals(selectedOptionals.filter(f => f !== featureName));
    } else {
      setSelectedOptionals([...selectedOptionals, featureName]);
    }
  };

  const calculateTotal = () => {
    if (!selectedServiceForCalc) return 0;
    
    let total = selectedServiceForCalc.priceBase;
    
    // Add optional features
    selectedServiceForCalc.optionalFeatures.forEach(feature => {
      if (selectedOptionals.includes(feature.name)) {
        total += feature.price;
      }
    });
    
    // Add extra sections (for frontend/fullstack)
    if (selectedServiceForCalc.specialty !== 'backend') {
      total += extraSections * 200;
    }
    
    // Add UI/UX if needed and user doesn't have design
    if (selectedServiceForCalc.specialty === 'frontend' && !hasDesign) {
      total += UI_UX_DESIGN_PRICE;
    }
    
    return total;
  };

  const handleQuoteWithPrice = () => {
    if (selectedServiceForCalc && onNavigateToContact) {
      const total = calculateTotal();
      onNavigateToContact(selectedServiceForCalc.id, selectedServiceForCalc.specialty, total);
      setShowCalculator(false);
    }
  };

  return (
    <section className="relative py-12 px-4 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.03, 0.06, 0.03]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header - Compact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h2 className="text-3xl md:text-4xl mb-3">
            <span className="bg-gradient-to-r from-foreground via-primary to-accent-foreground bg-clip-text text-transparent">
              Servicios & Precios
            </span>
          </h2>
          <p className="text-base text-muted-foreground">
            Elige tu especialidad y encuentra el servicio ideal
          </p>
        </motion.div>

        {/* Specialty Filter - Compact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mb-10"
        >
          <div className="grid grid-cols-3 gap-3">
            {specialties.map((specialty, index) => {
              const Icon = specialty.icon;
              const isSelected = selectedSpecialty === specialty.id;
              
              return (
                <motion.button
                  key={specialty.id}
                  onClick={() => setSelectedSpecialty(isSelected ? null : specialty.id)}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.03, y: -3 }}
                  whileTap={{ scale: 0.97 }}
                  className={`relative p-4 rounded-xl border-2 transition-all duration-300 ${
                    isSelected
                      ? 'border-primary bg-primary/5 shadow-lg'
                      : 'border-border/50 hover:border-primary/30 bg-background/50'
                  }`}
                >
                  <div className={`inline-flex p-2 rounded-lg bg-gradient-to-br ${specialty.color} mb-2`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-sm">{specialty.name}</h3>
                  <div className="text-xs text-muted-foreground mt-1">
                    {services.filter(s => s.specialty === specialty.id).length} servicios
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Services - Compact Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10"
        >
          {filteredServices.map((service, index) => {
            const specialty = specialties.find(s => s.id === service.specialty);
            
            return (
              <motion.div
                key={service.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.05 }}
                className="group relative overflow-hidden rounded-xl border border-border/50 bg-background/80 backdrop-blur-sm hover:border-primary/30 transition-all duration-300"
              >
                <div className="relative p-5">
                  {/* Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="inline-flex items-center gap-2 px-2 py-1 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 border border-border/50">
                      {specialty && <specialty.icon className="w-3 h-3" />}
                      <span className="text-xs">{specialty?.name}</span>
                    </div>
                    {service.id === 'landing-complete' && (
                      <div className="px-2 py-1 bg-primary text-primary-foreground rounded-lg text-xs flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        Popular
                      </div>
                    )}
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg mb-1 group-hover:text-primary transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-3">
                    {service.description}
                  </p>

                  {/* Price */}
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-xs text-muted-foreground">desde</span>
                    <span className="text-2xl">S/ {service.priceBase.toLocaleString()}</span>
                  </div>

                  {/* Base Features - Compact */}
                  <div className="space-y-1 mb-4">
                    {service.baseFeatures.slice(0, 3).map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs">
                        <CheckCircle2 className="w-3 h-3 text-primary shrink-0 mt-0.5" />
                        <span>{feature.name}</span>
                      </div>
                    ))}
                    {service.optionalFeatures.length > 0 && (
                      <div className="flex items-start gap-2 text-xs text-muted-foreground">
                        <Plus className="w-3 h-3 shrink-0 mt-0.5" />
                        <span>{service.optionalFeatures.length} opcionales</span>
                      </div>
                    )}
                  </div>

                  {/* CTA Buttons - Side by Side */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => openCalculator(service)}
                      className="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary text-xs transition-all group/btn"
                    >
                      <Calculator className="w-3 h-3 group-hover/btn:rotate-12 transition-transform" />
                      <span>Calcular</span>
                    </button>
                    <button
                      onClick={() => handleServiceClick(service.id, service.specialty)}
                      className="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-primary text-primary-foreground text-xs hover:bg-primary/90 transition-all group/btn"
                    >
                      <span>Cotizar</span>
                      <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Trust Indicators - Compact Horizontal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <div className="p-4 rounded-xl bg-gradient-to-br from-primary/5 to-transparent border border-border/50 text-center">
            <div className="text-2xl mb-1">⚡</div>
            <h4 className="text-sm mb-1">Entrega Rápida</h4>
            <p className="text-xs text-muted-foreground">2-4 semanas</p>
          </div>
          
          <div className="p-4 rounded-xl bg-gradient-to-br from-accent/5 to-transparent border border-border/50 text-center">
            <div className="text-2xl mb-1">💎</div>
            <h4 className="text-sm mb-1">Calidad Premium</h4>
            <p className="text-xs text-muted-foreground">+40% conversión</p>
          </div>
          
          <div className="p-4 rounded-xl bg-gradient-to-br from-primary/5 to-transparent border border-border/50 text-center">
            <div className="text-2xl mb-1">🛡️</div>
            <h4 className="text-sm mb-1">Garantía Total</h4>
            <p className="text-xs text-muted-foreground">Revisiones incluidas</p>
          </div>
        </motion.div>
      </div>

      {/* Calculator Modal */}
      <AnimatePresence>
        {showCalculator && selectedServiceForCalc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowCalculator(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card border border-border rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-xl">
                    <Calculator className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl">Calculadora de Precio</h3>
                    <p className="text-sm text-muted-foreground">{selectedServiceForCalc.name}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowCalculator(false)}
                  className="p-2 hover:bg-accent rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Base Price */}
              <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Precio base</span>
                  <span className="text-xl">S/ {selectedServiceForCalc.priceBase.toLocaleString()}</span>
                </div>
              </div>

              {/* UI/UX Design Option (Frontend only) */}
              {selectedServiceForCalc.specialty === 'frontend' && (
                <div className="mb-6">
                  <h4 className="text-sm mb-3">Diseño UI/UX</h4>
                  <div className="flex items-center justify-between p-4 rounded-xl border border-border/50 bg-background/50">
                    <div>
                      <label htmlFor="hasDesign" className="text-sm cursor-pointer">
                        ¿Ya tienes el diseño listo?
                      </label>
                      <p className="text-xs text-muted-foreground mt-1">
                        Si no, agregamos diseño UI/UX +S/ {UI_UX_DESIGN_PRICE}
                      </p>
                    </div>
                    <input
                      id="hasDesign"
                      type="checkbox"
                      checked={hasDesign}
                      onChange={(e) => setHasDesign(e.target.checked)}
                      className="w-5 h-5 accent-primary cursor-pointer"
                    />
                  </div>
                </div>
              )}

              {/* Extra Sections (Frontend/Fullstack) */}
              {selectedServiceForCalc.specialty !== 'backend' && (
                <div className="mb-6">
                  <h4 className="text-sm mb-3">Secciones Adicionales</h4>
                  <div className="flex items-center justify-between p-4 rounded-xl border border-border/50 bg-background/50">
                    <div>
                      <span className="text-sm">Agregar secciones extra</span>
                      <p className="text-xs text-muted-foreground mt-1">
                        +S/ 200 por sección
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setExtraSections(Math.max(0, extraSections - 1))}
                        className="p-2 rounded-lg hover:bg-accent transition-colors"
                        disabled={extraSections === 0}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="text-lg w-8 text-center">{extraSections}</span>
                      <button
                        onClick={() => setExtraSections(extraSections + 1)}
                        className="p-2 rounded-lg hover:bg-accent transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Optional Features */}
              {selectedServiceForCalc.optionalFeatures.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm mb-3">Características Opcionales</h4>
                  <div className="space-y-2">
                    {selectedServiceForCalc.optionalFeatures.map((feature) => (
                      <div
                        key={feature.name}
                        className="flex items-center justify-between p-3 rounded-xl border border-border/50 bg-background/50 hover:bg-accent/20 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            id={feature.name}
                            checked={selectedOptionals.includes(feature.name)}
                            onChange={() => toggleOptional(feature.name)}
                            className="w-4 h-4 accent-primary cursor-pointer"
                          />
                          <label htmlFor={feature.name} className="text-sm cursor-pointer">
                            {feature.name}
                          </label>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          +S/ {feature.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Total Price */}
              <div className="p-5 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary/30 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Total Estimado</span>
                  <span className="text-3xl">S/ {calculateTotal().toLocaleString()}</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  * Precio referencial. Puede ajustarse según requerimientos específicos.
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Button
                  onClick={handleQuoteWithPrice}
                  className="flex-1"
                  size="lg"
                >
                  Solicitar Cotización con este Precio
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
