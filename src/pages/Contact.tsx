import ContactForm from '../components/contact/Contact';
import styles from './Pages.module.scss';
import HeadComponents from '../components/head/HeadComponents';

type ContactPageProps = {
  page: {
    title: string,
    contents: string,
    slug: string,
  },
};

export async function getStaticProps(): Promise<{ props: ContactPageProps }> {
  const responseContact = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts/Contact`);
  const page = await responseContact.json();

  return {
    props: {
      page,
    },
  };
}

// Component
export default function Contact({ page }: ContactPageProps) {
  return (
    <>
      <HeadComponents
        title={page.title}
        descriptionMeta={page.contents}
        url={page.slug}
        image={page.slug}
        addProduct={false}
      />

      <section className={styles.page}>
        <h1>{page.title}</h1>
        <p>
          {page.contents}
        </p>
        <h2>Contactez-nous - Devis gratuit</h2>
        <ContactForm />
      </section>
    </>
  );
}
