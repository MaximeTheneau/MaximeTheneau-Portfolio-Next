import Image from 'next/image';
import styles from '../styles/Pages.module.scss';
import Faq from '../components/faq/Faq';
import HeadComponents from '../components/head/HeadComponents';

type ParagraphArticle = {
  id: number;
  subtitle: string;
  paragraph: string;
  imgPostParagh: string;
};

type ListPost = {
  id: number;
  open: boolean;
  title: string;
  description: string;
};

type Post = {
  title: string;
  contents: string;
  slug: string;
  paragraphPosts: ParagraphArticle[];
  listPosts: ListPost[];
};

type SlugProps = {
  post: Post;
};

export async function getStaticProps() {
  const responseContact = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts/Foire-aux-questions`);
  const post = await responseContact.json();

  return {
    props: {
      post,
    },
  };
}

export default function Slug({ post }: SlugProps) {
  const descriptionMeta = post.contents === null
    ? `Articles de blog ${post.title}`
    : post.contents.substring(0, 165).replace(/[\r\n]+/gm, '');

  return (
    <>
      <HeadComponents
        title={post.title}
        descriptionMeta={descriptionMeta}
        url={post.slug}
        image={post.slug}
        addProduct={false}
      />
      <div className={styles.page}>
        <div className={styles.page__contents}>
          <h1>{post.title}</h1>
          <p>{post.contents}</p>
          <Faq faq={{ listPosts: post.listPosts }} />
          {post.paragraphPosts.map((paragraphArticle) => (
            <>
              {paragraphArticle.subtitle && (
                <h2 key={paragraphArticle.id}>{paragraphArticle.subtitle}</h2>
              )}
              {paragraphArticle.paragraph && (
                <p key={paragraphArticle.id} className={styles.page__contents__paragraph}>
                  {paragraphArticle.imgPostParagh && (
                    <Image
                      className={styles.page__contents__paragraph}
                      src={`${paragraphArticle.imgPostParagh}.webp`}
                      alt={paragraphArticle.subtitle}
                      quality={100}
                      width="1080"
                      height="720"
                      sizes="(max-width: 768px) 100vw,
                        (max-width: 1200px) 50vw,
                        33vw"
                    />
                  )}
                  {paragraphArticle.paragraph}

                </p>
              )}
            </>
          ))}
        </div>
      </div>
      <div />
    </>
  );
}
