import ArticleJsonLd from '@/components/jsonLd/ArticleJsonLd';
import Page404 from '@/pages/404';
import Category from '@/components/category/Category';
import HeadComponents from '@/components/head/HeadComponents';
import BreadcrumbJsonLd from '@/components/jsonLd/BreadcrumbJsonLd';
import TableOfContents from '@/components/tableOfContents/TableOfContents';
import Comments from '@/components/comments/Comments';
import fetcher from '@/utils/fetcher';
import { GetStaticPaths, GetStaticProps } from 'next';
import Cards from '@/components/cards/Cards';
import { CardType } from '@/types/card.type';
import { PostType } from '@/types/post.type';
import Image from '@/utils/Image';

interface SlugProps {
  post: PostType | null;
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
  const relatedPosts = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}posts/related/${params?.slug}`);

  return { props: { post, relatedPosts } };
};

export default function Slug({ post, relatedPosts }: SlugProps) {
  // useEffect(() => {
  //   createGoogleAdsenseScript();
  // }, []);

  if (!post) return <Page404 />;
  return (
    <>
      <HeadComponents
        title={post.heading}
        description={post.metaDescription}
        image={post.slug}
        url={post.url}
      />

      <ArticleJsonLd post={post} urlPost={post.url} />
      <BreadcrumbJsonLd paragraphPosts={post.paragraphPosts} urlPost={`${process.env.NEXT_PUBLIC_URL}${post.url}`} />
      <article className="m-4">
        <figure>
          <Image
            src={`${post.imgPost}`}
            alt={post.altImg || post.title}
            width={post.imgWidth}
            height={post.imgHeight}
            srcset={post.srcset}
            priority
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
        <Comments posts={post} />
      </article>
      <aside>
        <Cards cards={relatedPosts} />
      </aside>
    </>
  );
}
