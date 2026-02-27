import Link from 'next/link';
import dynamic from 'next/dynamic';
import { GetStaticPaths, GetStaticProps } from 'next';
import fetcher from '@/utils/fetcher';
import { CategoryType, DepartmentType, CityType, CompanyType } from '@/types/annuaire.type';
import HeadComponents from '@/components/head/HeadComponents';
import InscriptionCta from '@/components/inscriptionCta/InscriptionCta';

const AnnuaireMap = dynamic(() => import('@/components/maps/AnnuaireMap'), { ssr: false });

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
  const mapMarkers = companies
    .filter((c) => c.address.lat && c.address.lng)
    .map((company) => ({
      lat: company.address.lat,
      lng: company.address.lng,
      name: company.name,
      url: `/freelance/${department.slug}/${city.slug}/${company.slug}`,
    }));

  return (
    <>
      <HeadComponents
        title={`${category.name} à ${city.name} — Freelances et pros`}
        description={`Freelances ${category.name} à ${city.name} (${department.code}).`}
        url={`/freelance/categorie/${category.slug}/${department.slug}/${city.slug}`}
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
              ›{' '}
              <Link href={`/freelance/categorie/${category.slug}/${department.slug}`} className="hover:underline">
                {department.name}
              </Link>{' '}
              › {city.name}
            </nav>

            <h1 className="text-3xl font-bold mb-4">
              {category.name} à {city.name}
            </h1>

            {/* Map */}
            {mapMarkers.length > 0 && (
              <div className="mb-8 rounded overflow-hidden">
                <AnnuaireMap markers={mapMarkers} height="350px" />
              </div>
            )}

            {companies.length === 0 ? (
              <p className="text-gray-500">
                Aucun freelance dans cette catégorie pour cette ville.
              </p>
            ) : (
              <ul className="space-y-4">
                {companies.map((company) => (
                  <li key={company.slug}>
                    <Link
                      href={`/freelance/${department.slug}/${city.slug}/${company.slug}`}
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
