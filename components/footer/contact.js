import Image from 'next/image';
import styles from '../../styles/Home.module.scss';
import PropTypes from 'prop-types'
function Contact({ contact }) {
  return (
    <>
        <div className={styles['home-contact-list-social']}>
          <a href={contact.email} target="_blank" rel="noreferrer">
            <i className="icon-email" />
          </a>
          <a href={contact.Github} target="_blank" rel="noreferrer">
            <i className="icon-github" />
          </a>
          <a href={contact.Linkedin} target="_blank" rel="noreferrer">
            <i className="icon-linkedin" />
          </a>
          <a href={contact.twitter} target="_blank" rel="noreferrer">
            <i className="icon-twitter" />
          </a>
        </div>
    </>
  );
}
Contact.propTypes = {
contact: PropTypes.shape({
  email: PropTypes.string.isRequired,
  Github: PropTypes.string.isRequired,
  Linkedin: PropTypes.string.isRequired,
  twitter: PropTypes.string.isRequired,
  }).isRequired,

};
export default Contact;
