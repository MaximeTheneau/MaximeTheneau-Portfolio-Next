import { useEffect, useRef, useState } from 'react';
import styles from './CloneTextWrapper.module.scss';

export default function TextAnimationWrapper({ children }) {
  const [message, setMessage] = useState(children);
  const [displayed, updateDisplay] = useState('');
  const animIDRef = useRef(null);
  const wrapperRef = useRef(null);
  useEffect(() => {
    const handleScroll = () => {
      const wrapperElement = wrapperRef.current;
      const { top, bottom } = wrapperElement.getBoundingClientRect();
      const isInViewport = top < window.innerHeight && bottom > 0;

      if (isInViewport) {
        animIDRef.current = setInterval(typeLetter, 30);
        wrapperRef.current.classList.add('animationText--animate');
      } else {
        clearInterval(animIDRef.current);
        wrapperRef.current.classList.remove('animationText--animate');
      }
    };

    updateDisplay(message.charAt(0));
    handleScroll();

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearInterval(animIDRef.current);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [message]);

  const typeLetter = () => {
    updateDisplay((prevText) => {
      if (message.length <= prevText.length) clearInterval(animIDRef.current);
      return prevText.concat(message.charAt(prevText.length));
    });
  };

  return (
    <span ref={wrapperRef} className={styles.animationText}>{displayed}</span>
  );
}
