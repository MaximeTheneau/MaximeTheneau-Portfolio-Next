import {
  Html, Head, Main, NextScript,
} from 'next/document';

export default function Document() {
  return (
    <Html lang="fr">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#def0c2" />
        <meta name="google-site-verification" content={process.env.NEXT_PUBLIC_GOOGLE_WEBMASTER} />
        <meta name="ahrefs-site-verification" content="80e1e4c68c5760798a0c167d6db84e79e9b343301fd1eb054f1da5fc8529e778" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Maxime Freelance" />
        <meta name="msapplication-TileColor" content="#def0c2" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="preconnect" href="https://picture.maximefreelance.fr" />
        <link rel="dns-prefetch" href="https://picture.maximefreelance.fr" />
        <link type="application/atom+xml" rel="alternate" href="https://maximefreelance.fr/atom.xml" title="Maxime Freelance - Atom Feed" />
        <meta name="robots" content="max-image-preview:large" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
