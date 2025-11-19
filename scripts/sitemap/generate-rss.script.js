/* eslint-disable @typescript-eslint/no-require-imports */
require('dotenv').config({ path: '.env.local' });
const fs = require('fs');
const xml = require('xml');
const sanitizeHtml = require('sanitize-html');

const SITE_URL = process.env.NEXT_PUBLIC_URL;
const API_URL = `${process.env.NEXT_PUBLIC_API_URL}posts/sitemap`;

const nettoyerContenu = (contenu) => sanitizeHtml(contenu, {
  allowedTags: [],
  allowedAttributes: {},
});

const recupererArticlesDepuisApi = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Erreur HTTP ! statut : ${response.status}`);
    }
    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error('Une liste d’articles était attendue');
    }

    return data.map((article) => ({
      title: nettoyerContenu(article.title || 'Sans titre'),
      description: article.metaDescription || 'Description non disponible',
      content: `${SITE_URL}${article.url || '/'}`,
      link: `${SITE_URL}${article.url || '/'}`,
      updated: new Date(article.updatedAt || article.createdAt).toISOString(),
    }));
  } catch (error) {
    console.error(
      'Erreur lors de la récupération des articles depuis l’API :',
      error,
    );
    throw error;
  }
};

const genererFluxRSS = async () => {
  try {
    const articles = await recupererArticlesDepuisApi();

    const itemsRSS = articles.map((article) => ({
      item: [
        { title: article.title },
        { link: article.link },
        { guid: article.link },
        { pubDate: new Date(article.updated).toUTCString() },
        { description: article.description },
      ],
    }));

    const fluxRSS = xml({
      rss: [
        {
          _attr: {
            version: '2.0',
            'xmlns:dc': 'http://purl.org/dc/elements/1.1/', // Add the Dublin Core namespace here
          },
        },
        {
          channel: [
            { title: 'Maxime Freelance' },
            { link: `${SITE_URL}/blog` },
            { description: 'Maxime Freelance - Agence Web à Marseille' },
            { lastBuildDate: new Date().toUTCString() },
            { language: 'fr' },
            ...itemsRSS,
          ],
        },
      ],
    });

    const xmlWithDeclaration = `<?xml version="1.0" encoding="utf-8"?>\n${fluxRSS}`;

    fs.writeFileSync('./public/atom.xml', xmlWithDeclaration, 'utf8');
    console.log('Le flux RSS a été généré avec succès !');
  } catch (error) {
    console.error('Erreur lors de la génération du flux RSS :', error);
    process.exit(1); // Quitter avec un code d’erreur
  }
};

genererFluxRSS();
