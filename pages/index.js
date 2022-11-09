//* Import
import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';


//* Gsap
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

//* Components
import Confirmation from '../components/modal/confirmation';
import Sticky from '../components/header/sticky';
import CategoriesList from '../components/header/categoriesList';
import CategoriesMain from '../components/main/categoriesMain';
import ExperiencesList from '../components/main/experiencesList';
import FormContact from '../components/footer/formContact';
import FormContactList from '../components/footer/formContactList';

//* Styles
import styles from '../styles/Home.module.scss';
import stylesHeader from '../styles/Header.module.scss';


function Home ({ categories }) {
  
  //* State
  const [state, setState] = useState({
    toggleNav: true,
    toggleModal: false,
    position: null,
    loadingSticky: false,
    form:{
      name: '',
      email: '',
      subject: '',
      message: '',

    }
  });
 
  gsap.registerPlugin(ScrollTrigger);

  const headerRef = useRef(null);
  const contactRef = useRef(null);
  const testRef = useRef(null);
  
  useEffect(() => {

      const header = headerRef.current;
      const contact = contactRef.current;

      gsap.to(header, {
      scrollTrigger: {
        markers: true,
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
      duration: 2,
    }
    );
  }, []);





  return (
    <>
        {/** Modal Confirmation */}
        {state.toggleModal ? <Confirmation setState={setState} state={state} /> : ''}
        <Head>
          <title>Theneau Maxime Développeur Web à Marseille</title>
          <meta name="description" content="Theneau Maxime dévelloppeur web à Marseille." />
          <link rel="icon" href="/favicon.ico" />

        </Head>
          <div  className={state.toggleModal ? (styles.blur) : ''}>
                

          {/** Header Images Sticky */}
          <div className={stylesHeader['header-sticky']} ref={testRef} >
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
                      { categories?.map((item) => (
                        <CategoriesList
                          key={item.id}
                          item={item}
                        />
                      ))}
                </ul>
              </nav>
            )}
            <ul className={stylesHeader['header-navbar-720']}>
              { categories?.map((item) => (
                  <CategoriesList
                    key={item.id}
                    item={item}
                  />
              ))}
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
                      <FormContactList key={contact.twitter} contact={contact}  />
                  ))}

                  {/** Form Contact */}
                  <FormContact setState={setState} state={state} />
                </div>
              ))
            }
            <div className={styles['footer-autor']}>
              <p>
                Site réaliser par <i className='icon-signature'/>
              </p>
            </div>
          </footer>
          </div>
    </>
  );
}
export default Home;


export async function getServerSideProps(checkStatus) {
      // Fetch data from external API
      const res = await fetch('http://localhost:8000/api/categories')
      const categoriesData = await res.json()
      // Pass data to the page via props
      return { props: { categories: categoriesData} }
}

