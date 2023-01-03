import React, { useRef, useEffect, useState } from 'react';
import useIntersectionObserver from '../../lib/useIntersectionObserver';

export default function TextBlocker({ text, delay }) {
  const words = text.split(' ');
  const wordRefs = useRef([]);
  const [opacities, setOpacities] = useState(words.map(() => 0.2));

  let index = 0;

  const writeText = () => {
    if (index < words.length) {
      // Mettre à jour l'opacité du mot courant
      setOpacities((prevOpacities) => prevOpacities.map((opacity, i) => (i === index ? 1 : opacity)));
      index++;
      setTimeout(writeText, delay);
    }
  };
  const containerRef = useRef(null);
  useIntersectionObserver(containerRef, writeText);
  return (
    <div ref={containerRef}>
      {words.map((word, i) => (
        <p
          key={i}
          ref={(el) => (wordRefs.current[i] = el)}
          style={{ opacity: opacities[i] }}
        >
          {word}
        </p>
      ))}
    </div>
  );
}
