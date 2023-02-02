import React from 'react';
import styles from './Home.module.scss';
import SvgCategory from '../svgCategory';

type Props = {
  item: {
    title: string,
  },
};

const CategoriesMain = ({ item }: Props) => {
  return (
    <div
      className={`${styles.home__categories} section`}
    >
      <SvgCategory />
      <div className="titleBackground">
        <h2 className={styles.home__categories__title}>{item.title}</h2>
      </div>
    </div>

  );
}

export default CategoriesMain;
