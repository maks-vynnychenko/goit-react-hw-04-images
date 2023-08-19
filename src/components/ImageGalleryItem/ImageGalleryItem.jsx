import imageGalleryItemStyle from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';
export const ImageGalleryItem = ({ image, onClick }) => {
  return (
    <>
      <li className={imageGalleryItemStyle.ImageGalleryItem}>
        <img
          className={imageGalleryItemStyle.ImageGalleryItemImage}
          src={image.webformatURL}
          alt={image.tag}
          onClick={() => onClick(image.largeImageURL)}
        />
      </li>
    </>
  );
};


ImageGalleryItem.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
  onClick: PropTypes.func.isRequired,
};