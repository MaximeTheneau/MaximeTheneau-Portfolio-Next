import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import fetcher from '@/utils/fetcher';
import Faq from '../components/faq/Faq';
import HeadComponents from '../components/head/HeadComponents';
import LogoJsonLd from '../components/jsonLd/LogoJsonLd';
import ProductJsonLd from '../components/jsonLd/ProductJsonLd';
import Person from '../components/jsonLd/PersonJsonLd';
import ProductsList from '../components/cards/ProductsList';

export async function getStaticProps() {
  const responseAccueil = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts/home`);
  const accueil = await responseAccueil.json();

  const creation = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}posts&limit=3&category=Creations`);

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
}:any) {
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
      {products.map((product:any) => <ProductJsonLd key={product.name} product={product} />)}
      <section>
        <div className="relative h-auto ">
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
              quality={80}
              width="96"
              height="96"
              priority
              className="mt-2 w-1/6 sm:w-24"
            />
            <h1 className="sm:text-title px-2  dark:text-[#17181d] sm:w-595">
              {accueil.heading}
            </h1>
          </div>
        </div>
        {/* --About--*/}
        <div className="px-8 pt-4 w-full flex">
          <div>
            {accueil.paragraphPosts.map((paragraphArticle:
            { subtitle: string; paragraph: any; }) => (
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
      {/* --Product--*/}
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
        <div className="sm:flex">

          {creation.map((creations: any) => (
            <div
              className="duration-300 flex flex-col justify-between hover:opacity-80 w-full sm:w-1/3 m-4 p-4 bg-form"
              key={creations.id}
            >
              <h2>{creations.title}</h2>
              <p className="no-underline">{creations.contents}</p>
              <Link href={`/Creations/${creations.slug}`}>
                <span className="font-bold hover:underline transition-all duration-300">
                  En savoir plus
                  {' '}
                  <i className="icon-angle-right text-base" />
                </span>
              </Link>
            </div>
          ))}
        </div>
      </section>

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

      <section className="m-4 ">
        <Link
          href="/devis-en-ligne"
        >
          <h2>Demande de devis pour la créations de devis en ligne </h2>
        </Link>
        <p>
          Si vous souhaitez obtenir un devis personnalisé pour la création de votre site web,
          n&apos;hésitez pas à nous contacter.
          Nous serons ravis de vous aider à réaliser votre projet en ligne.
          Remplissez le formulaire ci-dessous pour que nous puissions discuter
          de vos besoins et vous fournir une estimation précise.
        </p>
      </section>
    </>
  );
}
