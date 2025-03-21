import Link from 'next/link';

interface ArticleType {
  id: string;
  slug: string;
  title: string;
  url: string;
  formattedDate: string;
}

type RecentArticlesProps = {
  articles: ArticleType[];
};

export default function RecentArticles({ articles }: RecentArticlesProps) {
  // Trier les articles par date (du plus récent au plus ancien) et limiter à 3

  return (
    <div className="">
      <ul className="">
        {articles.map((article) => (
          <li
            key={article.id}
            className="py-2 border-solid border-b border-gray-200 last:border-b-0"
          >
            <div className="">
              <Link href={article.url}>
                <p className=" font-semibold hover:underline">
                  {article.title}
                  {' '}
                  -
                  {' '}
                  <span className="text-sm font-normal opacity-70">
                    {article.formattedDate}
                  </span>
                </p>
                <p />
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
