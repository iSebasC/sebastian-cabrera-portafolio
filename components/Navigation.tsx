import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Moon, Sun, Menu, X, Globe, ChevronDown } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../contexts/LanguageContext';

interface NavigationProps {
  activeSection: string;
  isDark: boolean;
  toggleTheme: () => void;
  portfolioMode?: 'employee' | 'freelance';
  togglePortfolioMode?: () => void;
}

export function Navigation({ activeSection, isDark, toggleTheme, portfolioMode = 'freelance', togglePortfolioMode }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const { t } = useTranslation();
  const { currentLanguage, changeLanguage } = useLanguage();
  const langMenuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const isHirePage = location.pathname === '/hire';

  // Scroll progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const hireSections = [
    { id: 'home',     label: t('nav.home'),         number: '01', scrollTo: 'hire-home' },
    { id: 'about',    label: t('nav.about'),         number: '02', scrollTo: null, to: '/sobre-mi' },
    { id: 'projects', label: t('nav.projects'),      number: '03', scrollTo: 'hire-projects' },
    { id: 'contact',  label: t('nav.contact'),       number: '04', scrollTo: 'hire-contact' },
  ];

  const scrollToSection = (scrollTo: string) => {
    if (scrollTo === 'hire-home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      document.getElementById(scrollTo)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const sections = [
    { id: 'home', label: t('nav.home'), number: '01', to: '/' },
    { id: 'about', label: t('nav.about'), number: '02', to: '/sobre-mi' },
    { id: 'projects', label: t('nav.projects'), number: '03', to: '/proyectos' },
    ...(portfolioMode === 'freelance'
      ? [{ id: 'quote', label: t('nav.quote'), number: '04', to: '/cotizar' }]
      : []),
    {
      id: 'testimonials',
      label: t('nav.testimonials'),
      number: portfolioMode === 'freelance' ? '05' : '04',
      to: '/testimonios',
    },
    {
      id: 'contact',
      label: t('nav.contact'),
      number: portfolioMode === 'freelance' ? '06' : '05',
      to: '/contacto',
    },
  ];

  const isActive = (id: string) => activeSection === id;

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

  // Close language menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setShowLangMenu(false);
      }
    };

    if (showLangMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showLangMenu]);

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
        {/* Scroll Progress Bar */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary via-primary/80 to-primary origin-left"
          style={{ scaleX }}
        />

        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <NavLink to={isHirePage ? '/hire' : '/'} end aria-label="Ir al inicio">
              <motion.div className="flex items-center gap-3" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <div className="relative">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
                    <img
                      src="/logo/logo.ico?v=2"
                      alt="Logo Sebastian Cabrera"
                      className="w-6 h-6 lg:w-7 lg:h-7 object-contain"
                      loading="eager"
                      decoding="async"
                    />
                  </div>
                  <motion.div
                    className="absolute -inset-1 rounded-full bg-gradient-to-br from-primary to-primary/70 opacity-20 blur-md"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
              </motion.div>
            </NavLink>

            {/* Desktop Menu - Magazine Style */}
            <div className="hidden lg:flex items-center gap-1">
              {isHirePage
                ? hireSections.map((section) =>
                    section.scrollTo === null && section.to ? (
                      <NavLink key={section.id} to={section.to}>
                        <motion.div
                          className="relative px-4 py-2 group cursor-pointer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <div className="flex items-center gap-2 text-muted-foreground group-hover:text-foreground transition-all duration-300">
                            <span className="text-xs font-mono">{section.number}</span>
                            <span className="text-sm font-medium">{section.label}</span>
                          </div>
                          <motion.div className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary origin-left" initial={{ scaleX: 0 }} whileHover={{ scaleX: 1 }} transition={{ duration: 0.3 }} />
                        </motion.div>
                      </NavLink>
                    ) : (
                      <motion.button
                        key={section.id}
                        onClick={() => scrollToSection(section.scrollTo!)}
                        className="relative px-4 py-2 group cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className="flex items-center gap-2 text-muted-foreground group-hover:text-foreground transition-all duration-300">
                          <span className="text-xs font-mono">{section.number}</span>
                          <span className="text-sm font-medium">{section.label}</span>
                        </div>
                        <motion.div className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary origin-left" initial={{ scaleX: 0 }} whileHover={{ scaleX: 1 }} transition={{ duration: 0.3 }} />
                      </motion.button>
                    )
                  )
                : sections.map((section) => (
                    <NavLink key={section.id} to={section.to} end={section.to === '/'}>
                      <motion.div
                        className="relative px-4 py-2 group cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div
                          className={`flex items-center gap-2 transition-all duration-300 ${
                            isActive(section.id)
                              ? 'text-primary'
                              : 'text-muted-foreground group-hover:text-foreground'
                          }`}
                        >
                          {isActive(section.id) && (
                            <motion.div
                              layoutId="activeDot"
                              className="w-1.5 h-1.5 rounded-full bg-primary"
                              transition={{ duration: 0.3 }}
                            />
                          )}
                          <span
                            className={`text-xs font-mono transition-all duration-300 ${
                              isActive(section.id) ? 'font-bold' : 'font-normal'
                            }`}
                          >
                            {section.number}
                          </span>
                          <span className="text-sm font-medium">{section.label}</span>
                        </div>
                        <motion.div
                          className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary origin-left"
                          initial={{ scaleX: 0 }}
                          whileHover={{ scaleX: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      </motion.div>
                    </NavLink>
                  ))}
            </div>

            {/* Portfolio Mode Toggle, Language Selector, Theme Toggle & Mobile Menu */}
            <div className="flex items-center gap-2">
              {/* Portfolio Mode Toggle */}
              {togglePortfolioMode && !isHirePage && (
                <motion.div
                  className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-accent/20 rounded-lg"
                  whileHover={{ scale: 1.02 }}
                >
                  <span className={`text-xs transition-colors ${portfolioMode === 'employee' ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
                    {t('nav.dev')}
                  </span>
                  <motion.button
                    onClick={togglePortfolioMode}
                    className={`w-10 h-5 rounded-full p-0.5 transition-colors ${
                      portfolioMode === 'freelance' ? 'bg-primary' : 'bg-muted'
                    }`}
                    whileTap={{ scale: 0.95 }}
                    aria-label={`Cambiar a modo ${portfolioMode === 'freelance' ? 'empleado' : 'freelance'}`}
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
                    {t('nav.freelance')}
                  </span>
                </motion.div>
              )}

              {/* Language Selector */}
              <div className="hidden sm:block relative" ref={langMenuRef}>
                <motion.button
                  onClick={() => setShowLangMenu(!showLangMenu)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-accent/20 rounded-lg hover:bg-accent/30 transition-colors"
                  whileHover={{ scale: 1.02 }}
                >
                  <Globe className="w-3.5 h-3.5 text-muted-foreground" />
                  <span className="text-xs font-medium text-primary">
                    {currentLanguage.toUpperCase()}
                  </span>
                  <ChevronDown className="w-3 h-3 text-muted-foreground" />
                </motion.button>

                {/* Language Dropdown */}
                {showLangMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute right-0 mt-2 bg-background border border-border rounded-lg shadow-lg overflow-hidden z-50 min-w-[100px]"
                  >
                    <button
                      onClick={() => {
                        changeLanguage('es');
                        setShowLangMenu(false);
                      }}
                      className={`w-full px-4 py-2 text-left text-sm hover:bg-accent transition-colors ${
                        currentLanguage === 'es' ? 'bg-accent text-primary font-semibold' : 'text-muted-foreground'
                      }`}
                    >
                      🇪🇸 Español
                    </button>
                    <button
                      onClick={() => {
                        changeLanguage('en');
                        setShowLangMenu(false);
                      }}
                      className={`w-full px-4 py-2 text-left text-sm hover:bg-accent transition-colors ${
                        currentLanguage === 'en' ? 'bg-accent text-primary font-semibold' : 'text-muted-foreground'
                      }`}
                    >
                      🇺🇸 English
                    </button>
                  </motion.div>
                )}
              </div>
              
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
          className="lg:hidden overflow-hidden bg-background/98 backdrop-blur-md border-t border-border/50"
        >
          <div className="container mx-auto px-6 py-4">
            <div className="flex flex-col gap-2">
              {isHirePage
                ? hireSections.map((section) =>
                    section.scrollTo === null && section.to ? (
                      <NavLink key={section.id} to={section.to}>
                        <motion.button
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="w-full text-left p-4 rounded-lg transition-all duration-300 flex items-center gap-3 hover:bg-accent hover:text-foreground text-muted-foreground"
                          whileTap={{ scale: 0.95 }}
                        >
                          <span className="text-xs font-mono font-bold">{section.number}</span>
                          <span className="font-medium">{section.label}</span>
                        </motion.button>
                      </NavLink>
                    ) : (
                      <motion.button
                        key={section.id}
                        onClick={() => { scrollToSection(section.scrollTo!); setIsMobileMenuOpen(false); }}
                        className="w-full text-left p-4 rounded-lg transition-all duration-300 flex items-center gap-3 hover:bg-accent hover:text-foreground text-muted-foreground"
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="text-xs font-mono font-bold">{section.number}</span>
                        <span className="font-medium">{section.label}</span>
                      </motion.button>
                    )
                  )
                : sections.map((section) => (
                    <NavLink key={section.id} to={section.to} end={section.to === '/'}>
                      <motion.button
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`w-full text-left p-4 rounded-lg transition-all duration-300 flex items-center gap-3 ${
                          isActive(section.id)
                            ? 'bg-primary text-primary-foreground'
                            : 'hover:bg-accent hover:text-foreground text-muted-foreground'
                        }`}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="text-xs font-mono font-bold">{section.number}</span>
                        <span className="font-medium">{section.label}</span>
                      </motion.button>
                    </NavLink>
                  ))}
              
              {/* Portfolio Mode Toggle for Mobile */}
              {togglePortfolioMode && !isHirePage && (
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="px-4 py-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-muted-foreground">{t('nav.portfolioMode')}</span>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs ${portfolioMode === 'employee' ? 'text-primary font-semibold' : 'text-muted-foreground'}`}>
                          {t('nav.dev')}
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
                          {t('nav.freelance')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Language Selector for Mobile */}
              <div className={`${togglePortfolioMode ? '' : 'mt-4 pt-4 border-t border-border'}`}>
                <div className="px-4 py-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">{t('nav.language')}</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => changeLanguage('es')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                          currentLanguage === 'es'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-accent/20 text-muted-foreground hover:bg-accent/30'
                        }`}
                      >
                        🇪🇸 ES
                      </button>
                      <button
                        onClick={() => changeLanguage('en')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                          currentLanguage === 'en'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-accent/20 text-muted-foreground hover:bg-accent/30'
                        }`}
                      >
                        🇺🇸 EN
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.nav>

      {/* Spacer to prevent content from hiding under fixed nav */}
      <div className="h-16 lg:h-20" />
    </>
  );
}