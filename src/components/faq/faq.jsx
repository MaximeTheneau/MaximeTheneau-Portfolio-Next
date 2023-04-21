import { useState } from 'react';
import FaqElements from './faqElements';

/**
 * Component to render a list of FAQs
 * @param {Object} faq - An object containing an array of FAQ objects
 * @returns {JSX.Element} - Returns a JSX element representing the list of FAQs
 */
export default function Faq({ faq }) {
  // Set initial state for the list of FAQs
  const [faqs, setFaqs] = useState(faq.listPosts);

  /**
   * Function to toggle the "open" state of a FAQ
   * @param {number} index - The index of the FAQ to toggle
   * @returns {void}
   */
  const toggleFAQ = (index) => {
    setFaqs(
      faqs.map((faq) => {
        if (faq.id === index) {
          faq.open = !faq.open;
        } else {
          faq.open = false;
        }
        return faq;
      }),
    );
  };
  
  // Render each FAQ as a FaqElements component
  return (
    <ul>
      {faqs.map((faq) => (
        <FaqElements faq={faq} index={faq.id} key={faq.id} toggleFAQ={toggleFAQ} />
      ))}
    </ul>
  );
}
