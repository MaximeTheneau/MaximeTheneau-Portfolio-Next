require('dotenv').config({ path: '.env.local' });
const fs = require('fs');

const urlApi = process.env.NEXT_PUBLIC_API_URL;
const urlFront = process.env.NEXT_PUBLIC_URL;
const urlCdn = `${process.env.NEXT_PUBLIC_CLOUD_URL}/${process.env.NEXT_PUBLIC_CLOUD_FILE_KEY}`;

const generateSitemapImages = async () => {
  const fetchJson = async (url) => {
    const response = await fetch(url);
    return response.json();
  };

  const responseAll = await fetchJson(`${urlApi}posts/sitemap`);

  const generateXmlWithImages = (pages) => {
    const sitemapXmlWithImages = pages
      .map((page) => `<url>
                  <loc>${urlFront}${page.url}</loc>
                  <image:image>
                    <image:loc>${urlCdn}/${page.imgPost}.webp</image:loc>
                  </image:image>
                </url>`).join('');

    const sitemapIndexXmlWithImages = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
        ${sitemapXmlWithImages}
      </urlset>`;

    fs.writeFileSync('./public/sitemap/sitemap_images.xml', sitemapIndexXmlWithImages);
  };

  generateXmlWithImages(responseAll);

  const totalNumArticles = responseAll.length;
  console.log(`Total number of news articles in the sitemap: ${totalNumArticles}`);
};

generateSitemapImages();
