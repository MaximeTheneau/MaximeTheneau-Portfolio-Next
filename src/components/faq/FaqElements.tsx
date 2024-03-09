/* eslint-disable */

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

  return (
    <li
      className=" transition-all duration-300 ease-in-out bg-secondaryLight mb-4 p-4 rounded-lg cursor-pointer"
      onClick={toggleFAQ}
      aria-hidden="true"
    >
      <h2 className="w-full flex items-center justify-between pt-4 pb-4 border-b-2 border-slate-400 border-solid">
        {faq.title}
        {faq.open ? <i className="icon-x" /> : <i className="icon-scroll" />}
      </h2>
      <p className={faq.open ? 'block' : 'hidden'}>
        {faq.description}
      </p>
    </li>
  );
}

export default FaqElements;
