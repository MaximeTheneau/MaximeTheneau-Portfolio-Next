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
    image: {
      '@type': 'ImageObject',
      url: `${process.env.NEXT_PUBLIC_CLOUD_URL}/${process.env.NEXT_PUBLIC_CLOUD_FILE_KEY}/${post.imgPost}.jpg`,
      caption: post.title,
    },
    associatedMedia: {
      '@type': 'ImageObject',
      contentUrl: `${process.env.NEXT_PUBLIC_CLOUD_URL}/${process.env.NEXT_PUBLIC_CLOUD_FILE_KEY}/${post.imgPost}.jpg`,
      description: post.title,
    },
    author: {
      '@type': 'Person',
      name: 'Maxime THENEAU',
      url: `${process.env.NEXT_PUBLIC_URL}/A-propos`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'THENEAU Maxime',
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
