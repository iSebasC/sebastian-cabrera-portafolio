import { motion } from 'framer-motion';
import { ArrowDown, Sparkles, Star, Zap, Target } from 'lucide-react';

interface HeroSectionProps {
  setActiveSection: (section: string) => void;
}

export function HeroSection({ setActiveSection }: HeroSectionProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-accent/5 flex flex-col min-h-screen">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.02, 1],
          }}
          transition={{ 
            rotate: { duration: 30, repeat: Infinity, ease: "linear" },
            scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-primary/3 via-transparent to-accent/5 rounded-full"
        />
        
        <motion.div
          animate={{ 
            rotate: -360,
            x: [0, 50, 0],
            y: [0, -25, 0]
          }}
          transition={{ 
            rotate: { duration: 40, repeat: Infinity, ease: "linear" },
            x: { duration: 20, repeat: Infinity, ease: "easeInOut" },
            y: { duration: 15, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute -bottom-1/2 -left-1/2 w-3/4 h-3/4 bg-gradient-to-tr from-accent/3 via-transparent to-primary/3 rounded-full"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 pt-20 lg:pt-0 flex-1 flex items-center relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            <motion.div variants={itemVariants} className="space-y-6">
              <motion.div 
                className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-primary/5 border border-primary/10 rounded-full"
                whileHover={{ scale: 1.02 }}
              >
                <Sparkles className="w-3 sm:w-4 h-3 sm:h-4 text-primary" />
                <span className="text-xs sm:text-sm text-muted-foreground font-medium">Desarrollador FullStack & Diseñador Creativo</span>
              </motion.div>
              
              <h1 className="text-3xl sm:text-4xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
                  Creando
                </span>
                <br />
                <span className="text-primary">Experiencias</span>
                <br />
                <span className="bg-gradient-to-r from-primary via-foreground to-primary bg-clip-text text-transparent">
                  Visuales
                </span>
              </h1>
            </motion.div>

            <motion.p 
              variants={itemVariants}
              className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-lg leading-relaxed"
            >
              Transformo ideas en diseños impactantes que conectan con audiencias y generan 
              <span className="text-primary font-medium"> resultados extraordinarios</span>.
            </motion.p>

            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4"
            >
                <motion.button
                onClick={() => setActiveSection('projects')}
                className="group px-6 sm:px-8 py-3 sm:py-4 bg-primary text-primary-foreground rounded-2xl hover:bg-primary/90 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl text-sm sm:text-base"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Ver Mi Trabajo
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowDown className="w-5 h-5 rotate-[-90deg]" />
                </motion.div>
              </motion.button>
              
              <motion.button
                onClick={() => setActiveSection('contact')}
                className="px-6 sm:px-8 py-3 sm:py-4 border border-border hover:bg-accent transition-all duration-300 rounded-2xl font-medium text-sm sm:text-base"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Hablemos
              </motion.button>
            </motion.div>

            {/* Value Proposition - Clean */}
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8"
            >
              {[
                { icon: Target, text: "Resultados Comprobados", accent: "text-green-600" },
                { icon: Zap, text: "Entrega Rápida", accent: "text-blue-600" },
                { icon: Star, text: "100% Personalizado", accent: "text-purple-600" }
              ].map((item, index) => (
                <motion.div 
                  key={item.text}
                  className="flex items-center gap-3 p-3 rounded-xl bg-background/50 border border-border/50"
                  whileHover={{ scale: 1.02, y: -2 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 1 }}
                >
                  <div className={`p-2 rounded-lg bg-gradient-to-br from-accent/50 to-primary/10 ${item.accent}`}>
                    <item.icon className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">{item.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Visual Grid */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
          >
            {/* Professional Visual Grid */}
            <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px] rounded-3xl bg-gradient-to-br from-background via-accent/5 to-primary/5 border border-border/20 overflow-hidden">
              
              {/* Header Bar */}
              <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-r from-primary/10 to-accent/10 border-b border-border/20 flex items-center px-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400/60"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400/60"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400/60"></div>
                </div>
                <div className="flex-1 text-center">
                  <div className="text-xs text-muted-foreground font-medium">Sebastian Cabrera</div>
                </div>
              </div>

              {/* Content Grid */}
              <div className="absolute inset-0 top-12 p-4 sm:p-6 lg:p-8 grid grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
                {/* Design Elements */}
                {[
                  { size: "col-span-2 row-span-2", bg: "from-blue-500/10 to-purple-500/10", delay: 0 },
                  { size: "col-span-1 row-span-1", bg: "from-green-500/10 to-teal-500/10", delay: 0.1 },
                  { size: "col-span-1 row-span-1", bg: "from-pink-500/10 to-red-500/10", delay: 0.2 },
                  { size: "col-span-1 row-span-2", bg: "from-orange-500/10 to-yellow-500/10", delay: 0.3 },
                  { size: "col-span-1 row-span-1", bg: "from-purple-500/10 to-blue-500/10", delay: 0.4 },
                  { size: "col-span-2 row-span-1", bg: "from-teal-500/10 to-green-500/10", delay: 0.5 },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className={`${item.size} bg-gradient-to-br ${item.bg} rounded-xl border border-border/10 backdrop-blur-sm flex items-center justify-center`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: item.delay + 0.5, duration: 0.6 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {index === 0 && (
                      <div className="text-center space-y-2">
                        <div className="w-8 sm:w-10 lg:w-12 h-8 sm:h-10 lg:h-12 mx-auto bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                          <Sparkles className="w-4 sm:w-5 lg:w-6 h-4 sm:h-5 lg:h-6 text-primary-foreground" />
                        </div>
                        <div className="text-xs font-medium text-muted-foreground">Proyecto destacado</div>
                      </div>
                    )}
                    {index === 1 && (
                      <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-teal-400 rounded-lg"></div>
                    )}
                    {index === 2 && (
                      <div className="w-6 h-6 bg-gradient-to-br from-pink-400 to-red-400 rounded-full"></div>
                    )}
                    {index === 3 && (
                      <div className="space-y-2">
                        <div className="w-8 h-1 bg-gradient-to-r from-orange-400 to-yellow-400 rounded"></div>
                        <div className="w-6 h-1 bg-gradient-to-r from-orange-400 to-yellow-400 rounded"></div>
                        <div className="w-10 h-1 bg-gradient-to-r from-orange-400 to-yellow-400 rounded"></div>
                      </div>
                    )}
                    {index === 4 && (
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-blue-400 rounded-lg rotate-45"></div>
                    )}
                    {index === 5 && (
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-teal-400 rounded-full animate-pulse"></div>
                        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                        <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Floating Stats */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="absolute bottom-6 right-6 bg-background/80 backdrop-blur-sm rounded-xl p-4 border border-border/20 shadow-lg"
              >
                <div className="text-xs text-muted-foreground mb-1">Tasa de Éxito</div>
                <div className="text-2xl font-bold text-primary">95%</div>
                <div className="flex items-center gap-1 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="relative z-20 pb-6 sm:pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.5 }}
          className="flex justify-center"
        >
          <motion.button
            onClick={() => setActiveSection('projects')}
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group px-4 py-2 rounded-xl hover:bg-accent/50 backdrop-blur-sm"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-xs sm:text-sm font-medium">Explorar Portfolio</span>
            <ArrowDown className="w-4 sm:w-5 h-4 sm:h-5 group-hover:text-primary transition-colors" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}