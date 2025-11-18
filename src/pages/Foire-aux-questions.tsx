import { PostType } from '@/types/post.type';
import fetcher from '@/utils/fetcher';
import Faq from '../components/faq/Faq';
import HeadComponents from '../components/head/HeadComponents';
import FaqJsonLd from '../components/jsonLd/FaqJsonLd';

type SlugProps = {
  post: PostType;
};

export async function getStaticProps() {
  const post = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}posts/Foire-aux-questions`);

  return {
    props: {
      post: post.post,
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
        image={post.imgPost}
        imgWidth={post.imgWidth}
        imgHeight={post.imgHeight}
      />
      <FaqJsonLd listPosts={post.listPosts} />
      <section className="p-4">
        <div>
          <h1>{post.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: post.contents }} />
          <Faq faq={post.listPosts} />
          {post.paragraphPosts.map((paragraphArticle) => (
            <>
              {paragraphArticle.subtitle && (
                <h2 key={paragraphArticle.id}>{paragraphArticle.subtitle}</h2>
              )}
              {paragraphArticle.paragraph && (
                <p key={paragraphArticle.id}>
                  {paragraphArticle.paragraph}
                </p>
              )}
            </>
          ))}
        </div>
      </section>
    </>
  );
}
