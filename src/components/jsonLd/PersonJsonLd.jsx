/* eslint-disable react/no-danger */
import Head from 'next/head';

export default function PersonJsonLd() {
  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Theneau Maxime',
    image: `${process.env.NEXT_PUBLIC_URL_PICTURE}/Accueil.webp?format=jpeg`,
    jobTitle: 'Développeur Web',
    url: `${process.env.NEXT_PUBLIC_URL}/A-propos`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Marseille',
      postalCode: '13008',
      addressCountry: 'France',
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
