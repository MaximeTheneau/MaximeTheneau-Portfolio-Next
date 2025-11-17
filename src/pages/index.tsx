import * as React from 'react';
import Link from 'next/link';
import Image from '@/utils/Image';
import fetcher from '@/utils/fetcher';
// import AtoutsList from '@/components/ui/AtoutsList';

import ScrollingTextWrapper from '@/hooks/useScrollingText/ScrollingTextWrapper';
import Cards from '@/components/cards/Cards';
import BreadcrumbJsonLd from '@/components/jsonLd/BreadcrumbJsonLd';
import FaqJsonLd from '@/components/jsonLd/FaqJsonLd';
import Faq from '../components/faq/Faq';
import HeadComponents from '../components/head/HeadComponents';
import LogoJsonLd from '../components/jsonLd/LogoJsonLd';
import LocalBusinessJsonLd from '../components/jsonLd/LocalBusinessJsonLd';
import Person from '../components/jsonLd/PersonJsonLd';
// import ProductsList from '../components/cards/ProductsList';

export async function getStaticProps() {
  const accueil = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}posts/home`);
  // const responseMaps = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${process.env.GOOGLE_API_PLACEID}&language=fr&key=${process.env.GOOGLE_API_KEY}`);

  return {
    props: {
      accueil: accueil.home,
      products: accueil.products,
      creation: accueil.creation,
      skills: accueil.skills,
      faq: accueil.faq,
    },
  };
}

export default function Home({
  accueil,
  creation,
  faq,
  skills,
}:any) {
  return (
    <>
      <HeadComponents
        title={accueil.heading}
        description={accueil.metaDescription}
        url=""
        image={accueil.imgPost}
        srcset={accueil.srcset}
      />
      <Person />
      <LogoJsonLd
        name="Theneau Maxime"
        url={process.env.NEXT_PUBLIC_URL}
      />
      <LocalBusinessJsonLd descriptionMeta={accueil.metaDescription} />
      <FaqJsonLd listPosts={faq} />
      <BreadcrumbJsonLd paragraphPosts={accueil.paragraphPosts} urlPost={`${process.env.NEXT_PUBLIC_URL}`} />
      <section>
        <div className="relative flex items-center justify-center text-center">
          <Image
            className={`object-cover object-center md:w-[${accueil.imgWidth}]  h-96`}
            src={accueil.imgPost}
            alt={accueil.altImg || accueil.title}
            width={accueil.imgWidth}
            height={accueil.imgHeight}
            srcset={accueil.srcset}
            sizes="100vw"
            priority
          />
          <div
            style={{ maxWidth: `${accueil.imgWidth}px` }}
            className="  pb-4 px-2 w-full  absolute bottom-0 text-white bg-blackOpacity "
          >
            <h1 className="sm:text-title  sm:leading-[2] px-2  dark:text-[#17181d] ">
              {accueil.title}
            </h1>
          </div>
        </div>
        <article
          className="p-4 text-center  "
        >
          <div className="p-4 text-center mx-auto max-w-[1080px]" dangerouslySetInnerHTML={{ __html: accueil.contents }} />
          {/* <div className="text-center mt-6">
            <Link href="/Contact" aria-label="Contactez-moi pour discuter de votre projet">
              <button
                type="button"
                className="text-black bg-primary px-8 py-4 rounded-lg font-bold  "
              >
                📞 Contactez-moi ! Prenez rendez-vous
              </button>
            </Link>
          </div> */}
        </article>

        {/* --Skills--*/}
        <div className="my-4 bg-primary py-8 px-4 text-center">
          <h2 className="">
            Maxime Freelance - Développeur web freelance à Marseille
          </h2>
          <p>
            Spécialisé en Front-End (React.js, Next.js) et Back-End (Symfony, PHP),
            j’accompagne les entreprises dans la création de sites modernes et
            performants. Basé à Marseille, je propose des solutions sur-mesure,
            optimisées pour le SEO et la performance.
          </p>
          <ScrollingTextWrapper accueil={skills} />
          <Link
            href="/A-propos"

          >
            <button type="button" className=" text-black left inline-block md:w-1/2 bg-secondary  my-4 px-8 py-4 rounded-lg font-bold">
              Tout savoir sur mon parcours et mes compétences
            </button>
          </Link>
        </div>

        {/* --Atouts--*/}
        {/* <div className="bg-primary">
          <AtoutsList />
        </div> */}
        {/* --Création--*/}
        <div className="p-4 text-center bg-secondary">
          <h2>Réalisations</h2>
          <Cards cards={creation} />
          <Link
            href="/Creations"
            className=" text-black text-center mx-auto block   p-4 md:w-1/2 bg-primary my-4 px-8 py-4 rounded-lg font-bold "
          >
            Découvrez tous mes projets
          </Link>
        </div>

        {/* --About--*/}
        <div className="px-8 pt-4 w-full flex justify-center">
          <div>
            {accueil.paragraphPosts.map((paragraphArticle:
            { subtitle: string; paragraph: any; }) => (
              <div key={paragraphArticle.subtitle} id={paragraphArticle.subtitle}>
                <h2>
                  {paragraphArticle.subtitle}
                </h2>
                <div className="w-responsive list" dangerouslySetInnerHTML={{ __html: paragraphArticle.paragraph }} />
              </div>
            ))}
          </div>
        </div>
        {/* --Product--*/}
        {/* <div className="bg-primary pt-8 pb-4 text-center ">
          <ProductsList products={products} />
        </div> */}

        {/* --FAQ--*/}
        <div className="m-4 bg-secondary p-4 rounded ">
          <h2>Foire aux Question</h2>
          <Faq faq={faq} />
          <Link
            href="/Foire-aux-questions"
            className=" text-black left mx-auto block bg-primary my-4 px-8 py-4 rounded-lg font-bold hover:text-white"
          >
            Découvrez toutes les réponses à vos questions ici
          </Link>
        </div>
        <div className="m-4 ">

          <h2>Demande de devis pour la créations de devis en ligne </h2>
          <p>
            Si vous souhaitez obtenir un devis personnalisé pour la création de votre site web,
            n&apos;hésitez pas à nous contacter.
            Nous serons ravis de vous aider à réaliser votre projet en ligne.
          </p>
          <Link
            href="/devis-en-ligne"
          >
            <button type="button" className=" text-black text-center mx-auto block bg-primary my-4 px-8 py-4 rounded-lg font-bold ">
              Demander un devis gratuit
              <span className="text-center block text-xs ">
                ✓ Devis gratuit ✓ Réponse sous 24h
              </span>
            </button>
          </Link>

        </div>
      </section>
    </>
  );
}
