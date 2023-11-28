import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import type { AppProps } from 'next/app';
import Layout from '../components/layout';
import '../styles/globals.scss';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [animateTransition, setAnimateTransition] = useState(false);

  useEffect(() => {
    setAnimateTransition(true);
    setTimeout(() => {
      setAnimateTransition(false);
    }, 600);
  }, [router.pathname]);

  return (
    <>
      <Head>
        <meta name="google-site-verification" content={process.env.NEXT_PUBLIC_GOOGLE_WEBMASTER} />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>
      <Layout>
      {animateTransition && <div className="transition" />}
      <Component {...pageProps} />
    </Layout>
    </>
   
  );
}

export default MyApp;
