import React from 'react';
import { useEffect } from 'react';
import useMovableElements from '../textOpacity/useMovableElements';
import styles from '../../../components/main/Home.module.scss';

type CustomStyle = {
  objectPosition?: number;
  objectFit?: number;
  opacity?: number;
};

type Props = {
  children: React.ReactNode;
  onTopChange: (isTopChange: number) => void;
  heightOfElement: number;
  widthOfElement: number;
};

const ScrollParallaxTop = ({
  children, onTopChange, heightOfElement, widthOfElement,
}: Props) => {
  const [elementRef, isTopChange] = useMovableElements();
  useEffect(() => {
    onTopChange(isTopChange);
  }, [isTopChange]);

  return (
    <>
      {children}
      <div
        className={styles['home__experience__backgroundAnimation__element']}
        ref={elementRef}
        style={{
          height: `${heightOfElement}px`,
          width: `${widthOfElement}%`,
          opacity: `${isTopChange / 500}`,
          transition: 'all 0.5s ease',
        }}
      />

    </>
  );
}

export default ScrollParallaxTop;