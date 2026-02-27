import Link from 'next/link';
import HeadComponents from '@/components/head/HeadComponents';

export default function InscriptionConfirmation() {
  return (
    <>
      <HeadComponents
        title="Inscription envoyée — Annuaire Freelance"
        description="Votre demande d'inscription a bien été reçue. Vérifiez votre email pour confirmer votre compte."
        url="/inscription/confirmation"
        image=""
        srcset=""
      />

      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="text-5xl mb-6">✉️</div>
        <h1 className="text-3xl font-bold mb-4">Vérifiez votre email</h1>
        <p className="text-gray-600 mb-4">
          Votre demande d&rsquo;inscription a bien été reçue. Nous vous avons envoyé un email pour
          confirmer votre compte et définir votre mot de passe.
        </p>
        <p className="text-gray-600 mb-8">
          Une fois votre compte confirmé, votre entreprise sera examinée par notre équipe avant
          d&rsquo;être publiée dans l&rsquo;annuaire.
        </p>
        <Link href="/freelance" className="btn btn-secondary">
          Retour à l&rsquo;annuaire
        </Link>
      </div>
    </>
  );
}
