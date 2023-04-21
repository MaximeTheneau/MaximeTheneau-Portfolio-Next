import Image from 'next/image';
import Head from 'next/head';
import ContactForm from '../components/contact/contactForm';
import styles from '../styles/Pages.module.scss';
import imageLoaderFull from '../utils/imageLoaderFull';

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
  return (
    <>
      <Head>
        <title>Contact</title>
        <meta name="description" content="Contactez-nous - Devis gratuit - Nous vous répondrons dans les plus brefs délais pour vous fournir une estimation gratuite et répondre à toutes vos questions."/>
        <meta property="og:type" content="website"/>
        <meta property="og:title" content="Contact" />
        <meta property="og:description" content="Contactez-nous - Devis gratuit - Nous vous répondrons dans les plus brefs délais pour vous fournir une estimation gratuite et répondre à toutes vos questions."/>
        <meta property="og:site_name" content="Une Taupe Chez Vous" />
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_URL}/${page.slug}`} />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_CLOUD_URL}/${process.env.NEXT_PUBLIC_CLOUD_FILE_KEY}/${page.slug}.jpg`} />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_URL}/${page.slug}`}
          key="canonical"
        />
      </Head>

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
