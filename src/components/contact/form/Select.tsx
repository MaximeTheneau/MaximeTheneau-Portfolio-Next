import { ChangeEvent } from "react";

export default function Select( { onChange, value }) {
  return (
    <select
      title="Sujet"
      name="subject"
      value={value}
      onChange={onChange}

    >
      <option value="Demande de renseignements">Demande de renseignements</option>
      <option value="Demande de devis">Demande de devis</option>
      <option value="Autre">Autre</option>
  </select>
)
}