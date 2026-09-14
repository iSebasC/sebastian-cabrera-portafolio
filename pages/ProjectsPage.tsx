import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { ProjectsSection } from '../components/ProjectsSection';
import { SITE_URL, OG_IMAGE } from '../config/seo';

interface ProjectsPageProps {
  portfolioMode?: 'employee' | 'freelance';
}

const schemaBreadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Proyectos', item: `${SITE_URL}/proyectos` },
  ],
};

export function ProjectsPage({ portfolioMode = 'freelance' }: ProjectsPageProps) {
  const navigate = useNavigate();
  const title = 'Proyectos | Sebastián Cabrera — Desarrollo Web Lima';
  const description = 'Portfolio de proyectos web: landing pages, sistemas web, e-commerce y plataformas digitales desarrolladas en Lima, Perú.';

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`${SITE_URL}/proyectos`} />
        <meta property="og:url" content={`${SITE_URL}/proyectos`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={OG_IMAGE} />
        <script type="application/ld+json">{JSON.stringify(schemaBreadcrumb)}</script>
      </Helmet>

      <ProjectsSection
        portfolioMode={portfolioMode}
        headingLevel="h1"
        onProjectSelect={(projectId) => navigate(`/proyecto/${projectId}`)}
      />
    </>
  );
}
