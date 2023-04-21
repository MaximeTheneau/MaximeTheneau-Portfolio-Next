/* eslint-disable quote-props */
import Head from 'next/head';
import Cards from '../../../components/cards/cards';
import Category from '../../../components/category/category';
import styles from '../../../styles/Pages.module.scss';

export async function getStaticPaths() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts&category=Articles`);
  const posts = await res.json();

  const paths = posts.map((post) => ({ params: { 
    subcategory: post.subcategory.slug,
  } }));

  return { paths , fallback: 'blocking' };
}



export async function getStaticProps({ params }) {
   
  const { subcategory } = params;

  const responseArticles = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts&subcategory=${subcategory}`);
  const articles = await responseArticles.json();

  if (!articles) {
    return {
      notFound: true,
    }
  }

  const responsePage = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts/Subcategory`);
  const page = await responsePage.json();

  return {
    props: {
      articles: articles,
      page: page,
    },
    revalidate: 10,
  };
}

export default function Home({ articles, page }) {
  const descriptionMeta = page.contents.substring(0, 155).replace(/[\r\n]+/gm, '');
  const subcategory = articles[0].subcategory;
  return (
    <>
      <Head>
        <title>{subcategory.name}</title>
        <meta name="description" content={descriptionMeta} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Sous-categories" />
        <meta property="og:description" content={descriptionMeta}/>
        <meta property="og:site_name" content={process.env.NEXT_PUBLIC_URL} />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_CLOUD_URL}/${process.env.NEXT_PUBLIC_CLOUD_FILE_KEY}/Accueil.jpg`} />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_URL}/articles/${subcategory.slug}`}
          key="canonical"
        />
      </Head>
      <>
        <Category category={subcategory} />
        <section>
          <h1>{subcategory.name}</h1>
          <p>{page.contents}</p>
        </section>  
        {/* --Articles--*/}
        <h2>Les derniers articles :</h2>
        <div className={styles.home}>
          <Cards cards={articles} path="articles"  />
        </div>

      </>
    </>
  );
}
