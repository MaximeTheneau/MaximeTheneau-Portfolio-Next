import Image from '@/utils/Image';
import Link from 'next/link';

type CardProps = {
  card: {

    slug: string;
    altImg?: string;
    title: string;
    url: string;
  };
};

export default function Card({ card }: CardProps) {
  return (
    <Link href={card.url} className="p-2 flex flex-col justify-between me-4 block shadow-lg rounded-lg  z-10 transition-opacity duration-300 hover:opacity-80">
      <Image
        src={`https://picture.theneaumaxime.fr/${card.slug}.webp?width=330`}
        alt={card.altImg || card.title}
        width={330}
        height={310}
        priority={false}
        srcset={undefined}
      />
      <h3>{card.title}</h3>
    </Link>
  );
}
