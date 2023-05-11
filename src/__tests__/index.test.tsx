import { render, screen, fireEvent, wait, getByTestId } from '@testing-library/react';
import Home from '../pages/index';
import '@testing-library/jest-dom';
import fetch from 'isomorphic-fetch'
import FormContact from '../components/contact/contactForm';

describe('Home', () => {
  // it('renders a heading', () => {
  //   render(<Home categories={undefined} experiences={undefined} accueil={undefined} />)

  //   const heading = screen.getByRole('heading', {
  //     name: "Theneau Maxime",
  //   })

  //   const description = screen.getByRole('heading', {
  //     name: "Développeur Web à Marseille",
  //   })
  //   expect(description).toBeInTheDocument()
  //   expect(heading).toBeInTheDocument()
  // })

  it('submits the form', async () => {
    const { getByText, getByPlaceholderText, getByTestId } = render(<FormContact onSubmit={() => {}} handleOnMouseEnter={() => {}} />);
    const emailInput = getByPlaceholderText("Votre message");
    const messageInput = getByPlaceholderText("exemple@email.fr");
    const subjectInput = getByText("Demande de renseignements");
    const submitButton = getByText("Envoyer");

    fireEvent.change(emailInput, { target: { value: "jhon@exmple.com" } });
    fireEvent.change(subjectInput, { target: { value: "Subject" } });
    fireEvent.change(messageInput, { target: { value: "Message" } });


    fetch('https://back.theneaumaxime.fr/public/api/message')
    fireEvent.click(submitButton);

     await new Promise((resolve) => setTimeout(resolve, 500));
  });

})