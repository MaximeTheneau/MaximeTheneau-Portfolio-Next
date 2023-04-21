import PropTypes from 'prop-types';
import Image from 'next/image';
import Head from 'next/head';
import Script from 'next/script';
import styles from '../styles/Pages.module.scss';
import Faq from '../components/faq/faq';

export async function getStaticProps() {

  const responseContact = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts/Foire-aux-questions`);
  const post = await responseContact.json();

  return {
    props: {
      post,
    },
  };
}

export default function Slug({ post, desc }) {


  const descriptionMeta = post.contents === null
    ? `Articles de blog ${post.title}`
    : post.contents.substring(0, 165).replace(/[\r\n]+/gm, '');

  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={descriptionMeta} />
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={descriptionMeta} />
        <meta property="og:site_name" content="Une Taupe Chez Vous" />
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_URL}/${post.slug}`}  />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_CLOUD_URL}/${process.env.NEXT_PUBLIC_CLOUD_FILE_KEY}/${post.slug}.jpg`} />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_URL}${post.slug}`}
          key="canonical"
        />
      </Head>
      <div className={styles.page}>
        <div className={styles.page__image}>
          {/* <Image
            src={`${post.slug}.webp`}
            alt={post.title}
            loader={imageLoaderFull}
            quality={100}
            width='1080'
            height='720'
            sizes="(max-width: 768px) 100vw,
            (max-width: 1200px) 50vw,
            33vw"
            priority
          /> */}
        </div>

        <div className={styles.page__contents}>
        <h1>{post.title}</h1>
          <p>{post.contents}</p>
          <Faq faq={post} />
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
        </div>
      </div>
      <div>

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
