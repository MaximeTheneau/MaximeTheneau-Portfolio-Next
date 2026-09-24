import type { HoneypotReturn } from '@/hooks/useHoneypot';

interface HoneypotFieldProps {
  honeypot: HoneypotReturn;
  fieldName?: string;
}

/**
 * Champ invisible pour les vrais utilisateurs, mais visible par les bots.
 * - Utilise du CSS hors-écran (pas display:none ni type=hidden, détectables par les bots)
 * - À placer n'importe où dans le <form>
 */
export default function HoneypotField({ honeypot, fieldName = 'website' }: HoneypotFieldProps) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        left: '-9999px',
        width: '1px',
        height: '1px',
        overflow: 'hidden',
        opacity: 0,
        pointerEvents: 'none',
      }}
    >
      <label htmlFor={`hp_${fieldName}`}>
        Ne pas remplir ce champ
        <input
          id={`hp_${fieldName}`}
          type="text"
          name={fieldName}
          value={honeypot.value}
          onChange={honeypot.onChange}
          autoComplete="off"
          tabIndex={-1}
        />
      </label>
    </div>
  );
}
