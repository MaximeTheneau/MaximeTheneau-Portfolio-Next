import Image from 'next/image';
import PropTypes, { element } from 'prop-types';
import styles from '../../styles/Home.module.scss';

export default function CategoriesMain({ item, id }) {
  return (

    <div
      className={`${styles.home__categories} section`}
      id={id}
    >
      <Image
        src={item.imgWebp}
        alt={item.title}
        fill
        className={styles['home-categories-img']}
        priority
      />
      <h2 className={styles['home-categories-title']}>{item.title}</h2>
    </div>

  );
}
CategoriesMain.propTypes = {
  idTitle: PropTypes.string,
  imgWebp: PropTypes.string,
  title: PropTypes.string,
};
