import { render, screen, fireEvent, wait } from '@testing-library/react';
import Home from '../pages/index';
import '@testing-library/jest-dom';
import fetch from 'isomorphic-fetch'
import FormContact from '../components/footer/formContact';

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home categories={undefined} experiences={undefined} accueil={undefined} />)

    const heading = screen.getByRole('heading', {
      name: "Theneau Maxime",
    })

    const description = screen.getByRole('heading', {
      name: "Développeur Web à Marseille",
    })
    expect(description).toBeInTheDocument()
    expect(heading).toBeInTheDocument()
  })

  it('submits the form', async () => {
    const { getByText, getByPlaceholderText } = render(<FormContact onSubmit={() => {}} handleOnMouseEnter={() => {}} />);
    const nameInput = getByPlaceholderText("Nom");
    const emailInput = getByPlaceholderText("Email");
    const messageInput = getByPlaceholderText("Message");
    const subjectInput = getByPlaceholderText("Sujet");
    const submitButton = getByText("Envoyer");

    fireEvent.change(nameInput, { target: { value: "Jhon Doe" } });
    fireEvent.change(emailInput, { target: { value: "jhon@exmple.com" } });
    fireEvent.change(subjectInput, { target: { value: "Subject" } });
    fireEvent.change(messageInput, { target: { value: "Message" } });


    fetch('https://back.theneaumaxime.fr/public/api/message')
    fireEvent.click(submitButton);

     await new Promise((resolve) => setTimeout(resolve, 500));
  });

})
