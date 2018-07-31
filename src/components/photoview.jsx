import React from 'react';
import PropTypes from 'prop-types';
import Slider from './slider';

import '../styles/photoview.css';

class PhotoView extends React.Component {
  constructor(props) {
    super(props);
    const { content: { photos } } = this.props;
    this.selectNext = this.selectNext.bind(this);
    this.selectPrevious = this.selectPrevious.bind(this);
    this.selectPhoto = this.selectPhoto.bind(this);
    this.state = {
      mainPhoto: photos[0],
    };
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown.bind(this));
  }

  selectPhoto(event) {
    const { content: { photos } } = this.props;
    let selected;
    for (let i = 0; i < photos.length; i += 1) {
      if (event.getAttribute('src') === photos[i].url) {
        selected = photos[i];
      }
    }
    this.setState({
      mainPhoto: selected,
    });
  }

  selectNext() {
    const { content: { photos } } = this.props;
    const { mainPhoto: { url } } = this.state;
    const numPhotos = photos.length;
    for (let i = 0; i < numPhotos; i += 1) {
      if (photos[i].url === url) {
        this.setState({
          mainPhoto: photos[(i + 1) % numPhotos],
        });
        break;
      }
    }
  }

  selectPrevious() {
    const { content: { photos } } = this.props;
    const { mainPhoto: { url } } = this.state;
    const numPhotos = photos.length;
    for (let i = 0; i < numPhotos; i += 1) {
      if (photos[i].url === url) {
        this.setState({
          mainPhoto: photos[(((i - 1) % numPhotos) + numPhotos) % numPhotos],
        });
        break;
      }
    }
  }

  handleKeyDown(event) {
    const { key } = event;
    if (key === 'ArrowLeft') {
      this.selectPrevious();
    } else if (key === 'ArrowRight') {
      this.selectNext();
    }
  }

  render() {
    const { content, toggleCarousel } = this.props;
    const { mainPhoto, mainPhoto: { url } } = this.state;
    return (
      <div className="popup">
        <div className="popup_inner">
          <div>
            <svg onClick={() => toggleCarousel()} className="exit" height="25" width="25">
              <line x1="0" y1="0" x2="25" y2="25" />
              <line x1="25" y1="0" x2="0" y2="25" />
            </svg>
          </div>
          <div className="center">
            <img aria-hidden="true" alt="" onClick={this.selectNext} className="pic" src={url} />
            <div className="back" role="presentation" onClick={this.selectPrevious}>
              <svg className="backbutton" viewBox="0 0 18 18">
                <path d="m13.7 16.29a1 1 0 1 1 -1.42 1.41l-8-8a1 1 0 0 1 0-1.41l8-8a1 1 0 1 1 1.42 1.41l-7.29 7.29z" fillRule="evenodd" />
              </svg>
            </div>
            <div className="forward" role="presentation" onClick={this.selectNext}>
              <svg className="forwardbutton" viewBox="0 0 18 18">
                <path d="m4.29 1.71a1 1 0 1 1 1.42-1.41l8 8a1 1 0 0 1 0 1.41l-8 8a1 1 0 1 1 -1.42-1.41l7.29-7.29z" fillRule="evenodd" />
              </svg>
            </div>
          </div>
          <div className="slider">
            <Slider content={content} mainPhoto={mainPhoto} selectPhoto={this.selectPhoto} />
          </div>
        </div>
      </div>
    );
  }
}

PhotoView.propTypes = {
  content: PropTypes.shape({ photos: PropTypes.array.isRequired }).isRequired,
  toggleCarousel: PropTypes.func.isRequired,
};

export default PhotoView;
