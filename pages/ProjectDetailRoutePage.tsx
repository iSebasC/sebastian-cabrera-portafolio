import { Helmet } from 'react-helmet-async';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ProjectDetail } from '../components/ProjectDetail';
import { getProjectById } from '../services/sanityService';
import type { Project } from '../types/sanity';

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
        title: 'Proyecto | Sebastian Cabrera',
        description: 'Detalle del proyecto.'
      };
    }

    return {
      title: `${project.title} | Proyectos | Sebastian Cabrera`,
      description: project.description
    };
  }, [project]);

  if (loading || !project) {
    return (
      <>
        <Helmet>
          <title>{seo.title}</title>
          <meta name="description" content={seo.description} />
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
