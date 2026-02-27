import Link from 'next/link';
import dynamic from 'next/dynamic';
import { GetStaticPaths, GetStaticProps } from 'next';
import fetcher from '@/utils/fetcher';
import { DepartmentType, CityType, CompanyType } from '@/types/annuaire.type';
import HeadComponents from '@/components/head/HeadComponents';
import InscriptionCta from '@/components/inscriptionCta/InscriptionCta';
import Image from '@/utils/Image';

const AnnuaireMap = dynamic(() => import('@/components/maps/AnnuaireMap'), { ssr: false });

interface CompanyPageProps {
  company: CompanyType;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const index = await fetcher(`${process.env.ANNUAIRE_API_URL}annuaire`);

  const cityData = await Promise.all(
    index.departments.map(async (dept: DepartmentType) => {
      const deptData = await fetcher(`${process.env.ANNUAIRE_API_URL}annuaire/${dept.slug}`);
      return deptData.cities.map((city: CityType) => ({
        deptSlug: dept.slug,
        citySlug: city.slug,
      }));
    })
  );

  const companiesPaths = await Promise.all(
    cityData.flat().map(async ({ deptSlug, citySlug }: { deptSlug: string; citySlug: string }) => {
      const cityData = await fetcher(`${process.env.ANNUAIRE_API_URL}annuaire/${deptSlug}/${citySlug}`);
      return cityData.companies.map((company: CompanyType) => ({
        params: { departmentSlug: deptSlug, citySlug, companySlug: company.slug },
      }));
    })
  );

  return { paths: companiesPaths.flat(), fallback: false };
};

export const getStaticProps: GetStaticProps<CompanyPageProps> = async ({ params }) => {
  const company = await fetcher(
    `${process.env.ANNUAIRE_API_URL}annuaire/${params?.departmentSlug}/${params?.citySlug}/${params?.companySlug}`
  );

  return {
    props: { company },
  };
};

export default function CompanyPage({ company }: CompanyPageProps) {
  const city = company.address.city;
  const department = city.department;

  const mapMarkers =
    company.address.lat && company.address.lng
      ? [
          {
            lat: company.address.lat,
            lng: company.address.lng,
            name: company.name,
            url: '',
          },
        ]
      : [];

  return (
    <>
      <HeadComponents
        title={`${company.name} — Freelance à ${city.name} (${department.code})`}
        description={company.description ?? `Fiche freelance de ${company.name} à ${city.name}.`}
        url={`/freelance/${department.slug}/${city.slug}/${company.slug}`}
        image=""
        srcset=""
      />

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-center">
          <article className="w-full md:w-3/4 px-4">
            <nav className="text-sm text-gray-500 mb-4">
              <Link href="/freelance" className="hover:underline">
                Annuaire Freelance
              </Link>{' '}
              ›{' '}
              <Link href={`/freelance/${department.slug}`} className="hover:underline">
                {department.name}
              </Link>{' '}
              ›{' '}
              <Link href={`/freelance/${department.slug}/${city.slug}`} className="hover:underline">
                {city.name}
              </Link>{' '}
              › {company.name}
            </nav>

            <div className="border border-gray-200 rounded-lg p-6 mb-6">
              {company.img && (
                <div className="mb-5 flex justify-center">
                  <Image
                    src={company.img}
                    alt={company.altImg ?? `Logo de ${company.name}`}
                    width={company.imgWidth ?? 200}
                    height={company.imgHeight ?? 200}
                    className="object-contain max-h-48 w-auto rounded"
                    priority
                  />
                </div>
              )}
              <h1 className="text-3xl font-bold mb-1">{company.name}</h1>
              {company.category && (
                <p className="text-gray-500 mb-4">
                  <Link href={`/freelance/categorie/${company.category.slug}`} className="hover:underline">
                    {company.category.name}
                  </Link>
                </p>
              )}

              {company.description && (
                <p className="text-gray-700 mb-6">{company.description}</p>
              )}

              <dl className="space-y-3 text-sm">
                <div className="flex gap-3">
                  <dt className="w-28 font-medium text-gray-500 shrink-0">Téléphone</dt>
                  <dd>
                    <a href={`tel:${company.phone}`} className="hover:underline">
                      {company.phone}
                    </a>
                  </dd>
                </div>

                {company.website && (
                  <div className="flex gap-3">
                    <dt className="w-28 font-medium text-gray-500 shrink-0">Site web</dt>
                    <dd>
                      <a
                        href={company.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline text-blue-600 break-all"
                      >
                        {company.website}
                      </a>
                    </dd>
                  </div>
                )}

                <div className="flex gap-3">
                  <dt className="w-28 font-medium text-gray-500 shrink-0">Adresse</dt>
                  <dd>{company.address.formatted}</dd>
                </div>

                <div className="flex gap-3">
                  <dt className="w-28 font-medium text-gray-500 shrink-0">SIRET</dt>
                  <dd className="font-mono">{company.siret}</dd>
                </div>
              </dl>
            </div>

            {/* Map */}
            {mapMarkers.length > 0 && (
              <div className="rounded overflow-hidden">
                <AnnuaireMap markers={mapMarkers} height="300px" autoFit />
              </div>
            )}
          </article>
          <aside className="w-full md:w-1/4 bg-secondary p-4">
            <h2 className="text-xl font-bold mb-4">Liens utiles :</h2>
            <InscriptionCta isLink />
            <Link href="/freelance" className="py-2 block border-solid border-b border-gray-200 last:border-b-0">Annuaire Freelance</Link>
            <Link href="/blog" className="py-2 block border-solid border-b border-gray-200 last:border-b-0">Blog</Link>
            <Link href="/A-propos" className="py-2 block border-solid border-b border-gray-200 last:border-b-0">Qui suis-je ?</Link>
            <Link href="/Contact" className="py-2 block border-solid border-b border-gray-200 last:border-b-0">Contact</Link>
          </aside>
        </div>
      </div>
    </>
  );
}
