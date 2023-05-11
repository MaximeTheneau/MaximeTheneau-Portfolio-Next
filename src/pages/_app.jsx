import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../components/layout';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [animateTransition, setAnimateTransition] = useState(false);
  // useEffect(() => {
  //   setAnimateTransition(true);
  //   setTimeout(() => {
  //     setAnimateTransition(false);
  //   }, 600);
  // }, [router.pathname]);

  // Mouse cursor
  // useEffect(() => {
  //   const cursor = document.querySelector('.cursor');

  //   document.addEventListener('mousemove', (e) => {
      
  //     cursor.setAttribute('style', 'top:'+(e.pageY)+"px; left:"+(e.pageX)+"px;")
  //   });

  // }, []);
  
  return (
    <>
      <Head />
      <Layout {...pageProps} >
        {animateTransition && <div className="transition" />}
        <Component {...pageProps} />
      </Layout>
        {/* <div className="cursor" /> */}
    </>
  );
}

export default MyApp;
