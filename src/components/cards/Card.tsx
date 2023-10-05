import Image from 'next/image';
import Link from 'next/link';
import styles from './Card.module.scss';
import imageThumbnail from '../../utils/ImageThumbnail';

type CardProps = {
  card: {
    subcategory: {
      slug: string;
    };
    slug: string;
    altImg?: string;
    title: string;
  };
  path: string;
};

export default function Card({ card, path }: CardProps) {
  const pathCard = card.subcategory ? `${path}/${card.subcategory.slug}` : path;
  return (
    <li className={styles.card}>
      <Link href={`/${pathCard}/${card.slug}`}>
        <Image
          src={`${card.slug}.webp`}
          alt={card.altImg || card.title}
          width={330}
          height={310}
          loader={imageThumbnail}
          quality={70}
          sizes="100vw"
          style={{
            width: '100%',
            height: 'auto',
          }}
        />
        <h3 className={styles.card__content}>{card.title}</h3>
      </Link>
    </li>
  );
}
