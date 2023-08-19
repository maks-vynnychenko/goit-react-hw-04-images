import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import imageGalleryStyle from './ImageGallery.module.css';
import PropTypes from 'prop-types';
export const ImageGallery = ({ images, onClick }) => {
  return (
    <ul className={imageGalleryStyle.ImageGallery}>
      {images.map(image => (
        <ImageGalleryItem image={image} key={image.id} onClick={onClick} />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ),
};