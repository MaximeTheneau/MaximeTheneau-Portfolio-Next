import Image from 'next/image';
import Link from 'next/link';
import styles from './Card.module.scss';
import SlideTransition from '../../hooks/useSlideTransition/SlideTransition';
import imageLoaderFull from '../../utils/imageLoaderFull';
import imageThumbnail from '../../utils/imageThumbnail';

export default function card({ card, path }) {
 const pathCard = card.subcategory ? path+'/'+card.subcategory.slug : path;
  return (
    <SlideTransition
      className={styles.card}
    >
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
    </SlideTransition>
  );
}
