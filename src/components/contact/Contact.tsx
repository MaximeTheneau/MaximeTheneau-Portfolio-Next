import React, { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/router';
import formMiddleware from '../../middleware/formMiddleware';
import Confirmation from '../modal/Confirmation';
import ContactAbout from './ContactAbout';
import Select from './form/Select';
import Input from './form/Input';

interface FormState {
  name: string;
  nameSociety?: string;
  siret?: string;
  email: string;
  message: string;
  subject: string;
  postalCode: string;
  phone?: string;
  adress?: string;
  intervention?: string;
  interventionOther?: string;
  status?: string;
  emailReturn?: boolean;
  image?: File | null;
  date?: string;
  surface?: number;
}

interface ModalState {
  title: string;
  message: string;
  toggleModal: boolean;
}

interface ContactFormState {
  form: FormState;
  textArea: number;
  confirmationName: boolean | null;
  confirmationEmail: boolean | null;
  confirmationMessage: boolean | null;
  modal: ModalState;
}

// == Composant
export default function ContactForm() {
  const router = useRouter();
  const [state, setState] = useState<ContactFormState>({
    form: {
      name: '',
      nameSociety: '',
      siret: '',
      email: '',
      message: '',
      subject: 'Demande de renseignements',
      postalCode: '',
      phone: '',
      date: '',
      surface: 0,
      adress: '',
      intervention: '',
      interventionOther: '',
      emailReturn: true,
      status: '',
      image: null,
    },
    textArea: 3,
    confirmationName: null,
    confirmationEmail: null,
    confirmationMessage: null,
    modal: {
      title: '',
      message: '',
      toggleModal: false,
    },
  });

  const handleChangeMessage = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const trows = e.target.value.split('\n').length - 1 === 0 ? 1 : e.target.value.split('\n').length - 1;
    setState((prevState) => ({
      ...prevState,
      textArea: trows,
      form: {
        ...prevState.form,
        message: e.target.value,
        confirmationMessage: true,
      },
    }));
  };

  const changeField = (value, field) => {
    setState((prevState) => ({
      ...prevState,
      form: {
        ...prevState.form,
        [field]: value,
      },
    }));
  };

  const handleResponse200 = () => {
    setState({
      ...state,
      form: {
        name: '',
        email: '',
        message: '',
        subject: 'Demande de renseignements',
        ...state.form,
      },
      modal: {
        title: 'Merci !',
        message: 'On vous répondra au plus vite',
        toggleModal: true,
      },
    });

    setTimeout(
      () => {
        router.push('/');
      },
      3000,
    );
  };

  const handleResponseError = (error) => {
    setState({
      ...state,
      modal: {
        title: 'Erreur',
        message: error,
        toggleModal: true,
      },
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setState({
      ...state,
      modal: {
        title: 'Envoi en cours',
        message: 'Merci de patienter',
        toggleModal: true,
      },
    });
    const req = state.form;
    formMiddleware(req, 'contact', handleResponse200, handleResponseError);
  };

  return (
    <>

      <div className="w-full bg-secondaryLight sm:flex sm:justify-around pt-4 pb-4">
        <div className="sm:w-1/2 sm:flex sm:flex-col sm:justify-center sm:justify-center sm:text-center">
          <ContactAbout />
        </div>
        <form className="w-full sm:w-1/2 sm:flex sm:flex-col sm:justify-center pr-4" onSubmit={handleSubmit}>
          {/* <Select
            value={state.form.subject}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setState(
              { ...state, form: { ...state.form, subject: e.target.value } },
            )}
            required
          /> */}
          <label htmlFor="name">
            Nom Ou Société:
            <input
              id="name"
              type="text"
              title="Nom"
              placeholder="Nom Prénom / Société"
              value={state.form.name}
              onChange={(e: ChangeEvent<HTMLInputElement>) => changeField(e.target.value, 'name')}
              required
            />
          </label>
          <label htmlFor="email">
            Email:
            <input
              id="email"
              type="email"
              title="Email"
              value={state.form.email}
              placeholder="exemple@email.fr"
              onChange={(e: ChangeEvent<HTMLInputElement>) => changeField(e.target.value, 'email')}
              required
            />
          </label>

          <label htmlFor="message">
            Message:
            <textarea
              id="message"
              rows={state.textArea}
              title="Message"
              value={state.form.message}
              onChange={handleChangeMessage}
              name="message"
              wrap="off"
              placeholder="Votre message"
              required
            />
          </label>
          <button
            className="text-base text-white sm:w-ful bg-secondary p-2 rounded   hover:scale-90  hover:text-white p-4 m-4"
            type="submit"
          >
            Envoyer
            <i className="icon-paper-plane pl-1" />
          </button>
        </form>
      </div>
      <Confirmation
        title={state.modal.title}
        message={state.modal.message}
        toggleModal={state.modal.toggleModal}
      />
    </>
  );
}
