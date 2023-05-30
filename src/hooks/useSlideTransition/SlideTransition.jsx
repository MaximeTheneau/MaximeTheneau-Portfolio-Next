import { useRef } from 'react';
import useSlideTransition from './useSlideTansition';
import styles from './SlideTransition.module.scss';

export default function SlideTransition({ children, delay }) {
  const elementRef = useRef(null);
  const paralax = useSlideTransition(elementRef, delay);
  const elementStyle = elementRef.current;
  return (
    <div
      ref={elementRef}
      style={{ ...paralax.style, ...elementStyle }}
    >
      {children}
    </div>
  );
}
