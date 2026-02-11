import Head from 'next/head';

export default function LocalBusinessJsonLd({ descriptionMeta }) {
  // const {
  //   result,
  //   reviews = result.reviews,
  // } = reviewsData;

  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${process.env.NEXT_PUBLIC_URL}#business`,
    name: 'Maxime Freelance',
    alternateName: 'Theneau Maxime - Développeur Web Freelance',
    description: descriptionMeta,
    image: 'https://picture.maximefreelance.fr/Portfolio-4.webp?format=jpeg',
    logo: 'https://picture.maximefreelance.fr/Portfolio-4.webp?format=jpeg',
    sameAs: [
      'https://www.linkedin.com/company/maxime-freelance',
      'https://x.com/MTheneau',
      'https://www.linkedin.com/company/une-taupe-chez-vous',
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Avenue des Goumiers',
      addressLocality: 'Marseille',
      postalCode: '13008',
      addressRegion: "Provence-Alpes-Côte d'Azur",
      addressCountry: 'FR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 43.2562,
      longitude: 5.3990,
    },
    telephone: '+33622068036',
    email: 'maxime@maximefreelance.fr',
    url: process.env.NEXT_PUBLIC_URL,
    founder: {
      '@type': 'Person',
      name: 'Maxime Theneau',
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'Marseille',
        sameAs: 'https://fr.wikipedia.org/wiki/Marseille',
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Bouches-du-Rhône',
      },
      {
        '@type': 'AdministrativeArea',
        name: "Provence-Alpes-Côte d'Azur",
      },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Services de développement web',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Création de site web',
            description: 'Conception et développement de sites web sur-mesure, vitrines et e-commerce',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: "Développement d'applications web",
            description: 'Applications web performantes avec React.js, Next.js et Symfony',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Référencement naturel (SEO)',
            description: 'Optimisation SEO technique et éditoriale pour améliorer la visibilité',
          },
        },
      ],
    },
    knowsAbout: [
      'React.js', 'Next.js', 'Symfony', 'PHP',
      'SEO', 'Développement Web', 'Applications Web',
      'E-commerce', 'Performance Web',
    ],
    priceRange: '€€',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
      ],
      opens: '09:00',
      closes: '18:00',
    },
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />
    </Head>
  );
}
