import Image from '@/utils/Image';
import { PostType } from '@/types/post.type';
import fetcher from '@/utils/fetcher';
import HeadComponents from '../components/head/HeadComponents';

interface PostProps {
  post: PostType;
}

export async function getStaticProps() {
  const responsePage = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}posts/agence-web`);

  return {
    props: {
      post: responsePage.post,
    },
  };
}

// == Composant
export default function Page({ post }: PostProps) {
  return (
    <>
      <HeadComponents
        title={post.heading}
        description={post.metaDescription}
        url={post.url}
        image={post.imgPost}
        srcset={post.srcset}
        imgWidth={post.imgWidth}
        imgHeight={post.imgHeight}
      />
      <section className="p-4">
        <figure>
          <Image
            src={post.imgPost}
            alt={post.altImg || post.title}
            width={post.imgWidth}
            height={post.imgHeight}
            srcset={post.srcset}
            priority
          />
          {post.title !== post.altImg && (
          <figcaption>
            {post.altImg}
          </figcaption>
          )}
        </figure>
        <h1>{post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.contents }} />
        <article>
          {post.paragraphPosts.map((paragraphArticle) => (
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
