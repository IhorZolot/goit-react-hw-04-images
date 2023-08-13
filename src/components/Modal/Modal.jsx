import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ModalOverlayStyled, ModalWindowStyled } from './Modal.styled';

export const Modal = ({ onClose, children }) => {
  const onBackdropClick = event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = useCallback(
    event => {
      if (event.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, handleKeyDown]);

  return (
    <ModalOverlayStyled onClick={onBackdropClick}>
      <ModalWindowStyled>{children}</ModalWindowStyled>
    </ModalOverlayStyled>
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
