import * as React from 'react';
import Link from 'next/link';
import Faq from '../components/faq/Faq';
import ContactForm from '../components/contact/Contact';
import VideoLoader from '../utils/VideoLoader';
import HeadComponents from '../components/head/HeadComponents';
import Button from '../components/button/Button';
import LogoJsonLd from '../components/jsonLd/LogoJsonLd';
import Person from '../components/jsonLd/PersonJsonLd';

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
  return (
    <>
      <HeadComponents
        title={accueil.title}
        descriptionMeta={process.env.NEXT_PUBLIC_DESCRIPTION}
        url=""
        image="Accueil"
      />
      <Person />
      <LogoJsonLd
        name="Theneau Maxime"
        url={process.env.NEXT_PUBLIC_URL}
        logoUrl={`${process.env.NEXT_PUBLIC_CLOUD_URL}/${process.env.NEXT_PUBLIC_CLOUD_FILE_KEY}/theneau-maxime.png`}
      />
      <section>
        <div className="relative">
          <VideoLoader
            className="w-full sm:h-96 object-cover object-center"
            src={accueil.slug}
          />
          <div className="absolute dark:text-black top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-2/2 w-full text-center bg-whiteOpacity">
            <h1 className="text-title ">
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
          className="w-ful relative"
        >
          <div className="w-full flex items-center justify-between p-2 mt-4 z-10">
            <h2>Mes projets :</h2>
            <span>
              Voir tous mes projets
            </span>
          </div>
          <VideoLoader
            className="w-full  object-cover top-0  absolute h-full -z-10 opacity-25"
            src={accueil.slug}
          />
        </Link>
      </section>
      <section>
        {creation.map((creations) => (
          <div className="mt-10 ">
            <Link href={`/Creation/${creations.slug}`} key={creations.title}>
              <div className="grid sm:grid-cols-4 sm:gap-4 relative">
                <div className="col-span-1" />
                <div className="flex flex-col sm:pr-10 pl-2 sm:col-span-1 bg-secondaryLight min-h-96">
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
      </section>
      {/* --FAQ--*/}
      <section>
        <Link
          href="/Foire-aux-questions"
          className="w-ful relative "
        >
          <div className="w-full flex items-center justify-between p-2 mt-4 z-10 m-2">
            <h2>Foire aux Question</h2>
          </div>
          <VideoLoader
            className="w-full  object-cover top-0  absolute h-full -z-10 opacity-25"
            src={accueil.slug}
          />
        </Link>
        <Faq faq={faq} />
        <ContactForm />
      </section>
    </>
  );
}
