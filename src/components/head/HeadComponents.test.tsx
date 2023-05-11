import React from 'react';
import { render, screen, getByLabelText } from '@testing-library/react';
import HeadComponents from './HeadComponents';
import '@testing-library/jest-dom';
const closeElement = screen.getByTitle('Close')
describe('Le titre du composant est correctement rendu', () => {
    const props = { 
        title: 'Test Title',
        image : 'test-image',
        url : '/test-url',
        descriptionMeta : 'Test Description',
        addProductJsonLd : { __html: '{}' },
    };
    it ('renders correctly with all props', () => {
        const wrapper = render(<HeadComponents {...props} />);
        expect(wrapper).toMatchSnapshot();
    });
    it('renders a heading', () => {
        render(<HeadComponents />)




 
      })

});