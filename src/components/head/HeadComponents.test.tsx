/* eslint-disable */
import { render } from '@testing-library/react';
import HeadComponents from './HeadComponents';

describe('HeadComponents', () => {
  it('renders the component correctly', () => {
    const title = 'Test Title';
    const descriptionMeta = 'Test Description';
    const url = '/test-url';
    const image = 'test-image';
    const addProduct = null;

    render(
      <HeadComponents
        title={title}
        descriptionMeta={descriptionMeta}
        url={url}
        image={image}
        addProduct={addProduct}
      />,
    );

    // Vérifier si les éléments sont rendus correctement
    const titleElement = document.querySelector('title');
    expect(titleElement?.innerHTML).toBe(title);
  });
});
