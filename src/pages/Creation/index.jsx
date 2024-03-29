import HeadComponents from '../../components/head/HeadComponents';
import Cards from '../../components/cards/Cards';

export async function getStaticProps() {
  const responseArticles = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts&category=Creations`);
  const responsePage = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts/Creation`);

  const articles = await responseArticles.json();
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
      <HeadComponents
        title={page.heading}
        description={page.metaDescription}
        image={page.image}
        url={page.url}
      />
      <section className="m-4">
        <h1>{page.title}</h1>
        <p>
          {page.contents}
        </p>
        <Cards cards={articles} path="Creation" />
      </section>
    </>
  );
}
