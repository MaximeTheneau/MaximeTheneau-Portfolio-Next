import Link from 'next/link';
import styles from './Category.module.scss';


export default function category({ category }) {
  return (
    <nav>
        <ul className={styles.category}>
          <li className='button'>
            <Link href="/articles">
              Articles
            </Link>
          </li>
          {category && 
            <li className='button'>
              <Link href={`/articles/${category.slug}`}>
                {category.name}
              </Link>
            </li>
          }
        </ul>
    </nav>
   
  );
}
