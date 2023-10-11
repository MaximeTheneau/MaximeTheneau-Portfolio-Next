import Link from 'next/link';
import styles from './Footer.module.scss';
import NotCopie from '../notCopie/NotCopie';

export default function Footer(): JSX.Element {
  return (
    <div className={styles.footer}>
      <div className={styles.footer__links}>
        <ul>
          <li>
            <h3>
              Informations
            </h3>
          </li>
          {/* <li>
            <Link href="/contact">
                Contact
            </Link>
          </li> */}
          <li>
            <Link href="/Foire-aux-questions">
              Foire aux questions
            </Link>
          </li>
          <li>
            <Link href="/Mentions-legales">
              Mentions légales
            </Link>
          </li>
          <li>
            <Link href="/Creation">
              Mes projets
            </Link>
          </li>
        </ul>
        <ul>
          <li>
            <h3>Contact</h3>
          </li>
          <li>
            <NotCopie />
          </li>
          <li>
            <Link href="/Contact">
              Formulaire de contact
            </Link>
          </li>
          <li>
            <Link href="https://fr.linkedin.com/in/maxime-theneau" target="_blank">
              <i className="icon-linkedin" />
              Linkedin
            </Link>
          </li>
          <li>
            <Link href="https://twitter.com/maximethe" target="_blank">
              <i className="icon-twitter" />
              Twitter
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
