import React from 'react';
import ReactDOM from 'react-dom';
import '../styles/slider.css';
//pictures, selectPhoto, mainPhoto
class Slider extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="slideshow">
        {this.props.pictures.photos.map(photo =>
          {return photo.url === this.props.mainPhoto ? (
            <img style={{filter: 'brightness(100%)'}} className="thumbnail" src={photo.url} onClick={(event) => this.props.selectPhoto(event.target)}/>
          ) : (
            <img className="thumbnail" src={photo.url} onClick={(event) => this.props.selectPhoto(event.target)}/>
          )}
        )}
      </div>
    )
  }
}

export default Slider;
