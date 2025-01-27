import { CardType } from '@/types/card.type';
import Card from './Card';

type CardsProps = {
  cards: CardType[];
};

export default function Cards({ cards }: CardsProps) {
  return (
    <ul className="flex flex-wrap justify-center ">
      {cards.map((card) => (
        <li
          key={card.title}
          className="w-[150px] md:w-[330px]  m-2 transform transition-all  "
        >
          <Card card={card} />
        </li>
      ))}
    </ul>
  );
}
