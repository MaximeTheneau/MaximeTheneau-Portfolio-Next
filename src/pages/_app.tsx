import Head from 'next/head';
import type { AppProps } from 'next/app';
import Layout from '../components/layout';
import '../styles/globals.scss';
import { CookiesProvider } from '../context/CookiesContext';
import CookiesModal from '../components/modal/Cookies';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="google-site-verification" content={process.env.NEXT_PUBLIC_GOOGLE_WEBMASTER} />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>
      <CookiesProvider>
        <CookiesModal />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </CookiesProvider>
    </>

  );
}

export default MyApp;
