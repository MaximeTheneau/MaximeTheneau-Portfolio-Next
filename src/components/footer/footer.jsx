import Link from 'next/link';
import styles from './Footer.module.scss';
import AnimationHover from '../../hooks/useTextAnimation/CloneTextWrapper';

export default function Footer() {
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
            <Link href="/articles">
              Articles
            </Link>
          </li>
        </ul>
        <ul>
          <li>
            <h3>Contact</h3>
          </li>
          <li className="notCopie" onMouseDown={(e) => e.preventDefault()}>
            maxime @ theneaumaxime.fr
          </li>
          <li>
            <Link href="/contact">
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

          {/* <li>
            <Link href="https://www.facebook.com/unetaupechezvous/" target="_blank">
                <i className="icon-facebook" />
                Facebook
            </Link>
          </li> */}
        </ul>
      </div>
    </div>
  );
}
