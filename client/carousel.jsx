import React from 'react';
import ReactDOM from 'react-dom';
import './styles/carousel.css';
//pictures, toggleCarousel
class Carousel extends React.Component {

  constructor(props) {
    super(props)
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
            <img className="pic" src={this.props.pictures.photos[0].url}/>
            <div className="back">
              <svg className="backbutton" viewBox="0 0 18 18" role="presentation" aria-hidden="true" focusable="false">
                <path d="m13.7 16.29a1 1 0 1 1 -1.42 1.41l-8-8a1 1 0 0 1 0-1.41l8-8a1 1 0 1 1 1.42 1.41l-7.29 7.29z" fill-rule="evenodd"></path>
              </svg>
            </div>
            <div className="forward">
              <svg className="forwardbutton" viewBox="0 0 18 18" role="presentation" aria-hidden="true" focusable="false">
                <path d="m4.29 1.71a1 1 0 1 1 1.42-1.41l8 8a1 1 0 0 1 0 1.41l-8 8a1 1 0 1 1 -1.42-1.41l7.29-7.29z" fill-rule="evenodd"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Carousel

// <img src={this.props.pictures.photos[0].url} />

// <div className="picbox">
//   <img className="pic" src={this.props.pictures.photos[0].url}/>
// </div>
