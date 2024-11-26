import Image from 'next/image';
import HeadComponents from '../components/head/HeadComponents';
import ImageLoaderFull from '../utils/ImageLoaderFull';

type Page = {
  title: string;
  contents: string;
  slug: string;
  heading: string;
  metaDescription: string;
  altImg?: string;
  subtitle: string;
  url: string;
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
        title={page.heading}
        description={page.metaDescription}
        url={page.url}
        image={page.slug}
      />
      <section className="p-4">
        <Image
          src={`${page.slug}.webp`}
          alt={page.altImg || page.title}
          quality={80}
          width="656"
          height="656"
          sizes="(max-width: 768px) 100vw,
            (max-width: 1200px) 50vw,
            33vw"
          priority
        />
        <h1>{page.title}</h1>
        <h2>{page.subtitle}</h2>
        <div dangerouslySetInnerHTML={{ __html: page.contents }} />
        <article>
          {page.paragraphPosts.map((paragraphArticle) => (
            <div key={paragraphArticle.subtitle}>
              <h2>
                {paragraphArticle.subtitle}
              </h2>
              <div className="w-responsive" dangerouslySetInnerHTML={{ __html: paragraphArticle.paragraph }} />
            </div>
          ))}
        </article>
      </section>
    </>
  );
}
