import React from 'react';
import {
  render, waitFor, screen, fireEvent,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { act } from 'react-dom/test-utils';
import Category from './Category';

describe('Category', () => {
  test('renders category with "Articles" link', () => {
    // Ciblez le lien en utilisant le rôle "link" et l'attribut data-testid
    //  const articlesLinkElement = screen.getByText(/Articles/i);

    // const articlesLinkElement = getByTestId('category-link');
    // expect(articlesLinkElement).toBeInTheDocument();
    // expect(articlesLinkElement.tagName.toLowerCase()).toBe('a');
    // expect(articlesLinkElement.getAttribute('href')).toBe('/articles');

    act(() => {
      render(<Category />);

      waitFor(() => {
        const linkArticles = screen.queryByTestId('articles-link');
        expect(linkArticles).toBeInTheDocument();
        fireEvent.click(screen.queryByTestId('articles-link'));
      });
    });
  });
});
