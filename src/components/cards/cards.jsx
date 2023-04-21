import Card from './card';
import styles from './Card.module.scss';

export default function Cards({ cards, path }) {
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
