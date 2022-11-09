import styles from '../../styles/Home.module.scss';

function formContact({contact}) {
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

export default formContact;
