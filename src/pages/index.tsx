import Link from 'next/link';
import dynamic from 'next/dynamic';
import Image from '@/utils/Image';
import fetcher from '@/utils/fetcher';
// import AtoutsList from '@/components/ui/AtoutsList';

import ScrollReveal from '@/hooks/useScrollReveal';
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
  const CalendarBooking = dynamic(() => import('@/components/ui/CalendarBooking'), {
    ssr: false,
  });

  return (
    <>
      <HeadComponents
        title={accueil.heading}
        description={accueil.metaDescription}
        url=""
        image={accueil.imgPost}
        srcset={accueil.srcset}
        imgWidth={accueil.imgWidth}
        imgHeight={accueil.imgHeight}
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
        {/* Hero Section 2026 Design */}
        <div className="relative overflow-hidden">
          {/* Container avec padding pour effet Bento */}
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
            <div className="group relative rounded-3xl overflow-hidden shadow-2xl shadow-black/20">
              {/* Image avec effet zoom au hover */}
              <div className="relative aspect-[16/9] sm:aspect-[21/9] overflow-hidden">
                <Image
                  className="object-cover object-center w-full h-full transition-transform duration-700 group-hover:scale-105"
                  src={accueil.imgPost}
                  alt={accueil.altImg || accueil.title}
                  width={accueil.imgWidth}
                  height={accueil.imgHeight}
                  srcset={accueil.srcset}
                  sizes="100vw"
                  priority
                />

              </div>

              {/* Contenu avec glassmorphism */}
              <div className="absolute inset-x-0 bottom-0 ">
                <div className="relative">
                  {/* Badge décoratif */}
                  <div className="inline-flex items-center gap-2 px-3 mb-4  bg-white/10 backdrop-blur-md">
                    {/* Titre principal */}
                    <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4 drop-shadow-lg">
                      {accueil.title}
                    </h1>
                  </div>


                  {/* Ligne décorative animée */}
                  <div className="flex items-center gap-3">
                    <div className="h-1 w-12 sm:w-20 bg-gradient-to-r from-primary to-secondary rounded-full" />
                    <div className="h-1 w-6 sm:w-10 bg-white/30 rounded-full" />
                    <div className="h-1 w-3 sm:w-5 bg-white/20 rounded-full" />
                  </div>
                </div>
              </div>

              {/* Éléments décoratifs flottants */}
              <div className="absolute top-4 right-4 sm:top-8 sm:right-8 flex flex-col gap-2">
                <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-primary/80 backdrop-blur-sm animate-bounce" style={{ animationDelay: '0s' }} />
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-secondary/80 backdrop-blur-sm animate-bounce" style={{ animationDelay: '0.2s' }} />
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white/60 backdrop-blur-sm animate-bounce" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          </div>

          {/* Effet de lumière ambiante */}
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/20 rounded-full blur-3xl pointer-events-none" />
        </div>
        <article
          className="p-4 text-center  "
        >
          <div className="p-4 text-center mx-auto max-w-[1080px]" dangerouslySetInnerHTML={{ __html: accueil.contents }} />
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <a href="#calendar" className="btn btn-primary flex">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Prendre rendez-vous
            </a>
            <a href="/devis-en-ligne" className="btn btn-secondary">
              Devis gratuit
            </a>
          </div>
        </article>
        <CalendarBooking />

        {/* --Skills--*/}
        <div className="my-4 bg-primary py-8 px-4 text-center">
          <ScrollReveal variant="fade-up">
            <h2 className="">
              Maxime Freelance - Développeur web freelance à Marseille
            </h2>
            <p>
              Spécialisé en Front-End (React.js, Next.js) et Back-End (Symfony, PHP),
              j'accompagne les entreprises dans la création de sites modernes et
              performants. Basé à Marseille, je propose des solutions sur-mesure,
              optimisées pour le SEO et la performance.
            </p>
          </ScrollReveal>
          <ScrollingTextWrapper accueil={skills} />
          <Link
            href="/A-propos"
            className="btn"
          >
            Tout savoir sur mon parcours et mes compétences
          </Link>
        </div>

        {/* --Atouts--*/}
        {/* <div className="bg-primary">
          <AtoutsList />
        </div> */}
        {/* --Création--*/}
        <div className="p-4 text-center bg-secondary">
          <ScrollReveal variant="fade-up">
            <h2>Réalisations</h2>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" delay={150}>
            <Cards cards={creation} />
          </ScrollReveal>
          <Link
            href="/Creations"
            className="btn md:w-1/2"
          >
            Découvrez tous mes projets
          </Link>
        </div>

        {/* --About--*/}
        <div className="px-8 pt-4 w-full flex justify-center">
          <div>
            {accueil.paragraphPosts.map((paragraphArticle:
            { subtitle: string; paragraph: any; }, index: number) => (
              <ScrollReveal key={paragraphArticle.subtitle} variant="fade-up" delay={index * 100}>
                <div id={paragraphArticle.subtitle}>
                  <h2>
                    {paragraphArticle.subtitle}
                  </h2>
                  <div className="w-responsive list" dangerouslySetInnerHTML={{ __html: paragraphArticle.paragraph }} />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
        {/* --Product--*/}
        {/* <div className="bg-primary pt-8 pb-4 text-center ">
          <ProductsList products={products} />
        </div> */}

        {/* --FAQ--*/}
        <div className="m-4 bg-secondary p-4 rounded ">
          <ScrollReveal variant="fade-up">
            <h2>Foire aux Question</h2>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" delay={100}>
            <Faq faq={faq} />
          </ScrollReveal>
          <Link
            href="/Foire-aux-questions"
            className="btn"
          >
            Découvrez toutes les réponses à vos questions ici
          </Link>
        </div>
        <div className="m-4 ">
          <ScrollReveal variant="fade-up">
            <h2>Demande de devis pour la créations de devis en ligne </h2>
            <p>
              Si vous souhaitez obtenir un devis personnalisé pour la création de votre site web,
              n&apos;hésitez pas à nous contacter.
              Nous serons ravis de vous aider à réaliser votre projet en ligne.
            </p>
          </ScrollReveal>
          <Link
            href="/devis-en-ligne"
            className="btn"
          >
            Demander un devis gratuit
          </Link>
        </div>
      </section>
    </>
  );
}
