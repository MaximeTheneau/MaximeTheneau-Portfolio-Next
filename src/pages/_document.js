import {
  Html, Head, Main, NextScript,
} from 'next/document';

const CSP_GOOGLE_ADS = process.env.NEXT_PUBLIC_CSP_GOOGLE_ADS || 'https://pagead2.googlesyndication.com';
const CSP_GA_REGION = process.env.NEXT_PUBLIC_CSP_GA_REGION || 'https://region1.google-analytics.com';
const CSP_AD_QUALITY = process.env.NEXT_PUBLIC_CSP_AD_QUALITY || 'https://ep1.adtrafficquality.google';
const CSP_API_LOCAL = process.env.NEXT_PUBLIC_CSP_API_LOCAL || 'http://localhost:8000';
const CSP_GOOGLE_FONTS_STYLE = process.env.NEXT_PUBLIC_CSP_GOOGLE_FONTS_STYLE || 'https://fonts.googleapis.com';
const CSP_GOOGLE_FONTS_SRC = process.env.NEXT_PUBLIC_CSP_GOOGLE_FONTS_SRC || 'https://fonts.gstatic.com';
const CSP_ANNUAIRE_API = process.env.NEXT_PUBLIC_CSP_ANNUAIRE_API || 'https://annuaire.maximefreelance.fr';

export default function Document() {
  return (
    <Html lang="fr">
      <Head>
        <meta
          httpEquiv="Content-Security-Policy"
          content={[
            "default-src 'self'",
            `script-src 'self' 'unsafe-inline' https://www.googletagmanager.com ${CSP_GOOGLE_ADS} https://maps.googleapis.com https://maps.gstatic.com`,
            `style-src 'self' 'unsafe-inline' ${CSP_GOOGLE_FONTS_STYLE}`,
            `img-src 'self' https://picture.maximefreelance.fr https://picure.theneaumaxime.fr https://maps.gstatic.com https://maps.googleapis.com ${CSP_GOOGLE_ADS} data:`,
            `font-src 'self' ${CSP_GOOGLE_FONTS_SRC}`,
            `frame-src https://www.google.com ${CSP_GOOGLE_ADS}`,
            `connect-src 'self' ${CSP_API_LOCAL} ${CSP_ANNUAIRE_API} https://www.google-analytics.com ${CSP_GA_REGION} https://www.googletagmanager.com https://maps.googleapis.com ${CSP_GOOGLE_ADS} ${CSP_AD_QUALITY}`,
            "base-uri 'self'",
            `form-action 'self' ${CSP_API_LOCAL}`,
            "object-src 'none'",
            "upgrade-insecure-requests",
            "trusted-types default nextjs nextjs#bundler dompurify goog#html allow-duplicates google-maps-api#html lit-html",
            "require-trusted-types-for 'script'",
          ].join('; ')}
        />
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
        <script
          dangerouslySetInnerHTML={{
            __html: `
if (window.trustedTypes && trustedTypes.createPolicy) {
  trustedTypes.createPolicy('default', {
    createHTML: function(s) { return s; },
    createScript: function(s) { return s; },
    createScriptURL: function(s) { return s; }
  });
}
`,
          }}
        />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
