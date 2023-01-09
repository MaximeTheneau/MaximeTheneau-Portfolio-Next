import PropTypes from 'prop-types';
import styleModal from '../../styles/Modal.module.scss';

export default function Confirmation({ state, setState }) {
  const handleToggleModal = () => {
    setState({
      ...state,
      toggleModal: false,
      form: {
        name: '',
        email: '',
        subject: '',
        message: '',
      },
    });
  };
  return state.toggleModal ? (
    <div className={styleModal.modal}>
      <div className={styleModal.modal__contents}>
        <h2>Bien Reçu</h2>
        <p>Votre message a bien été envoyé</p>
        <button
          type="button"
          className={styleModal.close}
          onClick={handleToggleModal}
        >
          Fermer
        </button>
      </div>
    </div>
  ) : '';
}

Confirmation.propTypes = {
  state: PropTypes.shape({
    form: PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string,
      subject: PropTypes.string,
      message: PropTypes.string,
    }),
    toggleModal: PropTypes.bool,
  }).isRequired,
  setState: PropTypes.func.isRequired,
};