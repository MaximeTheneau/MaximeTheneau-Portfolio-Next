import type { AppProps } from 'next/app';
import Layout from '../components/layout';
import '../styles/globals.scss';
import { CookiesProvider } from '../context/CookiesContext';
import CookiesModal from '../components/modal/Cookies';

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
