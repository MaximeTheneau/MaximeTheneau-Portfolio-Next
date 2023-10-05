import { useEffect, useRef, useState } from 'react';

function Cursor() {
  const cursorRef = useRef(null);
  const [showCursor, setShowCursor] = useState(false);

  useEffect(() => {
    const handleClick = (e) => {
      if (showCursor) {
        setShowCursor(false);
      } else {
        setShowCursor(true);
        const cursorElement = document.createElement('div');
        cursorElement.classList.add('cursor--expand');
        cursorElement.style.top = `${e.pageY}px`;
        cursorElement.style.left = `${e.pageX}px`;
        cursorRef.current.appendChild(cursorElement);

        setTimeout(() => {
          cursorRef.current.removeChild(cursorElement);
        }, 300);
      }
    };

    document.addEventListener('click', handleClick);
    return () => {
    };
  }, []);
  return (
    <div ref={cursorRef} />

  );
}
export default Cursor;
