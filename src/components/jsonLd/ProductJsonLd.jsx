import Head from 'next/head';

export default function ProductJsonLd({ product }) {
  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    description: product.description,
    name: product.name,
    image: `${process.env.NEXT_PUBLIC_URL_PICTURE}/Accueil.webp?format=jpeg`,
    termsOfService: 'https://maximefreelance.fr/Mentions-Legales',
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: 'https://maximefreelance.fr/contact',
      availableLanguage: ['Fr'],
    },
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      price: product.discountedPrice,
      priceCurrency: 'EUR',
      priceValidUntil: '2024-12-31',
      priceSpecification: [
        {
          '@type': 'UnitPriceSpecification',
          priceCurrency: 'EUR',
          price: product.price,
          description: 'Prix original',
        },
        {
          '@type': 'UnitPriceSpecification',
          priceCurrency: 'EUR',
          price: product.discountedPrice,
          description: 'Prix après réduction',
        },
      ],
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
