import NotCopie from '../notCopie/NotCopie';

export default function ContactAbout() {
  return (
    <>
      <p itemProp="address">
        <strong>Adresse : </strong>
        <span itemProp="postalCode">13008 </span>
        <span itemProp="addressLocality">Marseille</span>
      </p>
      <NotCopie />
    </>
  );
}
