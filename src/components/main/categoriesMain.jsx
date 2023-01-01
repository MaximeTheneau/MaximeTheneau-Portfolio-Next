import Image from 'next/image';
import PropTypes, { element } from 'prop-types';
import { useRef } from 'react';
import useAnimationSvg from '../../lib/useAnimationSvg';
import styles from '../../styles/Home.module.scss';
import SvgCategory from '../svgCategory';

export default function CategoriesMain({ item, experienceElement, contactElement }) {
  return (
    <div
      className={`${styles.home__categories} section`}
    >
      <SvgCategory experienceElement={experienceElement} contactElement={contactElement} />
      <div className="titleBackground">
        <h2 className={styles.home__categories__title}>{item.title}</h2>
      </div>
    </div>

  );
}
CategoriesMain.propTypes = {
  idTitle: PropTypes.string,
  imgWebp: PropTypes.string,
  title: PropTypes.string,
};
