import Head from 'next/head';

export default function ImageObjectJsonLd({ post }) {
  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    '@id': `${post.imgPost}?format=jpeg`,
    contentUrl: `${post.imgPost}?format=jpeg`,
    caption: post.altImg,
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
