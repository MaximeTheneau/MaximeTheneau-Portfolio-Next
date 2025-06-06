import { PostType } from '@/types/post.type';
import BreadcrumbJsonLd from '@/components/jsonLd/BreadcrumbJsonLd';
import PersonJsonLd from '@/components/jsonLd/PersonJsonLd';
import fetcher from '@/utils/fetcher';
import HeadComponents from '../components/head/HeadComponents';

type MentionsLegalProps = {
  page: PostType;
};

export async function getStaticProps() {
  const responsePage = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}posts/Mentions-Legales`);

  return {
    props: {
      page: responsePage.post,
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
        srcset={page.srcset}
        image={page.imgPost}
      />
      <PersonJsonLd />
      <BreadcrumbJsonLd paragraphPosts={page.paragraphPosts} urlPost={`${process.env.NEXT_PUBLIC_URL}${page.url}`} />
      <section className="p-4">
        <h1>{page.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: page.contents }} />

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
