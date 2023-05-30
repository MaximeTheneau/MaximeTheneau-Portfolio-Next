import { useEffect, useRef } from 'react';

function Cursor() {
  const cursorRef = useRef(null);
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (cursorRef.current == null) { return; }
      cursorRef.current.style.top = `${e.pageY}px`;
      cursorRef.current.style.left = `${e.pageX}px`;
    };

    const handleClick = () => {
      if (cursorRef.current == null) { return; }
      cursorRef.current.classList.add('cursor__expand');

      setTimeout(() => {
        cursorRef.current.classList.remove('cursor__expand');
      }, 300);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('click', handleClick);
    };
  }, []);
  return (
    <div
      className=""
      ref={cursorRef}
    />

  );
}
export default Cursor;
