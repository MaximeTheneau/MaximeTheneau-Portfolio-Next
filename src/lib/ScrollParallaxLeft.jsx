import PropTypes from 'prop-types';
import { Children, useEffect, useRef } from 'react';
import useScrollParallax from './useScrollParallax';

export default function ScrollParallaxLeft({ children, delay }) {
  const elementRef = useRef(null);
  const isInViewport = useScrollParallax(elementRef);

  return (
    <div
      ref={elementRef}
      className={isInViewport ? 'slideAnimation' : ''}
      style={{ animationDelay: delay }}
    >
      {children}
    </div>
  );
}
