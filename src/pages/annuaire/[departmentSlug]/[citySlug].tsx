import Head from 'next/head';
import Link from 'next/link';
import { GetStaticPaths, GetStaticProps } from 'next';
import fetcher from '@/utils/fetcher';
import { DepartmentType, CityType, CompanyType } from '@/types/annuaire.type';

interface CityPageProps {
  department: DepartmentType;
  city: CityType;
  companies: CompanyType[];
}

export const getStaticPaths: GetStaticPaths = async () => {
  const index = await fetcher(`${process.env.ANNUAIRE_API_URL}annuaire`);

  const paths = await Promise.all(
    index.departments.map(async (dept: DepartmentType) => {
      const data = await fetcher(`${process.env.ANNUAIRE_API_URL}annuaire/${dept.slug}`);
      return data.cities.map((city: CityType) => ({
        params: { departmentSlug: dept.slug, citySlug: city.slug },
      }));
    })
  );

  return { paths: paths.flat(), fallback: false };
};

export const getStaticProps: GetStaticProps<CityPageProps> = async ({ params }) => {
  const data = await fetcher(
    `${process.env.ANNUAIRE_API_URL}annuaire/${params?.departmentSlug}/${params?.citySlug}`
  );

  return {
    props: {
      department: data.department,
      city: data.city,
      companies: data.companies,
    },
  };
};

export default function CityPage({ department, city, companies }: CityPageProps) {
  return (
    <>
      <Head>
        <title>
          Professionnels à {city.name} ({department.code}) — Annuaire
        </title>
        <meta
          name="description"
          content={`${companies.length} professionnel${companies.length > 1 ? 's' : ''} à ${city.name} dans le ${department.name}.`}
        />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_URL}/annuaire/${department.slug}/${city.slug}`}
        />
      </Head>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <nav className="text-sm text-gray-500 mb-4">
          <Link href="/annuaire" className="hover:underline">
            Annuaire
          </Link>{' '}
          ›{' '}
          <Link href={`/annuaire/${department.slug}`} className="hover:underline">
            {department.name}
          </Link>{' '}
          › {city.name}
        </nav>

        <h1 className="text-3xl font-bold mb-6">
          Professionnels à {city.name}
        </h1>

        {companies.length === 0 ? (
          <p className="text-gray-500">Aucun professionnel répertorié dans cette ville.</p>
        ) : (
          <ul className="space-y-4">
            {companies.map((company) => (
              <li key={company.slug}>
                <Link
                  href={`/annuaire/${department.slug}/${city.slug}/${company.slug}`}
                  className="block border border-gray-200 rounded p-4 hover:bg-gray-50"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold text-lg">{company.name}</p>
                      {company.category && (
                        <p className="text-sm text-gray-500">{company.category.name}</p>
                      )}
                    </div>
                    <p className="text-sm text-gray-400 shrink-0 ml-4">{company.phone}</p>
                  </div>
                  {company.description && (
                    <p className="mt-2 text-sm text-gray-600 line-clamp-2">{company.description}</p>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
