import React, { useRef, ReactNode, Suspense } from 'react';
import useScrollParallaxTop from './useMovableElements';

type ScrollParallaxTopProps = {
  children: ReactNode;
};

export default function ScrollParallaxTop({
  children,
}: ScrollParallaxTopProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const { opacity, transform } = useScrollParallaxTop(elementRef);

  return (
    <Suspense>
      <div
        ref={elementRef}
        style={{
          transform,
          opacity,
          transition: 'opacity 0.8s ease-in-out, transform 0.5s ease-out',
        }}
        className=""
      >
        {children}
      </div>
    </Suspense>

  );
}
