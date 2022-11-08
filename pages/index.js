import Head from 'next/head';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Image from 'next/image';
import PropTypes from 'prop-types';

//* Components
import Confirmation from '../components/modal/confirmation';
import Sticky from '../components/header/sticky';
import CategoriesList from '../components/header/categoriesList';
import CategoriesMain from '../components/main/categoriesMain';
import ExperiencesList from '../components/main/experiencesList';

import styles from '../styles/Home.module.scss';
import stylesHeader from '../styles/Header.module.scss';
import Contact from '../components/footer/contact';

function Home({ categories }) {
 
  gsap.registerPlugin(ScrollTrigger);

  const headerRef = useRef(null);
  const contactRef = useRef(null);

    useEffect(() => {
      const header = headerRef.current;
      const contact = contactRef.current;

      gsap.to(header, {
      scrollTrigger: {
        trigger: header,
        start: 'top top',
      },
      opacity: 0.8,
      y: state.position > 0 ? -100 : 0,  
    });
    gsap.fromTo(contact, {
      opacity: 0,
    }, {
      scrollTrigger: {
        trigger: contact,
        start: 'top 100%',
      },
      opacity: 1,
      duration: 1,
    }
    );

  }, []);

  const [state, setState] = useState({
    toggleNav: true,
    toggleModal: false,
    name: '',
    email: '',
    subject: '',
    message: '',
    position: null,
    loadingSticky: false,
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
          setState({ ...state, toggleModal: true });
        }, 3000);
      })
      .catch((err) => console.log(err));
  };


  return (
    <>
      {/** Modal Confirmation */}
      {state.toggleModal ? <Confirmation onClick={setToggleModalValue} /> : ''}
      <Head>
        <title>Theneau Maxime Développeur Web à Marseille</title>
        <meta name="description" content="Theneau Maxime dévelloppeur web à Marseille." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {state.loadingSticky && "<p>test</p>"}
      {!state.loadingSticky && (
        <div className={state.toggleModal ? (styles.blur) : ''}>
          
          {/** Header Images Sticky */}
          <div className={stylesHeader['header-sticky']} >
            { categories?.filter((image) => image.idTitle === '#home').map((item) => (
              <Sticky
                key={item.id}
                imgWebp={item.imgWebp}
                alt={item.title}
              />
            ))}
            <div className={stylesHeader['header-sticky-content']}>
              <h1 className={styles['home-title']}>Theneau Maxime</h1>
              <h2 className={styles['home-subtitle']}>Développeur Web à Marseille</h2>
            </div>
          </div>

          {/** Header Navbar */}
          <header className={stylesHeader.header} ref={headerRef}>
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

                </ul>
              </nav>
            )}
            <ul className={stylesHeader['header-navbar-720']}>

            </ul>
          </header>

          <main className={styles.main} id="skills" >
            {
                categories?.filter((item) => item.idTitle === '#skills').map((item) => (
                  <div  key={item.idTitle}>

                    {/** Title Categories */}
                    <CategoriesMain item={item} key={item.id} />

                    {/** Skills */}
                    { item.experiences.map((experience) => (
                      <ExperiencesList key={experience.title} experience={experience} />
                    ))}
                  </div>
                ))
            }

          </main>

          <footer className={styles.footer} id="contact" ref={contactRef}>
            
            {/** Contact */}
            {
              categories?.filter((item) => item.idTitle === '#contact').map((item) => (
                <div key={item.idTitle}>
                  {/** Title Categories */}
                  <CategoriesMain key={item.id} item={item} />

                  {/** Contact List */}
                  {item.contacts.map((contact) => (
                    <Contact key={contact.twitter} contact={contact} />
                  ))}
                </div>
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
                Envoyer
                <i className="icon-github" />
              </button>
            </form>
          </footer>
        </div>
      )}
    </>
  );
}
Home.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
};


export async function getServerSideProps(checkStatus) {
      // Fetch data from external API
      const res = await fetch('http://localhost:8000/api/categories')
      const categoriesData = await res.json()
      // Pass data to the page via props
      return { props: { categories: categoriesData} }
}

export default Home;

