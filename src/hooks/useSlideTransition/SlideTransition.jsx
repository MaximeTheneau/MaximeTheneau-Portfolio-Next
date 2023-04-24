import { useRef } from 'react';
import useSlideTransition from './useSlideTansition';
import styles from './SlideTransition.module.scss';

export default function SlideTransition({ children, translate, delay, className }) {
  const elementRef = useRef(null);
  const isInViewport = useSlideTransition(elementRef);

  return (
    <div
      ref={elementRef}
      className={` ${isInViewport ? styles.slideTransition  : styles.slideTransition__hidden  }`}
      style={{ '--translate': translate, '--delay': `${delay}s` }}
      >
      {children}
    </div>
  );
}
