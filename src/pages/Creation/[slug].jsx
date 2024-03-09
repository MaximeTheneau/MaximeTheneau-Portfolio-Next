import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../../styles/Pages.module.scss';
import Page404 from '../404';
import ImageLoaderFull from '../../utils/ImageLoaderFull';

export async function getStaticPaths() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts&category=Creations`);
  const posts = await res.json();

  const paths = posts.map((post) => ({ params: { slug: post.slug } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts/${params.slug}`);
  const post = await res.json();

  return { props: { post } };
}

export default function Slug({ post }) {
  if (!post) return <Page404 />;
  const descriptionMeta = post.contents.substring(0, 155).replace(/[\r\n]+/gm, '');

  // schema.org
  function addProductJsonLd() {
    return {
      __html: `{
    "@context": "https://schema.org/",
    "@type": "Article",
    "name": "${post.title}",
    "headline": "${post.title}",
    "description": "${descriptionMeta}",
    "image": "${process.env.NEXT_PUBLIC_CLOUD_URL}/${process.env.NEXT_PUBLIC_CLOUD_FILE_KEY}/${post.slug}.jpg",
    "datePublished": "${post.createdAt}",
    "dateModified": "${post.updatedAt}",
    "author": {
      "@type": "Person",
      "name": "THENEAU Maxime"
    },
    "publisher": {
      "@type": "Organization",
      "name": "THENEAU Maxime",
    }
  }
`,
    };
  }
  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={descriptionMeta} />
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={post.title} />
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_URL}/services/${post.slug}`} />
        <meta property="og:description" content={descriptionMeta} />
        <meta property="og:site_name" content={`${process.env.NEXT_PUBLIC_URL}/services/${post.slug}`} />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_CLOUD_URL}/${process.env.NEXT_PUBLIC_CLOUD_FILE_KEY}/${post.slug}.jpg`} />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_URL}/services/${post.slug}`}
          key="canonical"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={addProductJsonLd()}
          key="product-jsonld"
        />
      </Head>
      <div className={styles.page}>
        <div className={styles.page__image}>

          <Image
            src={`${post.slug}.webp`}
            alt={post.altImg || post.title}
            loader={ImageLoaderFull}
            quality={100}
            width="1080"
            height="720"
            sizes="(max-width: 768px) 100vw,
            (max-width: 1200px) 50vw,
            33vw"
          />
        </div>
        <div>
          <h1>{post.title}</h1>
          {/* Button Technologies */}

          <p>{post.contents}</p>
          {post.paragraphPosts.map((paragraphPosts) => (
            <>
              <h2>{paragraphPosts.subtitle}</h2>
              <p>{paragraphPosts.paragraph}</p>
            </>
          ))}
          <div className={styles.page__list__links}>
            {post.github && (
            <Link href={post.github} className="button">
              Github
              <i className="icon-github" />
            </Link>
            )}
            {post.website && (
            <Link href={post.website} className="button">
              Website
              <i className="icon-scroll" />
            </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
