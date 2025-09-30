import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, Rocket, Sparkles, Zap, Layers, Palette, 
  Monitor, Trophy, Coffee, Heart, Star,
  Eye, Lightbulb, Target, Award
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface AboutSectionProps {
  setActiveSection?: (section: string) => void;
}

const designPrinciples = [
  {
    id: 'creativity',
    icon: Sparkles,
    title: 'Creatividad',
    description: 'Cada proyecto es una oportunidad para innovar',
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-500/10',
    value: 98
  },
  {
    id: 'strategy',
    icon: Brain,
    title: 'Estrategia',
    description: 'Diseño con propósito y objetivos claros',
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-500/10',
    value: 95
  },
  {
    id: 'execution',
    icon: Zap,
    title: 'Ejecución',
    description: 'Perfección técnica en cada detalle',
    color: 'from-orange-500 to-red-500',
    bgColor: 'bg-orange-500/10',
    value: 92
  },
  {
    id: 'innovation',
    icon: Rocket,
    title: 'Innovación',
    description: 'Siempre un paso adelante de las tendencias',
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-500/10',
    value: 90
  }
];

const tools = [
  // Backend
  { name: 'Laravel (PHP)', level: 95, category: 'Backend' },
  { name: 'Node.js / NestJS', level: 90, category: 'Backend' },
  { name: 'MySQL / SQL Server', level: 88, category: 'Database' },
  
  // Frontend
  { name: 'Next.js', level: 92, category: 'Frontend' },
  { name: 'React', level: 95, category: 'Frontend' },
  
  // Diseño & UI/UX
  { name: 'Figma', level: 98, category: 'Design' }
];

const businessMetrics = [
  { 
    icon: Trophy, 
    title: 'ROI Promedio', 
    value: '280%', 
    description: 'Incremento en conversiones de clientes',
    color: 'text-yellow-500',
    bgColor: 'from-yellow-500/10 to-orange-500/20'
  },
  { 
    icon: Target, 
    title: 'Tiempo de Entrega', 
    value: '15 días', 
    description: 'Promedio para proyectos completos',
    color: 'text-blue-500',
    bgColor: 'from-blue-500/10 to-cyan-500/20'
  },
  { 
    icon: Award, 
    title: 'Tasa de Retención', 
    value: '94%', 
    description: 'Clientes que repiten proyectos',
    color: 'text-green-500',
    bgColor: 'from-green-500/10 to-emerald-500/20'
  },
  { 
    icon: Rocket, 
    title: 'Proyectos Escalados', 
    value: '85%', 
    description: 'Expandieron después del primer proyecto',
    color: 'text-purple-500',
    bgColor: 'from-purple-500/10 to-pink-500/20'
  }
];

const workProcess = [
  {
    step: '01',
    title: 'Descubrir',
    description: 'Investigo, analizo y entiendo cada detalle del desafío creativo.',
    icon: Eye,
    color: 'from-blue-400 to-blue-600'
  },
  {
    step: '02',
    title: 'Conceptualizar',
    description: 'Desarrollo múltiples conceptos y exploro direcciones creativas únicas.',
    icon: Lightbulb,
    color: 'from-yellow-400 to-orange-500'
  },
  {
    step: '03',
    title: 'Diseñar',
    description: 'Ejecuto la visión con precisión técnica y atención al detalle.',
    icon: Palette,
    color: 'from-purple-400 to-pink-500'
  },
  {
    step: '04',
    title: 'Entregar',
    description: 'Presento soluciones que superan expectativas y generan impacto.',
    icon: Target,
    color: 'from-green-400 to-emerald-500'
  }
];

