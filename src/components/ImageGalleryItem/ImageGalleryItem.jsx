import React from 'react';
import PropTypes from 'prop-types';

import {
  GalleryItemStyled,
  GalleryItemImageStyled,
} from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ largeImageURL, setCurrentImage }) => {
  return (
    <GalleryItemStyled>
      <GalleryItemImageStyled
        src={largeImageURL}
        alt='text'
        onClick={() => setCurrentImage(largeImageURL)}
      />
    </GalleryItemStyled>
  );
};

ImageGalleryItem.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  setCurrentImage: PropTypes.func.isRequired,
};
