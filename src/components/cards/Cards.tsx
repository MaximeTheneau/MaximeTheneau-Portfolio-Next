import { CardType } from '@/types/card.type';
import Card from './Card';

type CardsProps = {
  cards: CardType[];
};

export default function Cards({ cards }: CardsProps) {
  return (
    <ul className="flex flex-wrap justify-between items-start">
      {cards.map((card) => (
        <li className="w-[330px] w-full p-4" key={card.title}>
          <Card
            card={card}
          />
        </li>
      ))}
    </ul>

  );
}
