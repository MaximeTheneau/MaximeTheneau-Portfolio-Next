import PropTypes from 'prop-types';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../Pages.module.scss';
import Page404 from '../404';
import imageLoaderFull from '../../utils/imageLoaderFull';
import Link from 'next/link';

export async function getStaticPaths() {

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts&category=Creations`);
  const posts = await res.json();

  const paths = posts.map((post) => ({ params: { slug: post.slug } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts/${params.slug}`);
  const post = await res.json();

  return { props: { post },revalidate: 10 };
}

export default function Slug({ post }) {
  
  if(!post) return <Page404 />

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
      "name": "Laurent THENEAU"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Une taupe chez vous",
      "logo": {
        "@type": "ImageObject",
        "url": "${process.env.NEXT_PUBLIC_URL}/${process.env.NEXT_PUBLIC_CLOUD_FILE_KEY}/Logo-Une-Taupe-Chez-Vous.jpg"
      }
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
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_URL}/services/${post.slug}`}  />
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
            loader={imageLoaderFull}
            quality={100}
            width='1080'
            height='720'
            sizes="(max-width: 768px) 100vw,
            (max-width: 1200px) 50vw,
            33vw"
          />
        </div>
        <div>
          <h1>{post.title}</h1>
          <p>{post.contents}</p>
          {post.paragraphPosts.map((paragraphPosts) => (
            <>
              <h2>{paragraphPosts.subtitle}</h2>
              <p>{paragraphPosts.paragraph}</p>
            </>
              ))
              }
              {post.listPosts.filter(post => post.title !== "GitHub" && post.title !== "Website").map(post => (
                <h3 key={post.id}>
                  {post.title}
                </h3>
              ))}
              {post.listPosts.filter(post => post.title == "GitHub").map(post => (
                <Link href={post.description} key={post.id} className="button">
                  {post.title}
                  <i className="icon-github"/>
                </Link>
              ))}
              {post.listPosts.filter(post => post.title == "Website").map(post => (
                <Link href={post.description} key={post.id} className="button">
                  {post.title}
                  <i className="icon-confirmation1"/>
                </Link>
              ))}
          <Link href="/contact" className='button'>
            Contactez-nous
          </Link>
        </div>
      </div>

    </>
  );
}

Slug.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    contents: PropTypes.string.isRequired,
    contents2: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    imgPost: PropTypes.shape({
      path: PropTypes.string.isRequired,
    }),
    imgPost2: PropTypes.shape({
      path: PropTypes.string,
    }),
    imgPost3: PropTypes.shape({
      path: PropTypes.string,
    }),
    imgPost4: PropTypes.shape({
      path: PropTypes.string,
    }),
  }).isRequired,
};
