import css from './index.module.css';
import ImageGalleryItem from '../ImageGalleryItem';
import PropTypes from 'prop-types';

function ImageGallery({ images, onImgClick }) {
  return (
    <ul className={css.gallery}>
      {images.map(({ webformatURL, tags, id, largeImageURL }) => {
        return (
          <ImageGalleryItem
            key={id}
            webformatURL={webformatURL}
            tags={tags}
            largeImageURL={largeImageURL}
            onModal={onImgClick}
          />
        );
      })}
    </ul>
  );
}
ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  onImgClick: PropTypes.func.isRequired,
};

export default ImageGallery;
