import React from 'react';
import ReactDOM from 'react-dom';
import '../styles/slider.css';
//pictures, selectPhoto
class Slider extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.pictures.photos.map(photo => <img className="thumbnail" src={photo.url} onClick={(event) => this.props.selectPhoto(event.target)}/>)}
      </div>
    )
  }
}

export default Slider;
