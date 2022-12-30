import Image from 'next/image';
import PropTypes, { element } from 'prop-types';
import { useRef } from 'react';
import useAnimationSvg from '../../lib/useAnimationSvg';
import styles from '../../styles/Home.module.scss';
import SvgCategory from '../svgCategory';

export default function CategoriesMain({ item, id }) {
  const refHeader = useRef(null);
  const headerLayerTransform = useAnimationSvg(0.1, refHeader);
  return (
    <div
      className={`${styles.home__categories} section`}
      ref={refHeader}
      style={{
        transform: `translateY(${headerLayerTransform}px)`,
      }}
    >
      <SvgCategory />
      <h2 className={styles['home-categories-title']}>{item.title}</h2>
    </div>

  );
}
CategoriesMain.propTypes = {
  idTitle: PropTypes.string,
  imgWebp: PropTypes.string,
  title: PropTypes.string,
};
