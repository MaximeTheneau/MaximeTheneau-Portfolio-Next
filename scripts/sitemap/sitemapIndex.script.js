require('dotenv').config({ path: '.env.local' });
const fs = require('fs');

const urlFront = process.env.NEXT_PUBLIC_URL;

const generateSitemapIndex = () => {
  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <sitemap>
        <loc>${urlFront}/sitemap/sitemap_images.xml</loc>
      </sitemap>
      <sitemap>
        <loc>${urlFront}/sitemap/sitemap_all_links.xml</loc>
      </sitemap>
      <sitemap>
        <loc>${urlFront}/sitemap/sitemap_news_articles.xml</loc>
      </sitemap>
    </sitemapindex>`;

  fs.writeFileSync('./public/sitemap_index.xml', sitemapIndex);
};

generateSitemapIndex();
