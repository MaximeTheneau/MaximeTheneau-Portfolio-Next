//* Import
import React, { createRef } from 'react';
import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Head from 'next/head';

//* Components
import Confirmation from '../components/modal/confirmation';
import Sticky from '../components/header/sticky';
import CategoriesMain from '../components/main/categoriesMain';
import ExperiencesList from '../components/main/experiencesList';
import FormContact from '../components/footer/formContact';
import FormContactList from '../components/footer/formContactList';

//* Lib

//* Styles
import styles from '../styles/Home.module.scss';
import stylesHeader from '../styles/Header.module.scss';
import ScrollParallax from '../lib/ScrollParallax';
import useMovableElements from '../lib/useMovableElements';

export async function getStaticProps() {
  // Fetch data from external API
  const res = await fetch('http://back.theneaumaxime.fr/public/api/categories');
  const categories = await res.json();

  return { props: { categories } };
}

function Home({ categories }) {
  //* State
  const [state, setState] = useState({
    isTextVisible: false,
    toggleNav: true,
    toggleModal: false,
    loadingSticky: false,
    form: {
      name: '',
      email: '',
      subject: '',
      message: '',
      confirmation: '',
      textArea: 1,
      confirmationMessage: 'change',
      confirmationName: 'change',
      confirmationEmail: 'change',
      confirmationSubject: 'change',

    },
    transitionEffect: true,
    isInView: false,
    height: 0,
  });

  const elementTop = useRef(null);
  const [height, setHeight] = useState(0);
  useEffect(() => {
    const element = elementTop.current.getBoundingClientRect().top;
    console.log(element);
    setHeight(element);
  }, [height]);
  console.log(height);

  const handleIsInViewChange = (newIsInView) => {
    setState({ ...state, isInView: newIsInView });
  };

  const handleOnMouseEnter = (element) => {
    if (!element.children[1]) {
      const cloneElement = element.children[0].cloneNode(true);
      element.children[0].appendChild(cloneElement);
      cloneElement.classList.remove('relative');
      cloneElement.classList.add('absolute-content');
      setTimeout(
        () => {
          cloneElement.classList.add('text-hover');
        },
        10,
      );
      setTimeout(
        () => {
          cloneElement.remove();
        },
        4000,
      );
    }
    if (element.children[1] !== undefined) {
      element.children[1].classList.add('text-hover');
      setTimeout(
        () => {
          element.children[1].classList.remove('text-hover');
        },
        300,
      );
    }
  };

  //* Transition Effect
  useEffect(() => {
    setTimeout(() => {
      setState({
        ...state,
        transitionEffect: false,
      });
    }, 800);
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
      <div className={state.toggleModal ? (styles.blur) : ''}>

        {/** Header */}
        <header className="section">
          {/** Header Images Sticky */}
          <div className={stylesHeader['header-sticky']}>
            { categories?.filter((image) => image.idTitle === 'accueil').map((item) => (
              <Sticky
                key={item.id}
                imgWebp={item.imgWebp}
                alt={item.title}
                transitionEffect={state.transitionEffect}
              />
            ))}
            <div className="titleBackground">
              <h1>Theneau Maxime</h1>
              <h2>Développeur Web à Marseille</h2>
            </div>
          </div>
        </header>

        <main className={styles.main}>
          {/** About */}
          <div
            className={`section ${styles.about} ${state.isTextVisible ? 'active' : ''}}`}
          >
            <ScrollParallax onIsInViewChange={handleIsInViewChange}>
              <div>
                <h3>
                  Passionné par le développement web et le design.
                </h3>
                <p>
                  Fasciné par les possibilités offertes par le monde
                  numérique, j'ai commencé à créé mes propres sites web pour mes
                  réalisations personnelles.
                </p>
                <p>
                  Inspiré par mes premières expériences de développement, j'ai poursuivi
                  mes études dans ce domaine et suivi une formation pour acquis les
                  compétences nécessaires pour réaliser des projets de qualité.
                </p>
                <p>
                  Depuis, j'ai continué à apprendre et à me développer dans le domaine
                  du développement web et je suis maintenant à la recherche de nouvelles
                  opportunités pour mettre mes compétences et mon expérience au service de projets
                  passionnants.
                </p>
              </div>
            </ScrollParallax>

          </div>
          {
            categories?.filter((item) => item.idTitle === 'experiences').map((item) => (
              <div key={item.idTitle}>

                {/** Title Categories */}
                <ScrollParallax onIsInViewChange={handleIsInViewChange}>
                  <div className={state.isInView ? 'active wave' : ''}>
                    <CategoriesMain
                      experienceElement={state.isInView}
                      item={item}
                      key={item.id}
                    />
                  </div>
                </ScrollParallax>

                {/** Skills */}
                <div ref={elementTop}>
                  { item.experiences.map((experience) => (
                    <ExperiencesList
                      key={experience.title}
                      experience={experience}
                      handleOnMouseEnter={handleOnMouseEnter}
                    />
                  ))}
                </div>
              </div>
            ))
            }
        </main>
        <footer className={styles.footer}>

          {/** Contact */}
          {
              categories?.filter((item) => item.idTitle === 'contact').map((item) => (
                <>
                  {/** Title Categories */}
                  <ScrollParallax onIsInViewChange={handleIsInViewChange}>
                    <div className={state.isInView ? 'active wave' : ''}>
                      {/** Title Categories */}
                      <CategoriesMain key={item.id} item={item} contactElement={state.isInView} />
                    </div>
                  </ScrollParallax>

                  <ScrollParallax onIsInViewChange={handleIsInViewChange}>
                    {/** Contact List */}
                    {item.contacts.map((contact) => (
                      <FormContactList
                        key={contact.twitter}
                        contact={contact}
                        handleOnMouseEnter={handleOnMouseEnter}
                        classIsview={state.isInView}
                      />
                    ))}
                  </ScrollParallax>

                  {/** Form Contact */}
                  <div className={styles['footer-form-backcground']}>

                    <h3>Me contacter</h3>
                    <FormContact
                      setState={setState}
                      state={state}
                      handleOnMouseEnter={handleOnMouseEnter}
                    />
                  </div>
                </>
              ))
            }
        </footer>
      </div>
    </>
  );
}
export default Home;
