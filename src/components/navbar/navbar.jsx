import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from './Navbar.module.scss';
import SvgLogo from '../../asset/svg/logo-une-taupe-chez-vous.svg';
import AnimationHover from '../../hooks/useTextAnimation/CloneTextWrapper';
import Image from 'next/image';

export default function Navbar() {
  const [toggleNav, setToggleNav] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);

  useEffect(() => {
    let prevScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (prevScrollY > currentScrollY) {
        setIsNavVisible(true);
      } else {
        setIsNavVisible(false);
      }

      prevScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleMouseLeave = () => {
      toggleNav === true ? (setTimeout(() => (
        setToggleNav(false)
      ), 5500)) : null
  };
  return (
    <>
      { 
      /**
       * Navbar for tablet and desktop
       * @media screen and (min-width: 720px)
       * @see Navbar.module.scss
       */ 
      }
      <nav className={` ${isNavVisible ? styles.navbar__720+ ' ' + styles.navbar : styles['navbar--hidden']}`} >
        {/** Logo */}
        <Link href="/">
          {/* <SvgLogo className={styles.navbar__720__logo} /> */}
          Accueil
        </Link>
        <ul className={styles.navbar__720__list}>
          {/** Link */}
            {/* <li className={styles['navbar__720__list-item']}>
              <Link href="/Taupier-agree-professionnel-depuis-1994">
                  Qui-sommes-nous
              </Link>
            </li> */}
          {/** Link */}
            <li className={styles['navbar__720__list-item']}>
              <Link href="/contact">
                  Contact
              </Link>
            </li>
        </ul>
      </nav>
      {
        /**
         * Navbar for mobile
         * @media screen and (max-width: 720px)
         * @see Navbar.module.scss
         */
       }
      <nav
        className={`${styles.navbar__responsive} ${styles.navbar}`}
        onMouseLeave={handleMouseLeave}
      >
        <div
          aria-hidden="true"
          className={styles.navbar__responsive__toggle}
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
        {toggleNav ? (
          <ul
            className={styles.navbar__responsive__list}
            role="presentation"
            onClick={(() => setTimeout(() => (
              setToggleNav(false)
            ), 500)
            )}
          >
            {/* <Link href="/">
              <li className={styles['navbar__responsive__list-item']}>
                <span className={styles['navbar__responsive__list-item-link']}>Accueil</span>
              </li>
            </Link>
            <Link href="/Taupier-agree-professionnel-depuis-1994">
              <li className={styles['navbar__responsive__list-item']}>
                <span className={styles['navbar__responsive__list-item-link']}>Qui-sommes-nous</span>
              </li>
            </Link> */}
              <li className={styles['navbar__responsive__list-item']}>
                <Link href="/contact">
                  <span className={styles['navbar__responsive__list-item-link']}>Contact</span>
                </Link>
              </li>
          </ul>
        ) : ''}
      </nav>

    </>

  );
}
