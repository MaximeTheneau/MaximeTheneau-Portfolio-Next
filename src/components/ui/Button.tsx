/* eslint-disable react/button-has-type */
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  type?: 'submit' | 'reset' | 'button';
}

export default function Button({ className, type, ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={`min-w-[48px] min-h-[48px] my-4 rounded py-2 px-4 font-bold text-black bg-primary ${className}`}
      {...props}
    >
      {props.children}
    </button>
  );
}

Button.defaultProps = {
  className: '',
  type: 'button',
};
