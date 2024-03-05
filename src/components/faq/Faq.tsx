import { useState } from 'react';
import FaqElements from './FaqElements';

type FaqItem = {
  id: number;
  open: boolean;
  title: string;
  description: string;
};
type FaqProps = {
  faq: {
    listPosts: FaqItem[];
  };
};
export default function Faq({ faq }: FaqProps) {
  const [faqs, setFaqs] = useState<FaqItem[]>(faq.listPosts);

  const toggleFAQ = (index: number): void => {
    setFaqs((prevFaqs) => prevFaqs.map((item) => {
      if (item.id === index) {
        return { ...item, open: !item.open };
      }
      return { ...item, open: false };
    }));
  };

  return (
    <ul>
      {faqs.map((itemLists) => (
        <FaqElements faq={itemLists} key={itemLists.id} toggleFAQ={toggleFAQ} />
      ))}
    </ul>
  );
}
