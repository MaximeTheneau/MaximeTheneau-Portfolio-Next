import { renderToStaticMarkup } from 'react-dom/server';

export function GenerateHTML(component) {
  const html = `<!DOCTYPE html>${renderToStaticMarkup(component)}`;
  return html;
}