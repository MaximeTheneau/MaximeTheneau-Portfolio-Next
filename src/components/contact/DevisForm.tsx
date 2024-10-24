import React, { ChangeEvent, useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
import { useRouter } from 'next/router';
import FormMiddleware from '../../middleware/formMiddleware';
import Confirmation from '../modal/Confirmation';
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
  confirmationSubject?: boolean | null;
  confirmationCodePostal?: boolean | null;
  confirmationImage?: boolean | null;
  modal: ModalState;
}

// == Composant
export default function DevisForm() {
  const router = useRouter();

  const { product } = router.query;

  let surface: number;

  if (product === 'simple') {
    surface = 4;
  } if (product === 'pro') {
    surface = 6;
  } if (product === 'premium') {
    surface = 15;
  }

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
      surface: surface || 0,
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

  const handleResponse200 = (response) => {
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

  const handleResponseError = (error) => {
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

  const handleSubmit = (evt) => {
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
    <div className="max-w-sm bg-gray-100 p-4 rounded my-4 mx-auto">
      <form
        onSubmit={handleSubmit}
      >
        <div>
          <fieldset>
            <legend>
              Status
              {' '}
              <span className="text-red">*</span>
            </legend>
            <div
              className="s"
            >
              <label htmlFor="statusParticular" className="block m-2 text-sm">
                <input
                  type="radio"
                  id="statusParticular"
                  value="Particulier"
                  name="status"
                  className="w-4 h-4 mr-2"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => changeField(e.target.value, 'status')}
                />
                <span>
                  Particulier
                </span>
              </label>
              <label htmlFor="statusSociety" className="block ms-2 text-sm">
                <input
                  id="statusSociety"
                  type="radio"
                  value="Société"
                  name="status"
                  className="w-4 h-4 mr-2"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => changeField(e.target.value, 'status')}
                />
                <span>
                  Société
                </span>
              </label>
            </div>
          </fieldset>
        </div>
        { state.form.status === 'Société' && (
        <>
          <div className="">
            <input
              type="text"
              title="Société"
              placeholder="Nom de la société"
              value={state.form.nameSociety}
              onChange={(e: ChangeEvent<HTMLInputElement>) => changeField(e.target.value, 'nameSociety')}
            />
          </div>
          <div className=" ">
            <input
              type="text"
              title="Siret"
              placeholder="Siret"
              value={state.form.siret}
              onChange={(e: ChangeEvent<HTMLInputElement>) => changeField(e.target.value, 'siret')}
            />
          </div>
        </>
        )}
        <div className=" ">
          <p className=" ">
            Nom
            {' '}
            <span className="text-red">*</span>
          </p>
          <Input
            type="text"
            title="Nom"
            placeholder="Nom Prénom"
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
        </div>
        <div>
          <p>
            Adresse
          </p>
          <input
            type="text"
            name="address"
            placeholder="Adresse"
            value={state.form.adress}
            onChange={(e: ChangeEvent<HTMLInputElement>) => changeField(e.target.value, 'adress')}
          />
        </div>
        <div>
          <label htmlFor="postalcode">
            <p>
              Code postal
              {' '}
              <span className="text-red">*</span>
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
              placeholder="Code postal*"
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
        </div>
        <div>
          <label htmlFor="email">
            <p>
              Email
              {' '}
              <span className="text-red">*</span>
            </p>
            <input
              id="email"
              type="email"
              title="Email"
              value={state.form.email}
              placeholder="exemple@mail.com"
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
        <div>
          <label htmlFor="phone">
            <p>
              Téléphone
            </p>
            <input
              id="phone"
              type="text"
              name="phone"
              placeholder="Téléphone"
              value={state.form.phone}
              onChange={(e: ChangeEvent<HTMLInputElement>) => changeField(e.target.value, 'phone')}
            />
          </label>
        </div>
        {state.form.phone && (
        <div>
          <label htmlFor="date">
            <p>
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
        <div>
          <fieldset>
            <legend>
              Quels sont vos besoins ?
            </legend>
            <div>
              <label htmlFor="site" className="block m-2 text-sm">
                <input
                  type="radio"
                  name="intervention"
                  id="site"
                  value="site"
                  className="w-4 h-4 mr-2"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => changeField(e.target.value, 'intervention')}
                  required
                  checked={!!product}
                />
                <span>
                  Site Web
                </span>
              </label>
              <label htmlFor="boutique" className="block m-2 text-sm">
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
              <label htmlFor="application" className="block m-2 text-sm">
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
              <label htmlFor="Autre" className="block m-2 text-sm">
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
                  placeholder="Précisez si possible"
                  value={state.form.interventionOther}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => changeField(e.target.value, 'interventionOther')}
                />
              </div>
              )}
            </div>
          </fieldset>
        </div>
        {(state.form.intervention === 'site' || state.form.intervention === 'blog') && (
        <div>
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

        <div>
          <p>
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
            placeholder="Message"
          />
        </div>
        <div>
          <label htmlFor="image">
            <p>
              Ajouter une image (facultatif)
            </p>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
            />
          </label>
          {state.confirmationImage === false
                && (
                <span>
                  Image non valide (JPG, PNG, AVIF, WEBP)
                </span>
                )}
        </div>
        <div>
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
        <div className="contact-form_button">
          <button
            type="submit"
            className="text-base text-white sm:w-ful bg-secondary p-2 rounded   hover:scale-90  hover:text-white p-4 m-4"
          >
            Envoyer
            {' '}
            <i className="icon-paper-plane" />
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
