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