import Link from 'next/link';
import InscriptionCta from '@/components/inscriptionCta/InscriptionCta';

export default function AnnuaireAside() {
  return (
    <aside className="w-full md:w-1/4 bg-secondary p-4">
      <h2 className="text-xl font-bold mb-4">Liens utiles :</h2>
      <InscriptionCta isLink />
      <Link href="/freelance" className="py-2 block border-solid border-b border-gray-200 last:border-b-0">Annuaire Freelance</Link>
      <Link href="https://annuaire.maximefreelance.fr/login" className="py-2 block border-solid border-b border-gray-200 last:border-b-0">Modifier votre entreprise</Link>
      <Link href="/blog" className="py-2 block border-solid border-b border-gray-200 last:border-b-0">Blog</Link>
      <Link href="/A-propos" className="py-2 block border-solid border-b border-gray-200 last:border-b-0">Qui suis-je ?</Link>
      <Link href="/Contact" className="py-2 block border-solid border-b border-gray-200 last:border-b-0">Contact</Link>
    </aside>
  );
}
