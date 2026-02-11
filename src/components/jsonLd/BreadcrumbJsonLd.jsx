import Head from 'next/head';

export default function BreadcrumbJsonLd({ paragraphPosts, urlPost }) {
  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Accueil',
                item: process.env.NEXT_PUBLIC_URL,
              },
              ...paragraphPosts.map((paragraphArticle, index) => ({
                '@type': 'ListItem',
                position: index + 2,
                name: paragraphArticle.subtitle,
                item: `${urlPost}#${paragraphArticle.slug}`,
              })),
            ],
          }),
        }}
      />
    </Head>
  );
}
