import Image from 'next/image';
import styles from '../../styles/Home.module.scss';
import PropTypes, { element } from 'prop-types';

function CategoriesMain({ item }) {
  return (
    
      <div
          id={item.idTitle}
          className={styles['home-categories']}
        >
          <Image
            src={item.imgWebp}
            alt={item.title}
            width="1000"
            height="1000"
            layout="fill"
            className={styles['home-categories-img']}
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
export default CategoriesMain;
