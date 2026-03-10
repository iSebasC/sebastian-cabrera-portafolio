import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { QuotePage } from '../components/QuotePage';

export function QuoteRoutePage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t('quote.pageTitle')}</title>
        <meta
          name="description"
          content={t('quote.pageDescription')}
        />
      </Helmet>

      <QuotePage
        onNavigateToContact={() => navigate('/contacto')}
        headingLevel="h1"
      />
    </>
  );
}
