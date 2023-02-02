import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Home.module.scss';

type Props = {
  about: {
    content: string,
    imgWebp: string,
    contents2: string,
  }
}

const AboutMain = ({ about }: Props) => {
  return (
    <div className={styles['about-content']}>
      <p className={styles['about-content-italic']}>
        {about.content}
      </p>
      <Image
        src={about.imgWebp}
        alt="Theneau Maxime"
        width="1000"
        height="1000"
        fill
      />
      <p>
        {about.contents2}
      </p>
      <div className={styles['about-cv']}>
        <Link href="/cv-theneau-maxime.pdf">
          <button type="button" className={styles.button}>
            <span>Mon CV</span>
          </button>
        </Link>

      </div>

    </div>

  );
}

export default AboutMain;