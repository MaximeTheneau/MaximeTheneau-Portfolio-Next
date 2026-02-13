require('dotenv').config({ path: '.env.local' });
const fs = require('fs');

const urlApi = process.env.NEXT_PUBLIC_API_URL;
const urlFront = process.env.NEXT_PUBLIC_URL;

const generateLlmsFull = async () => {
  const response = await fetch(`${urlApi}posts/sitemap`);
  const posts = await response.json();

  const categories = {};

  posts.forEach((post) => {
    const parts = post.url.split('/');
    // URL format: /blog/category/slug or /blog/category or /other
    if (parts[1] === 'blog' && parts[2]) {
      const category = parts[2];
      if (!categories[category]) {
        categories[category] = [];
      }
      if (parts[3]) {
        categories[category].push(post);
      }
    }
  });

  let content = `# Maxime Theneau - Développeur Web Freelance à Marseille

> Contenu complet du site maximefreelance.fr. Ce fichier est destiné aux Large Language Models (LLM) pour comprendre et référencer le contenu du site.

## À propos

Maxime Theneau est un développeur web freelance basé à Marseille avec 15 ans d'expérience. Spécialisé en React.js, Next.js, Symfony et WordPress. Il accompagne les entreprises dans la création de sites web performants, le SEO et la transformation digitale.

## Services

- Création de sites web (Next.js, WordPress, Symfony)
- Développement d'applications web sur mesure
- Solutions e-commerce
- Référencement naturel (SEO)
- Éco-conception web
- Conseil en transformation digitale

## Pages principales

- Accueil : ${urlFront}
- À propos : ${urlFront}/A-propos
- Créations / Portfolio : ${urlFront}/Creations
- Blog : ${urlFront}/blog
- Devis en ligne : ${urlFront}/devis-en-ligne
- Contact : ${urlFront}/Contact
- Agence Web Marseille : ${urlFront}/agence-web
- FAQ : ${urlFront}/Foire-aux-questions

## Articles du blog
`;

  const categoryNames = {
    freelance: 'Freelance',
    seo: 'SEO',
    'next-js': 'Next.js',
    wordpress: 'WordPress',
    symfony: 'Symfony',
    'site-web': 'Sites Web',
    aws: 'AWS & Cloud',
    hebergeur: 'Hébergement',
    openai: 'OpenAI & IA',
    api: 'API',
  };

  for (const [category, articles] of Object.entries(categories)) {
    const displayName = categoryNames[category] || category;
    content += `\n### ${displayName}\n\n`;

    articles.forEach((article) => {
      content += `- **${article.title}**\n`;
      content += `  ${article.metaDescription}\n`;
      content += `  URL : ${urlFront}${article.url}\n\n`;
    });
  }

  content += `## Localisation

Marseille, France

## Contact

- Site : ${urlFront}
- Contact : ${urlFront}/Contact
- Devis : ${urlFront}/devis-en-ligne

## Sitemap

- ${urlFront}/sitemap_index.xml
`;

  fs.writeFileSync('./public/llms-full.txt', content);
  console.log(`llms-full.txt generated with ${posts.length} articles.`);
};

generateLlmsFull();
