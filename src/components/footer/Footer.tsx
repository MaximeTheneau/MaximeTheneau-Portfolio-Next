import Link from 'next/link';
import NotCopie from '../notCopie/NotCopie';

export default function Footer() {
  return (
    <div className="flex justify-around sm:flex-row flex-col p-4 leading-loose bg-secondary">
      <ul className="">
        <li>
          <Link href="/" prefetch={false}>
            Maxime Freelance
          </Link>
        </li>
        <li>
          <Link href="/A-propos" prefetch={false}>
            Qui suis-je ?
          </Link>
        </li>
        <li>
          <Link href="/Foire-aux-questions" prefetch={false}>
            Foire aux questions
          </Link>
        </li>
        <li>
          <Link href="/Mentions-Legales" prefetch={false}>
            Mentions légales
          </Link>
        </li>
        <li>
          <Link href="/Creations" prefetch={false}>
            Mes projets
          </Link>
        </li>
        <li>
          <Link href="/blog" prefetch={false}>
            Blog
          </Link>
        </li>
      </ul>
      <ul>
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
          <Link href="/Contact" prefetch={false}>
            Formulaire de contact
          </Link>
        </li>
        <li className="w-16 flex justify-between leading-loose ">
          <Link href="https://fr.linkedin.com/in/maxime-theneau" className="no-underline" aria-label="Linkedin page" target="_blank" rel="noopener noreferrer" prefetch={false}>
            <i className="icon-linkedin" />
          </Link>
          {' '}
          <Link href="https://twitter.com/MTheneau" aria-label="Twitter page" className="no-underline" target="_blank" rel="noopener noreferrer" prefetch={false}>
            <i className="icon-twitter" />
          </Link>
        </li>
      </ul>
    </div>
  );
}
