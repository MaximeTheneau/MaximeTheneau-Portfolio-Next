import Link from 'next/link';
import dynamic from 'next/dynamic';
import { GetStaticPaths, GetStaticProps } from 'next';
import fetcher from '@/utils/fetcher';
import { CategoryType, DepartmentType, CityType, CompanyType } from '@/types/annuaire.type';
import HeadComponents from '@/components/head/HeadComponents';
import InscriptionCta from '@/components/inscriptionCta/InscriptionCta';

const AnnuaireMap = dynamic(() => import('@/components/maps/AnnuaireMap'), { ssr: false });

interface CategoryDepartmentPageProps {
  category: CategoryType;
  department: DepartmentType;
  companies: CompanyType[];
  cities: CityType[];
}

export const getStaticPaths: GetStaticPaths = async () => {
  const index = await fetcher(`${process.env.ANNUAIRE_API_URL}annuaire`);

  const paths: { params: { categorySlug: string; departmentSlug: string } }[] = [];
  for (const cat of index.categories as CategoryType[]) {
    for (const dept of index.departments as DepartmentType[]) {
      paths.push({ params: { categorySlug: cat.slug, departmentSlug: dept.slug } });
    }
  }

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<CategoryDepartmentPageProps> = async ({ params }) => {
  const data = await fetcher(
    `${process.env.ANNUAIRE_API_URL}annuaire/categorie/${params?.categorySlug}/${params?.departmentSlug}`
  );

  return {
    props: {
      category: data.category,
      department: data.department,
      companies: data.companies,
      cities: data.cities,
    },
  };
};

export default function CategoryDepartmentPage({
  category,
  department,
  companies,
  cities,
}: CategoryDepartmentPageProps) {
  const mapMarkers = companies
    .filter((c) => c.address.lat && c.address.lng)
    .map((company) => {
      const city = company.address.city;
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
        title={`${category.name} en ${department.name} — Freelances et pros`}
        description={`Freelances ${category.name} dans le département ${department.name} (${department.code}).`}
        url={`/freelance/categorie/${category.slug}/${department.slug}`}
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
              <Link href={`/freelance/categorie/${category.slug}`} className="hover:underline">
                {category.name}
              </Link>{' '}
              › {department.name}
            </nav>

            <h1 className="text-3xl font-bold mb-4">
              {category.name} en {department.name}
            </h1>

            {/* Map */}
            {mapMarkers.length > 0 && (
              <div className="mb-6 rounded overflow-hidden">
                <AnnuaireMap markers={mapMarkers} height="350px" />
              </div>
            )}

            {cities.length > 0 && (
              <div className="mb-6">
                <p className="text-sm font-medium text-gray-500 mb-2">Filtrer par ville :</p>
                <div className="flex flex-wrap gap-2">
                  {cities.map((city) => (
                    <Link
                      key={city.slug}
                      href={`/freelance/categorie/${category.slug}/${department.slug}/${city.slug}`}
                      className="text-sm border border-gray-200 rounded px-3 py-1 hover:bg-gray-50"
                    >
                      {city.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {companies.length === 0 ? (
              <p className="text-gray-500">Aucun freelance dans cette catégorie pour ce département.</p>
            ) : (
              <ul className="space-y-4">
                {companies.map((company) => {
                  const city = company.address.city;
                  return (
                    <li key={company.slug}>
                      <Link
                        href={`/freelance/${department.slug}/${city.slug}/${company.slug}`}
                        className="block border border-gray-200 rounded p-4 hover:bg-gray-50"
                      >
                        <div className="flex items-start justify-between">
                          <p className="font-semibold">{company.name}</p>
                          <p className="text-sm text-gray-400 shrink-0 ml-4">{city.name}</p>
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
