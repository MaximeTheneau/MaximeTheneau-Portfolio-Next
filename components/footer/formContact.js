
import { useEffect } from 'react';
import styles from '../../styles/Home.module.scss';

export default function FormContact({state, setState} ) {
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

  const handleChangeName = (e) => {
    setState({
      ...state,
      form:{
        ...state.form,
        confirmationName: 'change',
        name: e.target.value
      }} )
    if(e.target.value.length > 2){
      setState({
        ...state,
        form:{
          ...state.form,
          confirmationName: 'confirmation' ,
          name: e.target.value
        }} )
    }if(e.target.value.length > 25){
    setState({
      ...state,
      form:{
        ...state.form,
        confirmationName: 'error',
        name: e.target.value
      }} )
    }

  }

  const handleChangeEmail = (e) => {
    setState({
      ...state,
      form:{
        ...state.form,
        confirmationEmail: 'change',
        email: e.target.value
      }} )
    if(e.target.value.length > 2){
      setState({
        ...state,
        form:{ 
          ...state.form,
          confirmationEmail: 'error',
          email: e.target.value
        }} )
    }
    const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(regex.test(e.target.value)){
      setState({
        ...state,
        form:{
          ...state.form,
          confirmationEmail: 'confirmation' ,
          email: e.target.value
        }} )
    }
  }

  const handleChangeSubject = (e) => {
    setState({ ...state, form:{...state.form, subject: e.target.value }})
    if(e.target.value.length > 2){
      setState({
        ...state,
        form:{
          ...state.form,
          confirmationSubject: 'confirmation' ,
          subject: e.target.value
        }} )
    }if(e.target.value.length > 25){
    setState({
      ...state,
      form:{
        ...state.form,
        confirmationSubject: 'error',
        subject: e.target.value
      }} )
    }
  }

  const handleChangeMessage = (e) => {
    const trows = e.target.value.split("\n").length - 1 == 0 ? 1 : e.target.value.split("\n").length - 1; 

    setState({ ...state, form:{...state.form, message: e.target.value, textArea: trows, confirmationMessage: 'change' }})
    const textareaheight = state.form.textArea;
    console.log(textareaheight);
    if(e.target.value.length > 250){
      setState({
        ...state,
        form:{
          ...state.form,
          confirmationMessage: 'confirmation' ,
          message: e.target.value,
          textArea: trows
        }} )
    }if(e.target.value.length > 250){
    setState({
      ...state,
      form:{
        ...state.form,
        confirmationMessage: 'error',
        message: e.target.value,
        textArea: trows

      }} )
    }
  }

    




  return (  
    <form className={styles['footer-form']} onSubmit={handleSubmit} >
      <div className={styles['footer-form-top']}>
        <div className={styles['footer-form-input']}>
          <input
            type="text"
            placeholder="Nom"
            onChange={handleChangeName}
            value={state.form.name}
            required
          />
          <i className={`icon-${state.form.confirmationName}`} />
        </div>
        <div className={styles['footer-form-input']}>
          <input
            type="email"
            placeholder="Email"
            onChange={handleChangeEmail}
            value={state.form.email}
            />
          <i className={`icon-${state.form.confirmationEmail}`} />
        </div >

        {/* Subject */}
        <div className={styles['footer-form-input']}>
            <input
              type="text"
              placeholder="Sujet"
              onChange={handleChangeSubject}
              value={state.form.subject}
              className={styles[state.form.confirmationSubject]}
              required
            />
            <i className={`icon-${state.form.confirmationSubject}`} />
      </div>
      </div>

      {/* Error */}
      {
            state.form.confirmationEmail === 'error' ? (
              <div 
                className={styles['footer-form-message']}>
              <p >L'email n'est pas valide</p>
            </div>
            ) : ''
          }
          {
            state.form.confirmationSubject === 'error' ?(
            <div className={styles['footer-form-message']}>
              <p>Le sujet doit faire moins de 25 caractères</p>
            </div>
            ) : ''
          }

    {
            state.form.confirmationName === 'error' ? (
              <div className={styles['footer-form-message']}>
                <p >Le nom doit faire moins de 25 caractères</p>
              </div>
            ) : ''
          }
      {/* Message */}
      <div className={styles['footer-form-textarea']}>
            <textarea
              placeholder="Message"
              rows={state.form.textArea}
              wrap="off"
              onChange={handleChangeMessage}
              value={state.form.message}
              required
            />          
            <i className={`icon-${state.form.confirmationMessage}`} />
        </div>        
          {                      
            state.form.confirmationMessage === 'error' ? (
              <div className={`${styles['footer-form-message']}`}>
                <p >Le message doit faire moins de 25 caractères</p>
              </div>
            ) : ''
          }

        <button
          type="submit"
        >
          <div className={styles['footer-form-button']}>
            <span>Envoyer</span>    
            <i className="icon-paper-plane" />
          </div>      
        </button>
    </form>

  );
}

