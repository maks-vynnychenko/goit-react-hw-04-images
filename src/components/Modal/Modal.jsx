import PropTypes from 'prop-types';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import modalStyle from './Modal.module.css';

const modal = document.getElementById('modal-root');

const Modal = ({ onClose, largeImage }) => {
  useEffect(() => {
    const closeOnEscape = event => {
      if (event.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', closeOnEscape);

    return () => {
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [onClose]);

  const closeOnOverlay = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };
  return createPortal(
    <>
      <div className={modalStyle.Overlay} onClick={closeOnOverlay}>
        <div className={modalStyle.Modal}>
          <img src={largeImage} alt="" />
        </div>
      </div>
    </>,
    modal
  );
};

export default Modal;

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  largeImage: PropTypes.string,
};