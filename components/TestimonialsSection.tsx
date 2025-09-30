'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Quote, Star, ChevronLeft, ChevronRight, Users, Loader2, AlertCircle, RefreshCcw, Linkedin } from 'lucide-react';
import { useTestimonials } from '../hooks/useTestimonials';
import { TestimonialAvatar } from './TestimonialAvatar';

export function TestimonialsSection() {
  const { data: testimonials, loading, error, refetch } = useTestimonials();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Handlers for navigation
  const nextTestimonial = () => {
    if (testimonials.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }
  };

  const prevTestimonial = () => {
    if (testimonials.length > 0) {
      setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    }
  };

  // Loading state
  if (loading) {
    return (
      <section id="testimonials" className="py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        
        <div className="container mx-auto px-4">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-accent/50 rounded-full border border-border/50 mb-6"
            >
              <Users className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">Testimonios</span>
            </motion.div>
            
            <h2 className="text-3xl lg:text-5xl font-bold mb-16">
              <span className="bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
                Cargando Testimonios
              </span>
            </h2>

            <div className="flex justify-center items-center space-x-2">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <span className="text-muted-foreground">Obteniendo testimonios...</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section id="testimonials" className="py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        
        <div className="container mx-auto px-4">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-accent/50 rounded-full border border-border/50 mb-6"
            >
              <Users className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">Testimonios</span>
            </motion.div>
            
            <h2 className="text-3xl lg:text-5xl font-bold mb-8">
              <span className="bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
                Error al Cargar Testimonios
              </span>
            </h2>

            <div className="max-w-md mx-auto">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <AlertCircle className="w-6 h-6 text-red-500" />
                <span className="text-muted-foreground">{error}</span>
              </div>
              
              <button
                onClick={refetch}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors"
              >
                <RefreshCcw className="w-4 h-4" />
                Reintentar
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // No testimonials state
  if (testimonials.length === 0) {
    return (
      <section id="testimonials" className="py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        
        <div className="container mx-auto px-4">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-accent/50 rounded-full border border-border/50 mb-6"
            >
              <Users className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">Testimonios</span>
            </motion.div>
            
            <h2 className="text-3xl lg:text-5xl font-bold mb-8">
              <span className="bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
                No hay testimonios disponibles
              </span>
            </h2>
            
            <p className="text-muted-foreground">
              Actualmente no hay testimonios para mostrar.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="testimonials" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      <motion.div
        animate={{
          x: [-100, 100, -100],
          y: [-50, 50, -50],
          rotate: [0, 180, 360]
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl"
      />
      
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary mb-4">
            <Users className="w-4 h-4" />
            Testimonios de Clientes
          </motion.div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Lo Que Dicen Mis{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Clientes
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            La satisfacción de mis clientes es mi mayor logro. Aquí tienes algunas de sus experiencias trabajando conmigo.
          </p>
        </motion.div>

        {/* Desktop Grid Layout */}
        <div className="hidden lg:grid lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-3xl p-6 cursor-pointer min-h-[320px] flex flex-col bg-gradient-to-br from-accent/50 to-background border border-border/50 hover:scale-105 transition-transform duration-300"
              whileHover={{ scale: 1.02, y: -4 }}
            >
              {/* Background Pattern */}
              <div className="absolute -top-8 -right-8 w-16 h-16 rounded-full blur-xl opacity-50 bg-primary/20" />

              <div className="relative z-10 h-full flex flex-col">
                {/* Quote Icon */}
                <div className="mb-4">
                  <Quote className="w-8 h-8 text-primary/60" />
                </div>

                {/* Content */}
                <div className="flex-1 space-y-4">
                  <p className="leading-relaxed text-muted-foreground">
                    "{testimonial.comment}"
                  </p>

                  {/* Rating */}
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current text-primary" />
                    ))}
                  </div>
                </div>

                {/* Client Info */}
                <div className="flex items-center gap-3 pt-4 border-t border-current/20 mt-auto">
                  <TestimonialAvatar 
                    name={testimonial.name}
                    initials={testimonial.initials}
                    colorClass={testimonial.avatarColor}
                    size="md"
                  />
                  
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm text-foreground">
                      {testimonial.name}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.position}
                    </p>
                    
                    {testimonial.linkedin && (
                      <a 
                        href={testimonial.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 mt-1 text-xs text-primary hover:text-primary/80 transition-colors"
                      >
                        <Linkedin className="w-3 h-3" />
                        LinkedIn
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="lg:hidden">
          <div className="relative">
            <div className="overflow-hidden rounded-3xl">
              <motion.div
                className="flex"
                animate={{ x: -currentIndex * 100 + "%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="w-full flex-shrink-0">
                    <div className="mx-4 p-6 bg-gradient-to-br from-accent/50 to-background border border-border/50 rounded-3xl">
                      <div className="mb-4">
                        <Quote className="w-8 h-8 text-primary/60" />
                      </div>
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        "{testimonial.comment}"
                      </p>
                      <div className="flex items-center gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current text-primary" />
                        ))}
                      </div>
                      <div className="flex items-center gap-3">
                        <TestimonialAvatar 
                          name={testimonial.name}
                          initials={testimonial.initials}
                          colorClass={testimonial.avatarColor}
                          size="md"
                        />
                        <div>
                          <h4 className="font-semibold text-sm">{testimonial.name}</h4>
                          <p className="text-xs text-muted-foreground">{testimonial.position}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
            
            {/* Navigation */}
            <div className="flex items-center justify-between mt-6">
              <button
                onClick={prevTestimonial}
                className="p-3 rounded-full bg-background border border-border hover:bg-accent/50 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentIndex ? 'bg-primary' : 'bg-border'
                    }`}
                  />
                ))}
              </div>
              
              <button
                onClick={nextTestimonial}
                className="p-3 rounded-full bg-background border border-border hover:bg-accent/50 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Client Success Stories Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/5 via-accent/10 to-primary/5 border border-border/50 backdrop-blur-sm p-8 lg:p-12">
            {/* Background Animation */}
            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{
                rotate: { duration: 30, repeat: Infinity, ease: "linear" },
                scale: { duration: 15, repeat: Infinity, ease: "easeInOut" }
              }}
              className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-primary/10 to-accent/20 rounded-full blur-2xl"
            />
            
            <div className="relative z-10">
              <div className="text-center mb-12">
                <h3 className="text-2xl lg:text-3xl font-bold mb-4">Por Qué las Empresas Confían en Mí</h3>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  Más allá de testimonios, estos son los resultados que mis clientes experimentan consistentemente
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { 
                    icon: '🎯',
                    title: "Objetivos Superados", 
                    value: "95%", 
                    description: "De proyectos exceden las expectativas iniciales",
                    color: "from-blue-500/10 to-cyan-500/20"
                  },
                  { 
                    icon: '⚡',
                    title: "Entrega Puntual", 
                    value: "100%", 
                    description: "Récord de entregas en tiempo y forma",
                    color: "from-green-500/10 to-emerald-500/20"
                  },
                  { 
                    icon: '📈',
                    title: "Growth Promedio", 
                    value: "+165%", 
                    description: "Incremento en KPIs clave post-lanzamiento",
                    color: "from-purple-500/10 to-pink-500/20"
                  },
                  { 
                    icon: '🤝',
                    title: "Colaboraciones Largas", 
                    value: "18 meses", 
                    description: "Duración promedio de relaciones comerciales",
                    color: "from-orange-500/10 to-red-500/20"
                  }
                ].map((metric, index) => (
                  <motion.div
                    key={metric.title}
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15, duration: 0.6 }}
                    whileHover={{ 
                      scale: 1.05,
                      y: -5,
                      transition: { duration: 0.2 }
                    }}
                    className={`relative p-6 bg-gradient-to-br ${metric.color} rounded-2xl border border-border/50 backdrop-blur-sm overflow-hidden group`}
                  >
                    {/* Hover Glow */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/10 rounded-2xl"
                    />
                    
                    <div className="relative z-10 text-center space-y-3">
                      <div className="text-3xl group-hover:scale-110 transition-transform duration-300">
                        {metric.icon}
                      </div>
                      
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + 0.5, type: "spring", bounce: 0.4 }}
                        className="text-2xl lg:text-3xl font-bold text-primary"
                      >
                        {metric.value}
                      </motion.div>
                      
                      <div>
                        <h4 className="font-bold text-sm mb-1">{metric.title}</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {metric.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Call to Action */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
                className="text-center mt-12"
              >
                <motion.button
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-2xl hover:from-primary/90 hover:to-accent/90 transition-all duration-300 shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Únete a estos resultados
                </motion.button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}