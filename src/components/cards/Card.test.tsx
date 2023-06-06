import { render, screen } from '@testing-library/react';
import Card from './Card';

describe('Card', () => {
    it('renders the component correctly', () => {
      const card = {
        subcategory: {
          slug: 'test-subcategory',
        },
        slug: 'test-slug',
        altImg: 'Test Alt Image',
        title: 'Test Title',
      };
      const path = 'test-path';
  
      render(<Card card={card} path={path} />);
  
      // Vérifier si les éléments sont rendus correctement
      const titleElement = screen.getByText(card.title);
      expect(titleElement).toBeInTheDocument();
  
      const imageElement = screen.getByAltText(card.altImg || card.title);
      expect(imageElement).toBeInTheDocument();
  
      const linkElement = screen.getByRole('link', { name: card.title });
      expect(linkElement).toBeInTheDocument();
  
      const subcategoryPath = card.subcategory ? `${path}/${card.subcategory.slug}` : path;
      expect(linkElement).toHaveAttribute('href', `/${subcategoryPath}/${card.slug}`);
    });
  });

