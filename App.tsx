import { useEffect, useMemo, useState } from 'react';
import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Navigation } from './components/Navigation';
import { WhatsAppButton } from './components/WhatsAppButton';
import { CurrencyProvider } from './contexts/CurrencyContext';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { HomePage } from './pages/HomePage';
import { ProjectDetailRoutePage } from './pages/ProjectDetailRoutePage';
import { ProjectsPage } from './pages/ProjectsPage';
import { QuoteRoutePage } from './pages/QuoteRoutePage';
import { TestimonialsPage } from './pages/TestimonialsPage';

export function App() {
  const [isDark, setIsDark] = useState(false);
  const [portfolioMode, setPortfolioMode] = useState<'employee' | 'freelance'>('freelance');
  const location = useLocation();

  // Asegurar que cada navegación muestre el inicio de la sección/página
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [location.pathname]);

  // Theme management
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Portfolio mode management
  useEffect(() => {
    const savedMode = localStorage.getItem('portfolioMode');
    if (savedMode === 'freelance' || savedMode === 'employee') {
      setPortfolioMode(savedMode);
    }
  }, []);

  // Update document title based on portfolio mode
  const robotsContent = portfolioMode === 'freelance' ? 'index, follow' : 'noindex, nofollow';

  const togglePortfolioMode = () => {
    const newMode = portfolioMode === 'employee' ? 'freelance' : 'employee';
    setPortfolioMode(newMode);
    localStorage.setItem('portfolioMode', newMode);
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const activeSection = useMemo(() => {
    const path = location.pathname;

    if (path === '/') return 'home';
    if (path === '/sobre-mi') return 'about';
    if (path === '/proyectos') return 'projects';
    if (path === '/cotizar') return 'quote';
    if (path === '/testimonios') return 'testimonials';
    if (path === '/contacto') return 'contact';
    return 'home';
  }, [location.pathname]);

  const SiteShell = () => (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation
        activeSection={activeSection}
        isDark={isDark}
        toggleTheme={toggleTheme}
        portfolioMode={portfolioMode}
        togglePortfolioMode={togglePortfolioMode}
      />

      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="relative border-t border-border/50 bg-background/95 backdrop-blur-sm overflow-hidden"
      >
        {/* Línea gradiente superior */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent" />

        <div className="container mx-auto px-6 py-12 lg:py-16">
          {/* Grid Principal */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Columna 1: Logo y Bio */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-1"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
                    <img
                      src="/logo/logo.ico?v=2"
                      alt="Logo Sebastian Cabrera"
                      className="w-7 h-7 object-contain"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <motion.div
                    className="absolute -inset-1 rounded-full bg-gradient-to-br from-primary to-primary/70 opacity-20 blur-md"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">Sebastian Cabrera</h3>
                  <p className="text-xs text-muted-foreground">Desarrollador FullStack & Diseñador Creativo</p>
                </div>
              </div>
            </motion.div>

            {/* Columna 2: Navegación */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h4 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wider">Navegar</h4>
              <ul className="space-y-3">
                {(
                  [
                    { num: '01', label: 'Inicio', path: '/' },
                    { num: '02', label: 'Sobre Mí', path: '/sobre-mi' },
                    { num: '03', label: 'Proyectos', path: '/proyectos' },
                    ...(portfolioMode === 'freelance' ? [{ num: '04', label: 'Cotizar', path: '/cotizar' }] : []),
                    {
                      num: portfolioMode === 'freelance' ? '05' : '04',
                      label: 'Testimonios',
                      path: '/testimonios'
                    },
                    {
                      num: portfolioMode === 'freelance' ? '06' : '05',
                      label: 'Contacto',
                      path: '/contacto'
                    }
                  ] as const
                ).map((item) => (
                  <li key={item.num}>
                    <a href={item.path}>
                      <motion.div
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
                        whileHover={{ x: 4 }}
                      >
                        <span className="font-mono text-xs opacity-50 group-hover:opacity-100 transition-opacity">
                          {item.num}
                        </span>
                        <span>{item.label}</span>
                      </motion.div>
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Columna 3: Social */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <h4 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wider">Social</h4>
              <ul className="space-y-3">
                {[
                  { label: 'LinkedIn', url: 'https://linkedin.com/in/sebastian-cabrera-alcala' },
                  { label: 'Behance', url: 'https://www.behance.net/sebasticabreralcala' },
                  { label: 'GitHub', url: 'https://github.com/iSebasC' }
                ].map((item) => (
                  <li key={item.label}>
                    <motion.a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
                      whileHover={{ x: 4 }}
                    >
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <span className="text-xs">→</span>
                      </div>
                      <span>{item.label}</span>
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Columna 4: Contacto Directo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <h4 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wider">Contacto</h4>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">¿Tienes un proyecto en mente?</p>
              <div className="space-y-3">
                <div className="flex items-start gap-2 text-sm">
                  <span className="text-primary mt-0.5">📧</span>
                  <a
                    href="mailto:sebastiandev@sebastiancabreraalcala.com"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    sebastiandev@sebastiancabreraalcala.com
                  </a>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <span className="text-primary mt-0.5">📱</span>
                  <a href="tel:+51914866361" className="text-muted-foreground hover:text-primary transition-colors">
                    +51 914 866 361
                  </a>
                </div>
              </div>

              {portfolioMode === 'freelance' && (
                <a href="/cotizar">
                  <motion.button
                    className="mt-4 w-full px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Cotizar Proyecto
                  </motion.button>
                </a>
              )}
            </motion.div>
          </div>

          {/* Divider */}
          <div className="my-8 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

          {/* Bottom Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <span>Desarrollador FullStack & Diseñador Creativo © 2026</span>
            </div>
            <div className="flex items-center gap-2">
              <span>Diseñado con</span>
              <motion.span
                animate={{ rotate: [0, 10, -10, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                ✨
              </motion.span>
              <span>pasión y precisión</span>
            </div>
          </motion.div>
        </div>

        {/* Background decoration */}
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      </motion.footer>

      {/* WhatsApp Floating Button */}
      <WhatsAppButton />
    </div>
  );

  return (
    <CurrencyProvider>
      <Helmet>
        <meta name="robots" content={robotsContent} />
      </Helmet>

      <Routes>
        <Route element={<SiteShell />}>
          <Route path="/" element={<HomePage portfolioMode={portfolioMode} />} />
          <Route path="/sobre-mi" element={<AboutPage portfolioMode={portfolioMode} />} />
          <Route path="/proyectos" element={<ProjectsPage portfolioMode={portfolioMode} />} />
          <Route path="/cotizar" element={<QuoteRoutePage />} />
          <Route path="/testimonios" element={<TestimonialsPage portfolioMode={portfolioMode} />} />
          <Route path="/contacto" element={<ContactPage portfolioMode={portfolioMode} />} />
        </Route>
        <Route path="/proyecto/:projectId" element={<ProjectDetailRoutePage isDark={isDark} toggleTheme={toggleTheme} />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </CurrencyProvider>
  );
}

export default App;