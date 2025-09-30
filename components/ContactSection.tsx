import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, Phone, MapPin, MessageCircle, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG, isProduction } from '../config/email';

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "sebastiandev@sebastiancabreraalcala.com",
    href: "mailto:sebastiandev@sebastiancabreraalcala.com"
  },
  {
    icon: Phone,
    label: "Teléfono",
    value: "+51 993 106 111",
    href: "tel:+51993106111"
  },
  {
    icon: MapPin,
    label: "Ubicación",
    value: "Lima, Perú",
    href: "#"
  }
];

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      if (isProduction()) {
        // En producción: usar Netlify Forms
        const formData = new FormData(e.target as HTMLFormElement);
        
        const response = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(formData as any).toString()
        });
        
        if (!response.ok) throw new Error('Error en Netlify Forms');
      } else {
        // En desarrollo: usar EmailJS
        const templateParams = {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_name: 'Sebastian',
        };
        
        await emailjs.send(
          EMAILJS_CONFIG.serviceId,
          EMAILJS_CONFIG.templateId,
          templateParams,
          EMAILJS_CONFIG.publicKey
        );
      }
      
      setIsSubmitted(true);
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', email: '', subject: '', message: '' });
      }, 3000);
      
    } catch (error) {
      console.error('Error:', error);
      
      // En caso de error, simular envío para demo
      console.log('📧 Simulando envío para demo:', {
        nombre: formData.name,
        email: formData.email,
        asunto: formData.subject,
        mensaje: formData.message
      });
      
      alert('⚠️ Formulario en modo demo. Los datos se muestran en consola. En producción enviará correos reales.');
      
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', email: '', subject: '', message: '' });
      }, 3000);
      
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 lg:py-32 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            background: [
              'radial-gradient(circle at 70% 20%, rgba(120, 119, 198, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 80%, rgba(255, 119, 198, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 60%, rgba(119, 198, 255, 0.1) 0%, transparent 50%)'
            ]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="w-full h-full"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-primary/10 to-accent/20 rounded-full border border-border/50 mb-8"
          >
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <MessageCircle className="w-5 h-5 text-primary" />
            </motion.div>
            <span className="font-medium">¡Conectemos!</span>
          </motion.div>
          
          <h2 className="text-4xl lg:text-6xl xl:text-7xl font-bold mb-8">
            <motion.span
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{ duration: 5, repeat: Infinity }}
              className="bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent bg-[length:200%]"
            >
              ¿Listo para
            </motion.span>
            <br />
            <span className="relative">
              <motion.span
                animate={{
                  color: ['#000', '#7c3aed', '#ec4899', '#000']
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="relative z-10"
              >
                Crear Juntos?
              </motion.span>
              <motion.div
                animate={{
                  scaleX: [0, 1, 0],
                  opacity: [0, 0.3, 0]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute bottom-2 left-0 w-full h-3 bg-gradient-to-r from-primary to-accent rounded-full"
              />
            </span>
          </h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            Cada gran proyecto comienza con una conversación. Cuéntame tu visión 
            y transformémosla en una experiencia visual extraordinaria.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-20 items-start">
          {/* Enhanced Interactive Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.h3 
                className="text-3xl font-bold"
                whileHover={{ scale: 1.02 }}
              >
                Comencemos una 
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"> Conversación</span>
              </motion.h3>
              <p className="text-muted-foreground text-lg">
                Cada detalle cuenta. Mientras más me cuentes, mejor podré ayudarte.
              </p>
            </div>

            <motion.form
              onSubmit={handleSubmit}
              name="contact"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              className="space-y-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {/* Campo oculto para Netlify */}
              <input type="hidden" name="form-name" value="contact" />
              <div className="grid sm:grid-cols-2 gap-6">
                {/* Name Field */}
                <motion.div 
                  className="relative space-y-3"
                  whileHover={{ scale: 1.02 }}
                >
                  <label htmlFor="name" className="text-sm font-medium flex items-center gap-2">
                    <span className="text-base leading-none">👋</span>
                    <motion.span
                      animate={{ 
                        color: focusedField === 'name' ? '#7c3aed' : 'inherit'
                      }}
                    >
                      ¿Cómo te llamas?
                    </motion.span>
                  </label>
                  <div className="relative">
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      required
                      className="h-14 pl-4 pr-12 text-lg bg-background/50 backdrop-blur-sm border-2 transition-all duration-300 rounded-2xl focus:border-primary/50 hover:border-primary/30"
                      placeholder="Tu nombre"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-primary/60 flex items-center justify-center w-6 h-6">
                      <span className="text-lg leading-none">✨</span>
                    </div>
                  </div>
                </motion.div>
                
                {/* Email Field */}
                <motion.div 
                  className="relative space-y-3"
                  whileHover={{ scale: 1.02 }}
                >
                  <label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                    <span className="text-base leading-none">📧</span>
                    <motion.span
                      animate={{ 
                        color: focusedField === 'email' ? '#7c3aed' : 'inherit'
                      }}
                    >
                      ¿Cuál es tu email?
                    </motion.span>
                  </label>
                  <div className="relative">
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      required
                      className="h-14 pl-4 pr-12 text-lg bg-background/50 backdrop-blur-sm border-2 transition-all duration-300 rounded-2xl focus:border-primary/50 hover:border-primary/30"
                      placeholder="tu@email.com"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-primary/60 flex items-center justify-center w-6 h-6">
                      <span className="text-lg leading-none">💌</span>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Subject Field */}
              <motion.div 
                className="relative space-y-3"
                whileHover={{ scale: 1.01 }}
              >
                <label htmlFor="subject" className="text-sm font-medium flex items-center gap-2">
                  <span className="text-base leading-none">🎯</span>
                  <motion.span
                    animate={{ 
                      color: focusedField === 'subject' ? '#7c3aed' : 'inherit'
                    }}
                  >
                    ¿Qué tienes en mente?
                  </motion.span>
                </label>
                <div className="relative">
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('subject')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="h-14 pl-4 pr-12 text-lg bg-background/50 backdrop-blur-sm border-2 transition-all duration-300 rounded-2xl focus:border-primary/50 hover:border-primary/30"
                    placeholder="Proyecto web, branding, ilustración..."
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-primary/60 flex items-center justify-center w-6 h-6">
                    <span className="text-lg leading-none">🚀</span>
                  </div>
                </div>
              </motion.div>

              {/* Message Field */}
              <motion.div 
                className="relative space-y-3"
                whileHover={{ scale: 1.005 }}
              >
                <label htmlFor="message" className="text-sm font-medium flex items-center gap-2">
                  <span className="text-base leading-none">💭</span>
                  <motion.span
                    animate={{ 
                      color: focusedField === 'message' ? '#7c3aed' : 'inherit'
                    }}
                  >
                    Cuéntame los detalles
                  </motion.span>
                </label>
                <div className="relative">
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    required
                    rows={6}
                    placeholder="Describe tu proyecto, objetivos, plazos, presupuesto estimado... ¡Todo lo que consideres importante!"
                    className="pl-4 pr-4 pt-4 text-lg bg-background/50 backdrop-blur-sm border-2 transition-all duration-300 rounded-2xl focus:border-primary/50 hover:border-primary/30 resize-none"
                  />
                  <div className="absolute right-4 top-4 text-primary/60 flex items-center justify-center w-6 h-6">
                    <span className="text-lg leading-none">✍️</span>
                  </div>
                </div>
              </motion.div>

              {/* Enhanced Submit Button */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="pt-4"
              >
                <Button
                  type="submit"
                  className="group relative w-full h-16 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground rounded-3xl overflow-hidden transition-all duration-500 shadow-lg hover:shadow-2xl"
                  disabled={isSubmitting || isSubmitted}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{ x: [-100, 400] }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 3,
                      ease: "easeInOut"
                    }}
                  />
                  
                  {isSubmitted ? (
                    <motion.div
                      initial={{ scale: 0, rotate: -10 }}
                      animate={{ scale: 1, rotate: 0 }}
                      className="flex items-center gap-3 text-lg font-semibold"
                    >
                      <CheckCircle className="w-6 h-6" />
                      ¡Mensaje Enviado! 🎉
                    </motion.div>
                  ) : isSubmitting ? (
                    <motion.div
                      className="flex items-center gap-3 text-lg font-semibold"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <div className="w-6 h-6 border-3 border-primary-foreground/20 border-t-primary-foreground rounded-full" />
                      </motion.div>
                      Enviando tu mensaje...
                    </motion.div>
                  ) : (
                    <div className="flex items-center gap-3 text-lg font-semibold">
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <Send className="w-6 h-6" />
                      </motion.div>
                      Enviar Mensaje
                      <span className="group-hover:translate-x-1 transition-transform">🚀</span>
                    </div>
                  )}
                </Button>
              </motion.div>
            </motion.form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold mb-4">Información de Contacto</h3>
              <p className="text-muted-foreground">
                También puedes contactarme directamente a través de cualquiera de estos medios.
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.label}
                  href={info.href}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group flex items-center gap-4 p-4 bg-accent/30 rounded-2xl border border-border/50 hover:bg-accent/50 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                    <info.icon className="w-6 h-6 text-primary" />
                  </div>
                  
                  <div>
                    <div className="font-medium text-sm text-muted-foreground">
                      {info.label}
                    </div>
                    <div className="font-semibold group-hover:text-primary transition-colors">
                      {info.value}
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Visual Element */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative p-8 bg-gradient-to-br from-primary/10 to-accent/20 rounded-3xl border border-border/50 overflow-hidden"
            >
              <div className="relative z-10">
                <h4 className="text-xl font-bold mb-2">¡Trabajemos Juntos!</h4>
                <p className="text-muted-foreground text-sm">
                  Estoy disponible para proyectos freelance y colaboraciones a tiempo completo.
                </p>
              </div>
              
              {/* Background Pattern */}
              <motion.div
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
                }}
                className="absolute -top-4 -right-4 w-16 h-16 bg-primary/20 rounded-full blur-sm"
              />
              
              <motion.div
                animate={{ 
                  rotate: -360,
                  x: [0, 10, 0],
                  y: [0, -5, 0]
                }}
                transition={{ 
                  rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                  x: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                  y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                }}
                className="absolute -bottom-2 -left-2 w-12 h-12 bg-accent/30 rounded-full blur-sm"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}