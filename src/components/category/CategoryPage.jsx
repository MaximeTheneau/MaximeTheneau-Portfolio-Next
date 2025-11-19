import Link from 'next/link';

export default function CategoryPage({ category, subcategoryPost, subcategoryList }) {
  return (
    <nav className="list-none ">
      <ul>
        <li className="inline-block">
          <Link className={`inline-block ${!category ? ' font-bold' : 'text-blackOpacity'}`} href="/blog">
            Blog
          </Link>
        </li>
        {subcategoryList?.map((categories) => (
          <li key={categories.slug} className="inline-block">
            {categories.slug === subcategoryPost ? (
              <span
                className="text-blackOpacity ml-2 "
                aria-disabled="true"
              >
                {categories.name}

              </span>
            ) : (
              <Link
                href={`/blog/${categories.slug}`}
                className="font-bold ml-2 "
              >
                {categories.name}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>

  );
}
