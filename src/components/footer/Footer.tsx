import Link from 'next/link';

export default function Footer() {
  return (
    <div className="p-4 leading-loose bg-secondary w-full ">
      <div className="flex justify-around sm:flex-row flex-col ">
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
            <Link href="/blog" prefetch={false}>
              Blog
            </Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link href="/Contact" prefetch={false}>
              Contactez-moi
            </Link>
          </li>
          <li>
            <Link href="/devis-en-ligne">
              Devis en ligne
            </Link>
          </li>

        </ul>
      </div>
      <ul className="flex w-full justify-around align-end md:w-1/2 mx-auto my-4 mb-4 ">
        <li className="">
          <Link href="https://github.com/MaximeTheneau" className="no-underline" title="Maxime Freelance sur Github" target="_blank" rel="noopener noreferrer" prefetch={false}>
            <svg width=".5em" height=".5em" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" fontSize="32px"><path fill="currentColor" d="M12 .297c-6.63 0-12 5.373-12 12c0 5.303 3.438 9.8 8.205 11.385c.6.113.82-.258.82-.577c0-.285-.01-1.04-.015-2.04c-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729c1.205.084 1.838 1.236 1.838 1.236c1.07 1.835 2.809 1.305 3.495.998c.108-.776.417-1.305.76-1.605c-2.665-.3-5.466-1.332-5.466-5.93c0-1.31.465-2.38 1.235-3.22c-.135-.303-.54-1.523.105-3.176c0 0 1.005-.322 3.3 1.23c.96-.267 1.98-.399 3-.405c1.02.006 2.04.138 3 .405c2.28-1.552 3.285-1.23 3.285-1.23c.645 1.653.24 2.873.12 3.176c.765.84 1.23 1.91 1.23 3.22c0 4.61-2.805 5.625-5.475 5.92c.42.36.81 1.096.81 2.22c0 1.606-.015 2.896-.015 3.286c0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
          </Link>
        </li>
        <li className="">
          <Link href="https://fr.linkedin.com/in/maxime-theneau" className="no-underline" title="Maxime Freelance sur Linkedin" target="_blank" rel="noopener noreferrer" prefetch={false}>
            <svg width=".5em" height=".5em" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" fontSize="32px"><path fill="currentColor" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037c-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85c3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.06 2.06 0 0 1-2.063-2.065a2.064 2.064 0 1 1 2.063 2.065m1.782 13.019H3.555V9h3.564zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z" /></svg>
          </Link>
        </li>
        <li className="">
          <Link href="https://www.malt.fr/profile/maximefreelance" className="no-underline" title="Maxime Freelance sur Malt" target="_blank" rel="noopener noreferrer" prefetch={false}>
            <svg viewBox="0 0 512 512" width=".5em" height=".5em" aria-hidden="true" fontSize="32px">
              <path fill="currentColor" d="M408.4 103.8c-32.5-32.4-67.1-11.4-88.8 10.2L114.8 318.8c-21.7 21.7-44.4 54.7-10.2 88.8 34.1 34.1 67 11.4 88.7-10.3l204.8-204.8c21.7-21.6 42.7-56.3 10.3-88.7m-195.7-8.4 43.4 43.4 44.1-44.2c3-3 6-5.8 9.1-8.4-4.6-23.3-17.9-44.4-53.3-44.4S207.3 63 202.8 86.3c3.3 2.9 6.6 5.8 9.9 9.1m87.5 322.1-44.1-44.1-43.4 43.3c-3.3 3.3-6.5 6.4-9.8 9.2 5 23.8 19 45.5 53.1 45.5 34.2 0 48.3-21.9 53.2-45.7-3-2.6-6-5.2-9-8.2m-105.9-217h-83.6c-30.7 0-70 9.7-70 55.5 0 34.3 21.9 48.3 45.8 53.2 2.8-3.2 107.8-108.7 107.8-108.7m231.5 2.3c-2.6 3-107.9 108.8-107.9 108.8h82.4c30.7 0 70-7.3 70-55.6 0-35.3-21.1-48.6-44.5-53.2m-204.1-29.7 14.9-14.9-43.3-43.4c-21.7-21.7-54.6-44.4-88.8-10.2-25 25-19.4 49.4-6.2 69.1 4.1-.3 123.4-.6 123.4-.6M290.4 339l-15 15 44.2 44.1c21.7 21.7 56.3 42.7 88.7 10.3 24.2-24.2 18.7-49.7 5.3-70-4.3.3-123.2.6-123.2.6" />
            </svg>

          </Link>
        </li>
        <li>
          <Link href="https://x.com/MTheneau" title="Maxime Freelance sur X (Twitter)" className="no-underline" target="_blank" rel="noopener noreferrer" prefetch={false}>
            <svg width=".5em" height=".5em" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" fontSize="32px"><path fill="currentColor" d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584l-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" /></svg>
          </Link>
        </li>
        <li>
          <Link href="https://www.facebook.com/maximefreelance" title="Maxime Freelance sur Facebook" className="no-underline" target="_blank" rel="noopener noreferrer" prefetch={false}>
            <svg width=".5em" height=".5em" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" fontSize="32px"><path fill="currentColor" d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978c.401 0 .955.042 1.468.103a9 9 0 0 1 1.141.195v3.325a9 9 0 0 0-.653-.036a27 27 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.7 1.7 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103l-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647" /></svg>
          </Link>
        </li>
        <li>
          <Link href="https://www.youtube.com/channel/UCXyVGB9DU55A9EhdERxyWKg" title="Maxime Freelance sur YouTube" className="no-underline" target="_blank" rel="noopener noreferrer" prefetch={false}>
            <svg width=".5em" height=".5em" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" fontSize="32px"><path fill="currentColor" d="M23.498 6.186a3.02 3.02 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.02 3.02 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.02 3.02 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.02 3.02 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814M9.545 15.568V8.432L15.818 12z" /></svg>
          </Link>
        </li>
      </ul>
      <hr className=" border-b border-solid border-gray-200 my-4" />

      <ul className="   text-center w-full ">
        <li className="inline-block mr-4">
          <Link href="/Foire-aux-questions" prefetch={false}>
            Foire aux questions (FAQ)
          </Link>
        </li>
        <li className="inline-block mr-4">
          <Link href="/Creations" prefetch={false}>
            Mes projets
          </Link>
        </li>
        <li className="inline-block mr-4">
          <Link href="/Mentions-Legales" prefetch={false}>
            Mentions légales
          </Link>
        </li>
      </ul>
      <p className="text-center italic text-sm mt-4 text-gray-600">
        Maxime Freelance - SIRET : 532 206 380 00034 - Marseille
      </p>
    </div>
  );
}
