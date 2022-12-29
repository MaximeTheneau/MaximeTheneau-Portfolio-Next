//* Import
import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';

//* Components
import Confirmation from '../components/modal/confirmation';
import Sticky from '../components/header/sticky';
import CategoriesMain from '../components/main/categoriesMain';
import ExperiencesList from '../components/main/experiencesList';
import FormContact from '../components/footer/formContact';
import FormContactList from '../components/footer/formContactList';

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
              />
            ))}
            <div className={stylesHeader['header-sticky-content']}>
              <h1 className={styles['home-title']}>Theneau Maxime</h1>
              <h2 className={styles['home-subtitle']}>Développeur Web à Marseille</h2>
            </div>
          </div>
        </header>

        <main className={styles.main}>
          {/** About */}
          <div className={`section ${styles.about}`}>
            <div className={styles['about-content']}>
              <h3 className={styles['about-content-text']}>
                Passionné par le développement web et le design.
              </h3>
              <p className={styles['about-content-text']}>
                Développeur depuis adolescent, j'ai toujours été attiré par le monde du web.
                J'ai commencé par créer des sites web pour mes propres site web pour mes
                réalisations, puis j'ai décidé de me former pour devenir développeur web.
              </p>
              <div className={styles['about-cv']}>
                <Link href="/cv-theneau-maxime.pdf">
                  <button type="button" className={styles.button}>
                    <span>Mon CV</span>
                  </button>
                </Link>
              </div>
            </div>

          </div>
          {
                categories?.filter((item) => item.idTitle === 'experiences').map((item) => (
                  <div key={item.idTitle}>

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

        <footer className={styles.footer}>

          {/** Contact */}
          {
              categories?.filter((item) => item.idTitle === 'contact').map((item) => (
                <>
                  {/** Title Categories */}
                  <CategoriesMain key={item.id} item={item} />

                  {/** Form Contact */}
                  <div className={`section ${styles['footer-form-backcground']}`}>
                    <h3>Contactez-moi</h3>
                    <FormContact setState={setState} state={state} />
                  </div>

                  {/** Contact List */}
                  {item.contacts.map((contact) => (
                    <FormContactList key={contact.twitter} contact={contact} />
                  ))}
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
