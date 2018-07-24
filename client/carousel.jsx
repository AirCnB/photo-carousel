import React from 'react';
import ReactDOM from 'react-dom';
import './styles/carousel.css';
//pictures
class Carousel extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className='popup'>
        <div className='popup_inner'>
          <div>
          <svg className="exit" height="25" width="25">
            <line x1="0" y1="0" x2="25" y2="25" />
            <line x1="25" y1="0" x2="0" y2="25" />
          </svg>
          </div>
        </div>
      </div>
    )
  }
}

export default Carousel

// <img src={this.props.pictures.photos[0].url} />
