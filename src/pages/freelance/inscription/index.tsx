/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useEffect, useCallback, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/router';
import { GetStaticProps } from 'next';
import Script from 'next/script';
import HeadComponents from '@/components/head/HeadComponents';
import { CategoryType, DepartmentType, CompanyFormType } from '@/types/annuaire.type';

declare const google: any;

interface InscriptionProps {
  categories: CategoryType[];
  departments: DepartmentType[];
}

interface FormErrors {
  [field: string]: string[];
}

const INITIAL_FORM: CompanyFormType = {
  email: '',
  first_name: '',
  last_name: '',
  company_name: '',
  siret: '',
  phone: '',
  category_ids: [],
  intervention_dept_ids: [],
  place_id: '',
  formatted_address: '',
  city_name: '',
  website: '',
  short_description: '',
  description: '',
  postal_code: '',
  department_name: '',
  department_code: '',
  lat: '',
  lng: '',
};

const STEPS = [
  { label: 'Contact', fields: ['first_name', 'last_name', 'email', 'phone'] },
  { label: 'Entreprise', fields: ['company_name', 'siret', 'category_ids', 'website', 'short_description', 'description'] },
  { label: 'Adresse', fields: ['place_id', 'formatted_address', 'city_name', 'postal_code'] },
] as const;

export const getStaticProps: GetStaticProps<InscriptionProps> = async () => {
  try {
    const res = await fetch(`${process.env.ANNUAIRE_API_URL}annuaire`);
    if (!res.ok) throw new Error();
    const data = await res.json();
    return { props: { categories: data.categories ?? [], departments: data.departments ?? [] } };
  } catch {
    return { props: { categories: [], departments: [] } };
  }
};

