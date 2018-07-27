import React from 'react';
import '../styles/slider.css';
// pictures, selectPhoto, mainPhoto
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
    if (this.props.mainPhoto.url !== prevProps.mainPhoto.url) {
      let xPixels;
      if (this.props.pictures.photos.length > 8) {
        for (let i = 0; i < this.props.pictures.photos.length; i++) {
          if (this.props.mainPhoto.url === this.props.pictures.photos[i].url && i < 4) {
            xPixels = 'translate(0px)'
            break;
          }
          if (this.props.mainPhoto.url === this.props.pictures.photos[i].url && i === 4) {
            xPixels = 'translate(-' + 55 + 'px)';
            break;
          }
          if (this.props.mainPhoto.url === this.props.pictures.photos[i].url && i > 4 && i < this.props.pictures.photos.length - 4) {
            xPixels = 'translate(-' + (55 + (110 * (i - 4))) + 'px)';
            break;
          }
          if (this.props.mainPhoto.url === this.props.pictures.photos[i].url && i === this.props.pictures.photos.length - 4) {
            xPixels = 'translate(-' + (110 * (i - 4)) + 'px)';
            break;
          }
          if (this.props.mainPhoto.url === this.props.pictures.photos[i].url && i === this.props.pictures.photos.length - 3) {
            xPixels = 'translate(-' + (110 * (i - 5)) + 'px)';
            break;
          }
          if (this.props.mainPhoto.url === this.props.pictures.photos[i].url && i === this.props.pictures.photos.length - 2) {
            xPixels = 'translate(-' + (110 * (i - 6)) + 'px)';
            break;
          }
          if (this.props.mainPhoto.url === this.props.pictures.photos[i].url && i === this.props.pictures.photos.length - 1) {
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
    if (this.state.showSlider) {
      return (
        <div className="outer">
          <div className="slideshow" style={{transform: 'translate(0px, 0px)', transition: 'transform .2s ease-out'}} >
            <div className="text">
              <span className="descriptions">{this.props.pictures.photos.indexOf(this.props.mainPhoto) + 1}/{this.props.pictures.photos.length}: {this.props.mainPhoto.desc}</span>
              <span className="toggle" onClick={this.toggleSliderView.bind(this)}>
                <span className="hidephoto" >Hide photo list </span>
                <span className="triangle">&#x25BC;</span>
              </span>
            </div>
            <div className="slideshow-inner">
              {this.props.pictures.photos.map(photo =>
                {return photo.url === this.props.mainPhoto.url ? (
                    <img style={{filter: 'brightness(100%)', transform: this.state.translate, transition: 'transform .3s ease-out'}} className="thumbnail" src={photo.url} onClick={(event) => this.props.selectPhoto(event.target)}/>
                ) : (
                    <img style={{transform: this.state.translate, transition: 'transform .3s ease-out'}} className="thumbnail" src={photo.url} onClick={(event) => this.props.selectPhoto(event.target)}/>
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
            <div className="slideshow" style={{transform: 'translate(0px, 67px)', transition: 'transform .2s ease-out'}} onMouseEnter={this.toggleSliderView.bind(this)}>
              <div className="text">
                <span className="descriptions">{this.props.pictures.photos.indexOf(this.props.mainPhoto) + 1}/{this.props.pictures.photos.length}: {this.props.mainPhoto.desc}</span>
                <span className="toggle" onClick={this.toggleSliderView.bind(this)}>
                  <span className="hidephoto" >Show photo list </span>
                  <span className="triangle">&#x25B2;</span>
                </span>
              </div>
              <div className="slideshow-inner">
                {this.props.pictures.photos.map(photo =>
                  {return photo.url === this.props.mainPhoto.url ? (
                      <img style={{filter: 'brightness(100%)', transform: this.state.translate, transition: 'transform .3s ease-out'}} className="thumbnail" src={photo.url} onClick={(event) => this.props.selectPhoto(event.target)}/>
                  ) : (
                      <img style={{transform: this.state.translate, transition: 'transform .3s ease-out'}} className="thumbnail" src={photo.url} onClick={(event) => this.props.selectPhoto(event.target)}/>
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
