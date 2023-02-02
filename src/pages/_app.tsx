import React from 'react';
import PropTypes from 'prop-types';
import '../styles/globals.scss';

type Props = {
  Component: React.FC;
  pageProps: any;
};
const MyApp = ({ Component, pageProps }) => {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return (<Component {...pageProps} />);
}

export default MyApp;

MyApp.propTypes = {
  Component: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  pageProps: PropTypes.object.isRequired,
};
