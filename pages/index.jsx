//* Import
import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';


//* Gsap
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

//* Components
import Confirmation from '../src/components/modal/Confirmation';
import Sticky from '../src/components/header/Sticky';
import CategoriesList from '../src/components/header/CategoriesList';
import CategoriesMain from '../src/components/main/CategoriesMain';
import ExperiencesList from '../src/components/main/ExperiencesList';
import FormContact from '../src/components/footer/FormContact';
import FormContactList from '../src/components/footer/FormContactList';

//* Styles
import styles from '../src/styles/Home.module.scss';
import stylesHeader from '../src/styles/Header.module.scss';
import AboutMain from '../src/components/main/AboutMain';


function Home ({ categories }) {



  //* State
  const [state, setState] = useState({
    toggleNav: true,
    toggleModal: true,
    loadingSticky: false,
    form:{
      name: '',
      email: '',
      subject: '',
      message: '',
      confirmation:'',
      textArea: 1,
      confirmationMessage: 'change',
      confirmationName: 'change',
      confirmationEmail: 'change',
      confirmationSubject: 'change',

    }
  });
 
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

  const setToggleModalValue = () => {
    console.log('setToggleModalValue');
    setState({ ...state, toggleModal: false });
  };


  return (
    <>
        <Head>
          <title>Portfolio Développeur Web - Theneau Maxime à Marseille.</title>
          <meta name="description" content="Portfolio Développeur Web - Theneau Maxime à Marseille. Après une formation certifiante web, chez O’clock et une expérience de plus de 15 ans..." />
          <meta property="og:image" content="https://back.theneaumaxime.fr/public/images/webp/social.jpg" />

          {/* Open Graph */}
          <meta property="og:title" content="Portfolio Développeur Web - Theneau Maxime à Marseille." />
          <meta property="og:description" content="Portfolio Développeur Web - Theneau Maxime à Marseille. Après une formation certifiante web, chez O’clock et une expérience de plus de 15 ans..." />
          <meta property="og:type" content="website" />
          <meta property="og:image" content="https://back.theneaumaxime.fr/public/images/webp/social.jpg" />
          <meta property="og:url" content="https://www.maxtheneau.fr" />

          {/* Favicon */}
          <link rel="icon" href="/favicon.ico" />

        </Head>

    
        {/** Modal Confirmation */}
        {state.toggleModal ? <Confirmation setToggleModalValue={setToggleModalValue} /> : ''}
          <div  className={state.toggleModal ? (styles.blur) : ''}>
                

          {/** Header Images Sticky */}
          <div className={stylesHeader['header-sticky']}  >

            { categories?.filter((image) => image.idTitle === 'accueil').map((item) => (
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
                <div
                  className={stylesHeader['header-button_close']}
                  onClick={() => {
                    setState({ ...state, toggleNav: false });
                  }}
                  >
                    <i className="icon-navbar" />                  
                  </div>
              </div>
            ) : (
              <nav className={stylesHeader.navbar}>
                <div className={stylesHeader['header-navbar-toggle']}>
                  <div 
                    className={stylesHeader['header-button_close']}
                    onClick={() => {
                        setState({ ...state, toggleNav: true });
                      }}
                    >
                      <i className="icon-x" />
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

          <main className={styles.main} >
            {
                categories?.filter((item) => item.idTitle === 'experiences').map((item) => (
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

            {/** About  */}
            {
                categories?.filter((item) => item.idTitle === 'a-propos').map((item) => (
                  <div  key={item.idTitle}>
                    {/** Title Categories */}
                    <CategoriesMain item={item} key={item.id} />
                  </div>
                ))

            }
              <div className={styles['about']}>
                <div className={styles['about']} >

                { categories?.filter((item) => item.idTitle === 'a-propos' ).map((item) => (
                  item.abouts.map((about) => (
                    <AboutMain key={about.id} about={about} />
                  ))
                ))}
                </div>

                
              </div>

          </main>

          <footer className={styles.footer} ref={contactRef}>
            
            {/** Contact */}
            {
              categories?.filter((item) => item.idTitle === 'contact').map((item) => (
                <>
                  {/** Title Categories */}
                  <CategoriesMain key={item.id} item={item} />


                  {/** Form Contact */}
                  <div className={styles['footer-form-backcground']}>
                    <h3>Contactez-moi</h3>
                    <FormContact setState={setState} state={state} />
                  </div>

                  {/** Contact List */}
                  {item.contacts.map((contact) => (
                      <FormContactList key={contact.twitter} contact={contact}  />
                  ))}
                </>
              ))
            }
            <div className={styles['footer-author']}>
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

export async function getStaticProps() {
      // Fetch data from external API
        const res = await fetch('http://back.theneaumaxime.fr/public/api/categories')
        const categories = await res.json()

        return {props:{categories: categories}}

      }

