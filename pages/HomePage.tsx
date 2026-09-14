import { Helmet } from 'react-helmet-async';
import { HeroSection } from '../components/HeroSection';
import { MiniServicesSection } from '../components/MiniServicesSection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { FinalCTASection } from '../components/FinalCTASection';
import { SITE_URL, OG_IMAGE } from '../config/seo';

interface HomePageProps {
  portfolioMode?: 'employee' | 'freelance';
}

const schemaWebSite = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Sebastián Cabrera — Desarrollador Web',
  url: SITE_URL,
  description: 'Desarrollador web freelance en Lima, Perú. Landing pages, sistemas web y desarrollo a medida con React, Next.js y Laravel.',
  author: { '@type': 'Person', name: 'Sebastián Cabrera' },
};

const schemaPerson = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Sebastián Cabrera',
  alternateName: 'Sebastian Cabrera Alcala',
  url: SITE_URL,
  image: `${SITE_URL}/img/profilesebastian_2026.webp`,
  jobTitle: 'Desarrollador Web Freelance',
  description: 'Desarrollador web fullstack con más de 4 años de experiencia en Lima, Perú. Especializado en React, Next.js y Laravel.',
  email: 'sebastiandev@sebastiancabreraalcala.com',
  telephone: '+51914866361',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Lima',
    addressCountry: 'PE',
  },
  sameAs: [
    'https://linkedin.com/in/sebastian-cabrera-alcala',
    'https://github.com/iSebasC',
    'https://www.behance.net/sebasticabreralcala',
  ],
  knowsAbout: ['React', 'Next.js', 'Laravel', 'NestJS', 'TypeScript', 'Desarrollo Web', 'Landing Pages', 'Sistemas Web'],
};

const schemaService = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Sebastián Cabrera — Desarrollo Web',
  url: SITE_URL,
  image: OG_IMAGE,
  description: 'Servicios de desarrollo web freelance en Lima, Perú. Landing pages, sistemas web, APIs y desarrollo a medida con React, Next.js y Laravel.',
  telephone: '+51914866361',
  email: 'sebastiandev@sebastiancabreraalcala.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Lima',
    addressRegion: 'Lima',
    addressCountry: 'PE',
  },
  areaServed: ['Lima', 'Perú', 'Latinoamérica'],
  priceRange: '$$',
  sameAs: [
    'https://linkedin.com/in/sebastian-cabrera-alcala',
    'https://github.com/iSebasC',
  ],
};

export function HomePage({ portfolioMode = 'freelance' }: HomePageProps) {
  const title =
    portfolioMode === 'employee'
      ? 'Sebastián Cabrera — Desarrollador Web Fullstack'
      : 'Desarrollador Web Freelance en Lima | Sebastián Cabrera';

  const description =
    portfolioMode === 'employee'
      ? 'Desarrollador web fullstack con +4 años de experiencia en React, Next.js, Laravel y NestJS. Disponible para nuevas oportunidades.'
      : 'Desarrollador web freelance en Lima, Perú. Landing pages, sistemas web y desarrollo a medida con React, Next.js y Laravel. Cotiza tu proyecto hoy.';

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`${SITE_URL}/`} />
        <meta property="og:url" content={`${SITE_URL}/`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="twitter:url" content={`${SITE_URL}/`} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:image" content={OG_IMAGE} />
        <script type="application/ld+json">{JSON.stringify(schemaWebSite)}</script>
        <script type="application/ld+json">{JSON.stringify(schemaPerson)}</script>
        {portfolioMode === 'freelance' && (
          <script type="application/ld+json">{JSON.stringify(schemaService)}</script>
        )}
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
