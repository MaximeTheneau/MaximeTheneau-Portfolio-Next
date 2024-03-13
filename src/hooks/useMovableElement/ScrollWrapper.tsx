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
    <div className="relative">
      <div
        ref={elementRef}
        style={{
          top: `-${scrollPosition * 5}%`,
          left: `${scrollPosition}%`,
          opacity: 1 - scrollPosition / 20,
        }}
        className="bg-secondaryLight absolute w-full h-full top-0 left-0"
      />
      {children}
    </div>
  );
}
