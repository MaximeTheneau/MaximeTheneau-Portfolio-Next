import Head from 'next/head';
import Link from 'next/link';

export default function Custom404() {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <section className="flex flex-col items-center justify-center h-screen space-y-4">
        <h1 className="text-8xl font-bold text-red-500 animate-bounce">404</h1>
        <p className="text-xl text-gray-700">Oups, la page que vous recherchez est inaccessible.</p>
        <button
          type="button"
          className="btn"
        >
          <Link href="/" className="text-white">
            Page d&apos;accueil
          </Link>
        </button>
      </section>
    </>
  );
}
