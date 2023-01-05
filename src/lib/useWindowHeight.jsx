import { useState, useEffect } from 'react';

export default function useWindowHeight() {
  const [height, setHeight] = useState(null);

  useEffect(() => {
    function handleResize() {
      setHeight(window.innerHeight);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return height;
}
