import {
  Key, useEffect, useState,
} from 'react';

export default function ScrollingTextWrapper({ accueil }:any) {
  const [bot, setBot] = useState(true);

  useEffect(() => {
    if (navigator.userAgent.includes('Googlebot')) {
      setBot(false);
    }
  }, []);

  return (
    <div className="overflow-x-hidden">
      <div className="inline-flex flex-nowrap  bg-primary p-4 ">
        <ul
          id="animate-infinite-scroll"
          className={`
          ${bot && (
            ' flex items-top animate-scroll-infinite w-[100vw]  overflow-x-hidden'
          )}`}
        >
          {accueil.map((listArticle:
        {
          contents: string;
           title: string;
           id: Key;
         }) => listArticle.title && (
           <li
             key={listArticle.id}
             className="list-none  "
           >
             {listArticle.title}
           </li>
          ))}
        </ul>
        {bot && (
        <ul
          id="animate-infinite-scroll-duplicate"
          className="items-top flex animate-scroll-infinite w-[100vw]"
        >
          {accueil.map(
            (listArticle:
        {
          contents: string;
           title: string;
           id: Key;
         }) => listArticle.title && (
         <li
           key={listArticle.id}
           className="list-none   "
         >
           {listArticle.title}
         </li>
            ),
          )}
        </ul>
        )}
      </div>
    </div>
  );
}
