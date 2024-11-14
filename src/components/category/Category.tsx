import Link from 'next/link';
import styles from './Category.module.scss';

type CategoryProps = {
  category: {
    slug: string;
    name: string;
  };
  slug: string;
};

export default function Category({ category, slug }: CategoryProps) {
  return (
    <nav>
      <ul className={`${styles.category} mt-4`}>
        {category
            && (
              <>
                <li className="list-none font-bold">
                  <Link href={`/${category.slug}`}>
                    {category.name}

                  </Link>
                </li>
                <li className="list-none text-blackOpacity ">
                  {' | '}
                  {slug}
                </li>
              </>
            )}
      </ul>
    </nav>

  );
}
