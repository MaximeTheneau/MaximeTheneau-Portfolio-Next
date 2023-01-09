//* Import
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Head from 'next/head';

//* Components
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
import ScrollParallaxText from '../lib/ScrollParallaxText';

export async function getStaticProps() {
  // Fetch data from external API
  const res = await fetch('http://back.theneaumaxime.fr/public/api/categories');
  const categories = await res.json();

  const resExperiences = await fetch('http://back.theneaumaxime.fr/public/api/experiences');
  const experiences = await resExperiences.json();

  return { props: { categories, experiences } };
}

function Home({ categories, experiences }) {
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

  const handleIsInViewChange = (newIsInView) => {
    setState({ ...state, isInView: newIsInView });
  };

  const handleChangeOpacityText = (isTopChange) => {
    setState({ ...state, textOpacity: isTopChange });
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
  });

  return (
    <>
      <Head>
        <title>Theneau Maxime Développeur Web à Marseille</title>
        <meta name="description" content="Découvrez les compétences et services de développement web de [Nom], un développeur junior talentueux et passionné. Que vous ayez besoin de créer un site ou une application web, n'hésitez pas à le contacter pour obtenir un devis gratuit et découvrir comment il peut vous aider à atteindre vos objectifs." />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Theneau Maxime Développeur Web à Marseille" />
        <meta property="og:description" content="Découvrez les compétences et services de développement web de [Nom], un développeur junior talentueux et passionné. Que vous ayez besoin de créer un site ou une application web, n'hésitez pas à le contacter pour obtenir un devis gratuit et découvrir comment il peut vous aider à atteindre vos objectifs." />
        <meta property="og:site_name" content="https://theneaumaxime.fr" />
        <meta property="og:image" content={imageForMeta[0]} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

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
          <ScrollParallaxText onTopChange={handleChangeOpacityText}>
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
