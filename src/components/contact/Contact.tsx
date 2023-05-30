import { ChangeEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { formMiddleware } from '../../middleware/middleware';
import Confirmation from '../modal/Confirmation';
import styles from './Contact.module.scss';
import ContactAbout from './ContactAbout';
import Select from './form/Select';
import Input from './form/Input';
import { NextApiRequest } from 'next';

interface FormState {
  name: string;
  email: string;
  message: string;
  subject: string;
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
      name: '' ,
      email: '',
      message: '',
      subject: 'Demande de renseignements',
    },
    textArea: 1,
    confirmationName: null,
    confirmationEmail: null,
    confirmationMessage: null,
    modal:{
      title: '',
      message: '',
      toggleModal: false,
    },
  });

  useEffect(() => {
    const storedErrorState = localStorage.getItem('errorState');
    if (storedErrorState) {
      const parsedErrorState = JSON.parse(storedErrorState);
      setState((prevState) => ({
        ...prevState,
        form: {
          ...prevState.form,
          name: parsedErrorState.form.name || '',
          email: parsedErrorState.form.email || '',
          message: parsedErrorState.form.message || '',
        },
      }));
    }
  }, []);


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

  const regex = /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  function classErrorOrConfirmation(message) {
    if (message === true) {
      return (<i className="icon-confirmation" />);
    } if (message === false) {
      return (<i className="icon-error" />);
    }
    return '';
  }

  const handleResponse200 = () => {
    setState({
      ...state,
      form: {
        name: '',
        email: '',
        message: '',
        subject: 'Demande de devis',
      },
      modal: {
        title: 'Merci !',
        message: 'On vous répondra au plus vite',
        toggleModal: true,
      },
    });

    localStorage.removeItem('errorState');

    setTimeout(() => {
      router.push('/');
    }
    , 3000);
  };

  const handleResponseError = () => {
    setState((prevState) => {
      const updatedState = {
        ...prevState,
        modal: {
          title: 'Oups !',
          message: 'Une erreur est survenue, merci de réessayer plus tard',
          toggleModal: true,
        },
      };

      localStorage.setItem('errorState', JSON.stringify(updatedState));
  
      return updatedState;
    });

    setTimeout(() => {
      setState({
        ...state,
        modal: {
          title: '',
          message: '',
          toggleModal: false,
        },
      });
    }
    , 3000);
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

    formMiddleware(state.form, handleResponse200, handleResponseError);
  };

  return (
    <>
      <Confirmation 
        state={state}
        setState={setState}
      />
      <div className={styles.contact}>
        <div className={styles.contact__block} itemType="https://schema.org/PostalAdress">
          <ContactAbout />
        </div>
      <form className={styles.contact__block} onSubmit={handleSubmit}>
        <div className={styles.contact__input}>
          <Select
            value={state.form.subject}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setState(
              { ...state, form: { ...state.form, subject: e.target.value } },
            )}
          />
        </div>
        <div className={styles.contact__input}>
          {classErrorOrConfirmation(state.confirmationName)}
          <Input 
            type="text"
            title="Nom"
            value={state.form.name}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setState(
              { ...state, form: { ...state.form, name: e.target.value } },
            )}
            onBlur={(e: ChangeEvent<HTMLInputElement>) => (
              e.target.value.length > 2 && e.target.value.length < 35
                ? setState({ ...state, confirmationName: true })
                : setState({ ...state, confirmationName: false })
            )}
            placeholder="Nom Prénom / Société"
            required={true}
          />
        </div>
        <div className={styles.contact__input}>
          {classErrorOrConfirmation(state.confirmationEmail)}
          <Input
            type="email"
            title="Email"
            value={state.form.email}
            placeholder="exemple@email.fr"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setState((prevState) => ({
                ...prevState,
                form: {
                  ...prevState.form,
                  email: e.target.value,
                },
                confirmationEmail: e.target.value.length > 2 && e.target.value.length < 35,
              }))
            }
            onBlur={(e: ChangeEvent<HTMLInputElement>) => (
              regex.test(e.target.value)
                ? setState({ ...state, confirmationEmail: true })
                : setState({ ...state, confirmationEmail: false })
            )}
            required={true}
          />
        </div>
        <div className={styles.contact__textarea}>
          {classErrorOrConfirmation(state.confirmationMessage)}
          <textarea
            rows={state.textArea}
            title="Message"
            value={state.form.message}
            onChange={handleChangeMessage}
            onBlur={(e: React.FocusEvent<HTMLTextAreaElement>) => (
              e.target.value.length > 5 && e.target.value.length < 500
              ? setState({ ...state, confirmationMessage: true })
              : setState({ ...state, confirmationMessage: false }))}
            name="message"
            wrap="off"
            placeholder="Votre message"
            required
          />
        </div>
        <div className="contact-form_button">
          <button type="submit">
            Envoyer
            <i className="icon-paper-plane" />
          </button>
        </div>
      </form>
      </div>
    </>
  );
}
