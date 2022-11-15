import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import stylesHeader from '../../styles/Header.module.scss';
import PropTypes from 'prop-types';

export default function CategoriesList({ item }) {
  return (

    <>
        <li
          className={stylesHeader['header-navbar-item']}
        >
          <Link href={`#${item.idTitle}`}>
            {item.title}
          </Link>
        </li>
    </>
  );
}
CategoriesList.propTypes = {
  item: PropTypes.shape({
    idTitle: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

