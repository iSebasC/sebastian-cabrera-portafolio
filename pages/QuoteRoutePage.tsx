import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { QuotePage } from '../components/QuotePage';

export function QuoteRoutePage() {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Cotizar | Sebastian Cabrera</title>
        <meta
          name="description"
          content="Cotiza tu proyecto con precios transparentes. Selecciona el servicio y recibe una estimación orientativa."
        />
      </Helmet>

      <QuotePage
        onNavigateToContact={() => navigate('/contacto')}
        headingLevel="h1"
      />
    </>
  );
}
