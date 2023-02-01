import React from 'react';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import useMovableElements from './useMovableElements';

type Props = {
  children: React.ReactNode;
};

const ScrollParallaxText = ({ children }: Props) => {
  const [elementRef, isTopChange] = useMovableElements();
  return (
    <div
      ref={elementRef}
      style={{
        opacity: `${isTopChange / 500 + 0.5}`,
        transform: `translateY(${isTopChange / 10}px)`,
      }}
    >
      {children}
    </div>
  );
}

export default ScrollParallaxText;

ScrollParallaxText.propTypes = {
  children: PropTypes.node.isRequired,
  onTopChange: PropTypes.func.isRequired,
};
