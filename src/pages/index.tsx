import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Faq from '../components/faq/Faq';
import HeadComponents from '../components/head/HeadComponents';
import LogoJsonLd from '../components/jsonLd/LogoJsonLd';
import ProductJsonLd from '../components/jsonLd/ProductJsonLd';
import Person from '../components/jsonLd/PersonJsonLd';
import ScrollingTextWrapper from '../hooks/useScrollingText/ScrollingTextWrapper';
import ImageLoaderFull from '../utils/ImageLoaderFull';
import ProductsList from '../components/cards/ProductsList';

export async function getStaticProps() {
  const responseAccueil = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts/home`);
  const accueil = await responseAccueil.json();

  const responseCreation = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts&limit=3&category=Creations`);
  const creation = await responseCreation.json();

  const responseFaq = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts/Foire-aux-questions`);
  const faq = await responseFaq.json();

  // const responseMaps = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${process.env.GOOGLE_API_PLACEID}&language=fr&key=${process.env.GOOGLE_API_KEY}`);

  const filteredFaq = faq.listPosts.slice(0, 3);

  return {
    props: {
      accueil: accueil.home,
      products: accueil.products,
      creation,
      // responseMaps,
      faq: filteredFaq,
    },
  };
}

export default function Home({
  accueil,
  products,
  creation,
  faq,
}) {
  return (
    <>
      <HeadComponents
        title={accueil.heading}
        description={accueil.metaDescription}
        url=""
        image="Theneau-Maxime"
      />
      <Person />
      <LogoJsonLd
        name="Theneau Maxime"
        url={process.env.NEXT_PUBLIC_URL}
        logoUrl={`${process.env.NEXT_PUBLIC_CLOUD_URL}/${process.env.NEXT_PUBLIC_CLOUD_FILE_KEY}/theneau-maxime.png`}
      />
      {products.map((product) => <ProductJsonLd product={product} />)}
      <section>
        <div className="relative h-auto">
          <Image
            className=" object-cover object-center mx-auto"
            src="A-propos.webp"
            alt={accueil.altImg || accueil.title}
            width="595"
            height="595"
            quality={80}
            priority
          />
          <div className="flex  p-2 flex-col items-center  absolute  top-0 left-1/2 transform -translate-x-1/2 -translate-y-2/2 w-full text-center bg-whiteOpacity">
            <Image
              src="Theneau-Maxime.webp"
              alt={accueil.altImg || accueil.title}
              loader={ImageLoaderFull}
              quality={80}
              width="96"
              height="96"
              sizes="(max-width: 768px) 100vw,
            (max-width: 1200px) 50vw,
            33vw"
              priority
              className="mt-2 w-1/6 sm:w-24"
            />
            <h1 className="sm:text-title px-2  dark:text-[#17181d]">
              {accueil.heading}
            </h1>
            <p className="block text-lg">{accueil.contents}</p>
          </div>
        </div>
        {/* --About--*/}
        <div className="px-8 pt-4 w-full flex">
          <div>
            {accueil.paragraphPosts.map((paragraphArticle) => (
              <div key={paragraphArticle.subtitle}>
                <h2>
                  {paragraphArticle.subtitle}
                </h2>
                <div className="w-responsive" dangerouslySetInnerHTML={{ __html: paragraphArticle.paragraph }} />
              </div>
            ))}
          </div>
        </div>
      </section>
      <ProductsList products={products} />
      <section className="m-4 ">
        {/* --Création--*/}
        <Link
          href="/Creations"
          className="w-ful relative "
        >
          <div className="w-full flex items-center justify-between p-2 mt-4 ">
            <h2>Mes projets :</h2>
            <span>
              Voir tous mes projets
            </span>
          </div>
        </Link>
        {creation.map((creations) => (
          <div className="mt-10 duration-300 hover:opacity-80" key={creations.title}>
            <Link href={`/Creations/${creations.slug}`}>
              <div className="grid sm:grid-cols-4 sm:gap-4 relative">
                <div className="sm:col-span-2 sm:col-span-2">
                  <div className="flex flex-col justify-around rounded sm:pr-10 pl-2 bg-secondary text-white min-h-96 p-4">
                    <h2 className="text-lg">{creations.title}</h2>
                    <p>{creations.contents}</p>
                    <span className="font-bold hover:underline transition-all duration-300">
                      En savoir plus
                      {' '}
                      <i className="icon-angle-right text-base" />
                    </span>
                  </div>
                </div>
                <div className=" order-first sm:order-last sm:col-span-1 sm:-translate-x-12 sm:translate-y-4 w-full">
                  <Image
                    src={`${creations.slug}.webp`}
                    width={1080}
                    height={720}
                    quality={70}
                    alt="src"
                    className="rounded"
                  />
                </div>
              </div>
            </Link>
          </div>
        ))}
      </section>
      {accueil.paragraphPosts.map((paragraphArticle) => (
        <div key={paragraphArticle.subtitle} />
      ))}
      {/* --FAQ--*/}
      <section className="m-4 ">
        <Link
          href="/Foire-aux-questions"
          className="text-2xl font-bold p-2 my-4"
        >
          Foire aux Question
        </Link>
        <Faq faq={faq} />
        <Link
          href="/Foire-aux-questions"
          className="mx-4"
        >
          Découvrez toutes les réponses à vos questions ici
        </Link>
      </section>

      <ScrollingTextWrapper accueil={accueil} />
      <section className="m-4 ">

        <Link
          href="/devis-en-ligne"
          className=" w-full block p-2 my-4 bg-form rounded"
        >
          <h2>Demande de devis pour la créations de devis en ligne </h2>
          <p>
            Si vous souhaitez obtenir un devis personnalisé pour la création de votre site web,
            n&apos;hésitez pas à nous contacter.
            Nous serons ravis de vous aider à réaliser votre projet en ligne.
            Remplissez le formulaire ci-dessous pour que nous puissions discuter
            de vos besoins et vous fournir une estimation précise.
          </p>
          Découvrez toutes les réponses à vos questions ici
        </Link>
      </section>
    </>
  );
}
