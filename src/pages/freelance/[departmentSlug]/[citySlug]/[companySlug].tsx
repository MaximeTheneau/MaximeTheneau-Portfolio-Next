import Link from 'next/link';
import dynamic from 'next/dynamic';
import { GetStaticPaths, GetStaticProps } from 'next';
import fetcher from '@/utils/fetcher';
import { DepartmentType, CityType, CompanyType } from '@/types/annuaire.type';
import HeadComponents from '@/components/head/HeadComponents';
import AnnuaireAside from '@/components/aside/AnnuaireAside';
import Image from '@/utils/Image';

const AnnuaireMap = dynamic(() => import('@/components/maps/AnnuaireMap'), { ssr: false });

interface CompanyPageProps {
  company: CompanyType;
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const index = await fetcher(`${process.env.ANNUAIRE_API_URL}annuaire`);

    const paths: { params: { departmentSlug: string; citySlug: string; companySlug: string } }[] = [];

    for (const dept of index.departments as DepartmentType[]) {
      const deptData = await fetcher(`${process.env.ANNUAIRE_API_URL}annuaire/${dept.slug}`);
      for (const city of deptData.cities as CityType[]) {
        const cityData = await fetcher(`${process.env.ANNUAIRE_API_URL}annuaire/${dept.slug}/${city.slug}`);
        for (const company of cityData.companies as CompanyType[]) {
          paths.push({ params: { departmentSlug: dept.slug, citySlug: city.slug, companySlug: company.slug } });
        }
      }
    }

    return { paths, fallback: 'blocking' };
  } catch {
    return { paths: [], fallback: 'blocking' };
  }
};

export const getStaticProps: GetStaticProps<CompanyPageProps> = async ({ params }) => {
  try {
    const company = await fetcher(
      `${process.env.ANNUAIRE_API_URL}annuaire/${params?.departmentSlug}/${params?.citySlug}/${params?.companySlug}`
    );

    return {
      props: { company },
    };
  } catch {
    return { notFound: true };
  }
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
                    srcset={company.srcset}
                    alt={company.altImg ?? `Logo de ${company.name}`}
                    width={company.imgWidth ?? 100 }
                    height={company.imgHeight ?? 100}
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

            {/* Zones d'intervention */}
            {company.interventionDept && company.interventionDept.length > 0 && (
              <div className="border border-gray-200 rounded-lg p-6 mb-6">
                <h2 className="text-lg font-semibold mb-3">Zones d&apos;intervention</h2>
                <ul className="flex flex-wrap gap-2">
                  {company.interventionDept.map((dept) => (
                    <li key={dept.slug}>
                      <Link
                        href={`/freelance/${dept.slug}`}
                        className="inline-flex items-center gap-1 border border-gray-200 rounded px-3 py-1 text-sm hover:bg-gray-50"
                      >
                        <span className="font-mono text-gray-400">{dept.code}</span>
                        {dept.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Map */}
            {mapMarkers.length > 0 && (
              <div className="rounded overflow-hidden">
                <AnnuaireMap markers={mapMarkers} height="300px" autoFit />
              </div>
            )}
          </article>
          <AnnuaireAside />
        </div>
      </div>
    </>
  );
}
