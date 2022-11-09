import { useState } from 'react';
import styles from '../../styles/Home.module.scss';

function formContact() {

  const [state, setState] = useState({
    toggleNav: true,
    toggleModal: false,
    form:{
      name: '',
      email: '',
      subject: '',
      message: '',
    }
  });
  
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
          name: '',
          email: '',
          subject: '',
          message: '',
          toggleModal: true,
        });
        setTimeout(() => {
          setState({ ...state, toggleModal: true });
        }, 3000);
      })
      .catch((err) => console.log(err));
  };
  return (
    <form className={styles['footer-form']} onSubmit={handleSubmit}>
      <div className={styles['footer-form-top']}>
        <input
          type="text"
          placeholder="Nom"
          onChange={(e) => setState({ ...state, name: e.target.value })}
          value={state.name}
          required
        />
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setState({ ...state, email: e.target.value })}
          value={state.email}
          required
        />
        <input
          type="text"
          placeholder="Sujet"
          onChange={(e) => setState({ ...state, subject: e.target.value })}
          value={state.subject}
          required
        />
      </div>
      <textarea
        placeholder="Message"
        rows={5}
        onChange={(e) => setState({ ...state, message: e.target.value })}
        value={state.message}
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
