import Head from 'next/head';

export default function ArticleJsonLd({ post, urlPost }) {
  const jsonLdData = {
    '@context': 'https://schema.org/',
    '@type': 'BlogPosting',
    '@id': `${process.env.NEXT_PUBLIC_URL}/blog`,
    mainEntityOfPage: `${process.env.NEXT_PUBLIC_URL}/blog`,
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
      '@id': `${post.imgPost}?format=jpeg`,
      url: `${post.imgPost}?format=jpeg`,
      height: post.imgHeight,
      width: post.imgWidth,
    },
    author: {
      '@type': 'Person',
      name: 'Maxime THENEAU',
      url: `${process.env.NEXT_PUBLIC_URL}/A-propos`,
    },
    isPartOf: {
      '@type': 'Blog',
      '@id': `${process.env.NEXT_PUBLIC_URL}/blog/${post.category.slug}`,
      name: 'Maxime Freelance Blog ',
      publisher: {
        '@type': 'Organization',
        '@id': `${process.env.NEXT_PUBLIC_URL}`,
        name: 'Maxime Freelance',
      },
    },
    publisher: {
      '@type': 'Organization',
      name: 'Maxime Freelance',
      logo: {
        '@type': 'ImageObject',
        url: 'https://picture.maximefreelance.fr/Portfolio-4.webp?format=jpeg',
      },
    },
    commentCount: post.comments.length,
    comment: [
      post.comments.map((comment) => ({
        '@type': 'Comment',
        author: {
          '@type': 'Person',
          name: comment.User,
        },
        description: comment.comment,
        dateCreated: comment.createdAt,
      })),
    ],
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
