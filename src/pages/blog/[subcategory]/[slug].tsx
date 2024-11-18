import Image from 'next/image';
import ArticleJsonLd from '@/components/jsonLd/ArticleJsonLd';
import Page404 from '@/pages/404';
import Category from '@/components/category/Category';
import HeadComponents from '@/components/head/HeadComponents';
import BreadcrumbJsonLd from '@/components/jsonLd/BreadcrumbJsonLd';
import TableOfContents from '@/components/tableOfContents/TableOfContents';
import fetcher from '@/utils/fetcher';
import { GetStaticPaths, GetStaticProps } from 'next';
import Cards from '@/components/cards/Cards';
import { CardType } from '@/types/card.type';

type Post = {
  slug: string;
  heading: string;
  metaDescription: string;
  image: string;
  url: string;
  altImg?: string;
  title: string;
  formattedDate: string;
  category: string;
  subcategory: { slug: string; name: string; };
  contents: string;
  paragraphPosts: {
    slug: string;
    subtitle: string;
    paragraph: string;
  }[];
};

interface SlugProps {
  post: Post | null;
  relatedPosts: CardType[] ;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}posts&category=blog`);

  const paths = posts.map((post: { subcategory: { slug: any; }; slug: any; }) => ({
    params: {
      subcategory: post.subcategory.slug,
      slug: post.slug,
    },
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<SlugProps> = async ({ params }) => {
  const post = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}posts/${params?.slug}`);
  const relatedPosts = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}posts/relatedPosts/${params?.slug}`);

  return { props: { post, relatedPosts: relatedPosts.relatedPosts } };
};

export default function Slug({ post, relatedPosts }: SlugProps) {
  if (!post) return <Page404 />;
  return (
    <>
      <HeadComponents
        title={post.heading}
        description={post.metaDescription}
        image={post.image}
        url={post.url}
      />
      <ArticleJsonLd post={post} urlPost={post.url} />
      <BreadcrumbJsonLd paragraphPosts={post.paragraphPosts} urlPost={post.url} />
      <article className="m-4">
        <figure>
          <Image
            src={`${post.slug}.webp`}
            alt={post.altImg || post.title}
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
          <span className="text-gray-500">Écrit par Maxime Freelance</span>
        </p>
        <Category
          category={post.subcategory}
          title={post.title}
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
      </article>
      <aside>
        <Cards cards={relatedPosts} />
      </aside>

    </>
  );
}
