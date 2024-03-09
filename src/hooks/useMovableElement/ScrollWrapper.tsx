import React, { useRef, ReactNode } from 'react';
import { useMovableElements } from './useMovableElements';

type ScrollParallaxTopProps = {
  children: ReactNode;
};

export default function ScrollParallaxTop({
  children,
}: ScrollParallaxTopProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  const parallax = useMovableElements({ elementRef });
  return (
    <div ref={elementRef} style={parallax.style}>
      {children}
    </div>
  );
}
