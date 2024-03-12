import Head from 'next/head';

export default function HeadComponents({
  title,
  description,
  url,
  image,
} : {
    title: string,
    description: string,
    url: string,
    image: string,
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
      <meta property="og:image" content={`${process.env.NEXT_PUBLIC_CLOUD_URL}/${process.env.NEXT_PUBLIC_CLOUD_FILE_KEY}/${image}.jpg`} />
      <link
        rel="canonical"
        href={`${process.env.NEXT_PUBLIC_URL}${url}`}
        key="canonical"
      />
    </Head>
  );
}
