import propTypes from 'prop-types';
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
  item: propTypes.shape({
    title: propTypes.string.isRequired,
  }).isRequired,
  experienceElement: propTypes.bool.isRequired,
  contactElement: propTypes.bool.isRequired,
};
