import { useState, useRef } from 'react';

/**
 * Détecte les bots via deux méthodes :
 * 1. Champ honeypot rempli (invisible pour les vrais users, mais les bots le remplissent)
 * 2. Soumission trop rapide (< minSubmitTime ms)
 */
export function useHoneypot(minSubmitTime = 3000) {
  const [value, setValue] = useState('');
  const loadTime = useRef(Date.now());

  const isBot = () => {
    if (value !== '') return true;
    if (Date.now() - loadTime.current < minSubmitTime) return true;
    return false;
  };

  return {
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value),
    isBot,
  };
}

export type HoneypotReturn = ReturnType<typeof useHoneypot>;
