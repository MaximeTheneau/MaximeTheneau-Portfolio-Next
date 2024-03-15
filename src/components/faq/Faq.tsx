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

  return (
    <ul className="sm:w-6/12 mx-auto text-white ">
      {faqs.map((itemLists) => (
        <FaqElements faq={itemLists} key={itemLists.id} setFaqs={setFaqs} />
      ))}
    </ul>
  );
}
