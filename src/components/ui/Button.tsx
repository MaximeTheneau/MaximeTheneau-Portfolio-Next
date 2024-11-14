import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className: string;
}

export default function Button({ className, ...props }: ButtonProps) {
  return (
    <button
      type="button"
      className={`my-4 rounded py-2 px-4 font-bold text-black ${className || ''}`}
      {...props}
    >
      {props.children}
    </button>
  );
}
