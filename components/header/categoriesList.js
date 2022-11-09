import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import stylesHeader from '../../styles/Header.module.scss';
import PropTypes from 'prop-types';

function categoriesList({ item }) {
    const [state, setState] = useState({
        position: null,
      });
    useEffect(() => {
        function updatePosition() {
          const valueScroll = window.scrollY;
          setState({
            ...state,
              position: valueScroll,
            });
          }
          window.addEventListener('scroll', updatePosition)
          updatePosition()
          return () => window.removeEventListener('scroll', updatePosition)
        }, []);
  return (

    <>
        <li
          className={stylesHeader['header-navbar-item']}
        >
          <Link href={item.idTitle}>
            {item.title}
          </Link>
        </li>
    </>
  );
}
categoriesList.propTypes = {
  item: PropTypes.shape({
    idTitle: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};
export default categoriesList;
