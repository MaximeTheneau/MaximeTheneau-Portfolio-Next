import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Pages.module.scss';
import ImageLoaderFull from '../utils/ImageLoaderFull';
import HeadComponents from '../components/head/HeadComponents';

type Page = {
  title: string;
  contents: string;
  slug: string;
  altImg?: string;
  subtitle: string;
};

type MentionsLegalProps = {
  page: Page;
};

export async function getStaticProps() {
  const responsePage = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts/Mentions-Legales`);
  const page = await responsePage.json();

  return {
    props: {
      page,
    },
  };
}

// == Composant
export default function MentionsLegal({ page }: MentionsLegalProps): JSX.Element {
  return (
    <>
      <HeadComponents
        title={page.title}
        descriptionMeta={page.contents}
        url={page.slug}
        image={page.slug}
        addProduct={false}
      />

      <>
        <section className={styles.page__image}>
          <h1>{page.title}</h1>
          
        </section>
        <section>
          <h2>{page.subtitle}</h2>
          <p>
            {page.contents}
          </p>
        </section>
      </>
    </>
  );
}
