import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Pages.module.scss';import imageLoaderFull from '../utils/imageLoaderFull';
;

export async function getStaticProps() {
  const responsePage = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts/Mentions-Legales`);
  const page = await responsePage.json();

  return {
    props: {
      page,
    },
  };
}

// == Composant
export default function MentionsLegal({ page }) {
  return (
    <>
      <Head>
        <title>{page.title}</title>
        <meta name="description" content="Mention legales de Une Taupe Chez Vous" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={page.title} />
        <meta property="og:description" content="Mention legales de Une Taupe Chez Vous" />
        <meta property="og:site_name" content="Une Taupe Chez Vous" />
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_URL}/${page.slug}`} />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_CLOUD_URL}/${process.env.NEXT_PUBLIC_CLOUD_FILE_KEY}/${page.slug}.jpg`} />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_URL}/${page.slug}`}
          key="canonical"
        />
      </Head>

      <>
        <section className={styles.page__image}>
          <h1>Mention Legales</h1>
          <Image
            src={`${page.slug}.webp`}
            alt={page.altImg || page.title}
            width='1080'
            height='720'
            quality={100}
            loader={imageLoaderFull}
            sizes="(max-width: 768px) 100vw,
            (max-width: 1200px) 50vw,
            33vw"
          />
        </section>
        <section>
          <h2>{page.subtitle}</h2>
          <p>
            {page.contents}
          </p>
        </section>
      </>
    </>
  );
}
