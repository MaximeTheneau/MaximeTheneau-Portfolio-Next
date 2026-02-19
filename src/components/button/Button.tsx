import Link from 'next/link';

interface ButtonProps {
  text: string;
  icon: string | null;
  link: string | null;
}

export default function Button({ text, icon, link }: ButtonProps) {
  if (link) {
    return (
      <Link href={link} className="btn btn-secondary flex w-full justify-between">
        {text}
        {icon && (
          <i className={`${icon} pl-1`} aria-hidden="true" />
        )}
      </Link>
    );
  }

  return (
    <button
      type="button"
      className="btn btn-secondary"
    >
      {text}
      {icon && (
        <i className={`${icon} pl-1`} aria-hidden="true" />
      )}
    </button>
  );
}
