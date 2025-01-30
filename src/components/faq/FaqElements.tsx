import React, { useState } from 'react';

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
  const toggleFAQ = (): void => {
    setFaqs((prevFaqs: Faq[]) => prevFaqs.map((item) => {
      if (item.id === faq.id) {
        return { ...item, open: !item.open };
      }
      return item;
    }));
  };

  // useEffect(() => {
  //   if (navigator.userAgent.includes('Googlebot')) {
  //     setBot(true);
  //   }
  // }, []);
  return (
    <li
      className=" transition-all text-left duration-300 ease-in-out bg-white mb-4 p-4 rounded-lg cursor-pointer"

    >
      <button
        type="button"
        onClick={toggleFAQ}
        aria-expanded={faq.open}
        aria-controls={`faq-${faq.id}`}
        className="w-full flex items-center justify-between pt-4 pb-4  px-4 border-b-2  bg-gray-100"
      >
        <span id={`faq-${faq.id}`} className="underline block text-left  ">{faq.title}</span>
        <span aria-label={faq.open ? 'Fermer la réponse' : 'Ouvrir la réponse'} className="pr-2">
          {faq.open ? <i className="icon-x" /> : <i className="icon-scroll" />}
        </span>
      </button>
      <div className={!faq.open ? 'block' : 'hidden'} dangerouslySetInnerHTML={{ __html: faq.description }} />
    </li>
  );
}

export default FaqElements;
