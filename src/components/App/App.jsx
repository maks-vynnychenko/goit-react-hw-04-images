import React, { Component } from 'react';
import * as Api from 'services/api';
import Searchbar from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Loader } from '../Loader/Loader';
import { Button } from '../Button/Button';
import Modal from '../Modal/Modal';
import appStyle from './App.module.css';
class App extends Component {
  state = {
    searchValue: '',
    images: [],
    isLoading: false,
    loadMore: false,
    page: 1,
    per_page: 12,
    modal: false,
    largeImgURL: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.searchValue !== this.state.searchValue ||
      prevState.page !== this.state.page
    ) {
      this.setState({
        isLoading: true,
      });
      this.fetchImages(
        this.state.searchValue,
        this.state.page,
        this.state.per_page
      );
    }
  }

  fetchImages = (searchValue, page, per_page) => {
    Api.fetchImg(searchValue, page, per_page)
      .then(({ hits, totalHits }) => {
        if (hits.length === 0) {
          this.setState({
            isLoading: false,
            loadMore: false,
          });

          alert('No image find with your request');
          return;
        }

        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
          loadMore: page < Math.ceil(totalHits / per_page),
        }));
        this.setState({
          isLoading: false,
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  submitForm = searchValue => {
    if (searchValue === this.state.searchValue) {
      return;
    }
    this.setState({
      searchValue: searchValue,
      page: 1,
      images: [],
    });
  };

  onLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  toggleModal = image => {
    this.setState(prevState => ({
      modal: !prevState.modal,
      largeImgURL: image,
    }));
  };

  render() {
    return (
      <div className={appStyle.App}>
        <Searchbar onSubmit={this.submitForm} />
        {this.state.images.length > 0 && (
          <ImageGallery images={this.state.images} onClick={this.toggleModal} />
        )}
        {this.state.isLoading && <Loader />}
        {this.state.loadMore && <Button onClick={this.onLoadMore} />}
        {this.state.modal && (
          <Modal
            largeImage={this.state.largeImgURL}
            onClose={this.toggleModal}
          />
        )}
      </div>
    );
  }
}

export default App;