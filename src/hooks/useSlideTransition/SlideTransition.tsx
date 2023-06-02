import React, { useRef, ReactNode } from 'react';
// eslint-disable-next-line import/extensions
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
