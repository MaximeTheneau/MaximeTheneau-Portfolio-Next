import Head from 'next/head';

export default function PersonJsonLd() {
  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${process.env.NEXT_PUBLIC_URL}#person`,
    name: 'Maxime Theneau',
    alternateName: 'Maxime Freelance',
    image: 'https://picure.theneaumaxime.fr/A-propos-1.webp?format=jpeg',
    jobTitle: 'Développeur Web Freelance',
    url: `${process.env.NEXT_PUBLIC_URL}/A-propos`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Marseille',
      postalCode: '13008',
      addressRegion: "Provence-Alpes-Côte d'Azur",
      streetAddress: 'Avenue des Goumiers',
      addressCountry: 'France',
    },
    email: 'maxime@maximefreelance.fr',
    telephone: '+33622068036',
    knowsAbout: [
      'Création de sites web',
      "Développement d'applications web",
      'React.js', 'Next.js', 'Symfony', 'PHP',
      'SEO', 'Performance Web', 'E-commerce',
    ],
    worksFor: {
      '@type': 'Organization',
      name: 'Maxime Freelance',
      url: process.env.NEXT_PUBLIC_URL,
    },
    sameAs: [
      'https://www.linkedin.com/company/maxime-freelance',
      'https://x.com/MTheneau',
      'https://github.com/MaximeTheneau',
    ],
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
