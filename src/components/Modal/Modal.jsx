import { createPortal } from 'react-dom';
import { Component } from 'react';
import modalStyle from './Modal.module.css';

const modal = document.getElementById('modal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.closeOnEscape);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeOnEscape);
  }

  closeOnEscape = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };

  closeOnOverlay = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };
  render() {
    return createPortal(
      <>
        <div className={modalStyle.Overlay} onClick={this.closeOnOverlay}>
          <div className={modalStyle.Modal}>
            <img src={this.props.largeImage} alt="" />
          </div>
        </div>
      </>,
      modal
    );
  }
}

export default Modal;