import Link from 'next/link';

type CategoryProps = {
  category: {
    slug: string;
    name: string;
  };
  title: string;
};

export default function Category({ category, title }: CategoryProps) {
  return (
    <nav>
      <ul className="flex mt-4">
        <li className={`${category ? 'list-none font-bold' : 'list-none text-blackOpacity'}`}>
          <Link href="/blog">
            Blog
          </Link>
        </li>
        {category
            && (
              <>
                <li className="list-none font-bold">
                  <Link href={`/blog/${category.slug}`}>
                    {' | '}
                    {category.name}
                  </Link>
                </li>
                <li className="list-none text-blackOpacity">
                  {title}
                  {' | '}
                </li>
              </>
            )}
      </ul>
    </nav>

  );
}
