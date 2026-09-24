import Link from 'next/link';
import dynamic from 'next/dynamic';
import { GetStaticPaths, GetStaticProps } from 'next';
import fetcher from '@/utils/fetcher';
import { CategoryType, CompanyType } from '@/types/annuaire.type';
import HeadComponents from '@/components/head/HeadComponents';
import AnnuaireAside from '@/components/aside/AnnuaireAside';

const AnnuaireMap = dynamic(() => import('@/components/maps/AnnuaireMap'), { ssr: false });

interface CategoryPageProps {
  category: CategoryType;
  companies: CompanyType[];
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const data = await fetcher(`${process.env.ANNUAIRE_API_URL}annuaire`);

    const paths = data.categories.map((cat: CategoryType) => ({
      params: { categorySlug: cat.slug },
    }));

    return { paths, fallback: 'blocking' };
  } catch {
    return { paths: [], fallback: 'blocking' };
  }
};

export const getStaticProps: GetStaticProps<CategoryPageProps> = async ({ params }) => {
  try {
    const data = await fetcher(`${process.env.ANNUAIRE_API_URL}annuaire/categorie/${params?.categorySlug}`);

    return {
      props: {
        category: data.category,
        companies: data.companies,
      },
    };
  } catch {
    return { notFound: true };
  }
};

export default function CategoryPage({ category, companies }: CategoryPageProps) {
  const mapMarkers = companies
    .filter((c) => c.address.lat && c.address.lng)
    .map((company) => {
      const city = company.address.city;
      const department = city.department;
      return {
        lat: company.address.lat,
        lng: company.address.lng,
        name: company.name,
        url: `/freelance/${department.slug}/${city.slug}/${company.slug}`,
      };
    });

  return (
    <>
      <HeadComponents
        title={`${category.name} — Freelances et pros — Annuaire`}
        description={`Trouvez des freelances et professionnels dans la catégorie ${category.name}.`}
        url={`/freelance/categorie/${category.slug}`}
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
              › {category.name}
            </nav>

            <h1 className="text-3xl font-bold mb-4">{category.name}</h1>

            {/* Map */}
            {mapMarkers.length > 0 && (
              <div className="mb-8 rounded overflow-hidden">
                <AnnuaireMap markers={mapMarkers} height="380px" autoFit />
              </div>
            )}

            {companies.length === 0 ? (
              <p className="text-gray-500">Aucun freelance dans cette catégorie.</p>
            ) : (
              <ul className="space-y-4">
                {companies.map((company) => {
                  const city = company.address.city;
                  const department = city.department;
                  return (
                    <li key={company.slug}>
                      <Link
                        href={`/freelance/${department.slug}/${city.slug}/${company.slug}`}
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
          </article>
          <AnnuaireAside />
        </div>
      </div>
    </>
  );
}
