import Image from '@/utils/Image';
import { PostType } from '@/types/post.type';
import HeadComponents from '../components/head/HeadComponents';

interface PostProps {
  post: PostType;
}

export async function getStaticProps() {
  const responsePage = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts/agence-web`);
  const post = await responsePage.json();

  return {
    props: {
      post,
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
        image={post.slug}
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
