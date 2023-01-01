//* Import
import React from 'react';
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
import useColorText from '../lib/useColorText';
import useScrollClass from '../lib/useScrollClass';
import TextBlocker from '../components/main/TextBlocker';
import useIntersectionObserver from '../lib/useIntersectionObserver';

//* Styles
import styles from '../styles/Home.module.scss';
import stylesHeader from '../styles/Header.module.scss';

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
  });
 //  const refHeader = useRef(null);
  const refExperience = useRef(null);
  const refContact = useRef(null);

  const [refHeader] = useIntersectionObserver({
    threshold: 0.0,
  });
  // const refText = useRef(null);
  const hasClassContact = useScrollClass(refContact, 'active');
  const hasClassHeader = useScrollClass(refHeader, 'activeHeader');
  const hasClassExperience = useScrollClass(refExperience, 'active');

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
        <header className="section" ref={refHeader} className={hasClassHeader ? 'activeHeader' : ''}>
          {/** Header Images Sticky */}
          <div className={stylesHeader['header-sticky']}>
            { categories?.filter((image) => image.idTitle === 'accueil').map((item) => (
              <Sticky
                key={item.id}
                imgWebp={item.imgWebp}
                alt={item.title}
                headerClass={hasClassHeader}
                headerElement={refHeader}
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

          </div>
          {
            categories?.filter((item) => item.idTitle === 'experiences').map((item) => (
              <div key={item.idTitle}>

                {/** Title Categories */}
                <div ref={refExperience} className={hasClassExperience ? 'active' : ''}>
                  <CategoriesMain
                    experienceElement={hasClassExperience}
                    item={item}
                    key={item.id}
                  />
                </div>

                {/** Skills */}
                { item.experiences.map((experience) => (
                  <ExperiencesList key={experience.title} experience={experience} />
                ))}
              </div>
            ))
            }
        </main>

        <footer className={styles.footer}>

          {/** Contact */}
          {
              categories?.filter((item) => item.idTitle === 'contact').map((item) => (
                <>
                  <div ref={refContact} className={hasClassContact ? 'active' : ''}>
                    {/** Title Categories */}
                    <CategoriesMain key={item.id} item={item} contactElement={hasClassContact} />
                  </div>

                  {/** Contact List */}
                  {item.contacts.map((contact) => (
                    <FormContactList key={contact.twitter} contact={contact} />
                  ))}

                  {/** Form Contact */}
                  <div className={styles['footer-form-backcground']}>
                    <Link href="/cv-theneau-maxime.pdf" target="_blank">
                      <button type="button" className={styles.button}>
                        <span>Mon CV</span>
                      </button>
                    </Link>
                    <h3>Me contacter</h3>
                    <FormContact setState={setState} state={state} />
                  </div>

                </>
              ))
            }
          <div className={styles['footer-author']}>
            <p>
              Site réaliser par
              {' '}
              <i className="icon-signature" />
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
export default Home;
