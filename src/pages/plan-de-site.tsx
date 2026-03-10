import Link from 'next/link';
import { PostType } from '@/types/post.type';
import BreadcrumbJsonLd from '@/components/jsonLd/BreadcrumbJsonLd';
import PersonJsonLd from '@/components/jsonLd/PersonJsonLd';
import fetcher from '@/utils/fetcher';
import HeadComponents from '../components/head/HeadComponents';

type BlogPost = { subcategory: { slug: string; name: string } | null };
type BlogSubcategory = { slug: string; name: string };

type PlanDeSiteProps = {
  page: PostType;
  blogSubcategories: BlogSubcategory[];
};

export async function getStaticProps() {
  const responsePage = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}posts/plan-de-site`);

  let blogSubcategories: BlogSubcategory[] = [];
  try {
    const posts: BlogPost[] = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}posts&category=blog`);
    const map = new Map<string, BlogSubcategory>();
    for (const post of posts) {
      if (!post.subcategory) continue;
      if (!map.has(post.subcategory.slug)) map.set(post.subcategory.slug, post.subcategory);
    }
    blogSubcategories = Array.from(map.values());
  } catch {}

  return {
    props: {
      page: responsePage.post,
      blogSubcategories,
    },
  };
}

export default function PlanDeSite({ page, blogSubcategories }: PlanDeSiteProps) {
  return (
    <>
      <HeadComponents
        title={page.heading}
        description={page.metaDescription}
        url={page.url}
        srcset={page.srcset}
        image={page.imgPost}
        imgWidth={page.imgWidth}
        imgHeight={page.imgHeight}
      />
      <PersonJsonLd />
      <BreadcrumbJsonLd paragraphPosts={page.paragraphPosts} urlPost={`${process.env.NEXT_PUBLIC_URL}${page.url}`} />

      <section className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">{page.title}</h1>
        <div className="mb-8" dangerouslySetInnerHTML={{ __html: page.contents }} />

        {/* Pages */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Pages principales</h2>
          <ul className="pl-4">
            <li>
              <Link href="/" prefetch={false}>
                Maxime Freelance
              </Link>
            </li>
            <li>
              <Link href="/A-propos" prefetch={false}>
                Qui suis-je ?
              </Link>
            </li>
            <li>
              <Link href="/Contact" prefetch={false}>
                Contactez-moi
              </Link>
            </li>
            <li>
              <Link href="/devis-en-ligne" prefetch={false}>
                Devis en ligne
              </Link>
            </li>
          </ul>
        </div>
        
        {/* Blog */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-4">
            <Link href="/blog" className="hover:underline">Blog</Link>
          </h2>
          <ul className="grid grid-cols-2 sm:grid-cols-3 gap-1 pl-4">
            {blogSubcategories.map((sub) => (
              <li key={sub.slug}>
                <Link href={`/blog/${sub.slug}`}>
                  {sub.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Annuaire */}
        <div>
          <h2 className="text-2xl font-bold mb-4">
            <Link href="/freelance" className="hover:underline">Annuaire Freelance</Link>
          </h2>
          <ul className="pl-4">
            <li>
              <Link href="/freelance/inscription" prefetch={false}>
                Inscrire sont entreprise (Freelance) gratuitement
              </Link>
            </li>
            <li>
              <Link href="/freelance" prefetch={false}>
                Voir l'annuaire complet
              </Link>
            </li>
            <li>
              <Link href="https://annuaire.maximefreelance.fr/login" prefetch={false}>
                Modifier votre fiche (Freelance inscrit)
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
