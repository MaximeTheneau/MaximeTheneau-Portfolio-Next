/* eslint-disable quote-props */
import Head from 'next/head';
import Link from 'next/link';
import Cards from '../components/cards/cards';
import Faq from '../components/faq/faq';
import styles from '../styles/Pages.module.scss';;
import ScrollParallaxTop from '../hooks/useMovableElement/ScrollWrapper';
import imageLoaderFull from '../utils/imageLoaderFull';
import Image from 'next/image';
import imageThumbnail from '../utils/imageThumbnail';
import ContactForm from '../components/contact/contactForm';


export async function getStaticProps() {
  const responseAccueil = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts/Accueil`);
  const accueil = await responseAccueil.json();

  const responseCreation = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts&limit=3&category=Creations`);
  const creation = await responseCreation.json();

  // const responseServices = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts&limit=3&category=Services`);
  // const services = await responseServices.json();

  // const responseArticles = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts&limit=3&category=Articles`);
  // const articles = await responseArticles.json();

  // const responseFaq = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts/Foire-aux-questions`);
  // const faq = await responseFaq.json();

  return {
    props: {
      accueil,
      creation,
      // services,
      // articles,
      // faq,
    },
  };
}

export default function Home({
  accueil,
  services,
  creation,
  //  articles, faq, reviews,
}) {
  const descriptionMeta = 'Taupier professionnels agréé de la lutte contre les taupes, fouines et ragondins. Intervention en Eure (28), Yvelines (78) et Essonne (91). Devis gratuit.';
  
  // schema.org
  function addProductJsonLd() {
    return {
      __html: `{
      "@context": "https://schema.org/",
      "@type": "Corporation",
      "name": "${accueil.title}",
      "image": "${process.env.NEXT_PUBLIC_CLOUD_URL}/${process.env.NEXT_PUBLIC_CLOUD_FILE_KEY}/Accueil.jpg",
      "description": "${descriptionMeta}",
      "slogan": "${descriptionMeta}",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "FR",
        "postalCode": "27780",
        "streetAddress": "71 rue marie curie",
        "addressLocality": "Garrenne sur Eure"
      },
      "url": "${process.env.NEXT_PUBLIC_URL}",
      "telephone": "+33232264958"
      
    }
  `,
  };
}

  return (
    <>
      <Head>
        <meta name="google-site-verification" content="yObJd5noBtjUBky_GRbOOETV42Q9qAHf7w00PPz1-ss" />
        <title>{accueil.title}</title>
        <meta name="description" content={descriptionMeta} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={accueil.title} />
        <meta property="og:description" content={descriptionMeta} />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_URL} />
        <meta property="og:site_name" content={process.env.NEXT_PUBLIC_URL} />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_CLOUD_URL}/${process.env.NEXT_PUBLIC_CLOUD_FILE_KEY}/Accueil.jpg`} />
        <meta name="google-site-verification" content="yObJd5noBtjUBky_GRbOOETV42Q9qAHf7w00PPz1-ss" />
        <link
          rel="canonical"
          href={process.env.NEXT_PUBLIC_URL}
          key="canonical"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={addProductJsonLd()}
          key="product-jsonld"
        />
        </Head> 
      <>
        <section>
          <div className={styles.home__header} >
            <div className={styles.home__header__image}>
              <Image
                src={`Theneau-Maxime.webp`}
                alt={accueil.altImg || accueil.title}
                loader={imageThumbnail}
                quality={90}
                width={600}
                height={600}
                className={styles.home__header__image}
              />
            </div>
            <div className={styles.home__header__title}>
              <h1>{accueil.title}</h1>  
              <h2>{accueil.contents}</h2>
              <Link href="/contact" className="button">
                Yep
              </Link>
            </div>
          </div>
        {/* --Articles--*/}

        <div className={styles.home__about} >
          <div >
              {accueil.paragraphPosts.map((paragraphArticle) => (
                <>
                  <h2>{paragraphArticle.subtitle}</h2>
                  <p>{paragraphArticle.paragraph}</p>
                </>
                  ))

              }
            <Link href="/contact" className="button">
              Contactez-moi
              <i className="icon-x" />
            </Link>
          </div>

          {/* <ScrollParallaxTop>
            <Image
              src={`Articles.webp`}
              alt={accueil.altImg || accueil.title}
              loader={imageLoaderFull}
              quality={100}
              width={1080}
              height={720}
              sizes="100vw"
              className={styles.home__category__image}
              style={{ objectPosition: '0 var(--topImg)' }}
            />
          </ScrollParallaxTop> */}
          {/* <Cards cards={services} path="services" /> */}
        </div>

        {/* --Création--*/}
        <div>
          {creation.map((creation) => (
            <div className={styles.home__creation} key={creation.id}>
              <div className={styles.home__creation__header}>
                <div className={styles.home__creation__title}>
                  <h2>{creation.title}</h2>
                </div>
                <div className={styles.home__creation__video}>
                  <video
                    autoPlay
                    loop
                    muted
                    width={1080}
                    height={720}
                    className={styles.home__creation__video}
                  >
                    <source
                      src={`${process.env.NEXT_PUBLIC_CLOUD_URL_VIDEO}/${creation.slug}.webm`}
                    />
                  </video>
                </div>
              </div>
              <div className={styles.home__creation__footer}>
                <p>{creation.contents}</p>
                <Link href={`/Creation/${creation.slug}`} className={`button ${styles.home__creation__footer__button}`} >
                  En savoir plus
                  <i className="icon-scroll" />
                </Link>

              </div>
            </div>
          ))}

        </div>

        {/* --Contact--*/}

        <div className={styles.home__contact}>
          <div className={styles.home__contact__title}>
            <h2>{accueil.titleContact}</h2>
          </div>
          <div className={styles.home__contact__form}>
            <ContactForm />
          </div>
        </div>

        {/* <div>
          <Link href={faq.slug}>
            <h2 className="title__faqs">{faq.title}</h2>
          </Link>
          <Faq faq={faq} />
        </div> */}
        </section>
      </>
    </>
  );
}
