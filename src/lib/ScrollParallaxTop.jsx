import { useEffect, useRef } from 'react';
import useMovableElements from './useMovableElements';
import styles from '../styles/Home.module.scss';

export default function ScrollParallaxTop({ children, onTopChange, heightOfElement, widthOfElement }) {
  const [elementRef, isTopChange] = useMovableElements();
  useEffect(() => {
    onTopChange(isTopChange);
  }, [isTopChange]);

  return (
    <>
      {children}
      <div
        ref={elementRef}
        className={styles.home__experience__backgroundAnimation__element}
        style={{
          height: `${heightOfElement}px`,
          width: `${widthOfElement}%`,
          opacity: `${isTopChange / 500}`,
        }}
      />

    </>
  );
}
