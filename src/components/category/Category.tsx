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
      <ul className=" mt-4 bg-secondaryLight p-2 rounded-md">
        <li className={`inline-block underline list-none${category ? ' font-bold' : 'text-blackOpacity'}`}>
          <Link href="/blog">
            Blog
          </Link>
        </li>
        {category
            && (
              <>
                <li className="inline-block underline list-none font-bold ml-2">
                  <Link href={`/blog/${category.slug}`}>
                    {category.name}
                  </Link>
                </li>
                <li className="inline-block list-none text-blackOpacity ml-2">
                  {title}
                </li>
              </>
            )}
      </ul>
    </nav>

  );
}
