require('dotenv').config({ path: '.env.local' });
const fs = require('fs');

const urlApi = process.env.NEXT_PUBLIC_API_URL;
const urlFront = process.env.NEXT_PUBLIC_URL;
const urlAnnuaireApi = process.env.ANNUAIRE_API_URL;

const generateSitemap = async () => {
  const fetchJson = async (url) => {
    const response = await fetch(url);
    return response.json();
  };

  const generateXml = (pages) => {
    const sitemapXml = pages
      .map((page) => `<url>
          <loc>${urlFront}${page.url}</loc>
          <lastmod>${page.updatedAt || page.createdAt}</lastmod>
          <changefreq>daily</changefreq>
        </url>`)
      .join('');

    const sitemapIndexXml = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${sitemapXml}
      </urlset>`;

    fs.writeFileSync('./public/sitemap/sitemap_all_links.xml', sitemapIndexXml);
  };

  const fetchAnnuairePages = async () => {
    const pages = [];
    try {
      const index = await fetchJson(`${urlAnnuaireApi}annuaire`);
      for (const dept of index.departments) {
        const today = new Date().toISOString();
        pages.push({ url: `/freelance/${dept.slug}`, updatedAt: dept.updatedAt || dept.createdAt || today });
        const deptData = await fetchJson(`${urlAnnuaireApi}annuaire/${dept.slug}`);
        for (const city of deptData.cities) {
          pages.push({ url: `/freelance/${dept.slug}/${city.slug}`, updatedAt: city.updatedAt || city.createdAt || today });
          const cityData = await fetchJson(`${urlAnnuaireApi}annuaire/${dept.slug}/${city.slug}`);
          for (const company of cityData.companies) {
            pages.push({ url: `/freelance/${dept.slug}/${city.slug}/${company.slug}`, updatedAt: company.updatedAt || company.createdAt || today });
          }
        }
      }
    } catch (err) {
      console.warn(`Annuaire API unavailable, skipping annuaire pages: ${err.message}`);
    }
    return pages;
  };

  // Fetch data from API
  const responsePages = await fetchJson(`${urlApi}posts/sitemap`);
  const annuairePages = await fetchAnnuairePages();

  const staticPages = [
    { url: '/freelance/inscription', updatedAt: new Date().toISOString() },
  ];

  generateXml([...responsePages, ...annuairePages, ...staticPages]);

  const totalNumPages = responsePages.length + annuairePages.length + staticPages.length;
  console.log(`Total number of pages in the sitemap: ${totalNumPages}`);
  console.log(`  - Blog/posts: ${responsePages.length}`);
  console.log(`  - Annuaire: ${annuairePages.length}`);
  console.log(`  - Static: ${staticPages.length}`);
  console.log('Sitemap generated successfully!');
};

generateSitemap();
