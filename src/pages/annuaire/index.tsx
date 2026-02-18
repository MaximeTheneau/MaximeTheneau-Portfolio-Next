/* eslint-disable @typescript-eslint/no-require-imports */
import Head from 'next/head';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import { useState, useEffect } from 'react';
import fetcher from '@/utils/fetcher';
import { DepartmentType, CategoryType, CompanyType, CityType } from '@/types/annuaire.type';

interface AnnuaireIndexProps {
  departments: DepartmentType[];
  categories: CategoryType[];
}

export const getStaticProps: GetStaticProps<AnnuaireIndexProps> = async () => {
  const data = await fetcher(`${process.env.ANNUAIRE_API_URL}annuaire`);

  return {
    props: {
      departments: data.departments,
      categories: data.categories,
    },
  };
};

export default function AnnuaireIndex({ departments, categories }: AnnuaireIndexProps) {
  const [query, setQuery] = useState('');
  const [companies, setCompanies] = useState<CompanyType[]>([]);
  const [cities, setCities] = useState<CityType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.trim().length < 2) {
      setCompanies([]);
      setCities([]);
      return;
    }

    const timeout = setTimeout(async () => {
      setLoading(true);
      try {
        const data = await fetcher(
          `${process.env.NEXT_PUBLIC_API_URL}api/annuaire/search?q=${encodeURIComponent(query)}`
        );
        setCompanies(data.companies ?? []);
        setCities(data.cities ?? []);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  const hasResults = companies.length > 0 || cities.length > 0;

  return (
    <>
      <Head>
        <title>Annuaire des professionnels</title>
        <meta name="description" content="Trouvez des professionnels par département, ville ou catégorie." />
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_URL}/annuaire`} />
      </Head>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Annuaire des professionnels</h1>

        {/* Search */}
        <div className="mb-8">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher une entreprise, une ville…"
            className="w-full border border-gray-300 rounded px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {loading && <p className="mt-2 text-sm text-gray-500">Recherche en cours…</p>}
          {!loading && query.trim().length >= 2 && !hasResults && (
            <p className="mt-2 text-sm text-gray-500">Aucun résultat pour « {query} ».</p>
          )}
          {hasResults && (
            <div className="mt-4 border border-gray-200 rounded divide-y">
              {companies.map((company) => (
                <Link
                  key={company.slug}
                  href={`/annuaire/${company.address.city.department.slug}/${company.address.city.slug}/${company.slug}`}
                  className="flex items-center justify-between px-4 py-3 hover:bg-gray-50"
                >
                  <span className="font-medium">{company.name}</span>
                  <span className="text-sm text-gray-500">
                    {company.address.city.name} ({company.address.city.department.code})
                  </span>
                </Link>
              ))}
              {cities.map((city) => (
                <Link
                  key={`${city.department.slug}-${city.slug}`}
                  href={`/annuaire/${city.department.slug}/${city.slug}`}
                  className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 text-blue-600"
                >
                  <span>{city.name}</span>
                  <span className="text-sm text-gray-500">{city.department.name} ({city.department.code})</span>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Departments */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Par département</h2>
          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {departments.map((dept) => (
              <li key={dept.slug}>
                <Link
                  href={`/annuaire/${dept.slug}`}
                  className="block border border-gray-200 rounded px-3 py-2 hover:bg-gray-50 text-sm"
                >
                  <span className="font-mono text-gray-400 mr-2">{dept.code}</span>
                  {dept.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Categories */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Par catégorie</h2>
          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {categories.map((cat) => (
              <li key={cat.slug}>
                <Link
                  href={`/annuaire/categorie/${cat.slug}`}
                  className="block border border-gray-200 rounded px-3 py-2 hover:bg-gray-50 text-sm"
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
