import { Helmet } from 'react-helmet-async';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { FinalCTASection } from '../components/FinalCTASection';

interface TestimonialsPageProps {
  portfolioMode?: 'employee' | 'freelance';
}

export function TestimonialsPage({ portfolioMode = 'freelance' }: TestimonialsPageProps) {
  return (
    <>
      <Helmet>
        <title>Testimonios | Sebastian Cabrera</title>
        <meta
          name="description"
          content="Testimonios y resultados de clientes: experiencia, calidad y entrega en proyectos web y diseño digital."
        />
      </Helmet>

      <TestimonialsSection portfolioMode={portfolioMode} headerVariant="magazine" headingLevel="h1" />

      <FinalCTASection />
    </>
  );
}
