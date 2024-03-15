import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
        title={accueil.heading}
        description={accueil.metaDescription}
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
          <div className="absolute  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-2/2 w-full text-center bg-whiteOpacity">
            <h1 className="text-title  dark:text-[#17181d]">
              {accueil.title}
              <span className="block text-lg">{accueil.contents}</span>
            </h1>
          </div>
        </div>
        {/* --About--*/}
        <div className="p-8 w-full flex">
          <div>
            {accueil.paragraphPosts.map((paragraphArticle) => (
              <div key={paragraphArticle.subtitle}>
                <h2>
                  {paragraphArticle.subtitle}
                </h2>
                {/* <ul>
                  {accueil.listPosts.map((listArticle) => (
                    <li
                      key={listArticle.id}
                      className="list-disc list-inside w-responsive text-left p-2"
                    >
                      {listArticle.title}
                    </li>
                  ))}
                </ul> */}
                <p className="w-responsive">{paragraphArticle.paragraph}</p>
              </div>
            ))}
            <Button
              text="Contactez-moi"
              link="/Contact"
              icon="icon-paper-plane"
            />
          </div>
        </div>
      </section>
      <section className="m-4 bg-secondaryLight">
        {/* --Création--*/}
        <Link
          href="/Creation"
          className="w-ful relative text-white"
        >
          <div className="w-full flex items-center justify-between p-2 mt-4 bg-secondary rounded">
            <h2>Mes projets :</h2>
            <span>
              Voir tous mes projets
            </span>
          </div>
        </Link>
        {creation.map((creations) => (
          <div className="mt-10" key={creations.title}>
            <Link href={`/Creation/${creations.slug}`}>
              <div className="grid sm:grid-cols-4 sm:gap-4 relative">
                <div className="sm:col-span-2 sm:col-span-2">
                  <div className="flex flex-col rounded sm:pr-10 pl-2 bg-secondary text-white min-h-96 p-4">
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
      {/* --FAQ--*/}
      <section className="m-4 ">
        <Link
          href="/Foire-aux-questions"
          className="text-white"
        >
          <div className="w-full flex items-center justify-between p-2 mt-4 m-2 bg-secondary rounded">
            <h2>Foire aux Question</h2>
          </div>
        </Link>
        <Faq faq={faq} />
        <ContactForm />
      </section>
    </>
  );
}
