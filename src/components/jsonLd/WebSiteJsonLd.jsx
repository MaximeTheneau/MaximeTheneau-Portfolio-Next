import Head from 'next/head';

export default function WebSiteJsonLd() {
  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${process.env.NEXT_PUBLIC_URL}#website`,
    url: process.env.NEXT_PUBLIC_URL,
    name: 'Maxime Freelance',
    description: 'Développeur web freelance à Marseille - Création de sites web et applications sur-mesure',
    publisher: {
      '@id': `${process.env.NEXT_PUBLIC_URL}#business`,
    },
    inLanguage: 'fr-FR',
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
