import fetcher from '@/utils/fetcher';
import HeadComponents from '../../components/head/HeadComponents';
import Cards from '../../components/cards/Cards';
import CategoryPage from '../../components/category/CategoryPage';

export async function getStaticProps() {
  const articles = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}posts&category=blog`);
  const page = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}posts/blog`);
  const subcategoryList = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}posts&filter=subcategory`);

  return {
    props: {
      articles,
      page,
      subcategoryList,
    },
  };
}

export default function Home({ articles, page, subcategoryList }) {
  return (
    <>
      <HeadComponents
        title={page.heading}
        description={page.metaDescription}
        image={page.image}
        srcset={page.srcset}
        url={page.url}
      />
      <section className="m-4">
        <h1>{page.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: page.contents }} />
        <CategoryPage
          category={false}
          subcategoryPost={page.slug}
          subcategoryList={subcategoryList}
        />
        <Cards cards={articles} path="Creation" />
      </section>
    </>
  );
}
