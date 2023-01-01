import Image from 'next/image';
import PropTypes from 'prop-types';
import { useState } from 'react';
import styles from '../../styles/Home.module.scss';

export default function ExperiencesList({ experience }) {
  const [styleTranslateY, setStyleTranslateY] = useState({
    transform: 'translateY(0%)',
    opacity: '1',
  });

  const handleOnMouseEnter = (e) => {
    const element = e.currentTarget.children[0];
    element.classList.add('text-hover');
    setTimeout(
      () => {
        element.classList.remove('text-hover');
        element.classList.add('text-hover-opacity');
      },
      100,
    );
    setTimeout(() => {
      element.classList.remove('text-hover-opacity');
      element.classList.add('text-hover-transform');
    }, 300);
    setTimeout(() => {
      element.classList.remove('text-hover-transform');
    }, 500);
  };

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
            onMouseEnter={(e) => handleOnMouseEnter(e)}
          >
            <a
              href={experience.contents2}
            >
              <i className="icon-github" />
              Github
            </a>
          </button>
          <button
            type="button"
            className="button"
            onMouseEnter={(e) => handleOnMouseEnter(e)}
          >
            <a
              href={experience.contents3}
            >
              <i className="icon-website" />
              Site
            </a>
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
