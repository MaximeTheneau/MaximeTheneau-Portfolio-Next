// import { render, fireEvent } from '@testing-library/react';
// import FormContact from '../components/contact/Contact';
// import fetch from 'isomorphic-fetch'

// describe('ContactForm', () => {
//   it('submits the form', async () => {
//     const { getByText, getByTitle } = render(<FormContact onSubmit={() => {}} handleOnMouseEnter={() => {}} />);
//     const nameInput = getByTitle("Nom");
//     const emailInput = getByTitle("Email");
//     const messageInput = getByTitle("Message");
//     const subjectInput = getByTitle("Sujet");
//     const submitButton = getByText("Envoyer");

//     fireEvent.change(nameInput, { target: { value: "Jhon Doe" } });
//     fireEvent.change(emailInput, { target: { value: "jhon@exmple.com" } });
//     fireEvent.change(subjectInput, { target: { value: "Autre" } });
//     fireEvent.change(messageInput, { target: { value: "Message" } });

//     fetch('http://localhost:8000/api/contact')
//     fireEvent.click(submitButton);

//      await new Promise((resolve) => setTimeout(resolve, 500));
//   });

// });
