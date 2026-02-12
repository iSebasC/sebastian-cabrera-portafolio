import { Helmet } from 'react-helmet-async';
import { AboutSection } from '../components/AboutSection';

interface AboutPageProps {
  portfolioMode?: 'employee' | 'freelance';
}

export function AboutPage({ portfolioMode = 'freelance' }: AboutPageProps) {
  return (
    <>
      <Helmet>
        <title>Sobre mí | Sebastian Cabrera</title>
        <meta
          name="description"
          content="Conoce a Sebastian Cabrera: desarrollador FullStack y diseñador web. Proceso creativo, metodología y experiencia profesional."
        />
      </Helmet>

      <AboutSection portfolioMode={portfolioMode} setActiveSection={() => {}} />
    </>
  );
}
