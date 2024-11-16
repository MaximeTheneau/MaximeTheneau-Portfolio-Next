import HeadComponents from '@/components/head/HeadComponents';
import Cards from '@/components/cards/Cards';
import fetcher from '@/utils/fetcher';
import CategoryPage from '@/components/category/CategoryPage';

export async function getStaticPaths() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts&category=blog`);
  const posts = await res.json();

  const paths = posts.map((post) => ({
    params: {
      subcategory: post.subcategory.slug,
    },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const { subcategory } = params;

  const articles = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}posts&subcategory=${subcategory}`);
  const page = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}posts/${subcategory}`);
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
        {/* <div dangerouslySetInnerHTML={{ __html: page.contents }} /> */}
        <Cards cards={articles} path="blog" />
      </section>
    </>
  );
}
