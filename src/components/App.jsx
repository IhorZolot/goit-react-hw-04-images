import React, { useEffect, useState } from 'react';

import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';
import { fetchImg } from '../Servise/Api';
import { LoadMoreButton } from './Button/Button';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { AppStyled } from './App.styled';

export const App = () => {
  const [hits, setHits] = useState([]);
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);
  const [per_page] = useState(12);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState('');
  const [totalHits, setTotalHits] = useState(0);
  const [ setError] = useState('');

  useEffect(() => {
    fetchImages();
  }, [q, page]);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const { hits, totalHits } = await fetchImg({ per_page, q, page });
      setHits(prevHits => [...prevHits, ...hits]);
      setTotalHits(totalHits);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const loadNextImage = () => {
    setPage(prevPage => prevPage + 1);
  };
  const handleSetSearch = newQ => {
    setQ(newQ);
    setPage(1);
  };

  const toggleModal = () => {
    setIsModalOpen(prevIsModalOpen => !prevIsModalOpen);
  };
  const handleSetCurrentImage = img => {
    setCurrentImage(img);
    setIsModalOpen(true);
  };
  return (
    <AppStyled>
      <Searchbar onSetSearch={handleSetSearch} />
      {loading ? (
        <Loader />
      ) : (
        <ImageGallery
          setCurrentImage={handleSetCurrentImage}
          isOpen={isModalOpen}
          images={hits}
          toggleModal={toggleModal}
        />
      )}
      {page !== Math.ceil(totalHits / per_page) && (
        <LoadMoreButton onNextPage={loadNextImage}>
          {loading ? <Loader /> : 'Load more'}
        </LoadMoreButton>
      )}
      {isModalOpen && currentImage && (
        <Modal onClose={toggleModal}>
          <img src={currentImage} alt={currentImage} />
        </Modal>
      )}
    </AppStyled>
  );
};
