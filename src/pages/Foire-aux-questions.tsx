import Image from 'next/image';
import Faq from '../components/faq/Faq';
import HeadComponents from '../components/head/HeadComponents';
import FaqJsonLd from '../components/jsonLd/FaqJsonLd';

type ParagraphArticle = {
  id: number;
  subtitle: string;
  paragraph: string;
  imgPostParagh: string;
};

type ListPost = {
  id: number;
  open: boolean;
  title: string;
  description: string;
};

type Post = {
  title: string;
  heading: string;
  metaDescription: string;
  contents: string;
  url: string;
  slug: string;
  paragraphPosts: ParagraphArticle[];
  listPosts: ListPost[];
};

type SlugProps = {
  post: Post;
};

export async function getStaticProps() {
  const responseContact = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts/Foire-aux-questions`);
  const post = await responseContact.json();

  return {
    props: {
      post,
    },
  };
}

export default function Slug({ post }: SlugProps) {
  return (
    <>
      <HeadComponents
        title={post.heading}
        description={post.metaDescription}
        url={post.url}
        image={post.slug}
      />
      <FaqJsonLd listPosts={post.listPosts} />
      <div>
        <div>
          <h1>{post.title}</h1>
          <p>{post.contents}</p>
          <Faq faq={{ listPosts: post.listPosts }} />
          {post.paragraphPosts.map((paragraphArticle) => (
            <>
              {paragraphArticle.subtitle && (
                <h2 key={paragraphArticle.id}>{paragraphArticle.subtitle}</h2>
              )}
              {paragraphArticle.paragraph && (
                <p key={paragraphArticle.id}>
                  {paragraphArticle.imgPostParagh && (
                    <Image
                      src={`${paragraphArticle.imgPostParagh}.webp`}
                      alt={paragraphArticle.subtitle}
                      quality={100}
                      width="1080"
                      height="720"
                      sizes="(max-width: 768px) 100vw,
                        (max-width: 1200px) 50vw,
                        33vw"
                    />
                  )}
                  {paragraphArticle.paragraph}

                </p>
              )}
            </>
          ))}
        </div>
      </div>
      <div />
    </>
  );
}
