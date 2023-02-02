import * as React from 'react';
import styleModal from './Modal.module.scss';

type Props = {
  state: {
    toggleModal: boolean;
    form: {
      name: string;
      email: string;
      subject: string;
      message: string;
    };
  };
  setState: (state: any) => void;
};

const Confirmation = ({ state: state, setState }: Props) => {
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
  ) : null;
}

export default Confirmation;