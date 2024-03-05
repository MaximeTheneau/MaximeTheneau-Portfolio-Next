/* eslint-disable */
import {
  render, cleanup, fireEvent, act,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import { useRouter } from 'next/router';
import fetch from 'node-fetch';
import FormContact from './Contact';

global.fetch = fetch;

afterEach(cleanup);

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

test('submits the form', async () => {
  useRouter.mockReturnValue({
    push: jest.fn(),
  });
  const { getByTitle, getByText } = render(<FormContact onSubmit={() => {}} handleOnMouseEnter={() => {}} />);

  await act(async () => {
    fireEvent.change(getByTitle('Nom'), { target: { value: 'Test Message site' } });
    fireEvent.change(getByTitle('Email'), { target: { value: 'test@exemple.fr' } });
    fireEvent.change(getByTitle('Sujet'), { target: { value: 'Test' } });
    fireEvent.change(getByTitle('Message'), { target: { value: 'Test email Ok :) !' } });

    const submitButton = getByText('Envoyer');
    fireEvent.click(submitButton);

    await new Promise((resolve) => setTimeout(resolve, 500));
  });
});
