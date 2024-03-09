import Card from './Card';
import styles from './Card.module.scss';

type CardType = {
  id: number;
  subcategory: {
    slug: string;
  };
  slug: string;
  altImg?: string;
  title: string;
};

type CardsProps = {
  cards: CardType[];
  path: string;
};

export default function Cards({ cards, path }: CardsProps) {
  return (
    <ul className={styles.cards}>
      {cards.map((card) => (
        <Card
          key={card.id}
          card={card}
          path={path}
        />
      ))}
    </ul>

  );
}
