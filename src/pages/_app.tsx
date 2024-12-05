import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import Layout from '../components/layout';
import '../styles/globals.scss';

const CookiesProvider = dynamic(async () => import('@/context/CookiesContext'), { ssr: false });
const CookiesModal = dynamic(async () => import('@/components/modal/Cookies'), { ssr: false });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CookiesProvider>
      <CookiesModal />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CookiesProvider>

  );
}

export default MyApp;
