/* eslint-disable quote-props */
import Head from 'next/head';
import Cards from '../../components/cards/Cards';
import styles from '../../styles/Pages.module.scss';


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
//   const descriptionMeta = articles.contents.substring(0, 155).replace(/[\r\n]+/gm, '');
//   const jsonData = { 
//     context: 'https://schema.org',
//     type: 'Service',
//     name: 'Une taupe chez vous',
//     url: `${process.env.NEXT_PUBLIC_URL}`,
//     description: `${descriptionMeta}`,
//     category: 'Articles, Taupiers, Destruction de taupes, Taupes',
//     image: `${process.env.NEXT_PUBLIC_CLOUD_URL}/${process.env.NEXT_PUBLIC_CLOUD_FILE_KEY}/Accueil.jpg`,
//     termsOfService: `${process.env.NEXT_PUBLIC_URL}/page/mentions-legales`,
//     sameA: [
//       'https://www.facebook.com/Une-Taupe-Chez-Vous',
//       'https://www.linkedin.com/company/unetaupechezvous/',
//     ],
//   };
  return (
    <>
      <Head>
        <title>{page.title}</title>
        <meta name="description" content="Services : Taupes - Fouines - Ragondins " />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Services de capture et d&apos;aposextermination de taupes, fouines et ragondins. Protégez votre propriété contre les dégâts causés par ces animaux nuisibles." />
        <meta property="og:description" content="Services de capture et d&apos;aposextermination de taupes, fouines et ragondins. Protégez votre propriété contre les dégâts causés par ces animaux nuisibles."/>
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
        <div className={styles.home}>
          <Cards cards={articles} path="Creation" />
        </div>

      </>
    </>
  );
}
