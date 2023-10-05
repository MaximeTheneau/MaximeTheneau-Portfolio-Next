import styleModal from './Modal.module.scss';

export default function Confirmation({
  title, message, toggleModal, onClick,
}) {
  return toggleModal ? (
    <>
      <div className={styleModal.modal__blur} />
      <div className={styleModal.modal}>

        <h2 title='Response'>{title}</h2>
        <p>{message}</p>
        <button
          type="button"
          className="button-submit"
          onClick={onClick}
        >
          Fermer
        </button>
      </div>
    </>
  ) : null;
}
