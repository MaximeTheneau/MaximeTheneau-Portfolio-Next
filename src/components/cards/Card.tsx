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
    <Link href={card.url} className="p-2 flex flex-col items-center justify-between  me-4 block shadow-lg rounded-lg  z-10 transition-opacity duration-300 hover:opacity-80">
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
