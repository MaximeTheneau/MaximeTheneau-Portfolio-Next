import type { AppProps } from 'next/app';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import Layout from '../components/layout';
import '../styles/globals.scss';

const CookiesProvider = dynamic(async () => import('@/context/CookiesContext'), { ssr: false });
const CookiesModal = dynamic(async () => import('@/components/modal/Cookies'), { ssr: false });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <CookiesProvider>
        <CookiesModal />
      </CookiesProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>

  );
}

export default MyApp;
