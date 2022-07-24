import css from './index.module.css';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

const Modal = ({ children, onClose }) => {
  useEffect(() => {
    window.removeEventListener('keydown', handleClose);
  });

  const handleClose = e => {
    if (e.code === 'Escape' || e.currentTarget === e.target) {
      onClose();
    }
  };
  useEffect(() => {
    window.addEventListener('keydown', handleClose);
  });

  return (
    <div className={css.overlay} onClick={handleClose}>
      <div className={css.modal}>{children}</div>
    </div>
  );
};

Modal.propTypes = {
  children: PropTypes.object,
};

export default Modal;
