import Link from 'next/link';

interface InscriptionCtaProps {
  isLink?: boolean;
}

export default function InscriptionCta({ isLink = false }: InscriptionCtaProps) {
  if (isLink) {
    return (
      <Link
        href="/inscription"
        className="py-2 block border-solid border-b border-gray-200 last:border-b-0"
      >
        Inscrivez votre entreprise
      </Link>
    );
  }

  return (
    <Link href="/inscription" className="btn btn-secondary">
      Inscrivez votre entreprise gratuitement
    </Link>
  );
}
