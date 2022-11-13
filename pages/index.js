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
import Link from 'next/link';
import Image from 'next/image';


function Home ({ categories }) {

  //* State
  const [state, setState] = useState({
    toggleNav: true,
    toggleModal: false,
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

  return (
    <>
        <Head>
          <title>Theneau Maxime Développeur Web à Marseille</title>
          <meta name="description" content="Theneau Maxime dévelloppeur web à Marseille." />
          <link rel="icon" href="/favicon.ico" />

        </Head>
        {/** Modal Confirmation */}
        {state.toggleModal ? <Confirmation setState={setState} state={state} /> : ''}
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
                <div className={styles['about-content']}>
                  <h3 className={styles['about-content-text']}>
                    Passionné par le développement web et le design.
                  </h3>
                  <Image
                    src="https://avatars.githubusercontent.com/u/99042955?v=4"
                    alt="Theneau Maxime"
                    width="1000"
                    height="1000"
                    layout="fill"
                  />
                  <p className={styles['about-content-text']}>
                    Développeur depuis adolescent, j'ai toujours été attiré par le monde du web.
                    J'ai commencé par créer des sites web pour mes propres site web pour mes réalisations, puis j'ai décidé de me former pour devenir développeur web.
                  </p>
                  <div className={styles['about-cv']}>
                    <Link href="/cv-theneau-maxime.pdf">
                      <button type="button" className={styles['button']}>
                        <span>Mon CV</span>
                      </button>
                    </Link>
                  </div>
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

