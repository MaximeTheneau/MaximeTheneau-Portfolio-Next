require('dotenv').config({ path: '.env.local' });
const fs = require('fs');

const INDEXNOW_KEY = 'ba5795e7ec18cb46b86c22674548ad1c';
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';
const HOST = new URL(process.env.NEXT_PUBLIC_URL).host;
const URL_FRONT = process.env.NEXT_PUBLIC_URL;

const submitToIndexNow = async () => {
  // Read sitemap to get all URLs
  const sitemapPath = './public/sitemap/sitemap_all_links.xml';

  if (!fs.existsSync(sitemapPath)) {
    console.log('IndexNow: Sitemap not found, skipping submission.');
    return;
  }

  const sitemapContent = fs.readFileSync(sitemapPath, 'utf-8');

  // Extract all <loc> URLs from the sitemap
  const urlRegex = /<loc>(.*?)<\/loc>/g;
  const urls = [];
  let match;

  while ((match = urlRegex.exec(sitemapContent)) !== null) {
    urls.push(match[1]);
  }

  if (urls.length === 0) {
    console.log('IndexNow: No URLs found in sitemap.');
    return;
  }

  console.log(`IndexNow: Submitting ${urls.length} URLs...`);

  const body = {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: `${URL_FRONT}/${INDEXNOW_KEY}.txt`,
    urlList: urls,
  };

  try {
    const response = await fetch(INDEXNOW_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(body),
    });

    if (response.ok || response.status === 200 || response.status === 202) {
      console.log(`IndexNow: Successfully submitted ${urls.length} URLs (status: ${response.status})`);
    } else {
      const text = await response.text();
      console.error(`IndexNow: Submission failed (status: ${response.status}) - ${text}`);
    }
  } catch (error) {
    console.error(`IndexNow: Error submitting URLs - ${error.message}`);
  }
};

submitToIndexNow();
