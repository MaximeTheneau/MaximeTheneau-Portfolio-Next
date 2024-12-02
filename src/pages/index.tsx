import * as React from 'react';
import Link from 'next/link';
import Image from '@/utils/Image';
import fetcher from '@/utils/fetcher';
import ScrollingTextWrapper from '@/hooks/useScrollingText/ScrollingTextWrapper';
import AtoutsList from '@/components/ui/AtoutsList';
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
        <div className="relative  ">
          <Image
            className="object-cover object-center mx-auto"
            src={accueil.imgPost}
            alt={accueil.altImg || accueil.title}
            width={accueil.imgWidth}
            height={accueil.imgHeight}
            srcset={accueil.srcset}
            priority
          />
          <div style={{ maxWidth: `${accueil.imgWidth}px` }} className="absolute flex  w-full flex-col items-center  absolute  bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-2/2  text-white bg-blackOpacity">
            <h1 className="sm:text-title px-2  dark:text-[#17181d] ">
              {accueil.title}
            </h1>
          </div>
        </div>
        <AtoutsList />

      </section>
      <section>
        <div className="bg-primary pt-16 pb-4 text-center ">
          <h2>
            Agence Web à Marseille : Offre Spéciale jusqu’au 1er Janvier 2025
          </h2>
          <p>
            Bénéficiez d’une réduction de 50 % sur toutes mes formules
            de création de sites internet jusqu’au 1er janvier 2025.
            C’est le moment idéal pour booster votre présence en ligne
            avec un site performant, optimisé et spécialement conçu pour
            répondre aux attentes des PME et entreprises.

            Contactez-moi dès aujourd’hui pour transformer vos idées en succès digital !
          </p>
          {/* --Product--*/}
          <ProductsList products={products} />
        </div>

      </section>
      {/* --FAQ--*/}
      <section className="m-4 bg-secondary p-4 rounded ">
        <h2>Foire aux Question</h2>
        <Faq faq={faq} />
        <Link
          href="/Foire-aux-questions"
          className="mx-4"
        >
          Découvrez toutes les réponses à vos questions ici
        </Link>
      </section>
      <section className="m-4 bg-primary ">
        <div className="p-4 text-center">
          <h2>Découvrez Nos Projets Réalisés</h2>
          <p className="mb-4">Nous avons eu le plaisir de travailler sur une variété de projets, allant de la création de sites vitrine à des solutions e-commerce. Explorez ci-dessous quelques-uns des projets que nous avons réalisés pour nos clients.</p>
        </div>
        {/* --Création--*/}
        <Link
          href="/Creations"
          className="hover:text-white "
        >
          <ScrollingTextWrapper accueil={creation} />
          <span className="hover:text-black p-4">Découvrez tous nos projets</span>
        </Link>
      </section>
      <section>
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
