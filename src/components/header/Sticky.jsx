import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import stylesHeader from '../../styles/Header.module.scss';

export default function Sticky({ imgWebp, alt, id }) {
    const [position, setPosition] = useState({
        position: null,
      });
      
    useEffect(() => {
        function updatePosition() {
          const valueScroll = window.scrollY;
          setPosition({
              position: valueScroll,
            });
          }
          window.addEventListener('scroll', updatePosition)
          updatePosition()
          return () => window.removeEventListener('scroll', updatePosition)
        }, []);
  return (

    <>
        <Image
            src={imgWebp}
            alt={`illustration ${alt}`}
            width="1000"
            height="1000"
            layout="fill"
            className={stylesHeader['header-sticky-img']}
            style={{ top : `-${position.position}px` }}
            id={id}
            priority
        />
    </>
  );
}
