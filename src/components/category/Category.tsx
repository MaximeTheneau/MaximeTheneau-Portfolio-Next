import Link from 'next/link';
import styles from './Category.module.scss';

type CategoryProps = {
  category: {
    slug: string;
    name: string;
  };
};

export default function Category({ category }: CategoryProps) {
  return (
    <nav>
      <ul className={styles.category}>
        <li className="button">
          <Link href="/articles" data-testid="articles-link">
            Articles
          </Link>
        </li>
        {category
            && (
            <li className="button">
              <Link href={`/articles/${category.slug}`}>
                {category.name}
              </Link>
            </li>
            )}
      </ul>
    </nav>

  );
}
