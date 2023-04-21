import { useState } from 'react';
import { formMiddleware } from '../../middleware/middleware';
import AnimationHover from '../../hooks/useHoverAnimation/CloneTextWrapper';
import Confirmation from '../modal/Confirmation';

import styles from './Contact.module.scss';
import styleModal from '../modal/Modal.module.scss';
// == Composant
export default function ContactForm() {
  const [state, setState] = useState({
    form: {
      name: '',
      email: '',
      message: '',
      subject: 'Demande de devis',
    },
    textArea: 1,
    toggleModal: false,
    confirmationName: null,
    confirmationEmail: null,
    confirmationMessage: null,
  });

  const onClickConfirmation = () => {
    setState({
      ...state,
      toggleModal: false,
    });
  };

  const handleChangeMessage = (e) => {
    const trows = e.target.value.split('\n').length - 1 === 0 ? 1 : e.target.value.split('\n').length - 1;
    setState({
      ...state,
      textArea: trows,
      form: {
        ...state.form, message: e.target.value, confirmationMessage: true,
      },
    });
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

  const handleResponse = (response) => {
    setState({
      ...state,
      form: {
        name: '',
        email: '',
        message: '',
        subject: 'Demande de devis',
      },
      toggleModal: response,
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setState({
      ...state,
      toggleModal: true,
    });
    formMiddleware(state.form, handleResponse);
  };

  return (
    <>
      {state.toggleModal ? (
        <>
          <div className={styleModal.modal__blur} />
          <Confirmation
            onClickConfirmation={onClickConfirmation}
          />
        </>
      ) : ''}
      <form className={styles.contact} onSubmit={handleSubmit}>
        <div className={styles.contact__input}>
          <select
            name="subject"
            id="subject"
            className="contact-form-input"
            onChange={(e) => setState(
              { ...state, form: { ...state.form, subject: e.target.value } },
            )}
          >
            <option value="Demande de devis">Demande de devis</option>
            <option value="Demande de renseignements">Demande de renseignements</option>
            <option value="Autre">Autre</option>
          </select>
        </div>
        <div className={styles.contact__input}>
          {classErrorOrConfirmation(state.confirmationName)}
          <input
            type="text"
            className="contact-form-input"
            name="user_name"
            value={state.form.name}
            onChange={(e) => setState(
              { ...state, form: { ...state.form, name: e.target.value } },
            )}
            onBlur={(e) => (
              e.target.value.length > 2 && e.target.value.length < 35
                ? setState({ ...state, confirmationName: true })
                : setState({ ...state, confirmationName: false })
            )}
            placeholder="Nom Prénom / Société"
            required
          />
        </div>
        <div className={styles.contact__input}>
          {classErrorOrConfirmation(state.confirmationEmail)}
          <input
            type="email"
            name="email"
            value={state.form.email}
            placeholder="exemple@email.fr"
            required
            onChange={(e) => setState(
              { ...state, form: { ...state.form, email: e.target.value } },
              (e.target.value.length > 2 && e.target.value.length < 35
                ? setState({ ...state, confirmationEmail: true })
                : setState({ ...state, confirmationEmail: false })),
            )}
            onBlur={(e) => (
              regex.test(e.target.value)
                ? setState({ ...state, confirmationEmail: true })
                : setState({ ...state, confirmationEmail: false })
            )}
          />
        </div>
        <div className={styles.contact__textarea}>
          {classErrorOrConfirmation(state.confirmationMessage)}
          <textarea
            rows={state.textArea}
            value={state.form.message}
            onChange={handleChangeMessage}
            onBlur={(e) => (e.target.value.length > 2 && e.target.value.length < 250
              ? setState({ ...state, confirmationMessage: true })
              : null)}
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
    </>
  );
}
