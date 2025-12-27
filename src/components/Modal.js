import React from 'react';
import PropTypes from 'prop-types';

const modalStyles = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'white',
  padding: '20px',
  zIndex: 1000,
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
};

const overlayStyles = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  zIndex: 999,
};

function Modal({ children, onClose }) {
  return (
    <>
      <div style={overlayStyles} onClick={onClose}></div>
      <div style={modalStyles}>
        <button onClick={onClose} style={{ float: 'right', cursor: 'pointer' }}>
          Close
        </button>
        {children}
      </div>
    </>
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;