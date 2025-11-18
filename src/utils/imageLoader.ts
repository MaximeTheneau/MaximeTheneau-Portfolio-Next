'use client';

interface ImageLoaderProps {
  src: string;
  width: number;
  quality?: number;
}

export default function imageLoader({ src, width, quality }: ImageLoaderProps): string {
  // Si l'URL contient déjà des paramètres, les parser
  const url = new URL(src, 'https://picture.maximefreelance.fr');

  // Définir la qualité (75 par défaut pour un bon compromis taille/qualité)
  const imageQuality = quality || 75;

  // Ajouter ou mettre à jour les paramètres
  url.searchParams.set('width', width.toString());
  url.searchParams.set('quality', imageQuality.toString());

  return url.toString();
}
