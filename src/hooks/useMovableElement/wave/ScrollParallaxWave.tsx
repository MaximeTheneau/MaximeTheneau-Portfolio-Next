
import React from 'react';
import { useRef } from 'react';
import useScrollParallax from './useScrollParallax';

type Props = {
  children: React.ReactNode;
};
const ScrollParallaxWave = ({ children }: Props) => {
  const elementRef = useRef(null);
  const isInViewport = useScrollParallax(elementRef);

  return (
    <div ref={elementRef} className={isInViewport ? 'wave' : ''}>
      {children}
    </div>
  );
}

export default ScrollParallaxWave;