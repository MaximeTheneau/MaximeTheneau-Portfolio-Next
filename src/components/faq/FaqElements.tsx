/* eslint-disable */

import { useEffect, useState } from "react";

type ToggleFAQ = (id: number) => void;

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
    setFaqs((prevFaqs: Faq[]) =>
      prevFaqs.map((item) => {
        if (item.id === faq.id) {
          return { ...item, open: !item.open };
        }
        return { ...item, open: false };
      })
    );
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
    >
      <h3 className="w-full flex items-center justify-between pt-4 pb-4 border-b-2 ">
        {faq.title}
        {faq.open ?
          <span className="pr-2 ">
            <i className="icon-x" />
          </span>
         : <span className="pr-2 ">
          <i className="icon-scroll" />
          </span>}
      </h3>
      <p className={faq.open || !bot ? 'block' : 'hidden'}>
        {faq.description}
      </p>
    </li>
  );
}

export default FaqElements;
