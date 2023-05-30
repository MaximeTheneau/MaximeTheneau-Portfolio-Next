import { on } from "events";
import { useState } from "react"

export default function Input({
  type,
  title,
  placeholder,
  value,
  onBlur,
  onChange,
  required
}) {
  const [name, setName] = useState('');


  return (
    <input
      type={type}
      title={title}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      onBlur={onBlur}
      required={required ? 'required' : required}
    />
  )
}