import React, { useEffect } from 'react';
import useMovableElements from '../textOpacity/useMovableElements';
import styles from '../../../components/main/Home.module.scss';

type Props = {
  onTopChange: (e: number) => void;
  heightOfElement: number;
  widthOfElement: number;
};

function ScrollParallaxTop({
  onTopChange, heightOfElement, widthOfElement,
}: Props) {
  const [elementRef, isTopChange] = useMovableElements();
  useEffect(() => {
    onTopChange(isTopChange);
  }, [isTopChange]);
  return (
    <div
        className={styles.home__experience__backgroundAnimation__element}
        ref={elementRef}
        style={{
          height: `${heightOfElement}px`,
          width: `${widthOfElement}%`,
          opacity: `${isTopChange / 500}`,
          transition: 'all 0.05s ease',
        }}
      />
  );
}

export default ScrollParallaxTop;