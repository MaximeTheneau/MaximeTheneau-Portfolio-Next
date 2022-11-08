import Head from 'next/head';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Image from 'next/image';
import PropTypes, { element } from 'prop-types';
import Confirmation from '../components/modal/confirmation';
import styles from '../styles/Home.module.scss';
import stylesHeader from '../styles/Header.module.scss';
import Link from 'next/link';

function Home({ categories }) {
 
  gsap.registerPlugin(ScrollTrigger);
  
  const experienceRef = useRef(null);
  const headerRef = useRef(null);
  const contactRef = useRef(null);
  const homeRef = useRef(null);

  useEffect(() => {
    function updatePosition() {
      const valueScroll = window.scrollY;
      setState({
        ...state,
          position: valueScroll,
        });
      }
      window.addEventListener('scroll', updatePosition)
      updatePosition()
      return () => window.removeEventListener('scroll', updatePosition)
    }, []);
    
    
    useEffect(() => {
      const experience = experienceRef.current;
      const sectionExperiences =  gsap.utils.toArray(experienceRef.current);
      console.log(experience);
      const header = headerRef.current;
      const contact = contactRef.current;
      const home = homeRef.current;

      sectionExperiences.forEach((section) => {
      gsap.to(section, {
        y: 100,
        opacity: 0,
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          markers: true,
        }

      });
    });

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
          <div className={stylesHeader['header-sticky']} ref={homeRef}>
            { categories?.filter((item) => item.idTitle === '#home').map((item) => (
                <Image
                  key={item.id}
                  src={item.imgWebp}
                  alt={item.title}
                  width="1000"
                  height="1000"
                  layout="fill"
                  className={stylesHeader['header-sticky-img']}
                  style={{
                    top: -state.position,
                  }}
                  priority
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
                  {
                    categories?.map((item) => (
                      <li
                        key={item.id}
                        className={stylesHeader['header-navbar-item']}
                        onClick={() => {
                          setState({ ...state, toggleNav: true });
                        }}
                      >
                        <Link
                          href={item.idTitle}
                        >
                          {item.title}
                        </Link>
                      </li>
                    ))
                  }
                </ul>
              </nav>
            )}
            <ul className={stylesHeader['header-navbar-720']}>
              {
                categories?.map((item) => (
                  <li
                    key={item.id}
                    className={stylesHeader['header-navbar-item']}
                  >
                    <Link href={item.idTitle}>
                      {item.title}
                    </Link>
                  </li>
                ))
              }
            </ul>
          </header>

          <main className={styles.main} id="skills" >
            {
                categories?.filter((item) => item.idTitle === '#skills').map((item) => (
                  <div
                    key={item.id}
                    >
                    <div
                      id={item.idTitle}
                      className={styles['home-categories']}
                    >
                      <Image
                        src={item.imgWebp}
                        alt={item.title}
                        width="1000"
                        height="1000"
                        layout="fill"
                        className={styles['home-categories-img']}
                      />
                      <h2 className={styles['home-categories-title']}>{item.title}</h2>
                    </div>

                    {/** Skills */}
                    { item.experiences.map((experience) => (
                      <div key={experience.id}  ref={experienceRef} className={styles['home-experience']}>
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
                                <i className="icon-github" />
                                <div>
                                  Site
                                </div>
                              </a>
                            </div>
                          </div>
                        </div>

                      </div>
                    ))}
                  </div>
                ))
            }

          </main>

          <footer className={styles.footer} id="contact" ref={contactRef}>
            {
              categories?.filter((item) => item.idTitle === '#contact').map((item) => (
                <div key={item.id}>
                  <div className={styles['home-categories']} >
                    <Image
                      src={item.imgWebp}
                      alt={item.title}
                      width="1000"
                      height="1000"
                      layout="fill"
                      className={styles['home-categories-img']}
                    />
                    <h2 className={styles['home-categories-title']}>{item.title}</h2>
                  </div>
                  <div className={styles['home-contact']}>
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


export async function getServerSideProps(checkStatus) {

      // Fetch data from external API
      const res = await fetch('http://localhost:8000/api/categories')
      const categoriesData = await res.json()
      // Pass data to the page via props
      return { props: { categories: categoriesData} }


}

export default Home;

