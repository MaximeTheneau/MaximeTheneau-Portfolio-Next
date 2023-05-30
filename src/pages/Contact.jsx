import Image from 'next/image';
import ContactForm from '../components/contact/Contact';
import styles from './Pages.module.scss';
import imageLoaderFull from '../utils/imageLoaderFull';
import HeadComponents from '../components/head/HeadComponents';

export async function getStaticProps() {
  const responseContact = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts/Contact`);
  const page = await responseContact.json();

  return {
    props: {
      page,
    },
  };
}

// == Composant
export default function Contact({ page }) {
  console.log(page);
  return (
    <>
      <HeadComponents
        title={page.title}
        descriptionMeta={page.contents}
        url={page.slug}
        image={page.slug}
        addProduct={false}
      />

      <section className={styles.page} >
        <h1>{page.title}</h1>
        {/* <Image
            src={`${page.slug}.webp`}
            alt={page.altImg || page.title}
            width='1080'
            height='720'
            quality={100}
            sizes="(max-width: 768px) 100vw,
            (max-width: 1200px) 50vw,
            33vw"
          /> */}
        <p>
          {page.contents}
        </p>
        <h2>Contactez-nous - Devis gratuit</h2>
        <ContactForm />
      </section>
    </>
  );
}
