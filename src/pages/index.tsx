//* Import
import * as React from 'react';
import PropTypes from 'prop-types';
import { cloneElement, useEffect, useState } from 'react';
import Head from 'next/head';

//* Components
import Sticky from '../components/header/sticky';
import CategoriesMain from '../components/main/categoriesMain';
import ExperiencesList from '../components/main/experiencesList';
import FormContact from '../components/footer/formContact';
import FormContactList from '../components/footer/formContactList';

//* Lib

//* Styles
import styles from '../components/main/Home.module.scss';
import ScrollParallaxWave from '../hooks/useMovableElement/wave/ScrollParallaxWave';
import ScrollParallaxText from '../hooks/useMovableElement/textOpacity/ScrollParallaxText';
import Script from 'next/script';

export async function getStaticProps() {
  // Fetch data from external API
  const res = await fetch('http://back.theneaumaxime.fr/public/api/categories');
  const categories = await res.json();

  const resExperiences = await fetch('http://back.theneaumaxime.fr/public/api/experiences');
  const experiences = await resExperiences.json();

  const accueil = categories?.filter((image) => image.idTitle === 'accueil')[0];

  return { props: { categories, experiences, accueil } };
}

type Props = {
  categories: any;
  experiences: any;
  accueil: any;
};


const Home = ({ categories, experiences, accueil }: Props) => {
  //* State
  const [state, setState] = useState({
    isTextVisible: false,
    toggleNav: true,
    toggleModal: false,
    loadingSticky: false,
    transitionEffect: true,
    isInView: false,
    textOpacity: 1,
  });

  const imageForMeta = experiences?.map((item) => (item.imageSvg));


  const handleChangeOpacityText = (isTopChange) => {
    setState({ ...state, textOpacity: isTopChange });
  };

  const handleOnMouseEnter = (element) => {
      const cloneElement = element.children[0].cloneNode(true);
      element.appendChild(cloneElement);
      cloneElement.classList.remove('textAnimation');
      cloneElement.classList.add('absolute-content');
      cloneElement.classList.add('textAnimation_hover');
      element.children[0].classList.add('textAnimation');
    setTimeout(() => {
        cloneElement.remove();
        element.children[0].classList.remove('textAnimation');
      }, 1200);
  };

  //* Transition Effect
  useEffect(() => {
    setTimeout(() => {
      setState({
        ...state,
        transitionEffect: false,
      });
    }, 800);
  });

  const descriptionMeta = "Découvrez les compétences et services de développement web de Theneau Maxime, un développeur Front-End. Que vous ayez besoin de créer un site ou une application web, n'hésitez pas à le contacter.";

  const jsonData = { 
    context: 'https://schema.org',
    type: 'Service',
    name: accueil.title,
    url: `${process.env.NEXT_PUBLIC_URL}`,
    description: descriptionMeta,
    category: 'Services, Web, Développement, React, Next.js, Js',
    // image: `${process.env.NEXT_PUBLIC_CLOUD_URL}/${process.env.NEXT_PUBLIC_CLOUD_FILE_KEY}/Accueil.jpg`,
    sameA: [
      'https://www.linkedin.com/in/theneau-maxime/',
      'https://twitter.com/MTheneau',
      'https://github.com/MaximeTheneau'
    ],
  };
  return (
    <>
      <Head>
        <title>Theneau Maxime Développeur Web à Marseille</title>
        <meta name="description" content={descriptionMeta} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={accueil.title} />
        <meta property="og:description" content={descriptionMeta} />
        <meta property="og:site_name" content={process.env.NEXT_PUBLIC_URL} />
        <meta property="og:image" content={imageForMeta[0]} />
        <link
          rel="canonical"
          href={process.env.NEXT_PUBLIC_URL}
          key="canonical"
        />
      </Head>
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonData) }}
        id="jsonld-schema"
        defer
      />


      {/** Header */}
      <header className="section">
        {/** Header Images Sticky */}
          { categories?.filter((image) => image.idTitle === 'accueil').map((item) => (
            <Sticky
              key={item.id}
              imgWebp={item.imgWebp}
              alt={item.title}
              transitionEffect={state.transitionEffect}
            />
          ))}
          <div className="titleBackground" >
            <h1>Theneau Maxime</h1>
            <h2>Développeur Web à Marseille</h2>
          </div>
      </header>

      <main className={styles.main}>
        {/** About */}
        <div
          className={`section ${styles.about} ${state.isTextVisible ? 'active' : ''}}`}
        >
          <ScrollParallaxText >
            <div>
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
          </ScrollParallaxText>

        </div>
        {
            categories?.filter((item) => item.idTitle === 'experiences').map((item) => (
              <div key={item.idTitle}>

                {/** Title Categories */}
                <ScrollParallaxWave >
                    {/** Title Categories */}
                    <CategoriesMain key={item.id} item={item} contactElement={state.isInView} />
                </ScrollParallaxWave>

                {/** Skills */}
                { experiences?.map((experience) => (
                  <ExperiencesList
                    key={experience.title}
                    experience={experience}
                    handleOnMouseEnter={handleOnMouseEnter}
                  />
                ))}
              </div>
            ))
            }
      </main>
      <footer className={styles.footer}>

        {/** Contact */}
        {
              categories.filter((item) => item.idTitle === 'contact').map((item) => (
                <>
                  {/** Title Categories */}
                  <ScrollParallaxWave>
                      {/** Title Categories */}
                      <CategoriesMain key={item.id} item={item} contactElement={state.isInView} />
                  </ScrollParallaxWave>

                  
                    {/** Contact List */}
                    {item.contacts.map((contact) => (
                      <FormContactList
                        key={contact.twitter}
                        contact={contact}
                        handleOnMouseEnter={handleOnMouseEnter}
                        classIsview={state.isInView}
                      />
                    ))}

                  {/** Form Contact */}
                  <div className={styles['footer-form-backcground']}>

                    <h3>Me contacter</h3>
                    <FormContact
                      handleOnMouseEnter={handleOnMouseEnter}
                    />
                  </div>
                </>
              ))
            }
      </footer>
    </>
  );
}
export default Home;

Home.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    idTitle: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    imgWebp: PropTypes.string.isRequired,
    imgJpg: PropTypes.string.isRequired,
    contacts: PropTypes.arrayOf(PropTypes.shape({
      twitter: PropTypes.string.isRequired,
      github: PropTypes.string.isRequired,
      linkedin: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    })).isRequired,
  })).isRequired,
  experiences: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    skills: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      imgWebp: PropTypes.string.isRequired,
      imgJpg: PropTypes.string.isRequired,
    })).isRequired,
  })).isRequired,
};
