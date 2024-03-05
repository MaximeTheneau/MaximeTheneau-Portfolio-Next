/* eslint-disable */
import React from 'react';
import { render, act } from '@testing-library/react';
import Card from './Card';
import '@testing-library/jest-dom/extend-expect';

describe('Card component', () => {
  const mockCard = {
    subcategory: {
      slug: 'subcategory-slug',
    },
    slug: 'card-slug',
    altImg: 'Alt Image',
    title: 'Card Title',
  };

  const mockPath = '/path';

  test('renders card with correct title', () => {
    act(() => {
      const { getByText } = render(<Card card={mockCard} path={mockPath} />);
      expect(getByText(mockCard.title)).toBeInTheDocument();
    });
  });

  test('renders card with correct image source', () => {
    act(() => {
      const { getByRole } = render(<Card card={mockCard} path={mockPath} />);
      const imageElement = getByRole('img');
      const expectedSrc = 'card-slug.webp';

      expect(imageElement).toHaveAttribute('src');
      expect(imageElement.getAttribute('src')).toContain(expectedSrc);
    });
  });
  test('renders card with correct link destination', () => {
    act(() => {
      const { getByRole } = render(<Card card={mockCard} path={mockPath} />);
      const linkElement = getByRole('link');
      expect(linkElement).toHaveAttribute('href');
      expect(linkElement.getAttribute('href')).toContain(`${mockPath}/${mockCard.subcategory.slug}/${mockCard.slug}`);
    });
  });

  test('renders card with correct alt text', () => {
    act(() => {
      const { getByRole } = render(<Card card={mockCard} path={mockPath} />);
      const imageElement = getByRole('img');
      expect(imageElement).toHaveAttribute('alt');
      expect(imageElement.getAttribute('alt')).toContain(mockCard.altImg);
    });
  });
});
