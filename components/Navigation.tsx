import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun, Menu, X } from 'lucide-react';

interface NavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  isDark: boolean;
  toggleTheme: () => void;
  onQuoteClick?: () => void;
  portfolioMode?: 'employee' | 'freelance';
  togglePortfolioMode?: () => void;
}

export function Navigation({ activeSection, setActiveSection, isDark, toggleTheme, onQuoteClick, portfolioMode = 'freelance', togglePortfolioMode }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const sections = [
    { id: 'home', label: 'Inicio' },
    { id: 'about', label: 'Sobre Mí' },
    { id: 'projects', label: 'Proyectos' },
    ...(portfolioMode === 'freelance' ? [{ id: 'quote', label: 'Cotizar' }] : []),
    { id: 'testimonials', label: 'Testimonios' },
    { id: 'contact', label: 'Contacto' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    // Llamar una vez para establecer el estado inicial
    handleResize();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleSectionClick = (sectionId: string) => {
    // Si es la sección de cotización, usar la función especial
    if (sectionId === 'quote' && onQuoteClick) {
      onQuoteClick();
      return;
    }
    
    setActiveSection(sectionId);
    
    // Hacer scroll suave a la sección
    const element = document.getElementById(sectionId);
    if (element) {
      const navHeight = window.innerWidth < 1024 ? 64 : 80; // Altura diferente para móvil
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navHeight;

      // Scroll más compatible con móviles
      if ('scrollBehavior' in document.documentElement.style) {
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      } else {
        // Fallback para navegadores que no soportan smooth scroll
        window.scrollTo(0, offsetPosition);
      }
    }
  };

  return (
    <>
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}

      {/* Desktop Navigation - Horizontal */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isMobile
            ? 'bg-background'  // En móvil siempre fondo sólido, sin cambios al hacer scroll
            : scrolled 
              ? 'backdrop-blur-md bg-background/95 border-b border-border/50 shadow-sm' 
              : 'bg-background/80 backdrop-blur-sm'  // Solo en desktop cambia con scroll
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <motion.div
              className="flex items-center"
              whileHover={{ scale: 1.05 }}
            >
              <h1 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text">
                S
              </h1>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-1">
              {sections.map((section) => (
                <motion.button
                  key={section.id}
                  onClick={() => handleSectionClick(section.id)}
                  className={`relative px-6 py-2.5 rounded-xl transition-all duration-300 font-medium hover:bg-accent/50 ${
                    activeSection === section.id
                      ? 'text-black'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10">{section.label}</span>
                  {activeSection === section.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 rounded-xl shadow-lg"
                      style={{
                        backgroundColor: isDark ? '#242424' : 'rgba(3, 2, 19, 0.1)'
                      }}
                      transition={{ 
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                        duration: 0.3 
                      }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Portfolio Mode Toggle, Theme Toggle & Mobile Menu */}
            <div className="flex items-center gap-2">
              {/* Portfolio Mode Toggle */}
              {togglePortfolioMode && (
                <motion.div
                  className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-accent/20 rounded-lg"
                  whileHover={{ scale: 1.02 }}
                >
                  <span className={`text-xs transition-colors ${portfolioMode === 'employee' ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
                    Dev
                  </span>
                  <motion.button
                    onClick={togglePortfolioMode}
                    className={`w-10 h-5 rounded-full p-0.5 transition-colors ${
                      portfolioMode === 'freelance' ? 'bg-primary' : 'bg-muted'
                    }`}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      className="w-4 h-4 bg-white rounded-full shadow-sm"
                      animate={{
                        x: portfolioMode === 'freelance' ? 20 : 0
                      }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  </motion.button>
                  <span className={`text-xs transition-colors ${portfolioMode === 'freelance' ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
                    Freelance
                  </span>
                </motion.div>
              )}
              
              <motion.button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-accent transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isDark ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </motion.button>
              
              <motion.button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-accent transition-colors"
                whileTap={{ scale: 0.95 }}
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ 
            height: isMobileMenuOpen ? 'auto' : 0, 
            opacity: isMobileMenuOpen ? 1 : 0 
          }}
          transition={{ duration: 0.3 }}
          className="lg:hidden overflow-hidden bg-background border-t border-border shadow-lg"
        >
          <div className="container mx-auto px-6 py-6">
            <div className="flex flex-col gap-1">
              {sections.map((section) => (
                <motion.button
                  key={section.id}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    // Pequeño delay para que el menú se cierre antes del scroll
                    setTimeout(() => handleSectionClick(section.id), 100);
                  }}
                  className={`text-left px-4 py-3 rounded-lg transition-all duration-300 font-medium ${
                    activeSection === section.id
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'hover:bg-accent hover:text-foreground text-muted-foreground'
                  }`}
                  whileTap={{ scale: 0.98 }}
                >
                  {section.label}
                </motion.button>
              ))}
              
              {/* Portfolio Mode Toggle for Mobile */}
              {togglePortfolioMode && (
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="px-4 py-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-muted-foreground">Modo Portfolio</span>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs ${portfolioMode === 'employee' ? 'text-primary font-semibold' : 'text-muted-foreground'}`}>
                          Dev
                        </span>
                        <motion.button
                          onClick={togglePortfolioMode}
                          className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                            portfolioMode === 'freelance' ? 'bg-primary' : 'bg-muted'
                          }`}
                          whileTap={{ scale: 0.95 }}
                        >
                          <motion.div
                            initial={false}
                            animate={{
                              x: portfolioMode === 'freelance' ? 24 : 2
                            }}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-md"
                          />
                        </motion.button>
                        <span className={`text-xs ${portfolioMode === 'freelance' ? 'text-primary font-semibold' : 'text-muted-foreground'}`}>
                          Freelance
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.nav>

      {/* Spacer to prevent content from hiding under fixed nav */}
      <div className="h-16 lg:h-20" />
    </>
  );
}