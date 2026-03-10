import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ProjectsSection } from '../components/ProjectsSection';

interface ProjectsPageProps {
  portfolioMode?: 'employee' | 'freelance';
}

export function ProjectsPage({ portfolioMode = 'freelance' }: ProjectsPageProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t('projects.pageTitle')}</title>
        <meta
          name="description"
          content={t('projects.pageDescription')}
        />
      </Helmet>

      <ProjectsSection
        portfolioMode={portfolioMode}
        headingLevel="h1"
        onProjectSelect={(projectId) => navigate(`/proyecto/${projectId}`)}
      />
    </>
  );
}
