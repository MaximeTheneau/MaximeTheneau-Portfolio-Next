import * as React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import type { NextPageWithLayout } from './_app';
import Cards from '../components/cards/Cards';
import Faq from '../components/faq/Faq';
import styles from './Pages.module.scss';
import SlideTransition from '../hooks/useSlideTransition/SlideTransition';
import HoverAnimation from '../hooks/useTextAnimation/TextAnimationWrapper';
import ImageLoaderFull from '../utils/ImageLoaderFull';
import imageThumbnail from '../utils/ImageThumbnail';
import ContactForm from '../components/contact/Contact';
import VideoLoader from '../utils/VideoLoader';
import HeadComponents from '../components/head/HeadComponents';

export async function getStaticProps() {
  const responseAccueil = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts/Accueil`);
  const accueil = await responseAccueil.json();

  const responseCreation = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts&limit=3&category=Creations`);
  const creation = await responseCreation.json();

  // const responseServices = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts&limit=3&category=Services`);
  // const services = await responseServices.json();

  const responseFaq = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts/Foire-aux-questions`);
  const faq = await responseFaq.json();

  return {
    props: {
      accueil,
      creation,
      // services,
      // articles,
      faq,
    },
  };
}

export default function Home({
  accueil,
  services,
  creation,
  faq,
  //  articles, faq, reviews,
}): NextPageWithLayout {
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
            <VideoLoader
              src={accueil.slug}
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
              <>
                <h2 key={paragraphArticle.subtitle}>
                  {paragraphArticle.subtitle}
                </h2>
                <ul>
                  {accueil.listPosts.map((listArticle) => (
                    <li key={listArticle.id}>{listArticle.title}</li>
                  ))}
                </ul>
                <p className="w-responsive">{paragraphArticle.paragraph}</p>
              </>
            ))}

            <Link href="/contact" className="button">
              Contactez-moi
              <i className="icon-x" />
            </Link>
          </div>

        </div>

        {/* --Création--*/}
        <div>
          {creation.map((creations) => (
            <SlideTransition delay={1}>
              <div className={styles.home__creation} key={creations.title}>
                <div className={styles.home__creation__header}>
                  <div className={styles.home__creation__header__title}>
                    <h2>{creations.title}</h2>
                  </div>
                  <div className={styles.home__creation__header__video}>
                    <VideoLoader src={creations.slug} />
                  </div>
                </div>
                <div className={styles.home__creation__footer}>
                  <p>{creations.contents}</p>
                  <Link
                    href={`/Creation/${creations.slug}`}
                    className={`button ${styles.home__creation__footer__button}`}
                  >
                    En savoir plus
                    <i className="icon-scroll" />
                  </Link>
                </div>
              </div>
            </SlideTransition>
          ))}
        </div>

        {/* --FAQ--*/}
        <div>
          <Link href={faq.slug}>
            <h2 className="title__faqs">{faq.title}</h2>
          </Link>
          <Faq faq={faq} />
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
      </section>
    </>
  );
}
