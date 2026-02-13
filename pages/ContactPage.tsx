import { Helmet } from 'react-helmet-async';
import { ContactSection } from '../components/ContactSection';

interface ContactPageProps {
  portfolioMode?: 'employee' | 'freelance';
}

export function ContactPage({ portfolioMode = 'freelance' }: ContactPageProps) {
  return (
    <>
      <Helmet>
        <title>Contacto | Sebastian Cabrera</title>
        <meta
          name="description"
          content="Contacta a Sebastian Cabrera para desarrollo web y diseño. Cuéntame sobre tu proyecto y recibe una propuesta."
        />
      </Helmet>

      <ContactSection portfolioMode={portfolioMode} headerVariant="magazine" headingLevel="h1" />
    </>
  );
}
