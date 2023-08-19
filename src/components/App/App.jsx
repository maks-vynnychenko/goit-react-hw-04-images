import React, { useState, useEffect } from 'react';

import { fetchImg } from 'services/api';

import Searchbar from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Loader } from '../Loader/Loader';
import { Button } from '../Button/Button';
import Modal from '../Modal/Modal';

import appStyle from './App.module.css';

const App = () => {
  const [searchValue, setSearchValue] = useState('');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [page, setPage] = useState(1);
  const [per_page] = useState(12);
  const [modal, setModal] = useState(false);
  const [largeImgURL, setLargeImageUrl] = useState(null);

  useEffect(() => {
    if (searchValue === '') {
      return;
    }
    const fetchImage = async (searchValue, page, per_page) => {
      await fetchImg(searchValue, page, per_page)
        .then(({ hits, totalHits }) => {
          if (hits.length === 0) {
            setIsLoading(false);
            setLoadMore(false);
            alert('No image find with your request');
            return;
          }
          setImages(prevImages => [...prevImages, ...hits]);
          setLoadMore(page < Math.ceil(totalHits / per_page));
          setIsLoading(false);
        })
        .catch(error => {
          console.log(error);
        });
    };
    setIsLoading(true);
    fetchImage(searchValue, page, per_page);
  }, [searchValue, page, per_page]);

  const submitForm = searchQuery => {
    if (searchQuery === searchValue) {
      return;
    }
    setSearchValue(searchQuery);
    setPage(1);
    setImages([]);
  };

  const onLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const toggleModal = image => {
    setModal(prevModal => !prevModal);
    setLargeImageUrl(image);
  };

  return (
    <div className={appStyle.App}>
      <Searchbar onSubmit={submitForm} />
      {images.length > 0 && (
        <ImageGallery images={images} onClick={toggleModal} />
      )}
      {isLoading && <Loader />}
      {loadMore && <Button onClick={onLoadMore} />}
      {modal && <Modal largeImage={largeImgURL} onClose={toggleModal} />}
    </div>
  );
};

export default App;