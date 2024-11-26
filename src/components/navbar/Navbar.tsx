import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [toggleNav, setToggleNav] = useState(false);

  const closeNav = () => {
    setToggleNav(false);
  };
  return (
    <nav className={`${toggleNav ? 'bg-secondary' : 'bg-whiteOpacity'} w-full z-10 fixed h-auto font-bold `}>
      <div
        aria-hidden="true"
        className="text-primary p-2 cursor-pointer"
        onClick={() => {
          setToggleNav(!toggleNav);
        }}
      >
        {toggleNav ? (
          <i className="icon-x" />
        ) : (
          <i className="icon-navbar" />
        )}
      </div>
      <div className={`${toggleNav ? 'block bg-secondary' : 'hidden bg-whiteOpacity'} fixed w-full h-full  text-center `}>
        <ul className="list-none  flex flex-col justify-between">
          <li className="border-b-2 border-slate-400 border-solid pt-2 pb-2 text-nav">
            <Link href="/" onClick={() => closeNav()}> Accueil</Link>
          </li>
          <li className="border-b-2 border-slate-400 border-solid pt-2 pb-2 text-nav">
            <Link href="/devis-en-ligne" onClick={() => closeNav()}>
              Devis en ligne
            </Link>
          </li>
          <li className="border-b-2 border-slate-400 border-solid pt-2 pb-2 text-nav">
            <Link href="/Contact" onClick={() => closeNav()}>
              Contact
            </Link>
          </li>
          <li className="border-b-2 border-slate-400 border-solid pt-2 pb-2 text-nav">
            <Link href="/A-propos" onClick={() => closeNav()}>
              Qui-suis-je ?
            </Link>
          </li>
        </ul>
      </div>
    </nav>

  );
}
