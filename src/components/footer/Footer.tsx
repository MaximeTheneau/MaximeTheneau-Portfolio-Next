import Link from 'next/link';
import NotCopie from '../notCopie/NotCopie';

export default function Footer() {
  return (
    <div className="flex text-white justify-around sm:flex-row flex-col p-4 leading-loose bg-secondary">
      <ul className="">
        <li>
          <h3>
            Informations
          </h3>
        </li>
        <li>
          <Link href="/A-propos">
            Qui suis-je ?
          </Link>
        </li>
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
          <Link href="https://twitter.com/MTheneau" target="_blank">
            <i className="icon-twitter" />
            Twitter
          </Link>
        </li>
      </ul>
    </div>
  );
}
