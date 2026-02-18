import Head from 'next/head';
import Link from 'next/link';
import { GetStaticPaths, GetStaticProps } from 'next';
import fetcher from '@/utils/fetcher';
import { DepartmentType, CityType, CompanyType } from '@/types/annuaire.type';

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

  return (
    <>
      <Head>
        <title>{company.name} — {city.name} — Annuaire</title>
        <meta
          name="description"
          content={company.description ?? `Fiche professionnelle de ${company.name} à ${city.name}.`}
        />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_URL}/annuaire/${department.slug}/${city.slug}/${company.slug}`}
        />
      </Head>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <nav className="text-sm text-gray-500 mb-4">
          <Link href="/annuaire" className="hover:underline">
            Annuaire
          </Link>{' '}
          ›{' '}
          <Link href={`/annuaire/${department.slug}`} className="hover:underline">
            {department.name}
          </Link>{' '}
          ›{' '}
          <Link href={`/annuaire/${department.slug}/${city.slug}`} className="hover:underline">
            {city.name}
          </Link>{' '}
          › {company.name}
        </nav>

        <article className="border border-gray-200 rounded-lg p-6">
          <h1 className="text-3xl font-bold mb-1">{company.name}</h1>
          {company.category && (
            <p className="text-gray-500 mb-4">
              <Link href={`/annuaire/categorie/${company.category.slug}`} className="hover:underline">
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
        </article>
      </div>
    </>
  );
}
