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
          <Link href="/Mentions-Legales">
            Mentions légales
          </Link>
        </li>
        <li>
          <Link href="/Creations">
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
          <strong><a href="tel:+33622068036">06 22 06 80 36</a></strong>
        </li>
        <li>
          <Link href="/devis-en-ligne">
            Demande de devis en ligne
          </Link>
        </li>
        <li>
          <Link href="/Contact">
            Formulaire de contact
          </Link>
        </li>
        <li className="w-16 flex justify-between">
          <Link href="https://fr.linkedin.com/in/maxime-theneau" tria-label="Linkedin page" target="_blank" rel="noopener noreferrer" prefetch={false}>
            <i className="icon-linkedin" />
          </Link>
          {' '}
          <Link href="https://twitter.com/MTheneau" tria-label="Twitter page" target="_blank" rel="noopener noreferrer" prefetch={false}>
            <i className="icon-twitter" />
          </Link>
        </li>
      </ul>
    </div>
  );
}