export function AboutSection({ setActiveSection }: AboutSectionProps) {
  const [selectedPrinciple, setSelectedPrinciple] = useState('creativity');
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);

  return (
    <section className="py-20 lg:py-32 relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            background: [
              'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 40% 40%, rgba(119, 198, 255, 0.1) 0%, transparent 50%)'
            ]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="w-full h-full"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-primary/10 to-accent/20 rounded-full border border-border/50 mb-8"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-5 h-5 text-primary" />
            </motion.div>
            <span className="font-medium">El Arte de Crear Experiencias</span>
          </motion.div>

          <h2 className="text-4xl lg:text-6xl xl:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
              Diseño que
            </span>
            <br />
            <span className="relative">
              <motion.span
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent bg-[length:200%]"
              >
                Transforma
              </motion.span>
            </span>
          </h2>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Más que un diseñador, soy un estratega visual que convierte ideas complejas 
            en experiencias memorables que conectan, inspiran y generan resultados.
          </p>
        </motion.div>

        {/* Interactive Design Principles Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h3 className="text-2xl lg:text-3xl font-bold text-center mb-12">Pilares de mi Metodología</h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {designPrinciples.map((principle, index) => (
              <motion.div
                key={principle.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedPrinciple(principle.id)}
                className={`relative group cursor-pointer p-6 rounded-3xl border transition-all duration-500 ${
                  selectedPrinciple === principle.id
                    ? 'border-primary/50 shadow-xl scale-105'
                    : 'border-border/50 hover:border-primary/30 hover:shadow-lg'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${principle.color} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500`} />
                
                <div className="relative z-10">
                  <div className={`w-12 h-12 ${principle.bgColor} rounded-2xl flex items-center justify-center mb-4`}>
                    <principle.icon className="w-6 h-6 text-primary" />
                  </div>
                  
                  <h4 className="font-bold text-lg mb-2">{principle.title}</h4>
                  <p className="text-sm text-muted-foreground mb-4">{principle.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium">Experiencia</span>
                      <span className="text-xs text-primary">{principle.value}%</span>
                    </div>
                    <div className="w-full bg-accent/30 rounded-full h-1.5">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${principle.value}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: index * 0.2 }}
                        className={`h-full bg-gradient-to-r ${principle.color} rounded-full`}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Personal Identity Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="max-w-4xl mx-auto">
            <div className="relative p-8 lg:p-12 bg-gradient-to-br from-background via-accent/10 to-primary/5 rounded-3xl border border-border/50 overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-[0.02]">
                <div className="absolute inset-0" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  backgroundSize: '30px 30px'
                }} />
              </div>

              <div className="relative z-10 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mb-8"
                >
                  <div className="inline-flex items-center gap-3 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 mb-6">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-sm font-medium">Disponible para nuevos proyectos</span>
                  </div>
                  
                  <h3 className="text-3xl lg:text-4xl font-bold mb-4">
                    Hola, soy <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Sebastian</span>
                  </h3>
                  
                  <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                    <strong> Desarrollador y Diseñador Web</strong> con experiencia en backend, frontend y diseño visual.
                    Creo soluciones digitales seguras, escalables y atractivas que combinan funcionalidad, diseño y una buena experiencia de usuario.
                  </p>
                </motion.div>

                

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                      setActiveSection?.('contact');
                    }}
                    className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all"
                  >
                    <div className="flex items-center gap-2">
                      <Coffee className="w-4 h-4" />
                      Conversemos sobre tu proyecto
                    </div>
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                      setActiveSection?.('projects');
                    }}
                    className="px-8 py-3 bg-background border border-border hover:border-primary/50 rounded-xl font-medium transition-all"
                  >
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      Ver mi trabajo
                    </div>
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Personal Introduction Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left: Personal Photo & Identity */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative group">
              {/* Main Personal Photo */}
              <motion.div
                animate={{ 
                  rotateY: [0, 3, 0],
                  rotateX: [0, 1, 0]
                }}
                transition={{ 
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative overflow-hidden rounded-3xl shadow-2xl"
              >
                <ImageWithFallback
                  src="/img/profile_sebastian.jpg"
                  alt="Sebastian - Diseñador Gráfico"
                  className="w-full h-[600px] object-cover object-center"
                />
                
                {/* Professional Badge Overlay */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="absolute bottom-6 left-6 right-6"
                >
                  <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 border border-white/50 shadow-xl">
                    <div className="flex items-center gap-4">
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0"
                      >
                        <Sparkles className="w-8 h-8 text-white" />
                      </motion.div>
                      
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 text-lg">Sebastian</h4>
                        <p className="text-gray-600 text-sm">Desarrollador FullStack</p>
                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                          <span className="text-xs text-gray-500">3+ años experiencia</span>
                        </div>
                      </div>
                      
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-right"
                      >
                        <div className="text-2xl font-bold text-gray-900">94%</div>
                        <div className="text-xs text-gray-500">Satisfacción</div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>

                <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 via-transparent to-blue-500/20" />
              </motion.div>

              {/* Floating Skill Badges */}
              {[
                { x: -20, y: -20, delay: 0, icon: Layers, color: 'bg-purple-500', skill: 'UI/UX' },
                { x: -15, y: '75%', delay: 1.5, icon: Palette, color: 'bg-pink-500', skill: 'Branding' },
                { x: '90%', y: -15, delay: 2.2, icon: Monitor, color: 'bg-blue-500', skill: 'Web' },
                { x: '85%', y: '65%', delay: 0.8, icon: Sparkles, color: 'bg-green-500', skill: 'Creative' }
              ].map((element, index) => (
                <motion.div
                  key={index}
                  animate={{ 
                    y: [0, -20, 0],
                    rotate: [0, 15, -5, 0],
                    scale: [1, 1.15, 1]
                  }}
                  transition={{ 
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: element.delay
                  }}
                  className="absolute"
                  style={{ left: element.x, top: element.y }}
                >
                  <div className={`${element.color} rounded-2xl px-4 py-2 shadow-xl backdrop-blur-sm border border-white/30 group cursor-pointer`}>
                    <div className="flex items-center gap-2">
                      <element.icon className="w-4 h-4 text-white" />
                      <span className="text-white text-sm font-bold">{element.skill}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Process & Philosophy */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-3xl font-bold mb-6">Mi Proceso Creativo</h3>
              <div className="space-y-6">
                {workProcess.map((step, index) => (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4 group"
                  >
                    <div className={`relative w-12 h-12 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                      <step.icon className="w-6 h-6 text-white" />
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-background border-2 border-border rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-primary">{step.step}</span>
                      </div>
                    </div>
                    
                    <div className="group-hover:translate-x-2 transition-transform duration-300">
                      <h4 className="font-bold text-lg mb-1">{step.title}</h4>
                      <p className="text-muted-foreground">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Philosophy Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="p-6 bg-gradient-to-br from-accent/30 to-primary/10 rounded-3xl border border-border/50 backdrop-blur-sm"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2">Mi Filosofía</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    "El diseño excepcional surge cuando la creatividad encuentra la estrategia. 
                    No creo en diseño bonito sin propósito, sino en soluciones visuales que 
                    conectan emocionalmente y generan resultados medibles."
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Interactive Arsenal Creativo */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">Arsenal Creativo</h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Herramientas maestras que domino para crear experiencias visuales extraordinarias
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tools.map((tool, index) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, scale: 0.8, rotateY: -10 }}
                whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.8 }}
                onMouseEnter={() => setHoveredTool(tool.name)}
                onMouseLeave={() => setHoveredTool(null)}
                className="relative group cursor-pointer"
              >
                {/* Main Card */}
                <motion.div
                  whileHover={{ 
                    scale: 1.05, 
                    rotateY: 5,
                    rotateX: 5,
                    z: 50
                  }}
                  className="relative p-8 bg-gradient-to-br from-background to-accent/30 rounded-3xl border border-border/50 group-hover:border-primary/40 transition-all duration-500 backdrop-blur-sm"
                >
                  {/* Tool Icon/Logo Area */}
                  <div className="relative mb-6">
                    <motion.div
                      animate={{ 
                        rotate: hoveredTool === tool.name ? 360 : 0,
                        scale: hoveredTool === tool.name ? 1.1 : 1
                      }}
                      transition={{ duration: 0.8 }}
                      className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold ${
                        tool.category === 'Design' ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white' :
                        tool.category === 'Frontend' ? 'bg-gradient-to-br from-blue-500 to-cyan-500 text-white' :
                        tool.category === 'Backend' ? 'bg-gradient-to-br from-orange-500 to-red-500 text-white' :
                        tool.category === 'Database' ? 'bg-gradient-to-br from-green-500 to-emerald-500 text-white' :
                        tool.category === 'Motion' ? 'bg-gradient-to-br from-yellow-500 to-orange-500 text-white' :
                        tool.category === '3D' ? 'bg-gradient-to-br from-indigo-500 to-purple-500 text-white' :
                        tool.category === 'Development' ? 'bg-gradient-to-br from-teal-500 to-green-500 text-white' :
                        tool.category === 'WebGL' ? 'bg-gradient-to-br from-violet-500 to-purple-500 text-white' :
                        'bg-gradient-to-br from-gray-500 to-gray-700 text-white'
                      }`}
                    >
                      {tool.name.charAt(0)}
                    </motion.div>
                    
                    {/* Floating Level Badge */}
                    <motion.div
                      animate={{ 
                        y: [0, -5, 0],
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 },
                        rotate: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 },
                        scale: { duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: index * 0.4 }
                      }}
                      className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold shadow-lg"
                    >
                      {tool.level}
                    </motion.div>
                  </div>

                  {/* Tool Info */}
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-bold text-lg group-hover:text-primary transition-colors">
                        {tool.name}
                      </h4>
                      <span className="text-sm text-muted-foreground bg-accent/50 px-2 py-1 rounded-full">
                        {tool.category}
                      </span>
                    </div>
                    
                    {/* Visual Mastery Indicator */}
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">Maestría:</span>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            transition={{ delay: index * 0.1 + i * 0.1 }}
                            className={`w-2 h-2 rounded-full ${
                              i < Math.floor(tool.level / 20) 
                                ? 'bg-gradient-to-r from-primary to-accent' 
                                : 'bg-muted'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs font-bold text-primary ml-2">
                        {tool.level > 90 ? 'Experto' : tool.level > 80 ? 'Avanzado' : 'Competente'}
                      </span>
                    </div>
                  </div>

                  {/* Hover Effects */}
                  <AnimatePresence>
                    {hoveredTool === tool.name && (
                      <>
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/10 rounded-3xl"
                        />
                        
                        {/* Floating particles effect - Como las estrellas! */}
                        {[...Array(8)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                            animate={{ 
                              opacity: [0, 1, 0],
                              scale: [0, 1.5, 0.5],
                              rotate: [0, 360],
                              x: [0, (Math.random() - 0.5) * 120],
                              y: [0, (Math.random() - 0.5) * 120]
                            }}
                            transition={{ 
                              duration: 2.5,
                              delay: i * 0.3,
                              repeat: Infinity,
                              repeatDelay: 4,
                              ease: "easeInOut"
                            }}
                            className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-gradient-to-r from-primary to-accent rounded-full"
                            style={{
                              transform: `translate(-50%, -50%)`
                            }}
                          />
                        ))}
                      </>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Shadow/Depth Effect */}
                <motion.div
                  animate={{
                    scale: hoveredTool === tool.name ? 1.02 : 1,
                    opacity: hoveredTool === tool.name ? 0.5 : 0.2
                  }}
                  className="absolute inset-0 bg-primary/10 rounded-3xl blur-xl -z-10 transform translate-y-4"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Business Impact Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="mb-12">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">Impacto Empresarial Comprobado</h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Métricas reales que demuestran el valor que aporto a cada proyecto y negocio
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {businessMetrics.map((metric, index) => (
              <motion.div
                key={metric.title}
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                whileHover={{ 
                  scale: 1.05, 
                  rotate: [0, 1, -1, 0],
                  transition: { duration: 0.3 }
                }}
                className="relative group"
              >
                {/* Main Card */}
                <div className={`relative p-8 bg-gradient-to-br ${metric.bgColor} rounded-3xl border border-border/50 hover:border-primary/30 transition-all duration-500 backdrop-blur-sm overflow-hidden`}>
                  {/* Animated Background Effect */}
                  <motion.div
                    animate={{ 
                      rotate: 360,
                      scale: [1, 1.2, 1]
                    }}
                    transition={{ 
                      rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                      scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
                    }}
                    className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-primary/10 to-accent/20 rounded-full blur-xl"
                  />
                  
                  <div className="relative z-10 space-y-4">
                    {/* Icon */}
                    <motion.div
                      whileHover={{ 
                        scale: 1.2,
                        rotate: 360
                      }}
                      transition={{ duration: 0.5 }}
                      className="w-16 h-16 mx-auto bg-gradient-to-br from-background to-accent/30 rounded-2xl flex items-center justify-center shadow-lg"
                    >
                      <metric.icon className={`w-8 h-8 ${metric.color}`} />
                    </motion.div>
                    
                    {/* Value */}
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.3, type: "spring", bounce: 0.5 }}
                      className="text-3xl lg:text-4xl font-bold text-primary"
                    >
                      {metric.value}
                    </motion.div>
                    
                    {/* Title & Description */}
                    <div className="space-y-2">
                      <h4 className="font-bold text-lg">{metric.title}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {metric.description}
                      </p>
                    </div>
                  </div>

                  {/* Hover Glow Effect */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/10 rounded-3xl"
                  />
                </div>

                {/* Shadow */}
                <motion.div
                  animate={{
                    scale: 1.02,
                    opacity: 0.3
                  }}
                  className="absolute inset-0 bg-primary/10 rounded-3xl blur-xl -z-10 transform translate-y-4"
                />
              </motion.div>
            ))}
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="mt-16 p-8 bg-gradient-to-r from-primary/5 to-accent/10 rounded-3xl border border-border/50 backdrop-blur-sm"
          >
            <h4 className="text-xl font-bold mb-4">¿Listo para obtener resultados similares?</h4>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Estas métricas representan el compromiso que tengo con cada proyecto: 
              entregar valor real y resultados medibles que impulsen tu negocio.
            </p>
            <motion.button
              onClick={() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                setActiveSection?.('contact');
              }}
              className="px-8 py-4 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-2xl hover:from-primary/90 hover:to-accent/90 transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Hablemos de tu proyecto
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}