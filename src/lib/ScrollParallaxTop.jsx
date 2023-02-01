import PropTypes from 'prop-types';
import { useEffect } from 'react';
import useMovableElements from './useMovableElements';
import styles from '../styles/Home.module.scss';

export default function ScrollParallaxTop({
  children, onTopChange, heightOfElement, widthOfElement,
}) {
  const [elementRef, isTopChange] = useMovableElements();
  useEffect(() => {
    onTopChange(isTopChange);
  }, [isTopChange]);

  return (
    <>
      {children}
      <div
        ref={elementRef}
        className={styles.home__experience__backgroundAnimation__element}
        style={{
          height: `${heightOfElement}px`,
          width: `${widthOfElement}%`,
          opacity: `${isTopChange / 500}`,
          transition: 'all 0.5s ease',
        }}
      />

    </>
  );
}

ScrollParallaxTop.propTypes = {
  children: PropTypes.node.isRequired,
  onTopChange: PropTypes.func.isRequired,
  heightOfElement: PropTypes.number.isRequired,
  widthOfElement: PropTypes.number.isRequired,
};
