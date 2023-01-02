import Image from 'next/image';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useState } from 'react';
import styles from '../../styles/Home.module.scss';

export default function ExperiencesList({ experience, handleOnMouseEnter }) {
  const [styleTranslateY, setStyleTranslateY] = useState({
    transform: 'translateY(0%)',
    opacity: '1',
  });

  return (
    <div className={`section ${styles.home__experience}`}>
      <Image
        src={experience.imageWebp}
        alt={experience.title}
        width="1000"
        height="1000"
        className={styles['home__experience-img']}
      />
      <div className={styles['home__experience-text']}>
        <h2>{experience.title}</h2>
        <h3>{experience.contents}</h3>
        <div className={styles['home__experience-text-link']}>
          <button
            type="button"
            className="button"
          >
            <Link
              href={experience.contents2}
              onMouseEnter={(e) => handleOnMouseEnter(e.currentTarget)}
              target="_blank"
            >
              <div className="relative f-center">
                <i className="icon-github" />
                Github
              </div>
            </Link>
          </button>
          <button
            type="button"
            className="button"
          >
            <Link
              href={experience.contents3}
              onMouseEnter={(e) => handleOnMouseEnter(e.currentTarget)}
              target="_blank"
            >
              <div className="relative f-center">
                <i className="icon-website" />
                Site
              </div>
            </Link>
          </button>
        </div>
      </div>

    </div>
  );
}
ExperiencesList.propTypes = {
  experience: PropTypes.shape({
    imageWebp: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    contents: PropTypes.string.isRequired,
    contents2: PropTypes.string,
    contents3: PropTypes.string.isRequired,
  }).isRequired,

};
