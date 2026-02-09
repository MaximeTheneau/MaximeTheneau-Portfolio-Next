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

  // Vérifier que accueil est un tableau valide avec des objets
  const validAccueil = Array.isArray(accueil) && accueil.length > 0 && accueil[0]?.id !== undefined
    ? accueil
    : [];

  if (validAccueil.length === 0) {
    return null;
  }

  useEffect(() => {
    const detectBot = (userAgent: string) => /bot|crawler|spider|googlebot|bingbot|yahoo|duckduckbot/i.test(userAgent);
    setIsBot(detectBot(navigator.userAgent.toLowerCase()));
  }, []);

  useEffect(() => {
    if (isBot || !ulRef.current) return undefined;

    const calculateRepeats = () => {
      if (!ulRef.current) return;

      const viewportWidth = window.innerWidth;
      // Largeur d'item réduite sur mobile
      const itemWidth = viewportWidth < 640 ? 80 : 120;
      const setWidth = validAccueil.length * itemWidth;

      // Moins de répétitions sur mobile pour la performance
      const multiplier = viewportWidth < 640 ? 1.5 : 2;
      const neededRepeats = Math.ceil((viewportWidth * multiplier) / setWidth);
      setRepeatCount(Math.max(2, Math.min(neededRepeats, viewportWidth < 640 ? 3 : 5)));
    };

    calculateRepeats();
    window.addEventListener('resize', calculateRepeats);

    return () => {
      window.removeEventListener('resize', calculateRepeats);
    };
  }, [isBot, validAccueil.length]);

  return (
    <div className="overflow-x-hidden ">
      <div className={!isBot ? 'animate-infinite-scroll' : 'animate-infinite-scroll--none'}>
        <ul ref={ulRef}>
          {validAccueil.map((article) => (
            <Article key={article.id} {...article} />
          ))}
          {!isBot && Array.from({ length: repeatCount }, (_, i) => `set-${i}`).map((setKey) => (
            validAccueil.map((article) => (
              <Article key={`${setKey}-${article.id}`} {...article} />
            ))
          ))}
        </ul>
        {!isBot && <div className="animate-infinite-scroll--fade" />}
      </div>
    </div>
  );
}
