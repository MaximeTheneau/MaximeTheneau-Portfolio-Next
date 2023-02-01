import PropTypes, { element } from 'prop-types';
import { useState } from 'react';
import styles from './CloneTextWrapper.module.scss';

export default function CloneTextWrapper({ children }) {
  const handleClass = (e) => {
    e.children[0].classList.add(styles.animationText);
    e.children[1]?.classList.add(styles['animationText__cloned--active']);
    setTimeout(() => {
      e.children[0].classList.remove(styles.animationText);
      e.children[1]?.classList.remove(styles['animationText__cloned--active']);
    }, 1000);
  };

  const handleClassLeave = (e) => {
    e.children[0].classList.remove(styles['animationText__hover--border']);
  };

  return (
    <div
      className={`${styles.animationText__border} relative`}
      onMouseEnter={(e) => handleClass(e.currentTarget)}
      onMouseLeave={(e) => handleClassLeave(e.currentTarget)}
    >
      <span>
        {children}
      </span>
      <span className={styles.animationText__cloned}>
        {children}
      </span>
    </div>
  );
}
