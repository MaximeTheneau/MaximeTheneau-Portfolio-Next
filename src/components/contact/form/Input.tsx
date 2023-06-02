export default function Input({
  type,
  title,
  value,
  placeholder,
  onChange,
  onBlur,
}) {
  return (
    <input
      type={type}
      title={title}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      onBlur={onBlur}
      required
    />
  );
}
