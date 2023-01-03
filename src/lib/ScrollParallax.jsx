import { useEffect, useRef } from 'react';
import useScrollParallax from './useScrollParallax';

export default function ScrollParallax({ children, onIsInViewChange }) {
  const [elementRef, isInView] = useScrollParallax();
  useEffect(() => {
    onIsInViewChange(isInView);
  }, [isInView]);
  return (
    <div ref={elementRef}>
      {children}
    </div>
  );
}
