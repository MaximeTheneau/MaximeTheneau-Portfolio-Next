import Image from 'next/image';
import Link from 'next/link';
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
    <li className="sm:w-1/3 w-full p-4 ">
      <Link href={`/${pathCard}/${card.slug}`} className="p-2 flex flex-col justify-between me-4 block shadow-lg rounded-lg ">
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
            height: '202px',
            objectFit: 'contain',
          }}
        />
        <h3>{card.title}</h3>
      </Link>
    </li>
  );
}
