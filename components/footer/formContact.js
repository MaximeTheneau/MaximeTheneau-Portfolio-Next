import { useState } from 'react';
import styles from '../../styles/Home.module.scss';



function formContact({state, setState} ) {

  console.log(state);
  
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
          }
        });
      })
      .catch((err) => console.log(err));
  };



  return (
    <form className={styles['footer-form']} onSubmit={handleSubmit}>
      <div className={styles['footer-form-top']}>
        <input
          type="text"
          placeholder="Nom"
          onChange={(e) => setState({ ...state, form:{...state.form, name: e.target.value}} )}
          value={state.form.name}
          required
        />
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setState({ ...state, form:{...state.form, email: e.target.value} })}
          value={state.form.email}
          />
        <input
          type="text"
          placeholder="Sujet"
          onChange={(e) => setState({ ...state, form:{...state.form, subject: e.target.value }})}
          value={state.form.subject}
          required
        />
      </div>
      <textarea
        placeholder="Message"
        rows={5}
        onChange={(e) => setState({ ...state, form:{...state.form, message: e.target.value }})}
        value={state.form.message}
        required
      />
      <button type="submit">
        <i className="icon-paper-plane" />
        Envoyer
      </button>
    </form>

  );
}

export default formContact;
