/* eslint-disable */
import { render } from '@testing-library/react';
import HeadComponents from './HeadComponents';

jest.mock('next/head', () => {
  return ({ children }: { children: React.ReactNode }) => {
    const { useEffect } = require('react');
    const { createPortal } = require('react-dom');
    return createPortal(children, document.head);
  };
});

describe('HeadComponents', () => {
  it('renders the component correctly', () => {
    const title = 'Test Title';
    const descriptionMeta = 'Test Description';
    const url = '/test-url';
    const image = 'test-image';

    render(
      <HeadComponents
        title={title}
        description={descriptionMeta}
        url={url}
        image={image}
        srcset=""
      />,
    );

    const titleElement = document.head.querySelector('title');
    expect(titleElement?.textContent).toBe(title);

    const descriptionElement = document.head.querySelector('meta[name="description"]');
    expect(descriptionElement?.getAttribute('content')).toBe(descriptionMeta);

    const canonicalElement = document.head.querySelector('link[rel="canonical"]');
    expect(canonicalElement?.getAttribute('href')).toContain(url);
  });
});
