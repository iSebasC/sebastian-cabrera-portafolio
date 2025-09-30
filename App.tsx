import { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { ProjectsSection } from './components/ProjectsSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { ProjectDetail } from './components/ProjectDetail';
import { getAllProjects } from './services/sanityService';
import type { Project } from './types/sanity';

export function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isDark, setIsDark] = useState(false);
  const [currentView, setCurrentView] = useState<'portfolio' | 'project'>('portfolio');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);

  // Load projects from Sanity
  useEffect(() => {
    const loadProjects = async () => {
      try {
        const sanityProjects = await getAllProjects();
        setProjects(sanityProjects);
      } catch (error) {
        console.error('Error loading projects:', error);
      }
    };
    loadProjects();
  }, []);

  const getProjectById = (id: string): Project | null => {
    return projects.find(project => project.id === id) || null;
  };

  // Theme management
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

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

  // Handle scroll spy for navigation
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'projects', 'about', 'testimonials', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(section);
          break;
        }
      }
    };

    if (currentView === 'portfolio') {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [currentView]);

  // Utility function for scrolling to sections
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    setActiveSection(sectionId);
  };

  // Handle project selection
  const handleProjectSelect = (projectId: string) => {
    console.log('🔍 handleProjectSelect called with:', projectId);
    const project = getProjectById(projectId);
    console.log('📝 Found project:', project);
    if (project) {
      setSelectedProject(project);
      setCurrentView('project');
      console.log('✅ Set current view to project');
    } else {
      console.log('❌ No project found with ID:', projectId);
    }
  };

  // Handle back to portfolio
  const handleBackToPortfolio = () => {
    setCurrentView('portfolio');
    setSelectedProject(null);
    setActiveSection('projects');
  };

  // Handle contact navigation
  const handleContactNavigation = () => {
    if (currentView === 'project') {
      setCurrentView('portfolio');
      setSelectedProject(null);
    }
    setActiveSection('contact');
    setTimeout(() => {
      scrollToSection('contact');
    }, 100);
  };

  // Show project detail view
  if (currentView === 'project' && selectedProject) {
    return (
      <ProjectDetail
        project={selectedProject}
        onBack={handleBackToPortfolio}
        onContact={handleContactNavigation}
        isDark={isDark}
        toggleTheme={toggleTheme}
      />
    );
  }

  // Show main portfolio view
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation 
        activeSection={activeSection} 
        setActiveSection={setActiveSection}
        isDark={isDark}
        toggleTheme={toggleTheme}
      />
      
      <main>
        <section id="home">
          <HeroSection setActiveSection={setActiveSection} />
        </section>

        <section id="about">
          <AboutSection setActiveSection={setActiveSection} />
        </section>

                
        <section id="projects">
          <ProjectsSection onProjectSelect={handleProjectSelect} />
        </section>
        
        
        <section id="testimonials">
          <TestimonialsSection />
        </section>
        
        <section id="contact">
          <ContactSection />
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-border/50 bg-background/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <h3 className="font-bold text-lg">Sebastian Cabrera</h3>
              <p className="text-sm text-muted-foreground">
                Desarrollador FullStack & Diseñador Creativo © 2025
              </p>
              <div className="mt-2 flex items-center gap-4">
                <a 
                  href="https://linkedin.com/in/sebastian-cabrera-alcala" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn
                </a>
                <a 
                  href="https://github.com/iSebasC" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub
                </a>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-sm text-muted-foreground">
                Hecho con ❤️ y mucho café
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;