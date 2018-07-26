import React from 'react';
import ReactDOM from 'react-dom';
import '../styles/slider.css';
//pictures, selectPhoto, mainPhoto
class Slider extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      translate: 'translate(0px)'
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.mainPhoto !== prevProps.mainPhoto) {
      for (let i = 0; i < this.props.pictures.photos.length; i++) {
        if (this.props.mainPhoto === this.props.pictures.photos[i].url && i < 4) {
          this.setState({
            translate: 'translate(0px)'
          })
          break;
        }
        if (this.props.mainPhoto === this.props.pictures.photos[i].url && i === 4) {
          let xPixels = 'translate(-' + 55 + 'px)';
          this.setState({
            translate: xPixels
          })
          break;
        }
        if (this.props.mainPhoto === this.props.pictures.photos[i].url && i > 4 && i < this.props.pictures.photos.length - 4) {
          let xPixels = 'translate(-' + (55 + (110 * (i - 4))) + 'px)';
          this.setState({
            translate: xPixels
          })
          break;
        }
        if (this.props.mainPhoto === this.props.pictures.photos[i].url && i === this.props.pictures.photos.length - 4) {
          let xPixels = 'translate(-' + (110 * (i - 4)) + 'px)';
          this.setState({
            translate: xPixels
          })
          break;
        }
        if (this.props.mainPhoto === this.props.pictures.photos[i].url && i === this.props.pictures.photos.length - 3) {
          let xPixels = 'translate(-' + (110 * (i - 5)) + 'px)';
          this.setState({
            translate: xPixels
          })
          break;
        }
        if (this.props.mainPhoto === this.props.pictures.photos[i].url && i === this.props.pictures.photos.length - 2) {
          let xPixels = 'translate(-' + (110 * (i - 6)) + 'px)';
          this.setState({
            translate: xPixels
          })
          break;
        }
        if (this.props.mainPhoto === this.props.pictures.photos[i].url && i === this.props.pictures.photos.length - 1) {
          let xPixels = 'translate(-' + (110 * (i - 7)) + 'px)';
          this.setState({
            translate: xPixels
          })
          break;
        }
        // if (this.props.mainPhoto === this.props.pictures.photos[i].url && i === this.props.pictures.photos.length - 3) {
        //   let xPixels = 'translate(-' + (110 * (i - (i + 1))) + 'px)';
        //   this.setState({
        //     translate: xPixels
        //   })
        //   break;
        // }
      }
    }
  }

  render() {
    return (
      <div className="slideshow">
        {this.props.pictures.photos.map((photo, key) =>
          {return photo.url === this.props.mainPhoto ? (
            <span>
              <img style={{filter: 'brightness(100%)', transform: this.state.translate, transition: 'transform .3s ease-out'}} key={key} className="thumbnail" src={photo.url} onClick={(event) => this.props.selectPhoto(event.target)}/>
            </span>
          ) : (
            <span>
              <img style={{transform: this.state.translate, transition: 'transform .3s ease-out'}} className="thumbnail" src={photo.url} key={key} onClick={(event) => this.props.selectPhoto(event.target)}/>
            </span>
          )}
        )}
      </div>
    )
  }
}

export default Slider;
