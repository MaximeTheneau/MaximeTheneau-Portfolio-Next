/* eslint-disable quote-props */
import Head from 'next/head';
import Link from 'next/link';
import Cards from '../../components/cards/cards';
import Category from '../../components/category/category';
import styles from '../Pages.module.scss';
import stylesNav from '../../components/category/Category.module.scss';

export async function getStaticProps() {
//  const responseArticles = await fetch('https://back.unetaupechezvous.fr/public/api/articles/all');
  const responseArticles = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts&category=Articles`);

  const articles = await responseArticles.json();

  const responseSubcategory = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts&filter=subcategory`);

  const subcategory = await responseSubcategory.json();
  return {
    props: {
      articles,
      subcategory,
    },
  };
}

export default function Home({ articles, subcategory }) {
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
        <title>Articles</title>
        <meta name="description" content="Articles : Taupes - Fouines - Ragondins - Pièges -  " />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Derniers articles et conseils d'Une Taupe Chez Vous" />
        <meta property="og:description" content="Retrouvez les derniers articles d'Une Taupe Chez Vous" />
        <meta property="og:site_name" content="Une Taupe Chez Vous" />
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_URL}/articles`} />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_CLOUD_URL}/${process.env.NEXT_PUBLIC_CLOUD_FILE_KEY}/Accueil.jpg`} />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_URL}/articles`}
          key="canonical"
        />
      </Head>
      <>
        <Category category={null} />

        <section>
          <h1>Articles </h1>
          <p>
            Découvrez tout ce que vous devez savoir sur les taupes, les fouines et les ragondins,
            ainsi que les différents types de pièges disponibles pour les capturer. Apprenez à
            identifier ces animaux et à utiliser les pièges de manière efficace pour les éloigner
            de votre propriété. Consultez nos conseils d&apos;experts pour protéger votre jardin et
            votre maison des dégâts causés par ces animaux nuisible.
          </p>
        </section>
        {/* --Articles--*/}
        <h2>Les derniers articles :</h2>
        <nav>
          <ul className={stylesNav.category}>
            {subcategory.map((subcategory) => (
              <li className="button" key={subcategory.name}>
                <Link href={`articles/${subcategory.slug}`}>
                  {subcategory.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className={styles.home}>
          <Cards cards={articles} path="articles" />
        </div>

      </>
    </>
  );
}
