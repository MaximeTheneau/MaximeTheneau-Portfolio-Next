import PropTypes from 'prop-types';
import styleModal from './Modal.module.scss';
import { useState } from 'react';

export default function confirmation({  state, setState }) {
  const { title, message, toggleModal } = state.modal;

  const onClickConfirmation = () => {
    setState({
      ...state,
      modal:{
        toggleModal: false,
      }
    });
  };
  return (
    <>
    {toggleModal ? (
      <>
        <div className={styleModal.modal__blur} />
        <div className={styleModal.modal}>

        <h2>{title}</h2>
        <p>{message}</p>
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
      </>
    ) : ''}
    </>
   
  );
}