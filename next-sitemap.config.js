const config = {
  siteUrl: 'https://theneaumaxime.fr',
  generateRobotsTxt: true,
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 7000,
  additionnalSitemaps: [
    {
      path: '/sitemap-0.xml',
      changefreq: 'daily',
      priority: 0.7,
      sitemapSize: 7000,
      exclude: ['/'],
    },
  ],
};

module.exports = config;