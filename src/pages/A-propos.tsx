import styles from '../styles/Pages.module.scss';
import HeadComponents from '../components/head/HeadComponents';

type Page = {
  title: string;
  contents: string;
  slug: string;
  altImg?: string;
  subtitle: string;
  paragraphPosts: {
    subtitle: string;
    paragraph: string;
  }[];
};

type PagesProps = {
  page: Page;
};

export async function getStaticProps() {
  const responsePage = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts/A-propos`);
  const page = await responsePage.json();

  return {
    props: {
      page,
    },
  };
}

// == Composant
export default function APropos({ page }: PagesProps) {
  return (
    <>
      <HeadComponents
        title={page.title}
        descriptionMeta={page.contents}
        url={page.slug}
        image={page.slug}
        addProduct={false}
      />

      <section>
        <h1>{page.title}</h1>
        <h2>{page.subtitle}</h2>
        <p>
          {page.contents}
        </p>
        {page.paragraphPosts.map((paragraphArticle) => (
          <>
            <h2 key={paragraphArticle.subtitle}>
              {paragraphArticle.subtitle}
            </h2>
            <p>{paragraphArticle.paragraph}</p>
          </>
        ))}
      </section>
    </>
  );
}
