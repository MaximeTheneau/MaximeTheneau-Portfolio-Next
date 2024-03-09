import {
  render, waitFor, screen, fireEvent,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Category from './Category';

describe('Category', () => {
  it('renders category with "Articles" link', () => {
    render(<Category />);

    waitFor(() => {
      const linkArticles = screen.queryByTestId('articles-link');
      expect(linkArticles).toBeInTheDocument();
      fireEvent.click(screen.queryByTestId('articles-link'));
    });
  });
});
