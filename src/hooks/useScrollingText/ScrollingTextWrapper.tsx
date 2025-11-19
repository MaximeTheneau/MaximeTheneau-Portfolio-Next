import React, {
  Key, useEffect, useState, useRef,
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
  const [repeatCount, setRepeatCount] = useState(2);
  const ulRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const detectBot = (userAgent: string) => /bot|crawler|spider|googlebot|bingbot|yahoo|duckduckbot/i.test(userAgent);
    setIsBot(detectBot(navigator.userAgent.toLowerCase()));
  }, []);

  useEffect(() => {
    if (isBot || !ulRef.current) return undefined;

    const calculateRepeats = () => {
      if (!ulRef.current) return;

      // Largeur d'un set d'items (approximatif: nombre d'items * largeur moyenne)
      const itemWidth = 120; // Largeur approximative d'un item en px
      const setWidth = accueil.length * itemWidth;
      const viewportWidth = window.innerWidth;

      // Calculer combien de répétitions pour remplir 2x l'écran (pour un scroll fluide)
      const neededRepeats = Math.ceil((viewportWidth * 2) / setWidth);
      setRepeatCount(Math.max(2, neededRepeats));
    };

    calculateRepeats();
    window.addEventListener('resize', calculateRepeats);

    return () => {
      window.removeEventListener('resize', calculateRepeats);
    };
  }, [isBot, accueil.length]);

  return (
    <div className="overflow-x-hidden ">
      <div className={!isBot ? 'animate-infinite-scroll' : 'animate-infinite-scroll--none'}>
        <ul ref={ulRef}>
          {accueil.map((article) => (
            <Article key={article.id} {...article} />
          ))}
          {!isBot && Array.from({ length: repeatCount }, (_, i) => `set-${i}`).map((setKey) => (
            accueil.map((article) => (
              <Article key={`${setKey}-${article.id}`} {...article} />
            ))
          ))}
        </ul>
        {!isBot && <div className="animate-infinite-scroll--fade" />}
      </div>
    </div>
  );
}
