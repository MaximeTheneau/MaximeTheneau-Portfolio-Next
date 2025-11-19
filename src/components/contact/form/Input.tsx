import { InputHTMLAttributes } from 'react';

export default function Input({
  type,
  title,
  value,
  placeholder,
  onChange,
  required,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type={type}
      title={title}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      required={required}
      {...props}
    />
  );
}
