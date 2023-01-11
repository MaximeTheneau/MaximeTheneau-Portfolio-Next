import PropTypes from 'prop-types';
import Link from 'next/link';
import styles from '../../styles/Home.module.scss';
import ScrollParallaxLeft from '../../lib/ScrollParallaxLeft';

export default function FormContactList({ contact, handleOnMouseEnter }) {
  return (
    <div className={styles.footer__contact}>
      <div className={styles.footer__contact__listSocial}>
        <ScrollParallaxLeft delay={'1s'}>
          <a
            href={contact.email}
            target="_blank"
            rel="noreferrer"
            onMouseEnter={(e) => handleOnMouseEnter(e.currentTarget)}
            className={`relative`}
          >
            <div>
              <i className="icon-email" />
            </div>
          </a>
        </ScrollParallaxLeft>
        <ScrollParallaxLeft delay={'1.5s'}>
          <a
            href={contact.Github}
            target="_blank"
            rel="noreferrer"
            onMouseEnter={(e) => handleOnMouseEnter(e.currentTarget)}
            className={`relative `}
            
          >
            <div >
              <i className="icon-github" />
            </div>
          </a>
        </ScrollParallaxLeft>
        <ScrollParallaxLeft delay={'2s'}>
          <a
            href={contact.Linkedin}
            target="_blank"
            rel="noreferrer"
            onMouseEnter={(e) => handleOnMouseEnter(e.currentTarget)}
            className={`relative `}
            >
            <div className="relative">
              <i className="icon-linkedin" />
            </div>
          </a>
        </ScrollParallaxLeft>
        <ScrollParallaxLeft delay={'2.5s'}>
          <a
            href={contact.twitter}
            target="_blank"
            rel="noreferrer"
            onMouseEnter={(e) => handleOnMouseEnter(e.currentTarget)}
            className={`relative `}
            
          >
            <div>
              <i className="icon-twitter" />
            </div>
          </a>
        </ScrollParallaxLeft>
      </div>
      <Link href="/cv-theneau-maxime.pdf" target="_blank">
        <button
          type="button"
          className="relative"
          onMouseEnter={(e) => handleOnMouseEnter(e.currentTarget)}
        >
          <div>Mon CV</div>
        </button>
      </Link>
    </div>
  );
}

FormContactList.propTypes = {
  contact: PropTypes.shape(
    {
      email: PropTypes.string.isRequired,
      Github: PropTypes.string.isRequired,
      Linkedin: PropTypes.string.isRequired,
      twitter: PropTypes.string.isRequired,
    },
  ).isRequired,
  handleOnMouseEnter: PropTypes.func.isRequired,
  classIsview: PropTypes.bool.isRequired,
};
