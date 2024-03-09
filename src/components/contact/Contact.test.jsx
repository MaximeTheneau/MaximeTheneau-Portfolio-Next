import {
  render, fireEvent, act, waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import { useRouter } from 'next/router';
import FormContact from './Contact';

global.fetch = jest.fn(() => Promise.resolve({ ok: true }));

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('FormContact', () => {
  test('submits the form', async () => {
    useRouter.mockReturnValue({
      push: jest.fn(),
    });
    const { getByTitle, getByText } = render(
      <FormContact onSubmit={() => {}} handleOnMouseEnter={() => {}} />,
    );

    await act(async () => {
      fireEvent.change(getByTitle('Nom'), { target: { value: 'Test Message site' } });
      fireEvent.change(getByTitle('Email'), { target: { value: 'test@exemple.fr' } });
      fireEvent.change(getByTitle('Sujet'), { target: { value: 'Test' } });
      fireEvent.change(getByTitle('Message'), { target: { value: 'Test email Ok :) !' } });

      const submitButton = getByText('Envoyer');
      fireEvent.click(submitButton);
      await waitFor(() => {
        // Vérifiez que le code de réponse est celui attendu
        expect(fetch).toHaveBeenCalledWith(
          expect.objectContaining({
            body: JSON.stringify({
              name: 'Test Message site',
              email: 'test@exemple.fr',
              message: 'Test email Ok :) !',
              subject: 'Test',
            }),
            method: 'POST',
          }),
        );
      });
    });
  }, 10000);
});
