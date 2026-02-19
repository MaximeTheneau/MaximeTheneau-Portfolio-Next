import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Card from './Card';

describe('Card component', () => {
  const mockCard = {
    imgPost: 'https://picture.example.com/card-slug.webp',
    slug: 'card-slug',
    altImg: 'Alt Image',
    title: 'Card Title',
    url: '/Creations/card-slug',
  };

  it('renders card with correct title', () => {
    render(<Card card={mockCard} />);
    const title = screen.getByRole('link', { name: /Card Title/i });
    expect(title).toBeInTheDocument();
  });

  it('renders card with correct image source', () => {
    const { getByRole } = render(<Card card={mockCard} />);
    const imageElement = getByRole('img');

    expect(imageElement).toHaveAttribute('src');
    expect(imageElement.getAttribute('src')).toContain('card-slug.webp');
  });

  it('renders card with correct link destination', () => {
    const { getByRole } = render(<Card card={mockCard} />);
    const linkElement = getByRole('link');
    expect(linkElement).toHaveAttribute('href', mockCard.url);
  });

  test('renders card with correct alt text', () => {
    const { getByRole } = render(<Card card={mockCard} />);
    const imageElement = getByRole('img');
    expect(imageElement).toHaveAttribute('alt', mockCard.altImg);
  });
});
