import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from '../../styles/Home.module.scss';

export default function FormContactList({ contact, handleOnMouseEnter, classIsview }) {
  let timer;

const values = [10, 20, 30, 40, 50]; // tableau des valeurs du minuteur
let index = 0; // index du tableau des valeurs

function startTimer() {
  console.log(values[index]); // afficher la valeur courante du minuteur

  index++; // passer à la valeur suivante

  if (index >= values.length) {
    // si l'index est supérieur ou égal à la longueur du tableau, réinitialiser l'index
    index = 0;
  }
}

// démarrer le minuteur toutes les 1000ms (1 seconde)
  timer = setInterval(startTimer, 2000);

// arrêter le minuteur
  clearInterval(timer);
  console.log(timer);
  return (
    <div className={styles.footer__contact}>
      <div className={styles.footer__contact__listSocial}>
        <a
          href={contact.email}
          target="_blank"
          rel="noreferrer"
          onMouseEnter={(e) => handleOnMouseEnter(e.currentTarget)}
          className={classIsview ? 'slideAnimation' : ''}
        >
          <div className="relative">
            <i className="icon-email" />
          </div>
        </a>
        <a
          href={contact.Github}
          target="_blank"
          rel="noreferrer"
          onMouseEnter={(e) => handleOnMouseEnter(e.currentTarget)}
          className={classIsview ? 'slideAnimation' : ''}
          style={{ animationDelay: '1s'}}
        >
          <div className="relative">
            <i className="icon-github" />
          </div>
        </a>
        <a
          href={contact.Linkedin}
          target="_blank"
          rel="noreferrer"
          onMouseEnter={(e) => handleOnMouseEnter(e.currentTarget)}
          className={classIsview ? 'slideAnimation' : ''}
          style={{ animationDelay: '2s'}}
        >
          <div className="relative">
            <i className="icon-linkedin" />
          </div>
        </a>
        <a
          href={contact.twitter}
          target="_blank"
          rel="noreferrer"
          onMouseEnter={(e) => handleOnMouseEnter(e.currentTarget)}
          className={classIsview ? 'slideAnimation' : ''}
          style={{ animationDelay: '3s'}}
        >
          <div className="relative">
            <i className="icon-twitter" />
          </div>
        </a>
      </div>
      <button
        type="button"
        className={styles.button}
        onMouseEnter={(e) => handleOnMouseEnter(e.currentTarget)}
      >
        <div className="relative">
          <Link href="/cv-theneau-maxime.pdf" target="_blank">
            <span>Mon CV</span>
          </Link>
        </div>
      </button>
    </div>
  );
}
