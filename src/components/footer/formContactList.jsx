import PropTypes from 'prop-types';
import Link from 'next/link';
import styles from '../../styles/Home.module.scss';

export default function FormContactList({ contact, handleOnMouseEnter, classIsview }) {
  return (
    <div className={styles.footer__contact}>
      <div className={styles.footer__contact__listSocial}>
        <a
          href={contact.email}
          target="_blank"
          rel="noreferrer"
          onMouseEnter={(e) => handleOnMouseEnter(e.currentTarget)}
          className={classIsview ? 'slideAnimation' : ''}
        >
          <div className="relative">
            <i className="icon-email" />
          </div>
        </a>
        <a
          href={contact.Github}
          target="_blank"
          rel="noreferrer"
          onMouseEnter={(e) => handleOnMouseEnter(e.currentTarget)}
          className={classIsview ? 'slideAnimation' : ''}
          style={{ animationDelay: '0.5s' }}
        >
          <div className="relative">
            <i className="icon-github" />
          </div>
        </a>
        <a
          href={contact.Linkedin}
          target="_blank"
          rel="noreferrer"
          onMouseEnter={(e) => handleOnMouseEnter(e.currentTarget)}
          className={classIsview ? 'slideAnimation' : ''}
          style={{ animationDelay: '1s' }}
        >
          <div className="relative">
            <i className="icon-linkedin" />
          </div>
        </a>
        <a
          href={contact.twitter}
          target="_blank"
          rel="noreferrer"
          onMouseEnter={(e) => handleOnMouseEnter(e.currentTarget)}
          className={classIsview ? 'slideAnimation' : ''}
          style={{ animationDelay: '1.5s' }}
        >
          <div className="relative">
            <i className="icon-twitter" />
          </div>
        </a>
      </div>
      <button
        type="button"
        className={styles.button}
        onMouseEnter={(e) => handleOnMouseEnter(e.currentTarget)}
      >
        <div className="relative">
          <Link href="/cv-theneau-maxime.pdf" target="_blank">
            <span>Mon CV</span>
          </Link>
        </div>
      </button>
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
