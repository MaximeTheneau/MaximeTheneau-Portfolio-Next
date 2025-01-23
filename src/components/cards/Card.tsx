import Image from '@/utils/Image';
import Link from 'next/link';

type CardProps = {
  card: {
    imgPost: string;
    slug: string;
    altImg?: string;
    title: string;
    url: string;
  };
};

export default function Card({ card }: CardProps) {
  return (
    <Link
      href={card.url}
      className="p-4 m-4 sflex flex-col items-center justify-between block shadow-lg rounded-lg  bg-white relative transition-transform duration-300 hover:scale-105"
    >
      <Image
        src={`${card.imgPost}?width=330&height=330`}
        alt={card.altImg || card.title}
        width={330}
        height={330}
        priority={false}
        srcset={undefined}
      />
      <h3>{card.title}</h3>
    </Link>
  );
}
