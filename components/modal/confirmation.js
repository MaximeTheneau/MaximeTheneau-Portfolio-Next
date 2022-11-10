import styleModal from '../../styles/Modal.module.scss';

function confirmation({ setState, state }) {
  
  const setToggleModalValue = () => {
    console.log('setToggleModalValue');
    setState({ ...state, toggleModal: false });
  };
  return (

    <div className={styleModal.modal}>
      <h2>Bien Reçu</h2>
      <p>Votre message a bien été envoyé</p>
      <button
        type="button"
        className={styleModal.close}
        onClick={setToggleModalValue}
      >
        Fermer
      </button>
    </div>
  );
}
export default confirmation;
