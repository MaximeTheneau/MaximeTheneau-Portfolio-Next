import dynamic from 'next/dynamic';
import DevisForm from '../components/contact/DevisForm';
import fetcher from '../utils/fetcher';
import HeadComponents from '../components/head/HeadComponents';

export async function getStaticProps() {
  const page = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}posts/Devis-en-ligne`);

  return {
    props: {
      page: page.post,
    },
  };
}

export default function DevisEnLigne({ page }) {
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
      <section className="mx-4">
        <h1>Devis en ligne - Création de site internet </h1>
        <div dangerouslySetInnerHTML={{ __html: page.contents }} />
        <div>
          <DevisForm />
          {/* <CalendarBooking /> */}

          <article>

            {page.paragraphPosts.map((paragraphArticle) => (
              <div key={paragraphArticle.subtitle}>
                <h2>
                  {paragraphArticle.subtitle}
                </h2>
                <div className="w-responsive" dangerouslySetInnerHTML={{ __html: paragraphArticle.paragraph }} />
              </div>
            ))}
          </article>
        </div>
      </section>
    </>
  );
}
