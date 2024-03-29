import ContactForm from '../components/contact/Contact';
import HeadComponents from '../components/head/HeadComponents';

type ContactPageProps = {
  page: {
    title: string,
    contents: string,
    heading: string,
    metaDescription: string,
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
        title={page.heading}
        description={page.metaDescription}
        url={page.url}
        image={page.slug}
      />

      <section className="p-4">
        <h1>{page.title}</h1>
        <p>
          {page.contents}
        </p>
        <ContactForm />
      </section>
    </>
  );
}
