import React from 'react';
import ReactDOM from 'react-dom';
import Slider from './slider.jsx';
import '../styles/photoview.css';
//pictures, toggleCarousel
class PhotoView extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      mainPhoto: this.props.pictures.photos[0].url
    }
  }

  componentDidMount() {
    for (let i = 0; i < this.props.pictures.photos.length; i++) {
      this.props.pictures.photos[i].index = i;
    }
    document.addEventListener("keydown", this.handleKeyDown.bind(this));
  }

  selectPhoto(event) {
    const src = event.getAttribute('src');
    this.setState({
      mainPhoto: src
    })
  }

  selectNext() {
    const photos = this.props.pictures.photos;
    const numPhotos = this.props.pictures.photos.length;
    for (let i = 0; i < numPhotos; i++) {
      if (photos[i].url === this.state.mainPhoto) {
        this.setState({
          mainPhoto: photos[(i + 1) % numPhotos].url
        })
        break;
      }
    }
  }

  selectPrevious() {
    const photos = this.props.pictures.photos;
    const numPhotos = this.props.pictures.photos.length;
    for (let i = 0; i < numPhotos; i++) {
      if (photos[i].url === this.state.mainPhoto) {
        this.setState({
          mainPhoto: photos[(((i - 1) % numPhotos) + numPhotos) % numPhotos].url
        })
        break;
      }
    }
  }

  handleKeyDown(event) {
    let key = event.key;
    if (key === "ArrowLeft") {
      this.selectPrevious();
    } else if (key === "ArrowRight") {
      this.selectNext();
    }
  }

  render() {
    return (
      <div className='popup'>
        <div className='popup_inner'>
          <div>
            <svg onClick={() => this.props.toggleCarousel()} className="exit" height="25" width="25">
              <line x1="0" y1="0" x2="25" y2="25" />
              <line x1="25" y1="0" x2="0" y2="25" />
            </svg>
          </div>
          <div className="center">
            <img onClick={this.selectNext.bind(this)} className="pic" src={this.state.mainPhoto}/>
            <div className="back" onClick={this.selectPrevious.bind(this)}>
              <svg className="backbutton" viewBox="0 0 18 18" role="presentation" aria-hidden="true" focusable="false">
                <path d="m13.7 16.29a1 1 0 1 1 -1.42 1.41l-8-8a1 1 0 0 1 0-1.41l8-8a1 1 0 1 1 1.42 1.41l-7.29 7.29z" fill-rule="evenodd"></path>
              </svg>
            </div>
            <div className="forward" onClick={this.selectNext.bind(this)}>
              <svg className="forwardbutton" viewBox="0 0 18 18" role="presentation" aria-hidden="true" focusable="false">
                <path d="m4.29 1.71a1 1 0 1 1 1.42-1.41l8 8a1 1 0 0 1 0 1.41l-8 8a1 1 0 1 1 -1.42-1.41l7.29-7.29z" fill-rule="evenodd"></path>
              </svg>
            </div>
          </div>
          <div className="slider">
            <Slider pictures={this.props.pictures} mainPhoto={this.state.mainPhoto} selectPhoto={this.selectPhoto.bind(this)}/>
          </div>
        </div>
      </div>
    )
  }
}

export default PhotoView
