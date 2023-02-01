import * as React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import useMovableElements from './useMovableElements';

type Props = {
  children: React.ReactNode;
  src: string;
  alt: string;
  width: number;
  height: number;
};

const ScrollParallaxTop = ({
  children, src, alt, width, height,
}: Props) => {
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

export default ScrollParallaxTop;

ScrollParallaxTop.propTypes = {
  children: PropTypes.node.isRequired,
};
