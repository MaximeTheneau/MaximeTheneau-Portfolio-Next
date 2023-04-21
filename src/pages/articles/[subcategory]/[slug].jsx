import PropTypes from 'prop-types';
import Image from 'next/image';
import Head from 'next/head';
import styles from '../../../styles/Pages.module.scss';
import Cards from '../../../components/cards/cards';
import Category from '../../../components/category/category';
import imageLoaderFull from '../../../utils/imageLoaderFull';

export async function getStaticPaths() {

  // const res = await fetch('https://back.unetaupechezvous.fr/public/api/articles/all');
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts&category=Articles`);

  const posts = await res.json();

  const paths = posts.map((post) => ({ params: { 
    subcategory: post.subcategory.slug,
    slug: post.slug,
  } }));

  return { paths , fallback: 'blocking' };
}

export async function getStaticProps({ params }) {

const { subcategory, slug } = params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts/${params.slug}`);
  const post = await res.json();
  
  const resDesc = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts&limit=3&filter=desc&category=Articles`);
  const desc = await resDesc.json();
  if (!post) {
    return {
      notFound: true,
    }
  }

  if (!desc) {
    return {
      notFound: true,
    }
  }

  return { props: { post, desc }, revalidate: 10, };
}

export default function Slug({ post, desc }) {


  const descriptionMeta = post.contents === null
    ? `Articles de blog ${post.title}`
    : post.contents.substring(0, 165).replace(/[\r\n]+/gm, '');

  const handleChangeShareSocial = (e) => {
    const social = e.target.value;
    if (social === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${process.env.NEXT_PUBLIC_URL}/articles/${post.slug}`, '_blank');
    } else if (social === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?url=${process.env.NEXT_PUBLIC_URL}/articles/${post.slug}`, '_blank');
    } else if (social === 'linkedin') {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${process.env.NEXT_PUBLIC_URL}/articles/${post.slug}`, '_blank');
    } else if (social === 'pinterest') {
      window.open(`https://pinterest.com/pin/create/button/?url=${process.env.NEXT_PUBLIC_URL}/articles/${post.slug}`, '_blank');
    } else if (social === 'email') {
      window.open(`mailto:?subject=${post.title}&body=${process.env.NEXT_PUBLIC_URL}/articles/${post.slug}`, '_blank');
    }
  };
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
        <meta property="og:description" content={descriptionMeta} />
        <meta property="og:site_name" content={`${process.env.NEXT_PUBLIC_URL}/services/${post.slug}`}  />
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_URL}/services/${post.slug}`}  />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_CLOUD_URL}/${process.env.NEXT_PUBLIC_CLOUD_FILE_KEY}/${post.slug}.jpg`} />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_URL}/articles/${post.subcategory.name}/${post.slug}`}
          key="canonical"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={addProductJsonLd()}
          key="product-jsonld"
        />
      </Head>
      <Category category={post.subcategory} />
      <section className={styles.page}>
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
            priority
          />
        </div>

        <div className={styles.page__contents}>

        <h1>{post.title}</h1>
          <p>{post.contents}</p>
          {post.paragraphPosts.map((paragraphArticle) => (
            <>
              {paragraphArticle.subtitle && (
                <h2 key={paragraphArticle.id}>{paragraphArticle.subtitle}</h2>
              )}
              {paragraphArticle.paragraph && (
                <p key={paragraphArticle.id} className={styles.page__contents__paragraph}>
                  {paragraphArticle.imgPostParagh && (
                    <Image
                      className={styles.page__contents__paragraph}
                      src={`${paragraphArticle.imgPostParagh}.webp`}
                      alt={paragraphArticle.subtitle}
                      quality={100}
                      width='1080'
                      height='720'
                      sizes="(max-width: 768px) 100vw,
                        (max-width: 1200px) 50vw,
                        33vw"
                    />
                  )}
                  {paragraphArticle.paragraph}</p>
              )}
            </>
          ))}
          <ol >
            {post.listPosts.map((listArticle) => (
              listArticle.title !== null && (
                <li key={listArticle.title}>
                  {listArticle.title && (
                  <h3>{listArticle.title}</h3>
                  )}
                  {listArticle.description && (
                  <p>{listArticle.description}</p>
                  )}
                  </li>
              )
              ))}
            </ol>

        <select onChange={(e) => handleChangeShareSocial(e)} className="select">
          <option value="---">Partager sur ...</option>
          <option value="facebook" data-icon="icon-facebook">Facebook</option>
          <option value="twitter">Twitter</option>
          <option value="linkedin">Linkedin</option>
          <option value="pinterest">Pinterest</option>
          <option value="email">Email</option>
        </select>
        </div>
      <div>
        <h2>Derniers articles</h2>
        <Cards cards={desc} path="articles"/>
      </div>
      </section>



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
