import { useState } from 'react';
import FaqElements from './FaqElements';

type FaqProps = {
  faq: {
    listPosts: FaqItem[];
  };
};


type FaqItem = {
  id: number;
  open: boolean;
  title: string;
  description: string;
};

export default function Faq({ faq }: FaqProps) {
  const [faqs, setFaqs] = useState<FaqItem[]>(faq.listPosts);

  const toggleFAQ = (index: number): void => {
    setFaqs((prevFaqs) =>
      prevFaqs.map((faq) => {
        if (faq.id === index) {
          return { ...faq, open: !faq.open };
        } else {
          return { ...faq, open: false };
        }
      })
    );
  };

  return (
    <ul>
      {faqs.map((faq) => (
        <FaqElements faq={faq} key={faq.id} toggleFAQ={toggleFAQ} />
      ))}
    </ul>
  );
}