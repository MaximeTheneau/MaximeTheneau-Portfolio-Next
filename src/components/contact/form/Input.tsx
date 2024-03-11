export default function Input({
  type,
  title,
  value,
  placeholder,
  onChange,
  required,
}) {
  return (
    <input
      type={type}
      title={title}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      required={required}
    />
  );
}
