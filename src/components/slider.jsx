import React from 'react';
import '../styles/slider.css';

class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSlider: true,
      translate: 'translate(0px)',
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        showSlider: false
      })
    }, 2400)
  }

  componentDidUpdate(prevProps) {
    const mainPhoto = this.props.mainPhoto.url;
    const photos = this.props.content.photos;
    if (mainPhoto !== prevProps.mainPhoto.url) {
      let xPixels;
      if (this.props.content.photos.length > 8) {
        for (let i = 0; i < photos.length; i += 1) {
          if (mainPhoto === photos[i].url && i < 4) {
            xPixels = 'translate(0px)'
            break;
          }
          if (mainPhoto === photos[i].url && i === 4) {
            xPixels = 'translate(-' + 55 + 'px)';
            break;
          }
          if (mainPhoto === photos[i].url && i > 4 && i < photos.length - 4) {
            xPixels = 'translate(-' + (55 + (110 * (i - 4))) + 'px)';
            break;
          }
          if (mainPhoto === photos[i].url && i === photos.length - 4) {
            xPixels = 'translate(-' + (110 * (i - 4)) + 'px)';
            break;
          }
          if (mainPhoto === photos[i].url && i === photos.length - 3) {
            xPixels = 'translate(-' + (110 * (i - 5)) + 'px)';
            break;
          }
          if (mainPhoto === photos[i].url && i === photos.length - 2) {
            xPixels = 'translate(-' + (110 * (i - 6)) + 'px)';
            break;
          }
          if (mainPhoto === photos[i].url && i === photos.length - 1) {
            xPixels = 'translate(-' + (110 * (i - 7)) + 'px)';
            break;
          }
        }
      }
      this.setState({
        translate: xPixels
      })
    }
  }

  toggleSliderView() {
    this.setState({
      showSlider: !this.state.showSlider
    })
  }

  render() {
    const mainPhoto = this.props.mainPhoto;
    const photos = this.props.content.photos;
    if (this.state.showSlider) {
      return (
        <div className="outer">
          <div className="slideshow" style={{ transform: 'translate(0px, 0px)', transition: 'transform .2s ease-out' }} >
            <div className="text">
              <span className="descriptions">{ photos.indexOf(mainPhoto) + 1}/{ photos.length }: { mainPhoto.desc }</span>
              <span className="toggle" onClick={ this.toggleSliderView.bind(this) }>
                <span className="hidephoto" >Hide photo list </span>
                <span className="triangle">&#x25BC;</span>
              </span>
            </div>
            <div className="slideshow-inner">
              { photos.map(photo =>
                { return photo.url === mainPhoto.url ? (
                    <img style={{ filter: 'brightness(100%)', transform: this.state.translate, transition: 'transform .3s ease-out' }} className="thumbnail" src={ photo.url } onClick={ (event) => this.props.selectPhoto(event.target) }/>
                ) : (
                    <img style={{ transform: this.state.translate, transition: 'transform .3s ease-out' }} className="thumbnail" src={ photo.url } onClick={ (event) => this.props.selectPhoto(event.target) }/>
                )}
              )}
            </div>
          </div>
        </div>
      )
    }

    if (!this.state.showSlider) {
      return (
          <div className="outer">
            <div className="slideshow" style={{ transform: 'translate(0px, 67px)', transition: 'transform .2s ease-out' }} >
              <div className="text">
                <span className="descriptions">{ photos.indexOf(mainPhoto) + 1}/{ photos.length }: { mainPhoto.desc }</span>
                <span className="toggle" onClick={ this.toggleSliderView.bind(this) }>
                  <span className="hidephoto" >Show photo list </span>
                  <span className="triangle">&#x25B2;</span>
                </span>
              </div>
              <div className="slideshow-inner" onMouseEnter={ this.toggleSliderView.bind(this) }>
                { this.props.content.photos.map(photo =>
                  { return photo.url === mainPhoto.url ? (
                      <img style={{ filter: 'brightness(100%)', transform: this.state.translate, transition: 'transform .3s ease-out' }} className="thumbnail" src={ photo.url } onClick={ (event) => this.props.selectPhoto(event.target) }/>
                  ) : (
                      <img style={{ transform: this.state.translate, transition: 'transform .3s ease-out' }} className="thumbnail" src={ photo.url } onClick={ (event) => this.props.selectPhoto(event.target) }/>
                  )}
                )}
              </div>
            </div>
          </div>
      )
    }
  }
}

export default Slider;
