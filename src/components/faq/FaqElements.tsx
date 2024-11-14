import React, { useEffect, useState } from 'react';

type Faq = {
  id: number;
  title: string;
  description: string;
  open: boolean;
};

type FaqElementsProps = {
  faq: Faq;
  setFaqs: React.Dispatch<React.SetStateAction<Faq[]>>;
};

function FaqElements({ faq, setFaqs }: FaqElementsProps) {
  const [bot, setBot] = useState(true);
  const toggleFAQ = (): void => {
    setFaqs((prevFaqs: Faq[]) => prevFaqs.map((item) => {
      if (item.id === faq.id) {
        return { ...item, open: !item.open };
      }
      return { ...item, open: false };
    }));
  };

  useEffect(() => {
    if (navigator.userAgent.includes('Googlebot')) {
      setBot(false);
    }
  }, []);
  return (
    <li
      className=" transition-all duration-300 ease-in-out bg-form mb-4 p-4 rounded-lg cursor-pointer"
      onClick={toggleFAQ}
      aria-hidden="true"
      aria-controls={`faq-${faq.id}`}
    >
      <article>
        <h3 className="w-full flex items-center justify-between pt-4 pb-4 border-b-2 ">
          <span id={`faq-${faq.id}`} className="underline">{faq.title}</span>
          <button type="button" aria-label={faq.open ? 'Fermer la réponse' : 'Ouvrir la réponse'} className="pr-2">
            {faq.open ? <i className="icon-x" /> : <i className="icon-scroll" />}
          </button>
        </h3>
        <div className={faq.open || !bot ? 'block' : 'hidden'} dangerouslySetInnerHTML={{ __html: faq.description }} />
      </article>
    </li>
  );
}

export default FaqElements;
