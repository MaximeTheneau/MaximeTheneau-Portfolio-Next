import Image from '@/utils/Image';
import ArticleJsonLd from '../../components/jsonLd/ArticleJsonLd';
import Page404 from '../404';
import HeadComponents from '../../components/head/HeadComponents';
import Button from '../../components/button/Button';

export async function getStaticPaths() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts&category=Creations`);
  const posts = await res.json();

  const paths = posts.map((post) => ({ params: { slug: post.slug } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts/${params.slug}`);
  const post = await res.json();

  return { props: { post: post.post } };
}

export default function Slug({ post }) {
  if (!post) return <Page404 />;
  return (
    <>
      <HeadComponents
        title={post.heading}
        description={post.metaDescription}
        image={post.imgPost}
        srcset={post.srcset}
        url={post.url}
        imgWidth={post.imgWidth}
        imgHeight={post.imgHeight}
      />
      <ArticleJsonLd post={post} />
      <article className="m-4">
        <Image
          src={`${post.imgPost}?format=webp&quality=50`}
          alt={post.altImg || post.title}
          width={post.imgWidth}
          height={post.imgHeight}
          srcset={post.srcset}
          priority
        />

        <h1>{post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.contents }} />
        {post.paragraphPosts.map((paragraphPosts) => (
          <div key={paragraphPosts.subtitle}>
            <h2>{paragraphPosts.subtitle}</h2>
            <div className="w-responsive list" dangerouslySetInnerHTML={{ __html: paragraphPosts.paragraph }} />
          </div>
        ))}
        <div>
          {post.github && (
            <Button
              text="Dépôt GitHub"
              link={post.github}
              icon="icon-github"
            />
          )}
          {post.website && (
            <Button
              text="Site web"
              link={post.website}
              icon="icon-paper-plane"
            />
          )}
        </div>
      </article>
    </>
  );
}
