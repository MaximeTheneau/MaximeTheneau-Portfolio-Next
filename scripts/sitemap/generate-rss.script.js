/* eslint-disable @typescript-eslint/no-require-imports */
require('dotenv').config({ path: '.env.local' });
const fs = require('fs');
const xml = require('xml');
const sanitizeHtml = require('sanitize-html');

const ATOM_NAMESPACE = 'http://www.w3.org/2005/Atom';
const SITE_URL = process.env.NEXT_PUBLIC_URL;
const FEED_URL = `${SITE_URL}/atom.xml`;
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
      id: `${SITE_URL}${article.url || '/'}`,
    }));
  } catch (error) {
    console.error('Erreur lors de la récupération des articles depuis l’API :', error);
    throw error;
  }
};

const genererFluxAtom = async () => {
  try {
    const articles = await recupererArticlesDepuisApi();

    const elementsAtom = articles.map((article) => ({
      entry: [
        { id: article.id },
        { title: article.title },
        { link: { _attr: { href: article.link } } },
        { updated: article.updated },
        { summary: [{ _attr: { type: 'html' } }, article.link] },
        { content: [{ _attr: { type: 'html' } }, article.description] },
      ],
    }));

    const fluxAtom = xml({
      feed: [
        { _attr: { xmlns: ATOM_NAMESPACE } },
        { id: `${SITE_URL}/` },
        { title: 'Maxime Freelance' },
        { updated: new Date().toISOString() },
        {
          author: [
            { name: 'Maxime Freelance' },
          ],
        },
        { link: { _attr: { href: FEED_URL, rel: 'self', type: 'application/atom+xml' } } },
        { subtitle: 'Maxime Freelance - Agence Web à Marseille' },
        ...elementsAtom,
      ],
    });
    const xmlWithDeclaration = `<?xml version="1.0" encoding="utf-8"?>\n${fluxAtom}`;

    fs.writeFileSync('./public/atom.xml', xmlWithDeclaration, 'utf8');
    console.log('Le flux Atom a été généré avec succès !');
  } catch (error) {
    console.error('Erreur lors de la génération du flux Atom :', error);
    process.exit(1); // Quitter avec un code d’erreur
  }
};

genererFluxAtom();
