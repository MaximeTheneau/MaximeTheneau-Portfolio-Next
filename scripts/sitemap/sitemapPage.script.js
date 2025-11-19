require('dotenv').config({ path: '.env.local' });
const fs = require('fs');

const urlApi = process.env.NEXT_PUBLIC_API_URL;
const urlFront = process.env.NEXT_PUBLIC_URL;

const generateSitemap = async () => {
  const fetchJson = async (url) => {
    const response = await fetch(url);
    return response.json();
  };

  const generateXml = (pages) => {
    const sitemapXml = pages
      .map((page) => `<url>
          <loc>${urlFront}${page.url}</loc>
          <lastmod>${page.updatedAt ? page.updatedAt : page.createdAt}</lastmod>
          <changefreq>daily</changefreq>
        </url>`)
      .join('');

    const sitemapIndexXml = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${sitemapXml}
      </urlset>`;

    fs.writeFileSync('./public/sitemap/sitemap_all_links.xml', sitemapIndexXml);
  };

  // Fetch data from API
  const responsePages = await fetchJson(`${urlApi}posts/sitemap`);

  generateXml(responsePages, urlFront);

  // Generate sitemap index (if needed)
  // ...
  const totalNumPages = responsePages.length;
  console.log(`Total number of pages in the sitemap: ${totalNumPages}`);

  console.log('Sitemap generated successfully!');
};

generateSitemap();
