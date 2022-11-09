import Image from 'next/image';
import { useEffect, useState } from 'react';
import stylesHeader from '../../styles/Header.module.scss';

function sticky({ imgWebp, alt }) {
    const [state, setState] = useState({
        position: null,
      });
      
    useEffect(() => {
        function updatePosition() {
          const valueScroll = window.scrollY;
          setState({
            ...state,
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
            style={{ top : `-${state.position}px` }}
            priority
        />
    </>
  );
}
export default sticky;
