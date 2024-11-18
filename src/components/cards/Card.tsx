import Image from 'next/image';
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
        src={`${card.slug}.webp`}
        alt={card.altImg || card.title}
        width={330}
        height={310}
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
  );
}
