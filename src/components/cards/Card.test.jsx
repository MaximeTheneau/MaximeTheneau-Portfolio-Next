import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Card from './Card';

describe('Card component', () => {
  const mockCard = {
    subcategory: {
      slug: 'subcategory-slug',
    },
    slug: 'card-slug',
    altImg: 'Alt Image',
    title: 'Card Title',
  };
  it('renders card with correct title', () => {
    render(<Card card={mockCard} />);
    const title = screen.getByRole('link', { name: /Card Title/i });
    expect(title).toBeInTheDocument();
  });

  it('renders card with correct image source', () => {
    const { getByRole } = render(<Card card={mockCard} />);
    const imageElement = getByRole('img');
    const expectedSrc = 'card-slug.webp';

    expect(imageElement).toHaveAttribute('src');
    expect(imageElement.getAttribute('src')).toContain(expectedSrc);
  });
  it('renders card with correct link destination', () => {
    const { getByRole } = render(<Card card={mockCard} />);
    const linkElement = getByRole('link');
    expect(linkElement).toHaveAttribute('href');
    expect(linkElement.getAttribute('href')).toContain(`/${mockCard.subcategory.slug}/${mockCard.slug}`);
  });

  test('renders card with correct alt text', () => {
    const { getByRole } = render(<Card card={mockCard} />);
    const imageElement = getByRole('img');
    expect(imageElement).toHaveAttribute('alt');
    expect(imageElement.getAttribute('alt')).toContain(mockCard.altImg);
  });
});
