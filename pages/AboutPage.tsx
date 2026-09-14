import { Helmet } from 'react-helmet-async';
import { AboutSection } from '../components/AboutSection';
import { SITE_URL, OG_IMAGE } from '../config/seo';

interface AboutPageProps {
  portfolioMode?: 'employee' | 'freelance';
}

const schemaBreadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Sobre mí', item: `${SITE_URL}/sobre-mi` },
  ],
};

export function AboutPage({ portfolioMode = 'freelance' }: AboutPageProps) {
  const title = 'Sobre mí | Sebastián Cabrera — Desarrollador Web en Lima';
  const description = 'Conoce a Sebastián Cabrera: desarrollador web fullstack con +4 años de experiencia en Lima, Perú. React, Next.js, Laravel, NestJS y más.';

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`${SITE_URL}/sobre-mi`} />
        <meta property="og:url" content={`${SITE_URL}/sobre-mi`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={OG_IMAGE} />
        <script type="application/ld+json">{JSON.stringify(schemaBreadcrumb)}</script>
      </Helmet>

      <AboutSection portfolioMode={portfolioMode} setActiveSection={() => {}} />
    </>
  );
}
