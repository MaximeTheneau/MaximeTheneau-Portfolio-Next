import { useRef } from 'react';
import useSlideTransition from './useSlideTansition';
import styles from './SlideTransition.module.scss';

export default function ScrollParallaxLeft({ children, className }) {
  const elementRef = useRef(null);
  const isInViewport = useSlideTransition(elementRef);

  return (
    <li
      ref={elementRef}
      className={`${className}  ${isInViewport ? styles.slideTransition : styles.slideTransition__hidden}`}
    >
      {children}
    </li>
  );
}
