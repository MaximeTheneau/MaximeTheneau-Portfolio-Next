import PropTypes from 'prop-types';
import { useState } from 'react';
import styles from '../../styles/Home.module.scss';

export default function FormContact({ handleOnMouseEnter }) {
  //* State
  const [state, setState] = useState({
    form: {
      name: '',
      email: '',
      subject: '',
      message: '',
      confirmation: '',
      textArea: 1,
    },
    confirmationMessage: null,
    confirmationName: null,
    confirmationEmail: null,
    confirmationSubject: null,
  });

  const regex = /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s\\"]+)*)|(\\".+\\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(state.form),
    };
    fetch('http://localhost:8000/api/message', requestOptions)
      .finally(() => {
        setState({
          ...state,
          toggleModal: true,
          form: {
            name: '',
            email: '',
            subject: '',
            message: '',
          },
        });
      })
      .catch((err) => console.log(err));
  };

  const handleChangeMessage = (e) => {
    const trows = e.target.value.split('\n').length - 1 === 0 ? 1 : e.target.value.split('\n').length - 1;
    setState({
      ...state,
      textArea: trows,
      form: {
        ...state.form, message: e.target.value,
      },
    });
  };

  return (
    <form className={styles['footer-form']} onSubmit={handleSubmit}>
      <div className={styles['footer-form-top']}>
        <div className={styles['footer-form-input']}>
          { state.confirmationName === false ? <i className="icon-error" /> : '' }
          <input
            type="text"
            placeholder="Nom"
            value={state.form.name}
            onChange={(e) => setState(
              { ...state, form: { ...state.form, name: e.target.value } },
            )}
            onBlur={(e) => (
              e.target.value.length > 2 && e.target.value.length < 35
                ? setState({ ...state, confirmationName: true })
                : setState({ ...state, confirmationName: false })
            )}
            required
          />
        </div>
        <div className={styles['footer-form-input']}>
          { state.confirmationEmail === false ? <i className="icon-error" /> : '' }
          <input
            type="email"
            placeholder="Email"
            value={state.form.email}
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
            required
          />
        </div>

        {/* Subject */}
        <div className={styles['footer-form-input']}>
          { state.confirmationSubject === false ? <i className="icon-error" /> : '' }
          <input
            type="text"
            placeholder="Sujet"
            className={styles[state.form.confirmationSubject]}
            value={state.form.subject}
            onChange={(e) => setState(
              { ...state, form: { ...state.form, subject: e.target.value } },
            )}
            onBlur={(e) => (
              e.target.value.length > 2 && e.target.value.length < 35
                ? setState({ ...state, confirmationSubject: true })
                : setState({ ...state, confirmationSubject: false })
            )}
            required
          />
        </div>
      </div>

      {/* Error */}
      { state.confirmationName === false ? (
        <div className={styles['footer-form-message']}>
          <p>Le nom doit faire moins de 25 caractères</p>
        </div>
      ) : ''}

      { state.confirmationEmail === false ? (
        <div className={styles['footer-form-message']}>
          <p>L&apos;email n&apos;est pas valide</p>
        </div>
      ) : ''}

      { state.confirmationSubject === false ? (
        <div className={styles['footer-form-message']}>
          <p>Le sujet doit faire moins de 25 caractères</p>
        </div>
      ) : ''}

      {/* Message */}
      <div className={styles['footer-form-textarea']}>
        { state.confirmationMessage === false ? <i className="icon-error" /> : '' }
        <textarea
          placeholder="Message"
          rows={state.textArea}
          wrap="off"
          value={state.form.message}
          onChange={handleChangeMessage}
          onBlur={(e) => (e.target.value.length > 2 && e.target.value.length < 250
            ? setState({ ...state, confirmationMessage: true })
            : setState({ ...state, confirmationMessage: false }))}
          required
        />
      </div>
      {
            state.confirmationMessage === false ? (
              <div className={`${styles['footer-form-message']}`}>
                <p>Le message doit faire moins de 250 caractères</p>
              </div>
            ) : ''
          }

      <button
        type="submit"
        onMouseEnter={(e) => handleOnMouseEnter(e.currentTarget)}
      >
        <div className="relative f-center">
          <span>Envoyer</span>
          <i className="icon-paper-plane" />
        </div>
      </button>
    </form>

  );
}

FormContact.propTypes = {
  handleOnMouseEnter: PropTypes.func.isRequired,
};
