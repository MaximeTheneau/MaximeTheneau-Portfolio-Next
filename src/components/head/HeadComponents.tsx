import Head from 'next/head';

declare module 'react' {
  interface LinkHTMLAttributes<T> extends React.HTMLAttributes<T> {
    fetchpriority?: string;
  }
}
export default function HeadComponents({
  title,
  description,
  url,
  image,
  srcset,
  imgWidth,
  imgHeight,
} : {
  title: string,
  description: string,
  url: string,
  image: string,
  srcset: string,
  imgWidth?: number | string,
  imgHeight?: number | string,
}) {
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
        href={image}
        type="image/webp"
      />
      <link
        rel="preload"
        as="image"
        imageSrcSet={srcset}
        imageSizes="100vw"
        fetchpriority="high"
      />
    </Head>
  );
}
