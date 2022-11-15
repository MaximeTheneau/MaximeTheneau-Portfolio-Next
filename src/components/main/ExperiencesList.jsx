import Image from 'next/image';
import styles from '../../styles/Home.module.scss';
import PropTypes from 'prop-types';

export default function ExperiencesList({ experience }) {
  return (
    <>
        <div className={styles['home-experience']}>
          <Image
            src={experience.imageWebp}
            alt={experience.title}
            width="1000"
            height="1000"
            layout="fill"
            className={styles['home-experience-img']}
          />
          <div className={styles['home-experience-text']}>
            <h2>{experience.title}</h2>
            <h3>{experience.contents}</h3>
            <div className={styles['home-experience-text-link']}>
              <div className={styles['home-experience-text-link-github']}>
                <a href={experience.contents2}>
                  <i className="icon-github" />
                  <div>
                    Github
                  </div>
                </a>
              </div>
              <div className={styles['home-experience-text-link-site']}>
                <a href={experience.contents3}>
                  <i className="icon-website" />
                  <div>
                    Site
                  </div>
                </a>
              </div>
            </div>
          </div>

        </div>
    </>
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