import { useEffect, useRef } from 'react';
import styles from './Cursor.module.scss';

export default function Cursor() {
  const cursorRef = useRef(null);
  const cursorOutRef = useRef(null);
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (cursorRef.current == null) { return; }
      cursorRef.current.style.top = `${e.pageY}px`;
      cursorRef.current.style.left = `${e.pageX}px`;

      cursorOutRef.current.style.top = `${e.pageY}px`;
      cursorOutRef.current.style.left = `${e.pageX}px`;
    };

    const handleClick = () => {
      if (cursorRef.current == null) { return; }
      cursorRef.current.classList.add('expand');
      cursorOutRef.current.classList.add('expand');
    };

    function addHoverEffect(elements) {
      elements.forEach((element) => {
        element.addEventListener('mouseover', (e) => {
          if (cursorRef.current == null) { return; }

          // cursorRef.current.style.x = `${e.clientX + window.scrollX}`;
          // cursorRef.current.style.y = `${e.clientY + window.scrollY}`;

          cursorRef.current.classList.add('hovered');
          cursorOutRef.current.classList.add('hovered');
        });
        element.addEventListener('mouseout', () => {
          if (cursorRef.current == null) { return; }
          cursorRef.current.classList.remove('hovered');
          cursorOutRef.current.classList.remove('hovered');
        });
      });
    }
    const buttons = document.querySelectorAll('button');
    const links = document.querySelectorAll('a');
    const selects = document.querySelectorAll('select');

    addHoverEffect(buttons);
    addHoverEffect(links);
    addHoverEffect(selects);

    const handleMouseLeave = () => {
      if (cursorRef.current == null) { return; }

      cursorRef.current.classList.remove('hovered');
      cursorOutRef.current.classList.remove('hovered');
    };

    // const handleMouseOut = (e) => {
    //   if (e.relatedTarget === null) {
    //     if (cursorRef.current == null) { return; }
    //     cursorRef.current.style.opacity = '0';
    //     cursorOutRef.current.style.opacity = '0';
    //   }
    // };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('click', handleClick);
    document.addEventListener('mouseleave', handleMouseLeave);
    // document.addEventListener('mouseout', handleMouseOut);
  }, []);
  return (
    <div>
      <div
        className="cursor"
        ref={cursorRef}
      />
      <div className="cursor__outline " ref={cursorOutRef} />
    </div>

  );
}
