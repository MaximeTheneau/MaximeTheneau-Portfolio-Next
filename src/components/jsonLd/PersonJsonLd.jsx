import Head from 'next/head';

export default function PersonJsonLd() {
  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Theneau Maxime - Maxime Freelance',
    image: `${process.env.NEXT_PUBLIC_URL_PICTURE}/A-propos-1.webp?format=jpeg`,
    jobTitle: 'Développeur Web',
    url: `${process.env.NEXT_PUBLIC_URL}/A-propos`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Marseille',
      postalCode: '13008',
      addressCountry: 'France',
    },
    email: 'maxime@maximefreelance.fr',
    telephone: '+33622068036',
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
