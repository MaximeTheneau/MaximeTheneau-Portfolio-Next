import Link from 'next/link';
import dynamic from 'next/dynamic';
import { GetStaticPaths, GetStaticProps } from 'next';
import fetcher from '@/utils/fetcher';
import { DepartmentType, CityType, CompanyType } from '@/types/annuaire.type';
import HeadComponents from '@/components/head/HeadComponents';
import InscriptionCta from '@/components/inscriptionCta/InscriptionCta';
import type { MapMarker } from '@/components/maps/AnnuaireMap';

const AnnuaireMap = dynamic(() => import('@/components/maps/AnnuaireMap'), { ssr: false });

interface DepartmentPageProps {
  department: DepartmentType;
  cities: CityType[];
  counts: Record<string, number>;
  mapMarkers: MapMarker[];
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

  const mapMarkers: MapMarker[] = [];

  await Promise.all(
    (data.cities as CityType[]).map(async (city) => {
      const cityData = await fetcher(
        `${process.env.ANNUAIRE_API_URL}annuaire/${params?.departmentSlug}/${city.slug}`
      );
      (cityData.companies as CompanyType[]).forEach((company) => {
        if (company.address.lat && company.address.lng) {
          mapMarkers.push({
            lat: company.address.lat,
            lng: company.address.lng,
            name: company.name,
            url: `/freelance/${params?.departmentSlug}/${city.slug}/${company.slug}`,
          });
        }
      });
    })
  );

  return {
    props: {
      department: data.department,
      cities: data.cities,
      counts: data.counts,
      mapMarkers,
    },
  };
};

export default function DepartmentPage({ department, cities, counts, mapMarkers }: DepartmentPageProps) {
  return (
    <>
      <HeadComponents
        title={`Freelances et pros en ${department.name} (${department.code}) — Annuaire`}
        description={`Trouvez des freelances et professionnels dans le département ${department.name} (${department.code}).`}
        url={`/freelance/${department.slug}`}
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
              › {department.name}
            </nav>

            <h1 className="text-3xl font-bold mb-2">
              Freelances et pros en {department.name}
            </h1>
            <p className="text-gray-500 mb-4">Département {department.code}</p>

            {/* Map */}
            <div className="mb-8 rounded overflow-hidden">
              <AnnuaireMap markers={mapMarkers} height="380px" />
            </div>

            {cities.length === 0 ? (
              <p className="text-gray-500">Aucune ville répertoriée dans ce département.</p>
            ) : (
              <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {cities.map((city) => {
                  const count = counts[city.slug] ?? 0;
                  return (
                    <li key={city.slug}>
                      <Link
                        href={`/freelance/${department.slug}/${city.slug}`}
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
