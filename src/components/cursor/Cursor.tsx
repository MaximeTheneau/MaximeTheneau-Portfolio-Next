import { useEffect, useRef, useState } from 'react';

function Cursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const [showCursor, setShowCursor] = useState(false);

  useEffect(() => {
    const handleClick = (e: { pageY: any; pageX: any; }) => {
      if (showCursor) {
        setShowCursor(false);
      } else {
        setShowCursor(true);
        const cursorElement = document?.createElement('div');
        cursorElement.classList.add(
          'w-10',
          'h-10',
          'rounded-full',
          'transform',
          'absolute',
          'pointer-events-none',
          'z-50',
          'bg-secondary',
          'transition-all',
          'animate-ping',
          'ease-in-out',
        );
        cursorElement.style.top = `${e.pageY}px`;
        cursorElement.style.left = `${e.pageX}px`;
        cursorRef.current?.appendChild(cursorElement);

        setTimeout(() => {
          cursorRef.current?.removeChild(cursorElement);
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
