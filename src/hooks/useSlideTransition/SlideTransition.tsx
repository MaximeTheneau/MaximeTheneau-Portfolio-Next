import React, { useRef, ReactNode } from 'react';

import useSlideTransition from './UseSlideTansition';

type SlideTransitionProps = {
  children: ReactNode;
};
export default function SlideTransition({ children }: SlideTransitionProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const parallax = useSlideTransition(elementRef);

  return (
    <div
      ref={elementRef}
      style={{
        ...parallax,
      }}
    >
      {children}
    </div>
  );
}
