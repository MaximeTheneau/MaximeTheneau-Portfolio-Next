import HeadComponents from '../../components/head/HeadComponents';
import Cards from '../../components/cards/Cards';

export async function getStaticProps() {
  const responseArticles = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts&category=Creations`);
  const responsePage = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts/Creations`);

  const articles = await responseArticles.json();
  const page = await responsePage.json();

  return {
    props: {
      articles,
      page: page.post,
    },
  };
}

export default function Home({ articles, page }) {
  return (
    <>
      <HeadComponents
        title={page.heading}
        description={page.metaDescription}
        image={page.imgPost}
        srcset={page.srcset}
        url={page.url}
      />
      <section className="m-4">
        <h1>{page.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: page.contents }} />
        <Cards cards={articles} path="Creation" />
      </section>
    </>
  );
}
