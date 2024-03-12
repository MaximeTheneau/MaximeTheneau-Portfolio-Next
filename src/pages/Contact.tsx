import ContactForm from '../components/contact/Contact';
import HeadComponents from '../components/head/HeadComponents';

type ContactPageProps = {
  page: {
    title: string,
    contents: string,
    slug: string,
    url: string,
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
        url={page.url}
        image={page.slug}
      />

      <section>
        <h1>{page.title}</h1>
        <p>
          {page.contents}
        </p>
        <ContactForm />
      </section>
    </>
  );
}
