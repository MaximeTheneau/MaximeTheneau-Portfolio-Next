import Head from 'next/head';

export default function LocalBusinessJsonLd({ descriptionMeta }) {
  // const {
  //   result,
  //   reviews = result.reviews,
  // } = reviewsData;

  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Maxime Freelance',
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
      addressCountry: 'FR',
    },
    telephone: '+33622068036',
    url: process.env.NEXT_PUBLIC_URL,
    areaServed: {
      '@type': 'PostalAddress',
      name: 'Marseille',
    },
    // aggregateRating: {
    //   '@type': 'AggregateRating',
    //   ratingValue: result.rating,
    //   reviewCount: result.user_ratings_total,
    // },
    // review: [
    //   reviews.map((review) => (
    //     {
    //       '@type': 'Review',
    //       author: {
    //         '@type': 'Person',
    //         name: review.author_name,
    //       },
    //       datePublished: new Date(review.time * 1000).toISOString(),
    //       reviewBody: review.text,
    //       reviewRating: {
    //         '@type': 'rating',
    //         ratingValue: review.rating,
    //       },
    //     })),
    // ],
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
    serviceType: 'Conception et développement de sites Web',

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
