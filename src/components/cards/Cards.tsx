import { CardType } from '@/types/card.type';
import Card from './Card';

type CardsProps = {
  cards: CardType[];
};

export default function Cards({ cards }: CardsProps) {
  return (
    <ul className="relative flex flex-wrap justify-center items-center gap-y-12">
      {cards.map((card, index) => (
        <li
          key={card.title}
          className={`w-[330px]  ${
            index % 2 === 0 ? '' : 'translate-y-6'
          } md:transform transition-all`}
        >
          <Card
            card={card}
          />
        </li>
      ))}
    </ul>

  );
}
