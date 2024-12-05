import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import Layout from '../components/layout';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps) {
  const CookiesModal = dynamic(() => import('@/components/modal/Cookies'), { ssr: false });

  return (
    <>
      <CookiesModal />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>

  );
}

export default MyApp;
