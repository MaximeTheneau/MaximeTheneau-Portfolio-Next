import {
  Html, Head, Main, NextScript,
} from 'next/document';

export default function Document() {
  return (
    <Html lang="fr">
      <Head>
        <meta name="google-site-verification" content={process.env.NEXT_PUBLIC_GOOGLE_WEBMASTER} />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="preconnect" href="https://picture.theneaumaxime.fr" />
        <link rel="dns-prefetch" href="https://picture.theneaumaxime.fr" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
