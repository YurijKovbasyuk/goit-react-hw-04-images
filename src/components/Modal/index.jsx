import css from './index.module.css';
import { Component } from 'react';
import PropTypes from 'prop-types';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillMount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };
  render() {
    const { children } = this.props;
    return (
      <div className={css.overlay} onClick={this.handleBackdropClick}>
        <div className={css.modal}>{children}</div>
      </div>
    );
  }
}

Modal.propTypes = {
  children: PropTypes.object,
};

export default Modal;
