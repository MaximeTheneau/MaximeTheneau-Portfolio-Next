import Image from 'next/image';
import ArticleJsonLd from '../../components/jsonLd/ArticleJsonLd';
import Page404 from '../404';
import Category from '../../components/category/Category';
import ImageLoaderFull from '../../utils/ImageLoaderFull';
import HeadComponents from '../../components/head/HeadComponents';
import Button from '../../components/button/Button';
import BreadcrumbJsonLd from '../../components/jsonLd/BreadcrumbJsonLd';
import TableOfContents from '../../components/tableOfContents/TableOfContents';

export async function getStaticPaths() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts&category=blog`);
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
      <BreadcrumbJsonLd paragraphPosts={post.paragraphPosts} urlPost={post.url} />
      <article className="m-4">
        <figure>
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
          <figcaption className="mt-4 text-sm text-gray-400">
            {post.altImg}
          </figcaption>
        </figure>
        <p className="mt-4 text-sm text-gray-400">
          <span className="italic">
            {post.formattedDate}
          </span>
          <span> • </span>
          <span class="text-gray-500">Écrit par Maxime Freelance</span>
        </p>
        <Category
          category={post.category}
          slug={post.slug}
        />
        <h1>{post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.contents }} />
        <TableOfContents post={post} />
        {post.paragraphPosts.map((paragraphPosts) => (
          <div key={paragraphPosts.subtitle}>
            <h2 id={paragraphPosts.slug}>{paragraphPosts.subtitle}</h2>
            <div className="w-responsive" dangerouslySetInnerHTML={{ __html: paragraphPosts.paragraph }} />
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
