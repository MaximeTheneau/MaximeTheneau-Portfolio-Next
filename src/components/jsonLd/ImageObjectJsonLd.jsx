import Head from 'next/head';

export default function ImageObject({ post }) {
  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    '@id': `${post.imgPost}?format=jpeg`,
    author: {
      '@type': 'Person',
      name: 'Maxime THENEAU',
    },
    contentUrl: `${post.imgPost}?format=jpeg`,
    description: post.altImgPost,
    name: post.title,
    height: post.imgPost.height,
    width: post.imgPost.width,
    inLanguage: 'fr-FR',
    datePublished: post.createdAt,
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
