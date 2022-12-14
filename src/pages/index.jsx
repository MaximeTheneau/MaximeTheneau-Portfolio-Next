//* Import
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
import styles from '../styles/Home.module.scss';
import stylesHeader from '../styles/Header.module.scss';
import ScrollParallaxWave from '../lib/ScrollParallaxWave';
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

  return (
    <>
      <Head>
        <title>Theneau Maxime D??veloppeur Web ?? Marseille</title>
        <meta name="description" content="D??couvrez les comp??tences et services de d??veloppement web de [Nom], un d??veloppeur junior talentueux et passionn??. Que vous ayez besoin de cr??er un site ou une application web, n'h??sitez pas ?? le contacter pour obtenir un devis gratuit et d??couvrir comment il peut vous aider ?? atteindre vos objectifs." />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Theneau Maxime D??veloppeur Web ?? Marseille" />
        <meta property="og:description" content="D??couvrez les comp??tences et services de d??veloppement web de [Nom], un d??veloppeur junior talentueux et passionn??. Que vous ayez besoin de cr??er un site ou une application web, n'h??sitez pas ?? le contacter pour obtenir un devis gratuit et d??couvrir comment il peut vous aider ?? atteindre vos objectifs." />
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
          <div className="titleBackground" >
            <h1>Theneau Maxime</h1>
            <h2>D??veloppeur Web ?? Marseille</h2>
          </div>
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
                Fascin?? par les possibilit??s offertes par le monde
                num??rique, j'ai commenc?? ?? cr???? mes propres sites web pour mes
                r??alisations personnelles.
              </p>
              <p>
                Inspir?? par mes premi??res exp??riences de d??veloppement, j'ai poursuivi
                mes ??tudes dans ce domaine et suivi une formation pour acquis les
                comp??tences n??cessaires pour r??aliser des projets de qualit??.
              </p>
              <p>
                Depuis, j'ai continu?? ?? apprendre et ?? me d??velopper dans le domaine
                du d??veloppement web et je suis maintenant ?? la recherche de nouvelles
                opportunit??s pour mettre mes comp??tences et mon exp??rience au service de projets
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
