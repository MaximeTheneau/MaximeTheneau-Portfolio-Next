import HeadComponents from '../components/head/HeadComponents';

type Page = {
  title: string;
  contents: string;
  slug: string;
  url: string;
  heading: string;
  metaDescription: string;
  altImg?: string;
  subtitle: string;
  paragraphPosts: {
    subtitle: string;
    paragraph: string;
  }[];
};

type MentionsLegalProps = {
  page: Page;
};

export async function getStaticProps() {
  const responsePage = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts/Mentions-Legales`);
  const page = await responsePage.json();

  return {
    props: {
      page,
    },
  };
}

// == Composant
export default function MentionsLegal({ page }: MentionsLegalProps) {
  return (
    <>
      <HeadComponents
        title={page.heading}
        description={page.metaDescription}
        url={page.url}
        image={page.slug}
      />
      <section className="p-4">
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
            <div className="w-responsive" dangerouslySetInnerHTML={{ __html: paragraphArticle.paragraph }} />
          </>
        ))}
      </section>
    </>
  );
}
