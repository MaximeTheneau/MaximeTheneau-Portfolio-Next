import styles from './CloneTextWrapper.module.scss';
import { useEffect, useRef } from 'react';

export default function TextAnimationWrapper({ children, cycles = 10 }) {
  const textRef = useRef(children);
  const textRefClone = useRef(children);

  useEffect(() => {
    if (textRef.current) {
      const originalText = textRef.current.textContent;

      // Définir une fonction de mélange qui prend en compte le nombre de cycles
      function shuffleString(str) {
        const arr = str.split('');
        for (let i = 0; i < cycles; i++) {
          arr.sort(() => Math.random() - 0.5);
        }
        return arr.join('');
      }

      // Mélanger le texte à intervalles réguliers
      let counter = 0;
      const interval = setInterval(() => {
        counter++;
        const shuffledText = shuffleString(originalText);
        textRef.current.textContent = shuffledText;
        if (counter >= cycles) {
          clearInterval(interval);
          textRef.current.setAttribute('data-animation', 'true');
          textRef.current.classList.remove('text-animation');
          textRef.current.classList.add('text__animation--done');
          textRefClone.current.classList.remove('text__animation__clone');
          textRefClone.current.classList.add('text__animation__clone--done');
        }
      }, 50);

      textRef.current.classList.add('text-animation');
    }
  }, []);

  return (
    <>
      <span ref={textRef}>
        {children}
      </span>
      <span ref={textRefClone} className='text__animation__clone'>
        {children}
      </span>
    
    </>
  );
}