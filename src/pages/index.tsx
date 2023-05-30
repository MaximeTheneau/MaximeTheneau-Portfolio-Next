import * as React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Cards from '../components/cards/cards';
import Faq from '../components/faq/faq';
import styles from './Pages.module.scss';
import SlideTransition from '../hooks/useSlideTransition/SlideTransition';
import HoverAnimation from '../hooks/useTextAnimation/TextAnimationWrapper';
import imageLoaderFull from '../utils/imageLoaderFull';
import imageThumbnail from '../utils/imageThumbnail';
import ContactForm from '../components/contact/Contact';
import VideoLoader from '../utils/videoLoader';
import HeadComponents from '../components/head/HeadComponents';

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
  const descriptionMeta:string = 'Taupier professionnels agréé de la lutte contre les taupes, fouines et ragondins. Intervention en Eure (28), Yvelines (78) et Essonne (91). Devis gratuit.';

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
      "url": "${process.env.NEXT_PUBLIC_URL}"      
    }
  `,
    };
  }

  return (
    <>
      <HeadComponents
        title={accueil.title}
        descriptionMeta={process.env.NEXT_PUBLIC_DESCRIPTION}
        url=""
        image="Accueil"
        addProduct={addProductJsonLd()}
      />
      <section>
        <div className={styles.home__header}>
          <div className={styles.home__header__image}>
            <Image
              src="Theneau-Maxime.webp"
              alt={accueil.altImg || accueil.title}
              loader={imageLoaderFull}
              quality={90}
              width={600}
              height={600}
              className={styles.home__header__image}
            />
          </div>
          <div className={styles.home__header__title}>
            <h1>{accueil.title}</h1>
            <h2>{accueil.contents}</h2>
          </div>
        </div>

        {/* --About--*/}
        <div className={styles.home__about}>
          <div>
            {accueil.paragraphPosts.map((paragraphArticle) => (
              <div key={paragraphArticle.subtitle}>
                <div className={styles.home__about}>
                  <h2>
                    <HoverAnimation>
                      {paragraphArticle.subtitle}
                    </HoverAnimation>
                  </h2>
                </div>
                <p className="w-responsive">{paragraphArticle.paragraph}</p>
              </div>
            ))}

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
          {creation.map((creations) => (
            <div className={styles.home__creation} key={creations.title}>
              <div className={styles.home__creation__header}>
                <div className={styles.home__creation__title}>
                  <SlideTransition
                    translate="0, 10%"
                    delay={0.5}
                  >
                    <h2>{creations.title}</h2>
                  </SlideTransition>
                </div>
                <div className={styles.home__creation__video}>
                  <SlideTransition
                    translate="0%, 50%"
                    delay={0}
                  >
                    <VideoLoader src={creations.slug} />
                  </SlideTransition>
                </div>
              </div>
              <div className={styles.home__creation__footer}>
                <SlideTransition
                  translate="0%, 100%"
                  delay={0.1}
                >
                  <p>{creations.contents}</p>
                </SlideTransition>
                <SlideTransition
                  translate="0, 100%"
                  delay={0.5}
                >
                  <Link
                    href={`/Creation/${creations.slug}`}
                    className={`button ${styles.home__creation__footer__button}`}
                  >
                    En savoir plus
                    <i className="icon-scroll" />
                  </Link>
                </SlideTransition>
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
  );
}
