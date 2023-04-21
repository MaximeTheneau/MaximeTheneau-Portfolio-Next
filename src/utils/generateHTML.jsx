import { renderToStaticMarkup } from 'react-dom/server';

export function generateHTML(component) {
  const html = `<!DOCTYPE html>${renderToStaticMarkup(component)}`;
  return html;
}