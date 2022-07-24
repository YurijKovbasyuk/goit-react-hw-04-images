import css from './index.module.css';
import { useState, useEffect, useRef } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery/index';
import Button from './Button';
import * as API from '../API/API';
import Modal from './Modal';

// class App extends Component {
//   state = {
//     images: [],
//     query: '',
//     page: 1,
//     per_page: 12,
//     isVisible: false,
//     error: null,
//     isLoading: false,
//     showModalWindow: false,
//     largeImage: '',
//   };
const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [per_page, setPer_page] = useState(12);
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showModalWindow, setShowModalWindow] = useState(false);
  const [largeImage, setLargeImage] = useState('');
  const isFirstRender = useRef(true);

  // componentDidUpdate(prevProps, prevState) {
  //   const { query, page, per_page } = this.state;

  //   if (prevState.query !== query || prevState.page !== page) {
  //     this.getPhotos(query, page, per_page);
  //   }
  // }

  // getPhotos = async (query, page, per_page) => {
  //   if (!query) return;
  //   this.setState({ isLoading: true });

  //   try {
  //     const data = await API.getImages(query, page, per_page);

  //     this.setState(prevState => ({
  //       images: [...prevState.images, ...data.hits],
  //       isVisible: page < Math.ceil(data.totalHits / per_page),
  //     }));
  //   } catch (error) {
  //     this.setState({ error: error.response.data });
  //     console.log('error', error.response.data);
  //   } finally {
  //     this.setState({ isLoading: false });
  //   }
  // };
  const getPhotos = async (query, page, per_page) => {
    if (!query) return;

    setIsLoading(true);

    try {
      const data = await API.getImages(query, page, per_page);

      setImages(() => [...images, ...data.hits]);
      setIsVisible(() => page < Math.ceil(data.totalHits / per_page));
    } catch (error) {
      setError(error.response.data);
      console.log('error', error.response.data);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(
    prevState => {
      if (isFirstRender.current) {
        isFirstRender.current = false;
        return;
      }
      // else if (prevState.query !== query || prevState.page !== page) {
      //   getPhotos(query, page, per_page);
      // }
      getPhotos(query, page, per_page);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [query, page, per_page]
  );

  // handleSubmitForm = value => {
  //   this.setState({
  //     query: value.trim(),
  //     page: 1,
  //     isVisible: false,
  //     images: [],
  //   });
  // };
  const handleSubmitForm = value => {
    setQuery(value.trim());
    setPage(1);
    setIsVisible(false);
    setImages([]);
  };

  // handleLoadMore = () => {
  //   this.setState(prevState => ({ page: prevState.page + 1 }));
  // };
  const handleLoadMore = () => {
    setPage(page + 1);
  };

  // openModal = largeImageURL => {
  //   this.setState({
  //     showModalWindow: true,
  //     largeImage: largeImageURL,
  //   });
  // };
  const openModal = largeImageURL => {
    setShowModalWindow(true);
    setLargeImage(largeImageURL);
  };

  const closeModal = () => {
    setShowModalWindow(false);
    setLargeImage('');
  };

  return (
    <div className={css.app}>
      <Searchbar onSubmit={handleSubmitForm} />
      {images.length === 0 && !error && <p>Sorry. There are not images 😢</p>}

      {error && (
        <p>
          Something wrong: {error} <br />
          <span className={css.cotact}>Contact your administrator</span>
        </p>
      )}

      {images.length !== 0 && (
        <ImageGallery images={images} onImgClick={openModal} />
      )}

      {isVisible && <Button onClick={handleLoadMore} isLoading={isLoading} />}

      {showModalWindow && (
        <Modal onClose={closeModal}>
          <img src={largeImage} alt="" />
        </Modal>
      )}
    </div>
  );
};
// }

export default App;
