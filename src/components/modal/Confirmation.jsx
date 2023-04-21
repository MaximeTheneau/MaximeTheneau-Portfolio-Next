import PropTypes from 'prop-types';
import styleModal from './Modal.module.scss';

export default function confirmation({ onClickConfirmation }) {
  setTimeout(() => {
    onClickConfirmation(false);
  }, 10000);
  return (
    <div className={styleModal.modal}>

      <h2>
        <i className="icon-confirmation" />
        {' '}
        Bien Reçu, merci !
      </h2>
      <p>Votre message a bien été envoyé, on vous réponds aux plus vite</p>
      <div>
        <button
          type="button"
          className="button-submit"
          onClick={onClickConfirmation}
        >
          Fermer
        </button>
      </div>
    </div>
  );
}

confirmation.propTypes = {
  onClickConfirmation: PropTypes.func.isRequired,
};
