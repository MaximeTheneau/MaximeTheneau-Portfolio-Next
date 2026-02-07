/* eslint-disable react/button-has-type */
/* eslint-disable react/require-default-props */

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  type?: 'submit' | 'reset' | 'button';
}

export default function Button({
  className = '', type = 'button', children, ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`btn  ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
