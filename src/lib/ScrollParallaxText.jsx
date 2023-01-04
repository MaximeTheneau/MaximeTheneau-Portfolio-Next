import { useEffect, useRef } from 'react';
import useMovableElements from './useMovableElements';
import styles from '../styles/Home.module.scss';

export default function ScrollParallaxText({ children, onTopChange }) {
  const [elementRef, isTopChange] = useMovableElements();
  useEffect(() => {
    onTopChange(isTopChange);
  }, [isTopChange]);

  return (
    <div
      ref={elementRef}
      className={styles.home__about}
      style={{
        opacity: `${isTopChange / 500 + 0.5}`,
        transform: `translateY(${isTopChange / 10}px)`,
      }}
    >
      {children}
    </div>
  );
}
