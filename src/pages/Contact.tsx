import { PostType } from '@/types/post.type';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import ContactForm from '../components/contact/Contact';
import HeadComponents from '../components/head/HeadComponents';

type ContactPageProps = {
  page: PostType
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
  const CalendarBooking = dynamic(() => import('@/components/ui/CalendarBooking'), {
    ssr: false,
  });
  return (
    <>
      <HeadComponents
        title={page.heading}
        description={page.metaDescription}
        url={page.url}
        srcset={page.srcset}
        image={page.imgPost}
      />

      <section className="p-4">
        <h1>{page.title}</h1>
        <p>
          {page.contents}
        </p>
        <ContactForm />
      </section>
      <hr />
      <section className="p-4">
        <p>
          Vous souhaitez obtenir un devis personnalisé pour la création de votre site internet ?
          N&apos;hésitez pas à nous contacter !
          Nous sommes à votre disposition pour vous aider à concrétiser votre projet en ligne.
          Remplissez le formulaire ci-dessus pour discuter de vos besoins
          et recevoir une estimation précise de la création de votre site web.
        </p>
        <p>
          <Link
            href="/devis-en-ligne"
            className=" "
          >
            Demandez un devis gratuit pour votre site web
          </Link>
          {' '}
          ou prenez rendez-vous directement via notre
          calendrier en ligne pour planifier une consultation personnalisée :
          <CalendarBooking />
        </p>
      </section>
    </>
  );
}
