import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Pages.module.scss';
import imageLoaderFull from '../utils/imageLoaderFull';
import GoogleMaps from '../components/maps/GoogleMaps';
import imageThumbnail from '../utils/imageThumbnail';
;

export async function getStaticProps() {
  const responsePage = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts/Taupier-agree-professionnel-depuis-1994`);
  const page = await responsePage.json();

  return {
    props: {
      page,
    },
  };
}
// == Composant
export default function QuiSommesNous({ page }) {
  const descriptionMeta = page.contents.substring(0, 165).replace(/[\r\n]+/gm, '');

  return (
    <>
      <Head>
        <title>{page.title}</title>
        <meta name="description" content={descriptionMeta} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={page.title} />
        <meta property="og:description" content={descriptionMeta} />
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
          <Image
            className={styles.page__image}
            src={`${page.imgPost}.webp`}
            alt={page.altImg || page.title}
            width='1080'
            height='720'
            loader={imageLoaderFull}
            quality={100}
            sizes="(max-width: 768px) 100vw,
            (max-width: 1200px) 50vw,
            33vw"
            loading="eager"
            />
        <section className={styles.page}>
            <h1>{page.title}</h1>
            {page.paragraphPosts.map((paragraphPosts) => (
            <>
             <p className={styles.page__contents__paragraph}>
              {paragraphPosts.imgPostParagh && (
                <Image
                  className={styles.page__contents__paragraph}
                  src={`${paragraphPosts.imgPostParagh}.webp`}
                  alt={paragraphPosts.altImg || paragraphPosts.subtitle  }
                  width={330}
                  height={310}
                  quality={70}
                />
              )}
              {page.contents}
              </p>
              <h2>{paragraphPosts.subtitle}</h2>
              <p>{paragraphPosts.paragraph}</p>
            </>
              ))
              }
          <div itemScope itemType="https://schema.org/PostalAdress">
            <p itemProp="address">
              <strong>Adresse :</strong>  <span itemProp="streetAddress">71 Marie Curie</span> <span itemProp="postalCode">27780</span> <span itemProp="addressLocality">Garrennes-Sur-Eure</span>
            </p>
	          <p itemProp="telephone">
              <strong>Téléphone : </strong>
              <Link href="tel:+33232264958"> +33 2 32 26 49 58</Link>
            </p>
	          <p itemProp="email" className="notCopie" onMouseDown={(e) => e.preventDefault()} >
              <strong>Email : </strong>
               laurent.theneau @ unetaupechezvous.fr
            </p>
	          <p>
            <strong>Numéro SIRET :</strong> 39338032400029
            </p>
          </div>
          <GoogleMaps />
          {/* <iframe src="" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe> */}
        </section>
      </>
    </>
  );
}
