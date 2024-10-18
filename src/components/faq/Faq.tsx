import { useState } from 'react';
import FaqElements from './FaqElements';

type FaqItem = {
  id: number;
  open: boolean;
  title: string;
  description: string;
};
type FaqProps = {
  faq: FaqItem[];
};
export default function Faq({ faq }: FaqProps) {
  const [faqs, setFaqs] = useState<FaqItem[]>(faq);

  return (
    <ul className="w-full mx-auto my-4">
      {faqs.map((itemLists) => (
        <FaqElements faq={itemLists} key={itemLists.id} setFaqs={setFaqs} />
      ))}
    </ul>
  );
}
