import * as React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import { useRef } from 'react';
import useMovableElements from './useMovableElements';


type Props = {
  children: React.ReactNode;
  src: string;
  alt: string;
  width: number;
  height: number;
};

function ScrollParallaxTop({
  children, src, alt, width, height
}: Props) {
  const elementRef = useRef(null);

useMovableElements(elementRef);
  return (
    <div ref={elementRef} className="relative h-30">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
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
