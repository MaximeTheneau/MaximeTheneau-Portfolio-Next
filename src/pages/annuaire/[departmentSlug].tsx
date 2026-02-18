import Head from 'next/head';
import Link from 'next/link';
import { GetStaticPaths, GetStaticProps } from 'next';
import fetcher from '@/utils/fetcher';
import { DepartmentType, CityType } from '@/types/annuaire.type';

interface DepartmentPageProps {
  department: DepartmentType;
  cities: CityType[];
  counts: Record<string, number>;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await fetcher(`${process.env.ANNUAIRE_API_URL}annuaire`);

  const paths = data.departments.map((dept: DepartmentType) => ({
    params: { departmentSlug: dept.slug },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<DepartmentPageProps> = async ({ params }) => {
  const data = await fetcher(`${process.env.ANNUAIRE_API_URL}annuaire/${params?.departmentSlug}`);

  return {
    props: {
      department: data.department,
      cities: data.cities,
      counts: data.counts,
    },
  };
};

export default function DepartmentPage({ department, cities, counts }: DepartmentPageProps) {
  return (
    <>
      <Head>
        <title>Professionnels en {department.name} — Annuaire</title>
        <meta
          name="description"
          content={`Trouvez des professionnels dans le département ${department.name} (${department.code}).`}
        />
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_URL}/annuaire/${department.slug}`} />
      </Head>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <nav className="text-sm text-gray-500 mb-4">
          <Link href="/annuaire" className="hover:underline">
            Annuaire
          </Link>{' '}
          › {department.name}
        </nav>

        <h1 className="text-3xl font-bold mb-2">
          Professionnels en {department.name}
        </h1>
        <p className="text-gray-500 mb-6">Département {department.code}</p>

        {cities.length === 0 ? (
          <p className="text-gray-500">Aucune ville répertoriée dans ce département.</p>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {cities.map((city) => {
              const count = counts[city.slug] ?? 0;
              return (
                <li key={city.slug}>
                  <Link
                    href={`/annuaire/${department.slug}/${city.slug}`}
                    className="flex items-center justify-between border border-gray-200 rounded px-4 py-3 hover:bg-gray-50"
                  >
                    <span className="font-medium">{city.name}</span>
                    {count > 0 && (
                      <span className="text-sm text-gray-400">{count} pro{count > 1 ? 's' : ''}</span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
}
