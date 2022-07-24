import css from './index.module.css';

import PropTypes from 'prop-types';

const ImageGalleryItem = ({ largeImageURL, tags, webformatURL, onModal }) => {
  return (
    <li className={css.galleryItem}>
      <img
        className={css.galleryImage}
        src={webformatURL}
        alt={tags}
        onClick={() => onModal(largeImageURL)}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  onModal: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
