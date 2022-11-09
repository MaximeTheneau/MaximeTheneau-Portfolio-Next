
import styles from '../../styles/Home.module.scss';

function formContact({state, setState} ) {

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

  return (  
    <form className={styles['footer-form']} onSubmit={handleSubmit}>
      <div className={styles['footer-form-top']}>
        <div className={styles[state.form.confirmationName]}>
          <input
            type="text"
            placeholder="Nom"
            onChange={handleChangeName}
            value={state.form.name}
            required
          />
          <i className={`icon-${state.form.confirmationName} ${styles[state.form.confirmationName]}`} />
          {
            state.form.confirmationName === 'error' ? <p className={styles['error']}>Le nom doit faire moins de 25 caractères</p> : ''
          }
        </div>
        <div className={styles[state.form.confirmationEmail]}>
          <input
            type="email"
            placeholder="Email"
            onChange={handleChangeEmail}
            value={state.form.email}
            />
          <i className={`icon-${state.form.confirmationEmail} ${styles[state.form.confirmationEmail]}`} />
          {
            state.form.confirmationEmail === 'error' ? <p className={styles['error']}>L'email n'est pas valide</p> : ''
          }
        </div>
        <div className={styles[state.form.confirmationSubject]}>
          <input
            type="text"
            placeholder="Sujet"
            onChange={handleChangeSubject}
            value={state.form.subject}
            required
          />
          <i className={`icon-${state.form.confirmationSubject} ${styles[state.form.confirmationSubject]} `} />
          {
            state.form.confirmationSubject === 'error' ? <p className={styles['error']}>Le sujet doit faire moins de 25 caractères</p> : ''
          }
      </div>
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
