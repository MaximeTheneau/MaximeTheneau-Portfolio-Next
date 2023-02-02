import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import ScrollParallaxTop from '../../hooks/useMovableElement/top/ScrollParallaxTop';

import styles from './Home.module.scss';

type Props = {
  experience: {
    title: string,
    contents: string,
    contents2: string,
    contents3: string,
    imageWebp: string,
  },
  handleOnMouseEnter: (e: Event) => void,
}

const ExperiencesList = ({ experience, handleOnMouseEnter }: Props) => {

  const [onTopChange, setIsTopChange] = useState(null);
 
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
            children={''}
          />
          <ScrollParallaxTop
            onTopChange={handleChangeTop}
            heightOfElement={onTopChange / 1.5}
            widthOfElement={100}
            children={''}
          />
          <ScrollParallaxTop
            onTopChange={handleChangeTop}
            heightOfElement={onTopChange / 1.6}
            widthOfElement={25}
            children={''}
          />
          <ScrollParallaxTop
            onTopChange={handleChangeTop}
            heightOfElement={onTopChange / 1.3}
            widthOfElement={50}
            children={''}
          />
          <ScrollParallaxTop
            onTopChange={handleChangeTop}
            heightOfElement={onTopChange / 1.13}
            widthOfElement={150}
            children={''}
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