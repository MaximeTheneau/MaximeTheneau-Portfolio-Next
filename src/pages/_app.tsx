import React from 'react';
import '../styles/globals.scss';

type Props = {
  Component: React.FC;
  pageProps: any;
};
function MyApp({ Component, pageProps }: Props) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return (<Component {...pageProps} />);
}

export default MyApp;