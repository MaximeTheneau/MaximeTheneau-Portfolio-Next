import Head from 'next/head';

export default function ArticleJsonLd({ post, urlPost }) {
  const jsonLdData = {
    '@context': 'https://schema.org/',
    '@type': 'Article',
    name: post.title,
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.createdAt,
    ...(post.updatedAt && { dateModified: post.updatedAt }),
    url: urlPost,
    articleSection: `${post.subcategory ? `${post.subcategory.name},` : ''} ${post.category.name}`,
    isAccessibleForFree: 'True',
    keywords: `${post.title}, ${post.category.name}${post.subcategory ? `, ${post.subcategory.name}` : ''}`,
    articleBody: post.contents,
    image: `${post.imgPost}?format=jpeg`,
    author: {
      '@type': 'Person',
      name: 'Maxime THENEAU',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Maxime Freelance',
      logo: {
        '@type': 'ImageObject',
        url: 'https://picture.theneaumaxime.fr/Portfolio-4.webp?format=jpeg',
      },
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
