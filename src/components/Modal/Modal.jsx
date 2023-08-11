import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { ModalOverlayStyled, ModalWindowStyled } from './Modal.styled';

export  const  Modal  =({ onClose, children, handleKeyDown }) => {
  useEffect (() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
   const onBackdropClick = event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  handleKeyDown = event => {
    if (event.key === 'Escape') {
      onClose();
    }
  };
 
    return (
      <ModalOverlayStyled onClick={onBackdropClick}>
        <ModalWindowStyled>{children}</ModalWindowStyled>
      </ModalOverlayStyled>
    );
  
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
