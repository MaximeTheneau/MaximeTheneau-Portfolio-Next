import useScrollParallax from './useScrollParallax';

function ScrollParallax({ children }) {
  const elementRef = useRef(null);
  useScrollParallax(elementRef);
  return (
    <div ref={elementRef}>
      {children}
    </div>
  );
}

export default ScrollParallax;
