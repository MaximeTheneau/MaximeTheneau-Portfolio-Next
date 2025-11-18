import Head from 'next/head';

declare module 'react' {
  interface LinkHTMLAttributes<T> extends React.HTMLAttributes<T> {
    fetchpriority?: string;
  }
}
// Générer le srcset avec le même format que imageLoader
function generatePreloadSrcset(imageSrc: string): string {
  const deviceSizes = [640, 750, 828, 1080, 1200, 1920];
  const quality = 75;

  return deviceSizes
    .map((width) => {
      const url = new URL(imageSrc, 'https://picture.maximefreelance.fr');
      url.searchParams.set('width', width.toString());
      url.searchParams.set('quality', quality.toString());
      return `${url.toString()} ${width}w`;
    })
    .join(', ');
}

export default function HeadComponents({
  title,
  description,
  url,
  image,
  imgWidth,
  imgHeight,
} : {
  title: string,
  description: string,
  url: string,
  image: string,
  imgWidth?: number | string,
  imgHeight?: number | string,
}) {
  // Générer le srcset qui correspond au format du imageLoader
  const preloadSrcset = generatePreloadSrcset(image);

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={`${process.env.NEXT_PUBLIC_URL}${url}`} />
      <meta property="og:site_name" content={process.env.NEXT_PUBLIC_URL} />
      <meta property="og:image" content={`${image}?format=jpeg`} />
      {imgWidth && <meta property="og:image:width" content={String(imgWidth)} />}
      {imgHeight && <meta property="og:image:height" content={String(imgHeight)} />}
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:locale" content="fr_FR" />

      {/* Twitter Open Graph Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${image}?format=jpeg`} />
      <meta name="twitter:url" content={`${process.env.NEXT_PUBLIC_URL}${url}`} />
      <meta name="twitter:site" content="@MTheneau" />
      <link
        rel="canonical"
        href={`${process.env.NEXT_PUBLIC_URL}${url}`}
        key="canonical"
      />
      <link
        rel="preload"
        as="image"
        imageSrcSet={preloadSrcset}
        imageSizes="100vw"
        fetchpriority="high"
      />
    </Head>
  );
}
