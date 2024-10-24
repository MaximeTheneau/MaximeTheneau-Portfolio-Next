/* eslint-disable react/no-danger */
import Head from 'next/head';

export default function ProductJsonLd({ product }) {
  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    description: product.metaDescription,
    name: product.name,
    image: `${process.env.NEXT_PUBLIC_CLOUD_URL}/${process.env.NEXT_PUBLIC_CLOUD_FILE_KEY}/theneau-maxime.jpg`,
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      price: product.price,
      priceCurrency: 'EUR',
      priceValidUntil: '2025-12-31',
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
