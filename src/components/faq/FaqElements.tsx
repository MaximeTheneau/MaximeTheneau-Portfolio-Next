/* eslint-disable */
import styles from './Faq.module.scss';

type ToggleFAQ = (id: number) => void;

type Faq = {
  id: number;
  title: string;
  description: string;
  open: boolean;
};

type FaqElementsProps = {
  faq: Faq;
  toggleFAQ: ToggleFAQ;
};

function FaqElements({ faq, toggleFAQ }: FaqElementsProps) {
  return (
    <li
      className={styles.faqs}
      onClick={() => toggleFAQ(faq.id)}
      aria-hidden="true"
    >
      <h2 className="faq-question">
        {faq.title}
        {faq.open ? <i className="icon-x" /> : <i className="icon-scroll" />}
      </h2>
      <p className={`faq-answer ${faq.open ? 'block' : 'none'}`}>
        {faq.description}
      </p>
    </li>
  );
}

export default FaqElements;