import { PostType } from '@/types/post.type';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import ContactAbout from '@/components/contact/ContactAbout';
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
      <section className="p-4 text-center">
        <h1>{page.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: page.contents }} />
        <div id="calendar">
          <CalendarBooking />
        </div>
        <p>
          ou remplissez le formulaire ci-dessous pour discuter de vos besoins ou autre demande :
        </p>
      </section>
      <ContactForm />
      <hr />
      <section className="p-4 text-center">
        <div className="py-4">
          <ContactAbout />
        </div>
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
          {' '}
          <Link
            href="/Contact#calendar"
            className=" "
          >
            calendrier en ligne
          </Link>
          {' '}
          pour planifier une consultation personnalisée/
        </p>
      </section>
    </>
  );
}
