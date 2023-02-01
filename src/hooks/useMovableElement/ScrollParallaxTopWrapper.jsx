import PropTypes from 'prop-types';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import useMovableElements from './useMovableElements';

export default function ScrollParallaxTop({
  children, src, alt, width, height,
}) {
  const elementRef = useRef(null);

  const parralax = useMovableElements(elementRef);
  return (
    <div ref={elementRef} className="relative h-30">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        style={parralax.style}
        sizes="100vw"
      />
      {children}
    </div>
  );
}

ScrollParallaxTop.propTypes = {
  children: PropTypes.node.isRequired,
};
