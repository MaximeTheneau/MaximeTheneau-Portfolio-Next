import Image from 'next/image';
import Link from 'next/link';
import ArticleJsonLd from '../../components/jsonLd/ArticleJsonLd';
import Page404 from '../404';
import ImageLoaderFull from '../../utils/ImageLoaderFull';
import HeadComponents from '../../components/head/HeadComponents';

export async function getStaticPaths() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts&category=Creations`);
  const posts = await res.json();

  const paths = posts.map((post) => ({ params: { slug: post.slug } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts/${params.slug}`);
  const post = await res.json();

  return { props: { post } };
}

export default function Slug({ post }) {
  if (!post) return <Page404 />;

  return (
    <>
      <HeadComponents
        title={post.heading}
        description={post.metaDescription}
        image={post.image}
        url={post.url}
      />
      <ArticleJsonLd post={post} />
      <div>
        <div>

          <Image
            src={`${post.slug}.webp`}
            alt={post.altImg || post.title}
            loader={ImageLoaderFull}
            quality={100}
            width="1080"
            height="720"
            sizes="(max-width: 768px) 100vw,
            (max-width: 1200px) 50vw,
            33vw"
          />
        </div>
        <div>
          <h1>{post.title}</h1>
          <p>{post.contents}</p>
          {post.paragraphPosts.map((paragraphPosts) => (
            <>
              <h2>{paragraphPosts.subtitle}</h2>
              <p>{paragraphPosts.paragraph}</p>
            </>
          ))}
          <div>
            {post.github && (
            <Link href={post.github}>
              Github
              <i className="icon-github" />
            </Link>
            )}
            {post.website && (
            <Link href={post.website}>
              Website
              <i className="icon-scroll" />
            </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
