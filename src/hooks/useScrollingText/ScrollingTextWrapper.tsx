import { useState } from 'react';

export default function ScrollingTextWrapper({ accueil }) {
  const [bot, setBot] = useState(true);

  if (navigator.userAgent.includes('Googlebot')) {
    setBot(false);
  }

  return (
    <div className="w-full inline-flex flex-nowrap bg-secondaryLight p-4">
      <ul
        id="animate-infinite-scroll"
        className={
          bot && (
            'flex text-title items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll'
          )
        }
      >
        {accueil.listPosts.map((listArticle) => listArticle.title && (
        <li
          key={listArticle.id}
          className="list-none pr-4"
        >
          {listArticle.title}
        </li>
        ))}
      </ul>
      {bot && (
        <ul
          id="animate-infinite-scroll"
          className="flex text-title items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll"
        >
          {accueil.listPosts.map((listArticle) => listArticle.title && (
          <li
            key={listArticle.id}
            className="list-none pr-4"
          >
            {listArticle.title}
          </li>
          ))}
        </ul>
      )}
    </div>
  );
}
