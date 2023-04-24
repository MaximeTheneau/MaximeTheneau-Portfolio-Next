import Head from 'next/head';
import Link from 'next/link';

export default function Custom404() {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex"/>
      </Head>
      <section>
        <h1>Désolé</h1>
        <p>Oups la page que vous recherche est innaccessible</p>
        <button type="button">
          <Link
            href="/"
          >
              Page d&apos;accueil
          </Link>
        </button>
      </section>
    </>
  );
}
