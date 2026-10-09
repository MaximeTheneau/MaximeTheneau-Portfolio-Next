import NotCopie from '../notCopie/NotCopie';

export default function ContactAbout() {
  return (
    <ul className="list-none mt-4">
      {/* Nom */}
      <li>
        <strong>Maxime Freelance</strong>
      </li>
      {/* Localisation */}
      <li>
        <strong>📍 Marseille 13008</strong>
      </li>
      {/* Numéro de téléphone */}
      <li>
        <strong>
          <a href="tel:+33622068036" className="text-blue-600 hover:underline">
            📞 06 22 06 80 36
          </a>
        </strong>
      </li>
      <li>
        <strong>SIRET : 532 206 380 000 42</strong>
      </li>
      <li>
        <NotCopie />
      </li>
    </ul>
  );
}
