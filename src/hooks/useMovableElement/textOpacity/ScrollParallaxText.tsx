import React from 'react';
import useMovableElements from './useMovableElements';

type Props = {
  children: React.ReactNode;
};

function ScrollParallaxText({ children }: Props) {
  const [elementRef, isTopChange] = useMovableElements();
  return (
    <div
      ref={elementRef}
      style={{
        opacity: `${isTopChange / 500 + 0.5}`,
        transform: `translateY(${isTopChange / 10}px)`,
      }}
    >
      {children}
    </div>
  );
}

export default ScrollParallaxText;
