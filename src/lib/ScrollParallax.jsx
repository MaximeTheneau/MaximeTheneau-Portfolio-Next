import PropTypes from 'prop-types';
import { useEffect } from 'react';
import useScrollParallax from './useScrollParallax';

export default function ScrollParallax({ children, onIsInViewChange }) {
  const [elementRef, isInView] = useScrollParallax();
  useEffect(() => {
    onIsInViewChange(isInView);
  });
  return (
    <div ref={elementRef}>
      {children}
    </div>
  );
}

ScrollParallax.propTypes = {
  children: PropTypes.node.isRequired,
  onIsInViewChange: PropTypes.func.isRequired,
};
