import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { ProjectsSection } from '../components/ProjectsSection';

interface ProjectsPageProps {
  portfolioMode?: 'employee' | 'freelance';
}

export function ProjectsPage({ portfolioMode = 'freelance' }: ProjectsPageProps) {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Proyectos | Sebastian Cabrera</title>
        <meta
          name="description"
          content="Explora proyectos destacados de Sebastian Cabrera: UI/UX, Frontend, Backend y FullStack. Casos reales con resultados."
        />
      </Helmet>

      <ProjectsSection
        portfolioMode={portfolioMode}
        onProjectSelect={(projectId) => navigate(`/proyecto/${projectId}`)}
      />
    </>
  );
}
