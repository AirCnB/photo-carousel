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
      if (photos.length > 8) {
        for (let i = 0; i < photos.length; i += 1) {
          if (mainPhoto === photos[i].url && i < 4) {
            xPixels = 'translate(0px)'
          }
          if (mainPhoto === photos[i].url && i === 4) {
            xPixels = 'translate(-' + 55 + 'px)';
          }
          if (mainPhoto === photos[i].url && i > 4 && i < photos.length - 4) {
            xPixels = 'translate(-' + (55 + (110 * (i - 4))) + 'px)';
          }
          if (mainPhoto === photos[i].url && i === photos.length - 4) {
            xPixels = 'translate(-' + (110 * (i - 4)) + 'px)';
          }
          if (mainPhoto === photos[i].url && i === photos.length - 3) {
            xPixels = 'translate(-' + (110 * (i - 5)) + 'px)';
          }
          if (mainPhoto === photos[i].url && i === photos.length - 2) {
            xPixels = 'translate(-' + (110 * (i - 6)) + 'px)';
          }
          if (mainPhoto === photos[i].url && i === photos.length - 1) {
            xPixels = 'translate(-' + (110 * (i - 7)) + 'px)';
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
    return (
      <div className="outer">
        <div className="slideshow" style={ this.state.showSlider ? { transform: 'translate(0px, 0px)', transition: 'transform .2s ease-out' } : { transform: 'translate(0px, 67px)', transition: 'transform .2s ease-out' }} >
          <div className="text">
            <span className="descriptions">{ photos.indexOf(mainPhoto) + 1}/{ photos.length }: { mainPhoto.desc }</span>
            <span className="toggle" onClick={ this.toggleSliderView.bind(this) }>
              { this.state.showSlider ? (
                <span>
                  <span className="hidephoto" >Hide photo list </span>
                  <span className="triangle">&#x25BC;</span>
                </span>
              ) : (
                <span>
                  <span className="hidephoto" >Show photo list </span>
                  <span className="triangle">&#x25B2;</span>
                </span>
              )}
            </span>
          </div>
          <div className="slideshow-inner" onMouseEnter={ !this.state.showSlider ? this.toggleSliderView.bind(this) : null } >
            { photos.map((photo, key) =>
              { return photo.url === mainPhoto.url ? (
                  <img style={{ filter: 'brightness(100%)', transform: this.state.translate, transition: 'transform .3s ease-out' }} className="thumbnail" src={ photo.url } onClick={ (event) => this.props.selectPhoto(event.target)} key={key} />
              ) : (
                  <img style={{ transform: this.state.translate, transition: 'transform .3s ease-out' }} className="thumbnail" src={ photo.url } onClick={ (event) => this.props.selectPhoto(event.target)} key={key} />
              )}
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default Slider;
