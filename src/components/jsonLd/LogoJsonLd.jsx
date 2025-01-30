import Head from 'next/head';

export default function LogoJsonLd({ name, url }) {
  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    url,
    logo: {
      '@type': 'ImageObject',
      url: 'https://picture.maximefreelance.fr/Portfolio-4.webp?format=jpeg',
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
