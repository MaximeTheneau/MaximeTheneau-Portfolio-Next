import { renderToStaticMarkup } from 'react-dom/server';

export default function GenerateHTML(component) {
  const html = `<!DOCTYPE html>${renderToStaticMarkup(component)}`;
  return html;
}
