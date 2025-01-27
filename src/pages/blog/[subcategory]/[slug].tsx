import ArticleJsonLd from '@/components/jsonLd/ArticleJsonLd';
import Page404 from '@/pages/404';
import Category from '@/components/category/Category';
import ImageObjectJsonLd from '@/components/jsonLd/ImageObjectJsonLd';
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
import Link from 'next/link';
import RecentArticles from '@/components/ui/RecentArticles';

interface SlugProps {
  post: PostType | null;
  relatedPosts: CardType[] ;
  latestPosts: any;
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

  return {
    props: {
      post: post.post,
      latestPosts: post.latestPosts,
      relatedPosts: post.relatedPosts,
    },
  };
};

export default function Slug({ post, latestPosts, relatedPosts }: SlugProps) {
  // useEffect(() => {
  //   createGoogleAdsenseScript();
  // }, []);

  if (!post) return <Page404 />;
  return (
    <>
      <HeadComponents
        title={post.heading}
        description={post.metaDescription}
        image={post.imgPost}
        srcset={post.srcset}
        url={post.url}
      />
      <ImageObjectJsonLd post={post} />
      <ArticleJsonLd post={post} urlPost={post.url} />
      <BreadcrumbJsonLd paragraphPosts={post.paragraphPosts} urlPost={`${process.env.NEXT_PUBLIC_URL}${post.url}`} />
      <div className="flex flex-wrap justify-center">

        <article className="w-full md:w-3/4 px-4">
          <figure>
            <Image
              src={post.imgPost}
              alt={post.altImg || post.title}
              width={post.imgWidth}
              height={post.imgHeight}
              srcset={post.srcset}
              priority
            />
            <figcaption>
              {post.altImg}
            </figcaption>
          </figure>
          <p className=" py-2 text-sm">
            {post.formattedDate}
            {' '}
            - Par
            {' '}
            <Link href="/A-propos">
              Maxime Freelance
            </Link>
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
        <aside className="w-full md:w-1/4 bg-secondary p-4">
          <h2 className="text-xl font-bold mb-4">Articles récents :</h2>
          <RecentArticles articles={latestPosts} />
          <h2 className="text-xl font-bold mb-4">Liens utiles :</h2>
          <Link href="/blog" className="block">
            Blog
          </Link>
          <Link href="/A-propos" className="block">
            A propos
          </Link>
          <Link href="/contact" className="block">
            Contact
          </Link>
        </aside>
      </div>

      <aside>
        <h2>Articles similaires :</h2>
        <Cards cards={relatedPosts} />
      </aside>
    </>
  );
}
