import Head from 'next/head';
import Link from 'next/link';
import { GetStaticPaths, GetStaticProps } from 'next';
import fetcher from '@/utils/fetcher';
import { CategoryType, DepartmentType, CityType, CompanyType } from '@/types/annuaire.type';

interface CategoryCityPageProps {
  category: CategoryType;
  department: DepartmentType;
  city: CityType;
  companies: CompanyType[];
}

export const getStaticPaths: GetStaticPaths = async () => {
  const index = await fetcher(`${process.env.ANNUAIRE_API_URL}annuaire`);

  const deptCities = await Promise.all(
    (index.departments as DepartmentType[]).map(async (dept) => {
      const data = await fetcher(`${process.env.ANNUAIRE_API_URL}annuaire/${dept.slug}`);
      return (data.cities as CityType[]).map((city) => ({
        deptSlug: dept.slug,
        citySlug: city.slug,
      }));
    })
  );

  const paths: { params: { categorySlug: string; departmentSlug: string; citySlug: string } }[] = [];
  for (const cat of index.categories as CategoryType[]) {
    for (const { deptSlug, citySlug } of deptCities.flat()) {
      paths.push({ params: { categorySlug: cat.slug, departmentSlug: deptSlug, citySlug } });
    }
  }

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<CategoryCityPageProps> = async ({ params }) => {
  const data = await fetcher(
    `${process.env.ANNUAIRE_API_URL}annuaire/categorie/${params?.categorySlug}/${params?.departmentSlug}/${params?.citySlug}`
  );

  return {
    props: {
      category: data.category,
      department: data.department,
      city: data.city,
      companies: data.companies,
    },
  };
};

export default function CategoryCityPage({
  category,
  department,
  city,
  companies,
}: CategoryCityPageProps) {
  return (
    <>
      <Head>
        <title>
          {category.name} à {city.name} — Annuaire
        </title>
        <meta
          name="description"
          content={`Professionnels ${category.name} à ${city.name} (${department.code}).`}
        />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_URL}/annuaire/categorie/${category.slug}/${department.slug}/${city.slug}`}
        />
      </Head>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <nav className="text-sm text-gray-500 mb-4">
          <Link href="/annuaire" className="hover:underline">
            Annuaire
          </Link>{' '}
          ›{' '}
          <Link href={`/annuaire/categorie/${category.slug}`} className="hover:underline">
            {category.name}
          </Link>{' '}
          ›{' '}
          <Link href={`/annuaire/categorie/${category.slug}/${department.slug}`} className="hover:underline">
            {department.name}
          </Link>{' '}
          › {city.name}
        </nav>

        <h1 className="text-3xl font-bold mb-6">
          {category.name} à {city.name}
        </h1>

        {companies.length === 0 ? (
          <p className="text-gray-500">
            Aucun professionnel dans cette catégorie pour cette ville.
          </p>
        ) : (
          <ul className="space-y-4">
            {companies.map((company) => (
              <li key={company.slug}>
                <Link
                  href={`/annuaire/${department.slug}/${city.slug}/${company.slug}`}
                  className="block border border-gray-200 rounded p-4 hover:bg-gray-50"
                >
                  <div className="flex items-start justify-between">
                    <p className="font-semibold">{company.name}</p>
                    <p className="text-sm text-gray-400 shrink-0 ml-4">{company.phone}</p>
                  </div>
                  {company.description && (
                    <p className="mt-1 text-sm text-gray-600 line-clamp-2">{company.description}</p>
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
