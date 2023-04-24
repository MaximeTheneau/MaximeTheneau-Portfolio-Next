import PropTypes from 'prop-types';
import Image from 'next/image';
import { useRef } from 'react';
import useMovableElements from './useMovableElements';

export default function ScrollParallaxTop({
  children,
}) {
  const elementRef = useRef(null);

  const paralax = useMovableElements(elementRef);
  return (
    <div ref={elementRef} style={paralax.style}>
      {children}
    </div>
  );
}

ScrollParallaxTop.propTypes = {
  children: PropTypes.node.isRequired,
};
