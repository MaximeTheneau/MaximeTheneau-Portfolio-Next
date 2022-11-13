import Image from 'next/image';
import styles from '../../styles/Home.module.scss';
import PropTypes from 'prop-types';
import Link from 'next/link';

export default function AboutMain({ about }) {
  console.log(about);
  return (
    
    <div className={styles['about-content']}>
      <p className={styles['about-content-italic']}>
        {about.content}
      </p>
      <Image
        src={about.imgWebp}
        alt="Theneau Maxime"
        width="1000"
        height="1000"
        layout="fill"
      />
      <p>
        {about.contents2}
      </p>
      <div className={styles['about-cv']}>
          <Link href="/cv-theneau-maxime.pdf">
            <button type="button" className={styles['button']}>
              <span>Mon CV</span>
            </button>
          </Link>

      </div>

        
    </div>
    
  );
}
AboutMain.propTypes = {
  about: PropTypes.shape({

  }),


};
