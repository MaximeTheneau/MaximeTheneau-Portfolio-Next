/* eslint-disable @typescript-eslint/no-require-imports */
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { GetStaticProps } from 'next';
import { useState, useEffect } from 'react';
import fetcher from '@/utils/fetcher';
import { DepartmentType, CategoryType, CompanyType, CityType } from '@/types/annuaire.type';
import { PostType } from '@/types/post.type';
import Image from '@/utils/Image';
import HeadComponents from '@/components/head/HeadComponents';
import InscriptionCta from '@/components/inscriptionCta/InscriptionCta';
import AnnuaireAside from '@/components/aside/AnnuaireAside';
import type { MapMarker } from '@/components/maps/AnnuaireMap';

const AnnuaireMap = dynamic(() => import('@/components/maps/AnnuaireMap'), { ssr: false });

interface AnnuaireIndexProps {
  post: PostType;
  departments: DepartmentType[];
  categories: CategoryType[];
  mapMarkers: MapMarker[];
}

export const getStaticProps: GetStaticProps<AnnuaireIndexProps> = async () => {
  const [data, responsePage] = await Promise.all([
    fetcher(`${process.env.ANNUAIRE_API_URL}annuaire`),
    fetcher(`${process.env.NEXT_PUBLIC_API_URL}posts/annuaire`),
  ]);

  const mapMarkers: MapMarker[] = [];

  await Promise.all(
    (data.departments as DepartmentType[]).map(async (dept) => {
      const deptData = await fetcher(`${process.env.ANNUAIRE_API_URL}annuaire/${dept.slug}`);
      await Promise.all(
        (deptData.cities as CityType[]).map(async (city) => {
          const cityData = await fetcher(
            `${process.env.ANNUAIRE_API_URL}annuaire/${dept.slug}/${city.slug}`
          );
          (cityData.companies as CompanyType[]).forEach((company) => {
            if (company.address.lat && company.address.lng) {
              mapMarkers.push({
                lat: company.address.lat,
                lng: company.address.lng,
                name: company.name,
                url: `/freelance/${dept.slug}/${city.slug}/${company.slug}`,
              });
            }
          });
        })
      );
    })
  );

  return {
    props: {
      post: responsePage.post,
      departments: data.departments,
      categories: data.categories,
      mapMarkers,
    },
  };
};

export default function AnnuaireIndex({ post, departments, categories, mapMarkers }: AnnuaireIndexProps) {
  const [query, setQuery] = useState('');
  const [companies, setCompanies] = useState<CompanyType[]>([]);
  const [cities, setCities] = useState<CityType[]>([]);
  const [loading, setLoading] = useState(false);

  const zoomTo = () => {
    document.getElementById('annuaire-map')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

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
      <HeadComponents
        title={post.heading}
        description={post.metaDescription}
        url={post.url}
        image={post.imgPost}
        srcset={post.srcset}
        imgWidth={post.imgWidth}
        imgHeight={post.imgHeight}
      />

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-center">
          <article className="w-full md:w-3/4 px-4 bg-white">
            <figure>
              <Image
                src={`${post.imgPost}?format=webp&quality=70`}
                alt={post.altImg || post.title}
                width={post.imgWidth}
                height={post.imgHeight}
                srcset={post.srcset}
                priority
              />
              {post.title !== post.altImg && (
                <figcaption>{post.altImg}</figcaption>
              )}
            </figure>
            <h1>{post.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: post.contents }} />
            <InscriptionCta />

            {/* Map */}
            <div id="annuaire-map" className="mt-6 mb-8 rounded overflow-hidden">
              <AnnuaireMap markers={mapMarkers} height="400px" />
            </div>

            {/* Search */}
            <div className="mb-8">
              <h2>Recherche :</h2>
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
                      href={`/freelance/${company.address.city.department.slug}/${company.address.city.slug}/${company.slug}`}
                      className="flex items-center justify-between px-4 py-3 hover:bg-gray-50"
                    >
                      <span className="font-medium">{company.name}</span>
                      <span className="text-sm text-gray-500">
                        {company.address.city.name} ({company.address.city.department.code})
                      </span>
                    </Link>
                  ))}
                  {cities.map((city) => (
                    <div key={`${city.department.slug}-${city.slug}`} className="flex items-center justify-between px-4 py-3 hover:bg-gray-50">
                      <button
                        onClick={() => zoomTo()}
                        className="flex-1 text-left text-blue-600"
                      >
                        <span>{city.name}</span>
                        <span className="ml-2 text-sm text-gray-500">{city.department.name} ({city.department.code})</span>
                      </button>
                      <Link
                        href={`/freelance/${city.department.slug}/${city.slug}`}
                        className="ml-3 text-gray-400 hover:text-primary text-sm"
                        title="Voir la page ville"
                      >
                        →
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <hr />
            
            {/* Categories */}
            <section>
              <h2 >Par catégorie</h2>
              <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {categories.map((cat) => (
                  <li key={cat.slug} className="list-none">
                    <Link
                      href={`/freelance/categorie/${cat.slug}`}
                      className="block border  rpx-3 py-2 text-left"
                    >
                      <button
                        className="flex-1 px-3 py-2 text-left"
                      >
                        
                        {cat.name}
                      </button>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
            
            <hr />
            
            {/* Departments */}
            <section className="mb-10">
              <h2>Par département</h2>
              <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 list-none">
                {departments.map((dept) => (
                  <li key={dept.slug} className='list-none'>
                    <div className="flex items-center border border-gray-200 rounded text-sm hover:bg-gray-50">
                      <Link
                        href={`/freelance/${dept.slug}`}
                        className="px-2 py-2 hover:text-primary"
                        title="Voir la page département"
                      >
                        <button
                        className="flex-1 px-3 py-2 text-left"
                      >
                        <span className="font-mono text-gray-400 mr-2">{dept.code}</span>
                        {dept.name}
                      </button>

                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            <article>
              {post.paragraphPosts?.map((paragraphArticle) => (
                <div key={paragraphArticle.subtitle}>
                  <h2>{paragraphArticle.subtitle}</h2>
                  <div className="w-responsive" dangerouslySetInnerHTML={{ __html: paragraphArticle.paragraph }} />
                </div>
              ))}
            </article>
          </article>
          <AnnuaireAside />
        </div>
      </div>
    </>
  );
}
