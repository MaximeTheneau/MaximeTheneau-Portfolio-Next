import React, {
  Key, useEffect, useState,
} from 'react';

interface ListArticle {
  icon: string;
  name: string;
  description: string;
  id: Key;
}

interface ScrollingTextWrapperProps {
  accueil: ListArticle[];
}

function Article({
  icon, name, description, id,
}: ListArticle) {
  return (
    <li key={id} className="list-none flex flex-col items-center justify-center ">
      <div className="animate-infinite-scroll-icon" dangerouslySetInnerHTML={{ __html: icon }} />
      <p className="font-bold">{name}</p>
      {description && <span className="sr-only">{description}</span>}
    </li>
  );
}

export default function ScrollingTextWrapper({ accueil }: ScrollingTextWrapperProps) {
  const [isBot, setIsBot] = useState(false);

  useEffect(() => {
    const detectBot = (userAgent: string) => /bot|crawler|spider|googlebot|bingbot|yahoo|duckduckbot/i.test(userAgent);
    setIsBot(detectBot(navigator.userAgent.toLowerCase()));
  }, []);
  return (
    <div className="overflow-x-hidden ">
      <div className={!isBot ? 'animate-infinite-scroll' : 'animate-infinite-scroll--none'}>
        <ul>
          {accueil.map((article) => (
            <Article key={article.id} {...article} />
          ))}
          {!isBot && accueil.map((article) => (
            <Article key={`repeat-${article.id}`} {...article} />
          ))}
        </ul>
        {!isBot && <div className="animate-infinite-scroll--fade" />}
      </div>
    </div>
  );
}
