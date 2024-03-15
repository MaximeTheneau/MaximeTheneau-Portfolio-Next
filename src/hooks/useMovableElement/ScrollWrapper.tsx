import React, { useRef, ReactNode } from 'react';
import useScrollParallaxTop from './useMovableElements';

type ScrollParallaxTopProps = {
  children: ReactNode;
};

export default function ScrollParallaxTop({
  children,
}: ScrollParallaxTopProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const { scrollPosition } = useScrollParallaxTop(elementRef);

  return (
    <div className="relative z-0">
      {children}
      <div
        ref={elementRef}
        style={{
          top: `${scrollPosition + -100}px`,
        }}
        className="absolute w-full h-40 bg-secondaryLight -z-10"
      />
    </div>
  );
}
