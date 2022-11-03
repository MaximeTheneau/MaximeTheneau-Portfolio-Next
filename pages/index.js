import Head from 'next/head';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Confirmation from '../components/modal/confirmation';
import styles from '../styles/Home.module.scss';
import stylesHeader from '../styles/Header.module.scss';

export default function Home({ categories }) {
  const [state, setState] = useState({
    toggleNav: true,
    toggleModal: false,
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const setToggleModalValue = () => {
    console.log('setToggleModalValue');
    setState({ ...state, toggleModal: false });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(state);
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(state),
    };
    fetch('http://localhost:8000/api/message', requestOptions)
      .finally(() => {
        setState({
          ...state,
          name: '',
          email: '',
          subject: '',
          message: '',
          toggleModal: true,
        });
        setTimeout(() => {
          setState({ ...state, toggleModal: false });
        }, 3000);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Head>
        <title>Theneau Maxime Développeur Web à Marseille</title>
        <meta name="description" content="Theneau Maxime dévelloppeur web à Marseille." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/** Modal Confirmation */}
      {state.toggleModal ? <Confirmation onClick={setToggleModalValue} /> : ''}

      {/** Header Images Sticky */}
      { categories?.filter((item) => item.idTitle === '#home').map((item) => (
        <div key={item.id} id={item.title}>
          <picture>
            <source srcSet={item.imgWebp} type="image/webp" />
            <img src={item.imgSvg} alt={item.title} className={stylesHeader['header-sticky']} />
          </picture>
        </div>
      ))}
      {/** Header Navbar */}
      <header className={stylesHeader.header}>
        {state.toggleNav ? (
          <div className={stylesHeader['header-navbar-toggle']}>
            <div className={stylesHeader['header-button_close']}>
              <button
                type="button"
                id="button_nav"
                title="Fermer le menu"
                onClick={() => {
                  setState({ ...state, toggleNav: false });
                }}
              >
                <i className="icon-navbar" />
              </button>
            </div>
          </div>
        ) : (
          <nav className={stylesHeader.navbar}>
            <div className={stylesHeader['header-navbar-toggle']}>
              <div className={stylesHeader['header-button_close']}>
                <button
                  type="button"
                  onClick={() => {
                    setState({ ...state, toggleNav: true });
                  }}
                >
                  <i className="icon-x" />
                </button>
              </div>
            </div>
            <ul className={stylesHeader['header-navbar']}>
              {
                categories?.map((item) => (
                  <a href={item.idTitle} key={item.id}>
                    <li
                      className={stylesHeader['header-navbar-item']}
                      onClick={() => {
                        setState({ ...state, toggleNav: true });
                      }}
                    >
                      {item.title}
                    </li>
                  </a>
                ))
              }
            </ul>
          </nav>
        )}
        <ul className={stylesHeader['header-navbar-720']}>
          {
            categories?.map((item) => (
              <a href={item.idTitle} key={item.id}>
                <li>{item.title}</li>
              </a>
            ))
          }
        </ul>
      </header>

      <main className={styles.main}>
        <h2 className={styles['home-title']}>Theneau Maxime</h2>
        <h3 className={styles['home-subtitle']}>Développeur Web - FrontEnd - React.Js</h3>
        <div className={styles['home-location']}>
          <i className="icon-location" />
          <p>Marseille</p>
        </div>
        {
            categories?.filter((item) => item.idTitle === '#skills').map((item) => (
              <div key={item.id} className={styles['home-picture']}>
                <div id={item.title}>
                  <picture>
                    <source srcSet={item.imgWebp} type="image/webp" />
                    <img src={item.imgSvg} alt={item.title} className={styles['home-picture-title']} />
                  </picture>
                </div>
                <h1 id={item.title} className={styles['home-title']}>{item.title}</h1>
                { item.experiences.map((experience) => (
                  <div key={experience.id} id={experience.idTitle} className={styles['home-picture-experience']}>
                    <picture>
                      <source srcSet={experience.imageWebp} type="image/webp" />
                      <img src={experience.imageSvg} alt={item.title} />
                    </picture>
                    <h2>{experience.title}</h2>
                    <h3>{experience.contents}</h3>
                    <p>{experience.contents2}</p>
                    <a href={experience.contents3}>
                      <i className="icon-github" />
                    </a>

                  </div>
                ))}
              </div>
            ))
        }
        {/** Modal */}
        <div className="test">
          <confirmationMessage />
        </div>

      </main>
      <footer className={styles.footer}>
        {
          categories?.filter((item) => item.idTitle === '#contact').map((item) => (
            <>
              <div key={item.id} className={styles['home-picture']}>
                <picture>
                  <source srcSet={item.imgWebp} type="image/webp" />
                  <img src={item.imgSvg} alt={item.title} className={styles['home-picture-title']} />
                </picture>
                <h2 key={item.id} className="home-title" id={item.title}>{item.title}</h2>
              </div>
              <div className={styles['home-contact']}>
                <h2 className={styles['home-contact-title']}>Thenau Maxime</h2>
                <h3 className={styles['home-contact-subtitle']}>Marseille </h3>
                {item.contacts.map((contact) => (
                  <div key={contact.id} className={styles['home-contact-list-social']}>
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
                ))}
              </div>
            </>
          ))
        }

        <form className={styles['footer-form']} onSubmit={handleSubmit}>
          <div className={styles['footer-form-top']}>
            <input
              type="text"
              placeholder="Nom"
              onChange={(e) => setState({ ...state, name: e.target.value })}
              value={state.name}
              required
            />
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setState({ ...state, email: e.target.value })}
              value={state.email}
              required
            />
            <input
              type="text"
              placeholder="Sujet"
              onChange={(e) => setState({ ...state, subject: e.target.value })}
              value={state.subject}
              required
            />
          </div>
          <textarea
            placeholder="Message"
            rows={5}
            onChange={(e) => setState({ ...state, message: e.target.value })}
            value={state.message}
            required
          />
          <button type="submit">
            <i className="icon-paper-plane" />
            Envoyer
          </button>
        </form>
      </footer>
    </>
  );
}
Home.propTypes = {
  categories: PropTypes.shape(
    {
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      idTitle: PropTypes.string.isRequired,
      imgSvg: PropTypes.string.isRequired,
      imgWebp: PropTypes.string.isRequired,
      experiences: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          title: PropTypes.string.isRequired,
          contents: PropTypes.string.isRequired,
          contents2: PropTypes.string.isRequired,
          contents3: PropTypes.string.isRequired,
          imageSvg: PropTypes.string.isRequired,
          imageWebp: PropTypes.string.isRequired,
          idTitle: PropTypes.string.isRequired,
        }),
      ).isRequired,
      contacts: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          email: PropTypes.string.isRequired,
          Github: PropTypes.string.isRequired,
          Linkedin: PropTypes.string.isRequired,
          twitter: PropTypes.string.isRequired,
        }),
      ).isRequired,
    },
  ).isRequired,
};

export async function getServerSideProps() {
  const categories = await fetch('http://localhost:8000/api/categories')
    .then((res) => res.json());

  return { props: { categories } };
}
