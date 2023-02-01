import React from 'react';
import propTypes from 'prop-types';
import styles from './Home.module.scss';
import SvgCategory from '../svgCategory';

type Props = {
  item: {
    title: string,
  },
  experienceElement: boolean,
  contactElement: boolean,
};

const CategoriesMain = ({ item, experienceElement, contactElement }: Props) => {
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

export default CategoriesMain;

CategoriesMain.propTypes = {
  item: propTypes.shape({
    title: propTypes.string.isRequired,
  }).isRequired,
  experienceElement: propTypes.bool.isRequired,
  contactElement: propTypes.bool.isRequired,
};
