import {
  render, fireEvent, act, waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import { useRouter } from 'next/router';
import FormContact from './Contact';

global.fetch = jest.fn(() => Promise.resolve({
  ok: true,
  json: () => Promise.resolve({ message: 'ok' }),
}));

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('FormContact', () => {
  test('submits the form', async () => {
    useRouter.mockReturnValue({
      push: jest.fn(),
    });
    const { getByTitle, getByText } = render(
      <FormContact />,
    );

    await act(async () => {
      fireEvent.change(getByTitle('Nom'), { target: { value: 'Test Message site' } });
      fireEvent.change(getByTitle('Email'), { target: { value: 'test@exemple.fr' } });
      fireEvent.change(getByTitle('Message'), { target: { value: 'Test email Ok :) !' } });

      const submitButton = getByText('Envoyer');
      fireEvent.click(submitButton);
      await waitFor(() => {
        expect(fetch).toHaveBeenCalledWith(
          expect.any(String),
          expect.objectContaining({
            method: 'POST',
            body: expect.any(FormData),
          }),
        );
      });
    });
  }, 10000);
});
