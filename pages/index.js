import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import stylesHeader from '../styles/Header.module.scss'
import { useState } from 'react'

export default function Home({categories}) {
  const [toggleNav, setToggleNav] = useState(true);
  return (
    <div className={styles.container}>
      <Head>
        <title>Theneau Maxime Développeur Web à Marseille</title>
        <meta name="description" content="Theneau Maxime dévelloppeur web à Marseille." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        {/** Header Images Sticky */}
        { categories?.filter((item) => item.idTitle === '#Accueil').map((item) => (
          <div key={item.id} id={item.title} >
              <picture>
                <source srcSet={item.imgWebp} type="image/webp" />
                <img src={item.imgSvg} alt={item.title}  className={styles["header-sticky"]} />
              </picture>
            </div>
          ))
        }
        {/** Header Navbar */}
        <header className={styles.header}>
         {toggleNav ? (
          <div className={styles["header-navbar-toggle"]}>
            <div className={styles["header-button_close"]} >
              <button
                type="button"
                id="button_nav"
                title="Fermer le menu"
                onClick={() => {
                  setToggleNav(value => !value);
                }}
              >
                <i className="icon-navbar" />
              </button>
            </div>
          </div>
        ) : (
          <nav className={styles["navbar"]} >
            <div className={styles["header-navbar-toggle"]} >
              <div className={styles["header-button_close"]} >
                <button
                  type="button"
                  onClick={() => setToggleNav(value => !value)}
                >
                  <i className="icon-x" />
                </button>
              </div>
            </div>
            <ul className={styles["header-navbar"]} >
              {
                categories?.map((item) => (
                  <a href={item.idTitle}>
                    <li
                      className={styles["header-navbar-item"]} 
                      onClick={() => {
                        setToggleNav(value => !value);
                      }}
                    >{item.title}
                    </li>
                  </a>
                ))
              }
            </ul>
          </nav>
            )}
              <ul className={styles['header-navbar-720']}>
          {
            categories?.map((item) => (
              <a href={item.idTitle}>
                <li>{item.title}</li>
              </a>
            ))
          }
        </ul>
      </header>

      <main className={styles.main}>
        <h2 className={styles['home-title']}>Theneau Maxime</h2>
        <h3 className={styles['home-subtitle']}>Développeur Web - FrontEnd - React.Js</h3>
        <div className={styles['home-location']}>
          <i className="icon-location" />
          <p>Marseille</p>
        </div>
        {   
            categories?.filter((item) => item.idTitle === '#Projet').map((item) => (
                <div key={item.id} className={styles['home-picture']}>
                  <div key={item.id} id={item.title}>
                    <picture>
                      <source srcSet={item.imgWebp} type="image/webp" />
                      <img src={item.imgSvg} alt={item.title} className={styles["home-picture-title"]} />
                    </picture>
                  </div>
                  <h1 id={item.title} className={styles["home-title"]}>{item.title}</h1>
                  { item.experiences.map((experience) => (
                    <div key={experience.id} id={experience.idTitle} className={styles["home-picture-experience"]}>
                      <picture>
                        <source srcSet={experience.imageWebp} type="image/webp" />
                        <img src={experience.imageSvg} alt={item.title} />
                      </picture>
                      <h2>{experience.title}</h2>
                      <h3>{experience.contents}</h3>
                      <p>{experience.contents2}</p>
                      <a href={experience.contents3}>
                        <i className="icon-github" />
                      </a>

                    </div>
                  ))}
                </div>
              ))
        }

      <hr />

      {
          categories.filter((item) => item.idTitle === '#Contact').map((item) => (
            <>
              <div key={item.id} className={styles["home-picture"]}>
                <picture>
                  <source srcSet={item.imgWebp} type="image/webp" />
                  <img src={item.imgSvg} alt={item.title} className="home-picture-title" />
                </picture>
                <h2 key={item.id} className="home-title" id={item.title}>{item.title}</h2>
              </div>
              <div className="home-contact">
                <h2 className="home-contact-title">Thenau Maxime</h2>
                <h3 className="home-contact-subtitle">Marseille </h3>
                {item.contacts.map((contact) => (
                  <div key={contact.idTitle} className="home-contact-list-social">
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
            </>
          ))
        }
    </main>
    </div>
  )
}

export async function getStaticProps () {
  const categories = await fetch('https://back-portofolio.unetaupechezvous.fr/public/api/categories')
      .then((res) => res.json())
  return {props : {categories}}
}