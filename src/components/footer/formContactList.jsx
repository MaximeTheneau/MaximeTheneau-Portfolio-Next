import Link from 'next/link';
import styles from '../../styles/Home.module.scss';

export default function FormContactList({ contact, handleOnMouseEnter }) {
  return (
    <div className={styles.footer__contact}>
      <div className={styles.footer__contact__listSocial}>
        <a href={contact.email} target="_blank" rel="noreferrer" onMouseEnter={(e) => handleOnMouseEnter(e.currentTarget)}>
          <div className="relative">
            <i className="icon-email" />
          </div>
        </a>
        <a href={contact.Github} target="_blank" rel="noreferrer" onMouseEnter={(e) => handleOnMouseEnter(e.currentTarget)}>
          <div className="relative">
            <i className="icon-github" />
          </div>
        </a>
        <a href={contact.Linkedin} target="_blank" rel="noreferrer" onMouseEnter={(e) => handleOnMouseEnter(e.currentTarget)}>
          <div className="relative">
            <i className="icon-linkedin" />
          </div>
        </a>
        <a href={contact.twitter} target="_blank" rel="noreferrer" onMouseEnter={(e) => handleOnMouseEnter(e.currentTarget)}>
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