export default function Inscription({ categories, departments }: InscriptionProps) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<CompanyFormType>(INITIAL_FORM);
  const [logo, setLogo] = useState<File | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [globalError, setGlobalError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const addressRef = useRef<HTMLInputElement>(null);

  const initAutocomplete = useCallback(() => {
    if (!addressRef.current || typeof google === 'undefined' || !google.maps?.places) return;

    const autocomplete = new google.maps.places.Autocomplete(addressRef.current, {
      componentRestrictions: { country: 'fr' },
      fields: ['place_id', 'formatted_address', 'address_components', 'geometry'],
    });

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (!place.place_id) return;

      const get = (type: string): string =>
        place.address_components?.find((c: any) => c.types.includes(type))?.long_name ?? '';

      const postalCode = get('postal_code');
      const deptCode =
        postalCode.startsWith('97') || postalCode.startsWith('98')
          ? postalCode.substring(0, 3)
          : postalCode.substring(0, 2);

      setForm((prev) => ({
        ...prev,
        place_id: place.place_id,
        formatted_address: place.formatted_address ?? '',
        city_name: get('locality') || get('postal_town') || get('sublocality_level_1'),
        postal_code: postalCode,
        department_name: get('administrative_area_level_2'),
        department_code: deptCode,
        lat: String(place.geometry?.location?.lat() ?? ''),
        lng: String(place.geometry?.location?.lng() ?? ''),
      }));

      setErrors((prev) => ({ ...prev, place_id: [], formatted_address: [], city_name: [] }));
    });
  }, []);

  useEffect(() => {
    if (step !== 2) return;
    if (typeof google !== 'undefined' && google.maps?.places) {
      initAutocomplete();
    }
  }, [step, initAutocomplete]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]?.length) setErrors((prev) => ({ ...prev, [name]: [] }));
  };

  const handleCategoryToggle = (id: string) => {
    setForm((prev) => {
      const ids = prev.category_ids;
      const updated = ids.includes(id) ? ids.filter((i) => i !== id) : [...ids, id];
      return { ...prev, category_ids: updated };
    });
    if (errors['category_ids']?.length) setErrors((prev) => ({ ...prev, category_ids: [] }));
  };

  const handleDeptToggle = (slug: string) => {
    setForm((prev) => {
      const ids = prev.intervention_dept_ids;
      const updated = ids.includes(slug) ? ids.filter((i) => i !== slug) : [...ids, slug];
      return { ...prev, intervention_dept_ids: updated };
    });
  };

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    setLogo(e.target.files?.[0] ?? null);
    if (errors['logo']?.length) setErrors((prev) => ({ ...prev, logo: [] }));
  };

  const hasError = (name: string) => (errors[name]?.length ?? 0) > 0;

  const inputClass = (name: string) =>
    `w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary ${
      hasError(name) ? 'border-red-500' : 'border-gray-300'
    }`;

  const inputProps = (name: keyof CompanyFormType) => ({
    name,
    value: form[name] ?? '',
    onChange: handleChange,
  });

  const ErrorList = ({ name }: { name: string }) => {
    const msgs = errors[name];
    if (!msgs?.length) return null;
    return (
      <ul className="mt-1 text-sm text-red-600 list-disc list-inside">
        {msgs.map((msg, i) => (
          <li key={i}>{msg}</li>
        ))}
      </ul>
    );
  };

  // Valide les champs requis de l'étape courante avant de passer à la suivante
  const validateStep = (): boolean => {
    const required = STEPS[step].fields as readonly string[];
    const newErrors: FormErrors = {};
    required.forEach((f) => {
      const val = form[f as keyof CompanyFormType];
      const isEmpty = Array.isArray(val) ? val.length === 0 : !val;
      if (isEmpty) {
        newErrors[f] = ['Ce champ est obligatoire.'];
        return;
      }
      if (f === 'short_description') {
        const len = (val as string).trim().length;
        if (len > 130) newErrors[f] = [`La description courte ne doit pas dépasser 130 caractères (actuellement ${len}).`];
      }
      if (f === 'description') {
        const len = (val as string).trim().length;
        if (len < 500) newErrors[f] = [`La description doit contenir au moins 500 caractères (actuellement ${len}).`];
        else if (len > 1500) newErrors[f] = [`La description ne doit pas dépasser 1500 caractères (actuellement ${len}).`];
      }
      if (f === 'website') {
        if (!(val as string).startsWith('https://')) {
          newErrors[f] = ["L'URL doit commencer par https://"];
        }
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const goNext = () => {
    if (validateStep()) setStep((s) => s + 1);
  };

  const goPrev = () => {
    setErrors({});
    setStep((s) => s - 1);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateStep()) return;

    setGlobalError('');
    setSubmitting(true);

    const fd = new FormData();
    (Object.keys(form) as (keyof CompanyFormType)[]).forEach((key) => {
      const val = form[key];
      if (Array.isArray(val)) {
        val.forEach((v) => fd.append(`${key}[]`, v));
      } else if (val) {
        fd.append(key, val);
      }
    });
    if (logo) fd.append('logo', logo);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_ANNUAIRE_API_URL}company/register`, {
        method: 'POST',
        body: fd,
        credentials: 'include',
      });

      if (res.status === 201) {
        router.push('/freelance/inscription/confirmation');
        return;
      }

      const json = await res.json();
      if (res.status === 422 || res.status === 409) {
        setErrors(json.errors ?? {});
        // Revenir à la première étape qui contient une erreur
        for (let i = 0; i < STEPS.length; i++) {
          if (STEPS[i].fields.some((f) => json.errors?.[f]?.length)) {
            setStep(i);
            break;
          }
        }
      } else {
        setGlobalError('Une erreur est survenue. Veuillez réessayer.');
      }
    } catch {
      setGlobalError('Impossible de contacter le serveur. Vérifiez votre connexion.');
    } finally {
      setSubmitting(false);
    }
  };

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '';

  return (
    <>
      <HeadComponents
        title="Inscrire votre entreprise — Annuaire Freelance"
        description="Référencez gratuitement votre activité freelance dans notre annuaire."
        url="/freelance/inscription"
        image=""
        srcset=""
      />

      {apiKey && (
        <Script
          id="google-places"
          src={`https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`}
          strategy="afterInteractive"
          onLoad={initAutocomplete}
        />
      )}

      <div className="max-w-2xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6">Inscrivez votre entreprise</h1>

        {/* Indicateur d'étapes */}
        <ol className="flex items-center mb-10">
          {STEPS.map((s, i) => (
            <li key={s.label} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center">
                <span
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors ${
                    i < step
                      ? 'bg-primary border-primary text-white'
                      : i === step
                      ? 'border-primary text-primary'
                      : 'border-gray-300 text-gray-400'
                  }`}
                >
                  {i < step ? '✓' : i + 1}
                </span>
                <span
                  className={`mt-1 text-xs font-medium ${
                    i === step ? 'text-primary' : 'text-gray-400'
                  }`}
                >
                  {s.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-2 mb-5 transition-colors ${
                    i < step ? 'bg-primary' : 'bg-gray-200'
                  }`}
                />
              )}
            </li>
          ))}
        </ol>

        {globalError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-300 rounded text-red-700 text-sm">
            {globalError}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {/* ── Étape 1 : Contact ── */}
          {step === 0 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="first_name">
                    Prénom <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="first_name"
                    required
                    autoComplete="given-name"
                    className={inputClass('first_name')}
                    {...inputProps('first_name')}
                  />
                  <ErrorList name="first_name" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="last_name">
                    Nom <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="last_name"
                    required
                    autoComplete="family-name"
                    className={inputClass('last_name')}
                    {...inputProps('last_name')}
                  />
                  <ErrorList name="last_name" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="email">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  className={inputClass('email')}
                  {...inputProps('email')}
                />
                <ErrorList name="email" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="phone">
                  Téléphone <span className="text-red-500">*</span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  className={inputClass('phone')}
                  {...inputProps('phone')}
                />
                <ErrorList name="phone" />
              </div>
            </div>
          )}

          {/* ── Étape 2 : Entreprise ── */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="company_name">
                  Nom de l&rsquo;entreprise <span className="text-red-500">*</span>
                </label>
                <input
                  id="company_name"
                  required
                  autoComplete="organization"
                  className={inputClass('company_name')}
                  {...inputProps('company_name')}
                />
                <ErrorList name="company_name" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="siret">
                    SIRET <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="siret"
                    required
                    maxLength={14}
                    pattern="\d{14}"
                    inputMode="numeric"
                    className={inputClass('siret')}
                    {...inputProps('siret')}
                  />
                  <ErrorList name="siret" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Catégorie(s) <span className="text-red-500">*</span>
                  </label>
                  <div
                    className={`border rounded p-3 max-h-48 overflow-y-auto ${
                      hasError('category_ids') ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    {categories.length === 0 ? (
                      <p className="text-sm text-gray-400">Aucune catégorie disponible.</p>
                    ) : (
                      <div className="grid grid-cols-1 gap-2">
                        {categories.map((cat) => {
                          const id = String(cat.id ?? cat.slug);
                          return (
                            <label
                              key={cat.slug}
                              className="flex items-center gap-2 cursor-pointer text-sm"
                            >
                              <input
                                type="checkbox"
                                value={id}
                                checked={form.category_ids.includes(id)}
                                onChange={() => handleCategoryToggle(id)}
                                className="accent-primary w-4 h-4 shrink-0"
                              />
                              {cat.name}
                            </label>
                          );
                        })}
                      </div>
                    )}
                  </div>
                  {form.category_ids.length > 0 && (
                    <p className="mt-1 text-xs text-gray-500">
                      {form.category_ids.length} catégorie{form.category_ids.length > 1 ? 's' : ''} sélectionnée{form.category_ids.length > 1 ? 's' : ''}
                    </p>
                  )}
                  <ErrorList name="category_ids" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="website">
                  Site web <span className="text-red-500">*</span>
                </label>
                <input
                  id="website"
                  type="url"
                  required
                  autoComplete="url"
                  placeholder="https://"
                  className={inputClass('website')}
                  {...inputProps('website')}
                />
                <ErrorList name="website" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="short_description">
                  Description courte <span className="text-red-500">*</span>
                </label>
                <input
                  id="short_description"
                  required
                  maxLength={130}
                  className={inputClass('short_description')}
                  placeholder="Résumez votre activité en une phrase percutante…"
                  {...inputProps('short_description')}
                />
                <div className="flex justify-between mt-1">
                  <ErrorList name="short_description" />
                  <span className={`text-xs ml-auto ${
                    (form.short_description?.trim().length ?? 0) > 130 ? 'text-red-500' : 'text-gray-400'
                  }`}>
                    {form.short_description?.trim().length ?? 0} / 130 caractères
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="description">
                  Description <span className="text-red-500">*</span>
                </label>
                <div className="mb-2 p-3 bg-blue-50 border border-blue-200 rounded text-sm text-blue-800">
                  Rédigez une description <strong>unique et claire</strong> de votre activité. Évitez le copier-coller générique — une description originale améliore votre visibilité et inspire confiance à vos futurs clients.
                </div>
                <textarea
                  id="description"
                  name="description"
                  required
                  minLength={500}
                  maxLength={1500}
                  value={form.description ?? ''}
                  onChange={handleChange}
                  rows={6}
                  className={inputClass('description')}
                  placeholder="Décrivez votre activité, vos compétences et ce qui vous différencie…"
                />
                <div className="flex justify-between mt-1">
                  <ErrorList name="description" />
                  <span className={`text-xs ml-auto ${
                    (form.description?.trim().length ?? 0) < 500
                      ? 'text-red-500'
                      : (form.description?.trim().length ?? 0) > 1500
                      ? 'text-red-500'
                      : 'text-green-600'
                  }`}>
                    {form.description?.trim().length ?? 0} / 1500 caractères
                    {(form.description?.trim().length ?? 0) < 500 && ` (minimum 500)`}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="logo">
                  Logo <span className="text-gray-400 font-normal">(optionnel, max 2 Mo)</span>
                </label>
                <input
                  id="logo"
                  type="file"
                  accept="image/*"
                  onChange={handleFile}
                  className="w-full text-sm text-gray-500 file:mr-3 file:py-1 file:px-3 file:border file:border-gray-300 file:rounded file:text-sm file:bg-white hover:file:bg-gray-50 cursor-pointer"
                />
                <ErrorList name="logo" />
              </div>
            </div>
          )}

          {/* ── Étape 3 : Adresse ── */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="address_search">
                  Rechercher votre adresse{' '}
                  {apiKey && (
                    <span className="text-gray-400 font-normal">(auto-complétion Google)</span>
                  )}
                </label>
                <input
                  id="address_search"
                  ref={addressRef}
                  type="text"
                  autoComplete="off"
                  placeholder="Ex : 104 Avenue des Goumiers, Marseille"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {(hasError('place_id') || hasError('formatted_address')) && (
                  <p className="mt-1 text-sm text-red-600">
                    Veuillez sélectionner une adresse dans la liste.
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="formatted_address">
                  Adresse complète <span className="text-red-500">*</span>
                </label>
                <input
                  id="formatted_address"
                  required
                  readOnly
                  placeholder="Sélectionnez une adresse ci-dessus"
                  className={`${inputClass('formatted_address')} bg-gray-50`}
                  {...inputProps('formatted_address')}
                />
                <ErrorList name="formatted_address" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="city_name">
                    Ville <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="city_name"
                    required
                    className={inputClass('city_name')}
                    {...inputProps('city_name')}
                  />
                  <ErrorList name="city_name" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="postal_code">
                    Code postal <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="postal_code"
                    required
                    inputMode="numeric"
                    maxLength={5}
                    className={inputClass('postal_code')}
                    {...inputProps('postal_code')}
                  />
                  <ErrorList name="postal_code" />
                </div>
              </div>

              {/* Zones d'intervention */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Zones d&apos;intervention{' '}
                  <span className="text-gray-400 font-normal">(optionnel)</span>
                </label>
                <div className="border border-gray-300 rounded p-3 max-h-48 overflow-y-auto">
                  {departments.length === 0 ? (
                    <p className="text-sm text-gray-400">Aucun département disponible.</p>
                  ) : (
                    <div className="grid grid-cols-2 gap-2">
                      {departments.map((dept) => (
                        <label
                          key={dept.slug}
                          className="flex items-center gap-2 cursor-pointer text-sm"
                        >
                          <input
                            type="checkbox"
                            value={dept.slug}
                            checked={form.intervention_dept_ids.includes(dept.slug)}
                            onChange={() => handleDeptToggle(dept.slug)}
                            className="accent-primary w-4 h-4 shrink-0"
                          />
                          <span className="font-mono text-gray-400 text-xs">{dept.code}</span>
                          {dept.name}
                        </label>
                      ))}
                    </div>
                  )}
                </div>
                {form.intervention_dept_ids.length > 0 && (
                  <p className="mt-1 text-xs text-gray-500">
                    {form.intervention_dept_ids.length} département{form.intervention_dept_ids.length > 1 ? 's' : ''} sélectionné{form.intervention_dept_ids.length > 1 ? 's' : ''}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* ── Navigation ── */}
          <div className="flex justify-between mt-8">
            {step > 0 ? (
              <button type="button" onClick={goPrev} className="btn btn-secondary px-6">
                Précédent
              </button>
            ) : (
              <span />
            )}

            {step < STEPS.length - 1 ? (
              <button type="button" onClick={goNext} className="btn btn-primary px-6">
                Suivant
              </button>
            ) : (
              <button
                type="submit"
                disabled={submitting}
                className="btn btn-primary px-6 disabled:opacity-60"
              >
                {submitting ? 'Envoi en cours…' : 'Inscrire mon entreprise'}
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
