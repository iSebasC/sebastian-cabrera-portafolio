import { Helmet } from 'react-helmet-async';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ProjectDetail } from '../components/ProjectDetail';
import { getProjectById } from '../services/sanityService';
import type { Project } from '../types/sanity';
import { SITE_URL, OG_IMAGE } from '../config/seo';

interface ProjectDetailRoutePageProps {
  isDark: boolean;
  toggleTheme: () => void;
}

export function ProjectDetailRoutePage({ isDark, toggleTheme }: ProjectDetailRoutePageProps) {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        setLoading(true);
        if (!projectId) {
          navigate('/', { replace: true });
          return;
        }

        const found = await getProjectById(projectId);
        if (!mounted) return;

        if (!found) {
          navigate('/', { replace: true });
          return;
        }

        setProject(found);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();
    return () => {
      mounted = false;
    };
  }, [navigate, projectId]);

  const seo = useMemo(() => {
    if (!project) {
      return {
        title: 'Proyecto | Sebastián Cabrera',
        description: 'Detalle del proyecto de desarrollo web.',
        canonical: `${SITE_URL}/proyectos`,
        schema: null,
      };
    }

    const canonical = `${SITE_URL}/proyecto/${projectId}`;
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name: project.title,
      description: project.description,
      url: canonical,
      creator: { '@type': 'Person', name: 'Sebastián Cabrera', url: SITE_URL },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Proyectos', item: `${SITE_URL}/proyectos` },
          { '@type': 'ListItem', position: 3, name: project.title, item: canonical },
        ],
      },
    };

    return {
      title: `${project.title} | Proyectos | Sebastián Cabrera`,
      description: project.description,
      canonical,
      schema,
    };
  }, [project, projectId]);

  if (loading || !project) {
    return (
      <>
        <Helmet>
          <title>{seo.title}</title>
          <meta name="description" content={seo.description} />
          <link rel="canonical" href={seo.canonical} />
        </Helmet>
        <div className="min-h-screen bg-background text-foreground" />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <link rel="canonical" href={seo.canonical} />
        <meta property="og:url" content={seo.canonical} />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:image" content={OG_IMAGE} />
        {seo.schema && (
          <script type="application/ld+json">{JSON.stringify(seo.schema)}</script>
        )}
      </Helmet>

      <ProjectDetail
        project={project}
        onBack={() => navigate(-1)}
        onContact={() => navigate('/contacto')}
        isDark={isDark}
        toggleTheme={toggleTheme}
      />
    </>
  );
}
