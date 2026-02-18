import Head from 'next/head';
import Link from 'next/link';
import { GetStaticPaths, GetStaticProps } from 'next';
import fetcher from '@/utils/fetcher';
import { CategoryType, CompanyType } from '@/types/annuaire.type';

interface CategoryPageProps {
  category: CategoryType;
  companies: CompanyType[];
}

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await fetcher(`${process.env.ANNUAIRE_API_URL}annuaire`);

  const paths = data.categories.map((cat: CategoryType) => ({
    params: { categorySlug: cat.slug },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<CategoryPageProps> = async ({ params }) => {
  const data = await fetcher(`${process.env.ANNUAIRE_API_URL}annuaire/categorie/${params?.categorySlug}`);

  return {
    props: {
      category: data.category,
      companies: data.companies,
    },
  };
};

export default function CategoryPage({ category, companies }: CategoryPageProps) {
  return (
    <>
      <Head>
        <title>{category.name} — Annuaire des professionnels</title>
        <meta
          name="description"
          content={`Trouvez des professionnels dans la catégorie ${category.name}.`}
        />
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_URL}/annuaire/categorie/${category.slug}`} />
      </Head>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <nav className="text-sm text-gray-500 mb-4">
          <Link href="/annuaire" className="hover:underline">
            Annuaire
          </Link>{' '}
          › {category.name}
        </nav>

        <h1 className="text-3xl font-bold mb-6">{category.name}</h1>

        {companies.length === 0 ? (
          <p className="text-gray-500">Aucun professionnel dans cette catégorie.</p>
        ) : (
          <ul className="space-y-4">
            {companies.map((company) => {
              const city = company.address.city;
              const department = city.department;
              return (
                <li key={company.slug}>
                  <Link
                    href={`/annuaire/${department.slug}/${city.slug}/${company.slug}`}
                    className="block border border-gray-200 rounded p-4 hover:bg-gray-50"
                  >
                    <div className="flex items-start justify-between">
                      <p className="font-semibold">{company.name}</p>
                      <p className="text-sm text-gray-400 shrink-0 ml-4">
                        {city.name} ({department.code})
                      </p>
                    </div>
                    {company.description && (
                      <p className="mt-1 text-sm text-gray-600 line-clamp-2">{company.description}</p>
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
