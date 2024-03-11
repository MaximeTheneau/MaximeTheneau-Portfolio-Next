/* eslint-disable quote-props */
import Head from 'next/head';
import Cards from '../../components/cards/Cards';

export async function getStaticProps() {
  const responseArticles = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts&category=Creations`);

  const articles = await responseArticles.json();

  const responsePage = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts/Interventions`);
  const page = await responsePage.json();

  return {
    props: {
      articles,
      page,
    },
  };
}

export default function Home({ articles, page }) {
  return (
    <>
      <Head>
        <title>{page.title}</title>
        <meta name="description" content="Services : Taupes - Fouines - Ragondins " />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Services de capture et d&apos;aposextermination de taupes, fouines et ragondins. Protégez votre propriété contre les dégâts causés par ces animaux nuisibles." />
        <meta property="og:description" content="Services de capture et d&apos;aposextermination de taupes, fouines et ragondins. Protégez votre propriété contre les dégâts causés par ces animaux nuisibles." />
        <meta property="og:site_name" content={process.env.NEXT_PUBLIC_URL} />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_CLOUD_URL}/${process.env.NEXT_PUBLIC_CLOUD_FILE_KEY}/Accueil.jpg`} />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_URL}/${page.slug}`}
          key="canonical"
        />
      </Head>
      <>
        <section>
          <h1>{page.title}</h1>
          <p>
            {page.contents}
          </p>
        </section>
        {/* --Articles--*/}
        <h2>Mes projets :</h2>
        <div>
          <Cards cards={articles} path="Creation" />
        </div>

      </>
    </>
  );
}
