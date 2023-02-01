import * as React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styles from '../main/Home.module.scss';
import SlideTransition from '../../hooks/useSlideTransition/SlideTransition';

type Props = {
  contact: {
    email: string;
    Github: string;
    Linkedin: string;
    twitter: string;
  };
};

const FormContactList = ({ contact }: Props) => {
  return (
    <div className={styles.footer__contact}>
      <SlideTransition >
        <div className={styles.footer__contact__listSocial}>
            <a
              href={contact.email}
              target="_blank"
              rel="noreferrer"
              aria-label="Email"
            >
              <div>
                <i className="icon-email" />
              </div>
            </a>
            <a
              aria-label='Github'
              href={contact.Github}
              target="_blank"
              rel="noreferrer"
            >
              <div >
                <i className="icon-github" />
              </div>
            </a>
            <a
              aria-label='Linkedin'
              href={contact.Linkedin}
              target="_blank"
              rel="noreferrer"
              >
              <div >
                <i className="icon-linkedin" />
              </div>
            </a>
            <a
              aria-label='Twitter'
              href={contact.twitter}
              target="_blank"
              rel="noreferrer"
            >
              <div>
                <i className="icon-twitter" />
              </div>
            </a>
        </div>
      </SlideTransition>
        <button
          type="button"
          className="relative"
          aria-label='CV'
        >
          <Link href="/cv-theneau-maxime.pdf" target="_blank" >
              <div>Mon CV</div>
          </Link>
        </button>
    </div>
  );
}

export default FormContactList;

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
