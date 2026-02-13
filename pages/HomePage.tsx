import { Helmet } from 'react-helmet-async';
import { HeroSection } from '../components/HeroSection';
import { MiniServicesSection } from '../components/MiniServicesSection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { FinalCTASection } from '../components/FinalCTASection';

interface HomePageProps {
  portfolioMode?: 'employee' | 'freelance';
}

export function HomePage({ portfolioMode = 'freelance' }: HomePageProps) {
  const title =
    portfolioMode === 'employee'
      ? 'Portfolio Sebastian - Desarrollador Web FullStack'
      : 'Sebastian Cabrera - Servicios de Desarrollo Web Freelance';

  const description =
    portfolioMode === 'employee'
      ? 'Portfolio de Sebastian - Desarrollador web FullStack especializado en la creación de experiencias digitales innovadoras.'
      : 'Servicios profesionales de desarrollo web freelance - Cotiza tu proyecto web con Sebastian Cabrera.';

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>

      <section id="home">
        <HeroSection portfolioMode={portfolioMode} />
      </section>

      <MiniServicesSection />

      <TestimonialsSection portfolioMode={portfolioMode} />

      <FinalCTASection />
    </>
  );
}
