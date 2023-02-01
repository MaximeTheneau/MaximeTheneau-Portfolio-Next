import PropTypes from 'prop-types';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import ScrollParallaxTop from '../../hooks/useMovableElement/top/ScrollParallaxTop';

import styles from './Home.module.scss';

type Props = {
  experience: {
    title: string,
    imageWebp: string,
  },
  handleOnMouseEnter: () => void,
}


const ExperiencesList = ({ experience, handleOnMouseEnter }: Props) => {
  const [onTopChange, setIsTopChange] = useState(false);
  const handleChangeTop = (isTopChange) => {
    setIsTopChange(isTopChange);
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

      <div className={`relative ${styles['home__experience-text']}`}>
        <div className={`absolute ${styles.home__experience__backgroundAnimation}`}>
          <ScrollParallaxTop
            onTopChange={handleChangeTop}
            heightOfElement={onTopChange / 1.1}
            widthOfElement={50}
          />
          <ScrollParallaxTop
            onTopChange={handleChangeTop}
            heightOfElement={onTopChange / 1.5}
            widthOfElement={100}
          />
          <ScrollParallaxTop
            onTopChange={handleChangeTop}
            heightOfElement={onTopChange / 1.6}
            widthOfElement={25}
          />
          <ScrollParallaxTop
            onTopChange={handleChangeTop}
            heightOfElement={onTopChange / 1.3}
            widthOfElement={50}
          />
          <ScrollParallaxTop
            onTopChange={handleChangeTop}
            heightOfElement={onTopChange / 1.13}
            widthOfElement={150}
          />
        </div>
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
              className="relative f-center"
            >
              <div >
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
              className="relative f-center"
            >
              <div >
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

export default ExperiencesList;

ExperiencesList.propTypes = {
  experience: PropTypes.shape({
    imageWebp: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    contents: PropTypes.string.isRequired,
    contents2: PropTypes.string,
    contents3: PropTypes.string.isRequired,
  }).isRequired,
  handleOnMouseEnter: PropTypes.func.isRequired,
};
