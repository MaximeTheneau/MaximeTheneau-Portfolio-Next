
import PropTypes from 'prop-types';
import Navbar from './navbar/navbar';
import Footer from './footer/footer';

export default function Layout({ children,  }) {
  return (
    <>
        {/* <Script  strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=UA-208648445-2" />
        <Script id='google-analytics'>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'UA-208648445-2');
          `}
        </Script> */}
      <header>
        <Navbar />
      </header>
      <main>
        {children}
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
