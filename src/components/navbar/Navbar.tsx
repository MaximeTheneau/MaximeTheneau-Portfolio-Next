import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [toggleNav, setToggleNav] = useState(false);

  const closeNav = () => {
    setToggleNav(false);
  };

  const navItems = [
    { href: '/', label: 'Accueil' },
    { href: '/devis-en-ligne', label: 'Devis en ligne' },
    { href: '/Contact', label: 'Contact' },
    { href: '/A-propos', label: 'Qui-suis-je ?' },
  ];

  return (
    <nav className={`${toggleNav ? 'bg-secondary' : 'bg-whiteOpacity'} w-full z-10 fixed h-auto font-bold`}>
      <div
        aria-hidden="true"
        className="p-2 cursor-pointer"
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
      <div
        className={`${
          toggleNav
            ? 'block opacity-100 translate-y-0 bg-secondary '
            : 'opacity-0 translate-y-[-110%] '
        }  fixed w-full h-full text-center transition-all duration-500 ease-out`}
      >
        <ul className="list-none flex flex-col justify-between ">
          {navItems.map((item, index) => (
            <li
              key={item.label}
              className="border-b-2 border-stone-100 border-solid pt-2 pb-2 text-nav  transform transition-opacity duration-500 ease-in-out"
              style={{ animationDelay: `${0.2 * index}s` }}
            >
              <Link href={item.href} onClick={closeNav}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
