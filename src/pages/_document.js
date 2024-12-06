import {
  Html, Head, Main, NextScript,
} from 'next/document';

export default function Document() {
  return (
    <Html lang="fr">
      <Head>
        <meta name="google-site-verification" content={process.env.NEXT_PUBLIC_GOOGLE_WEBMASTER} />
        <meta name="ahrefs-site-verification" content="80e1e4c68c5760798a0c167d6db84e79e9b343301fd1eb054f1da5fc8529e778" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="preconnect" href="https://picture.theneaumaxime.fr" />
        <link rel="dns-prefetch" href="https://picture.theneaumaxime.fr" />
        <link type="application/atom+xml" rel="alternate" href="https://theneaumaxime.fr/atom.xml" title="Maxime Freelance - Atom Feed" />
        <meta name="robots" content="max-image-preview:large" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
