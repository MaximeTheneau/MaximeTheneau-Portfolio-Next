import React, { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/router';
import formMiddleware from '../../middleware/formMiddleware';
import Confirmation from '../modal/Confirmation';
import Button from '../ui/Button';
// import Select from './form/Select';
// import Input from './form/Input';

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

  const changeField = (value: string, field: string) => {
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

  const handleResponseError = (error: any) => {
    setState({
      ...state,
      modal: {
        title: 'Erreur',
        message: error,
        toggleModal: true,
      },
    });
  };

  const handleSubmit = (evt: { preventDefault: () => void; }) => {
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

      <div className="w-full">
        <form
          onSubmit={handleSubmit}
          className="sm:flex sm:flex-wrap sm:w-3/4 w-full sm:mx-auto mx-2 p-4 text-left"
        >
          {' '}
          {/* <Select
            value={state.form.subject}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setState(
              { ...state, form: { ...state.form, subject: e.target.value } },
            )}
            required
          /> */}
          <div className="w-100 sm:w-1/2 pr-4">
            <label htmlFor="name">
              <p className="label">
                Votre nom ou nom de société:
              </p>
              <input
                id="name"
                type="text"
                title="Nom"
                value={state.form.name}
                onChange={(e: ChangeEvent<HTMLInputElement>) => changeField(e.target.value, 'name')}
                required
              />
            </label>
          </div>
          <div className="w-100 sm:w-1/2 pr-4">
            <label htmlFor="email">
              <p className="label">
                Votre adresse email:
              </p>
              <input
                id="email"
                type="email"
                title="Email"
                value={state.form.email}
                onChange={(e: ChangeEvent<HTMLInputElement>) => changeField(e.target.value, 'email')}
                required
              />
            </label>

          </div>
          <div className="w-full pr-4">
            <label htmlFor="message">
              <p className="label">
                Message:
              </p>
              <textarea
                id="message"
                rows={state.textArea}
                title="Message"
                value={state.form.message}
                onChange={handleChangeMessage}
                name="message"
                wrap="off"
                required
              />
            </label>
          </div>
          <div className='m-auto'>
            <button
              type="submit"
            >
              Envoyer
              {' '}
              <span className="icon">
                <i className="icon-paper-plane" />
              </span>
            </button>
          </div>
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
