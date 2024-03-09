import * as React from 'react';
import Link from 'next/link';
import Faq from '../components/faq/Faq';
import ContactForm from '../components/contact/Contact';
import VideoLoader from '../utils/VideoLoader';
import HeadComponents from '../components/head/HeadComponents';
import Button from '../components/button/Button';

export async function getStaticProps() {
  const responseAccueil = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts/Accueil`);
  const accueil = await responseAccueil.json();

  const responseCreation = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts&limit=3&category=Creations`);
  const creation = await responseCreation.json();

  const responseFaq = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts/Foire-aux-questions`);
  const faq = await responseFaq.json();

  return {
    props: {
      accueil,
      creation,
      faq,
    },
  };
}

export default function Home({
  accueil,
  creation,
  faq,
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
        <div className="relative">
          <VideoLoader
            className="w-full sm:h-96 object-cover object-center"
            src={accueil.slug}
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-2/2 w-full text-center bg-whiteOpacity">
            <h1 className="text-title">
              {accueil.title}
            </h1>
            <h2>{accueil.contents}</h2>
          </div>
        </div>
        {/* --About--*/}
        <div className="p-8 w-full flex bg-secondaryLight">
          <div>
            {accueil.paragraphPosts.map((paragraphArticle) => (
              <>
                <h2 key={paragraphArticle.subtitle}>
                  {paragraphArticle.subtitle}
                </h2>
                <ul>
                  {accueil.listPosts.map((listArticle) => (
                    <li
                      key={listArticle.id}
                      className="list-disc list-inside w-responsive text-left p-2"
                    >
                      {listArticle.title}
                    </li>
                  ))}
                </ul>
                <p className="w-responsive">{paragraphArticle.paragraph}</p>
              </>
            ))}
            <Button
              text="Contactez-moi"
              link="/Contact"
              icon="icon-paper-plane"
            />
          </div>
        </div>
      </section>
      <section className="m-2">
        {/* --Création--*/}
        <Link
          href="/Creation"
          className="w-full flex items-center justify-between bg-secondary p-2 text-white mt-4"
        >
          <h2 className="text-lg">Mes projets :</h2>
          <span>
            Voir tous mes projets
          </span>
        </Link>
        <div>
          {creation.map((creations) => (
            <div className="mt-10 ">
              <Link href={`/Creation/${creations.slug}`} key={creations.title}>
                <div className="grid sm:grid-cols-4 sm:gap-4 relative">
                  <div className="col-span-1" />
                  <div className="flex flex-col p-4 sm:col-span-1 bg-secondaryLight min-h-96">
                    <h2 className=" text-lg">{creations.title}</h2>
                    <p>{creations.contents}</p>
                    <span className="font-bold  hover:underline transition-all  duration-300">
                      En savoir plus
                      {' '}
                      <i className="icon-angle-right text-base" />
                    </span>

                  </div>
                  <div className="order-first sm:order-last sm:col-span-1 sm:-translate-x-12 sm:translate-y-4">
                    <VideoLoader
                      src={creations.slug}
                    />
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        {/* --FAQ--*/}
        <div>
          <Link
            href={faq.slug}
            className="w-full flex items-center justify-between bg-secondary p-2 text-white mt-4"
          >
            <h2>{faq.title}</h2>
          </Link>
          <Faq faq={faq} />
        </div>
      </section>
      {/* --Contact--*/}
      <div className="w-100 bg-secondaryLight p-4">
        <ContactForm />
      </div>
    </>
  );
}
