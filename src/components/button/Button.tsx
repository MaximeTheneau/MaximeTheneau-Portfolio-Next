import Link from 'next/link';

interface ButtonProps {
  text: string;
  icon: string | null;
  link: string | null;
}

export default function Button({ text, icon, link }: ButtonProps) {
  return (
    <button
      type="button"
      className="btn btn-secondary"
      role="link"
    >
      {link && (
        <Link href={link} className="flex w-full justify-between">
          {text}
          {icon && (
          <i className={`${icon} pl-1`} />
          )}
        </Link>
      )}
      {!link && (
        <>
          {text}
          {icon && (
          <i className={`${icon} pl-1`} />
          )}
        </>
      )}

    </button>
  );
}
