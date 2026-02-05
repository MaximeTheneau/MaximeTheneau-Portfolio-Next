import Image from '@/utils/Image';
import { PostType } from '@/types/post.type';
import GoogleMaps from '@/components/maps/GoogleMaps';
import HeadComponents from '../components/head/HeadComponents';

interface PostProps {
  post: PostType;
}

export async function getStaticProps() {
  const responsePage = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts/A-propos`);
  const post = await responsePage.json();

  return {
    props: {
      post: post.post,
    },
  };
}

// == Composant
export default function APropos({ post }: PostProps) {
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
        <Image
          src={post.imgPost}
          alt={post.altImg || post.title}
          width={post.imgWidth}
          height={post.imgHeight}
          srcset={post.srcset}
          priority
        />
        <h1>{post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.contents }} />
        <GoogleMaps />
        <article>
          {post.paragraphPosts?.map((paragraphArticle) => (
            <div key={paragraphArticle.subtitle}>
              <h2>
                {paragraphArticle.subtitle}
              </h2>
              <div className="w-responsive list" dangerouslySetInnerHTML={{ __html: paragraphArticle.paragraph }} />
            </div>
          ))}
        </article>
      </section>
    </>
  );
}
