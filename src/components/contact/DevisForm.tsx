import React, { ChangeEvent, useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
import { useRouter } from 'next/router';
import FormMiddleware from '../../middleware/formMiddleware';
import Confirmation from '../modal/Confirmation';
import Input from './form/Input';
import Button from '../ui/Button';

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
  confirmationSubject?: boolean | null;
  confirmationCodePostal?: boolean | null;
  confirmationImage?: boolean | null;
  modal: ModalState;
}

const productSurfaceMap: Record<string, number> = {
  simple: 4,
  pro: 6,
  premium: 15,
};

// == Composant
export default function DevisForm() {
  const router = useRouter();

  const { product } = router.query;

  const surface = productSurfaceMap[product as string] || 0;

  const [state, setState] = useState<ContactFormState>({
    form: {
      name: '',
      nameSociety: '',
      siret: '',
      email: '',
      message: '',
      subject: 'Demande de devis',
      postalCode: '',
      phone: '',
      date: '',
      surface,
      adress: '',
      intervention: product ? 'site' : '',
      interventionOther: '',
      emailReturn: true,
      status: '',
      image: null,
    },
    textArea: 3,
    confirmationName: null,
    confirmationEmail: null,
    confirmationMessage: null,
    confirmationSubject: null,
    confirmationCodePostal: null,
    confirmationImage: null,
    modal: {
      title: '',
      message: '',
      toggleModal: false,
    },
  });
  useEffect(() => {
    const form = localStorage.getItem('form');
    if (form) {
      setState((prevState) => ({ ...prevState, form: JSON.parse(form) }));
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

  // function classErrorOrConfirmation(message) {
  //   if (message === true) {
  //     return (<i className="icon-confirmation" />);
  //   } if (message === false) {
  //     return (<i className="icon-error" />);
  //   }
  //   return '';
  // }

  const changeField = (value: string | boolean, field: string) => {
    setState((prevState) => ({
      ...prevState,
      form: {
        ...prevState.form,
        [field]: value,
      },
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const validMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/avif', 'image/webp'];
      if (validMimeTypes.includes(file.type)) {
        setState((prevState) => ({
          ...prevState,
          form: {
            ...prevState.form,
            image: file,
          },
        }));
      } else {
        setState((prevState) => ({
          ...prevState,
          confirmationImage: false,
        }));
      }
    }
  };

  const handleResponse200 = (response: any) => {
    setState({
      ...state,
      form: {
        name: '',
        email: '',
        message: '',
        postalCode: '',
        subject: 'Demande de devis',
        phone: '',
        intervention: '',
        emailReturn: true,
        image: null,
        date: '',
      },
      modal: {
        title: 'Merci !',
        message: response,
        toggleModal: true,
      },
    });

    setTimeout(
      () => {
        setState({
          ...state,
          form: {
            name: '',
            email: '',
            message: '',
            postalCode: '',
            subject: 'Demande de devis',
            phone: '',
            emailReturn: true,
          },
          modal: {
            title: 'Merci !',
            message: response,
            toggleModal: true,
          },
        });
      },
      3000,
    );
    localStorage.removeItem('form');
  };

  const handleResponseError = (error: any) => {
    setState({
      ...state,
      modal: {
        title: 'Oups !',
        message: error,
        toggleModal: true,
      },
    });
    localStorage.setItem('form', JSON.stringify(state.form));
  };

  const handleSubmit = (evt: { preventDefault: () => void; }) => {
    evt.preventDefault();
    const req = state.form;
    FormMiddleware(req, 'contact', handleResponse200, handleResponseError);
    setState({
      ...state,
      modal: {
        title: 'Envoi en cours',
        message: 'Merci de patienter',
        toggleModal: true,
      },
    });
  };
  return (
    <div className="w-full ">
      <form
        onSubmit={handleSubmit}
        className="flex flex-wrap sm:flex-row flex-col sm:w-3/4 w-full sm:mx-auto mx-2 p-4 text-left"
      >
        <div className="w-100 sm:w-1/2 pr-4">
          <label htmlFor="name">
            <p className="label">
              Nom
              {' '}
              <span className="text-red">*</span>
            </p>
            <Input
              type="text"
              id="name"
              title="Nom"
              value={state.form.name}
              onChange={(e: ChangeEvent<HTMLInputElement>) => changeField(e.target.value, 'name')}
              onBlur={(e: ChangeEvent<HTMLInputElement>) => {
                setState((prevState) => {
                  const newState = { ...prevState, isFocused: true };
                  if (e.target.value.length > 2 && e.target.value.length < 35) {
                    newState.confirmationName = true;
                  } else {
                    newState.confirmationName = false;
                  }
                  return newState;
                });
              }}
            />
            {state.confirmationName === false
              && (
              <span>
                Veuillez renseigner votre nom (entre 3 et 35 caractères)
              </span>
              )}
          </label>
        </div>
        <div className="w-100 sm:w-1/2 pr-4">
          <label htmlFor="email">
            <p className="label">
              Email
              {' '}
              <span className="text-red">*</span>
            </p>
            <input
              id="email"
              type="email"
              title="Email"
              value={state.form.email}
              onChange={(e: ChangeEvent<HTMLInputElement>) => changeField(e.target.value, 'email')}
              onBlur={(e: ChangeEvent<HTMLInputElement>) => (
                regex.test(e.target.value)
                  ? setState({ ...state, confirmationEmail: true })
                  : setState({ ...state, confirmationEmail: false })
              )}
            />
          </label>
          {state.confirmationEmail === false
                && (
                <span>
                  Veuillez renseigner votre adresse email
                </span>
                )}
        </div>
        <div className="w-100 sm:w-1/2 pr-4">
          <label htmlFor="society">
            <p className="label">
              Société
            </p>
            <input
              type="text"
              id="society"
              title="Société"
              value={state.form.nameSociety}
              onChange={(e: ChangeEvent<HTMLInputElement>) => changeField(e.target.value, 'nameSociety')}
            />
          </label>
        </div>
        <div className="w-100 sm:w-1/2 pr-4">
          <label htmlFor="siret">
            <p className="label">
              Siret
            </p>
            <input
              type="text"
              id="siret"
              title="Siret"
              value={state.form.siret}
              onChange={(e: ChangeEvent<HTMLInputElement>) => changeField(e.target.value, 'siret')}
            />
          </label>
        </div>
        <div className="w-full pr-4">
          <label htmlFor="address">
            <p className="label">
              Adresse
            </p>
            <input
              type="text"
              id="address"
              name="address"
              value={state.form.adress}
              onChange={(e: ChangeEvent<HTMLInputElement>) => changeField(e.target.value, 'adress')}
            />
          </label>
        </div>
        {/* <div>
          <label htmlFor="postalcode">
            <p>
              Code postal
            </p>
            <input
              id="postalcode"
              type="number"
              className="contact-form-input"
              name="postalCode"
              value={state.form.postalCode}
              onChange={(e) => setState(
                { ...state, form: { ...state.form, postalCode: e.target.value } },
              )}
              onBlur={(e) => (
                e.target.value.length === 5
                  ? setState({ ...state, confirmationCodePostal: true })
                  : setState({ ...state, confirmationCodePostal: false })
              )}
              placeholder="Code postal"
              minLength={2}
              required
            />
          </label>
          {state.confirmationCodePostal === false
                && (
                <span>
                  Veuillez renseigner votre code postal (5 chiffres)
                </span>
                )}
        </div> */}

        <div className="w-100 sm:w-1/2 pr-4 ">
          <label htmlFor="phone">
            <p className="label">
              Téléphone
            </p>
            <input
              id="phone"
              type="text"
              name="phone"
              value={state.form.phone}
              onChange={(e: ChangeEvent<HTMLInputElement>) => changeField(e.target.value, 'phone')}
            />
          </label>
        </div>
        {state.form.phone && (
        <div className="w-100 sm:w-1/2 pr-4">
          <label htmlFor="date">
            <p className="label">
              Etre rappelé le
            </p>
            <input
              type="datetime-local"
              name="date"
              value={state.form.date}
              onChange={(e: ChangeEvent<HTMLInputElement>) => changeField(e.target.value, 'date')}
              min={`${new Date().toISOString().split('T')[0]}T09:00`}
              max={`${new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}T20:00`}
            />
          </label>
        </div>
        )}
        <div className="w-full mt-4">
          <fieldset>
            <legend>
              Quels sont vos besoins ?
            </legend>
            <div>
              <label htmlFor="site" className="block m-2">
                <input
                  type="radio"
                  name="intervention"
                  id="site"
                  value="site"
                  className="w-4 h-4 mr-2"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => changeField(e.target.value, 'intervention')}
                  required
                />
                Site Web
              </label>
              <label htmlFor="boutique" className="block m-2 ">
                <input
                  type="radio"
                  name="intervention"
                  id="boutique"
                  value="boutique"
                  className="w-4 h-4 mr-2"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => changeField(e.target.value, 'intervention')}
                  required
                />
                <span>
                  Boutique en ligne
                </span>
              </label>
              <label htmlFor="application" className="block m-2 ">
                <input
                  type="radio"
                  name="intervention"
                  id="application"
                  value="application"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => changeField(e.target.value, 'intervention')}
                  className="w-4 h-4 mr-2"
                  required
                />
                <span>
                  Application
                </span>
              </label>
              <label htmlFor="Autre" className="block m-2">
                <input
                  type="radio"
                  name="intervention"
                  id="Autre"
                  value="Autre"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => changeField(e.target.value, 'intervention')}
                  className="w-4 h-4 mr-2"
                  required
                />
                <span>
                  Autre
                </span>
              </label>
              {state.form.intervention === 'Autre' && (
              <div>
                <input
                  type="text"
                  title="Autre"
                  value={state.form.interventionOther}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => changeField(e.target.value, 'interventionOther')}
                />
              </div>
              )}
            </div>
          </fieldset>
        </div>
        {(state.form.intervention === 'site' || state.form.intervention === 'blog') && (
        <div className="w-full">
          <p>
            Nombre de pages estimé :
          </p>
          <div>
            <label htmlFor="surface">
              <span>
                {' '}
                {state.form.surface && (state.form.surface >= 15
                  ? `Plus de ${state.form.surface}`
                  : `Environs ${state.form.surface}`
                )}
                {' '}
                pages
              </span>
              <input
                type="range"
                id="surface"
                name="surface"
                min="0"
                max="15"
                step="1"
                value={state.form.surface}
                onChange={(e: ChangeEvent<HTMLInputElement>) => changeField(e.target.value, 'surface')}
              />
            </label>
          </div>
        </div>
        )}

        <div className="w-full">
          <label htmlFor="message">
            <p className="label">
              Ajouter un message
            </p>
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
            />
          </label>
        </div>
        <div className="bg-secondary p-4 my-4 rounded w-full">
          <label htmlFor="image">
              Ajouter une image
            <input
              type="file"
              id="image"
              name="image"
              accept="image/jpg, image/jpeg, image/webp"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
          {state.confirmationImage === false
                && (
                <span>
                  Image non valide (JPG, PNG, AVIF, WEBP)
                </span>
                )}
        </div>
        <div className="w-full ">
          <label htmlFor="emailReturn">
            <input
              type="checkbox"
              name="emailReturn"
              id="emailReturn"
              checked={state.form.emailReturn}
              className="w-4 h-4 mr-2 my-4"
              onChange={(e: ChangeEvent<HTMLInputElement>) => changeField(e.target.checked, 'emailReturn')}
            />
            <span>
              Recevoir une copie de cet email
            </span>
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
      <Confirmation
        title={state.modal.title}
        message={state.modal.message}
        toggleModal={state.modal.toggleModal}
      />
    </div>
  );
}
