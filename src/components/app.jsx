import React from 'react';
import axios from 'axios';
import PhotoView from './photoview.jsx';
import Share from './share.jsx';
import '../styles/app.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.toggleCarousel = this.toggleCarousel.bind(this);
    this.detachPhotoView = this.detachPhotoView.bind(this);
    this.toggleShareView = this.toggleShareView.bind(this);
    this.state = {
      showPhotoView: false,
      showShareView: false,
      showSaveView: false,
      content: {
        id: 1,
        photos: [
          { url: '' },
        ],
        saved: false,
      },
    };
  }

  componentDidMount() {
    let id = window.location.pathname.slice(8);
    id = parseInt(id.substring(0, id.length));
    axios.get(`/photos/${id}`)
      .then(res => this.setState({
        content: res.data[0],
      }));
  }

  toggleCarousel() {
    this.setState(prevState => ({ showPhotoView: !prevState.showPhotoView }));
  }

  toggleShareView() {
    this.setState(prevState => ({ showShareView: !prevState.showShareView }));
  }

  toggleSaveView() {
    const { content } = this.state;
    this.saved = !this.saved;
    this.setState(prevState => ({ showSaveView: !prevState.showSaveView }));
    axios.post('/saved', `${content.id}, ${!content.saved}`)
      .then(() => {
        const copy = Object.assign({}, content);
        copy.saved = !copy.saved;
        this.setState({
          content: copy,
        });
      });
  }

  detachPhotoView(button) {
    if (button === 'share') {
      this.toggleShareView();
    } else if (button === 'save') {
      this.toggleSaveView();
    }
    setTimeout(() => {
      this.setState({
        showPhotoView: false,
      });
    });
  }

  render() {
    const {
      content,
      content: { saved, photos },
      showPhotoView,
      showShareView,
    } = this.state;
    return (
      <div>
        <div className="container" role="presentation" onClick={this.toggleCarousel} style={{ backgroundImage: `url(${photos[0].url})` }}>
          <div className="content" />
          <div>
            <button type="button" className="viewphotos">
              View Photos
            </button>
            <button type="button" className="share" style={saved ? { right: '140px' } : { right: '131px' }} onClick={() => this.detachPhotoView('share')}>
              <div>
                <svg className="largescreen" viewBox="0 0 24 24">
                  <path d="m22.19 8.5h-3.14a.81.81 0 0 0 -.81.8c0 .44.36.8.81.8h2.33v12.31h-18.76v-12.31h3.11c.45 0 .81-.36.81-.8a.81.81 0 0 0 -.81-.8h-3.92a.81.81 0 0 0 -.81.8v13.91c0 .44.36.8.81.8h20.38c.45 0 .81-.36.81-.8v-13.91a.81.81 0 0 0 -.81-.8zm-14.11-3.82c.19 0 .36-.06.51-.18l2.01-1.58.6-.47v13.79c0 .44.36.8.81.8s.81-.36.81-.8v-13.79l.59.47 2.01 1.58a.8.8 0 0 0 .5.18.81.81 0 0 0 .63-.3.79.79 0 0 0 -.13-1.12l-3.92-3.09a.42.42 0 0 0 -.07-.04l-.07-.03-.01-.01-.05-.03a.76.76 0 0 0 -.3-.06.81.81 0 0 0 -.3.06l-.01.01-.06.04-.07.03a.42.42 0 0 0 -.07.04l-3.92 3.09a.79.79 0 0 0 -.13 1.12c.16.19.39.3.63.3z" fillRule="evenodd" />
                </svg>
                <span className="sharetext">
                  Share
                </span>
              </div>
            </button>
            <button type="button" className="save" onClick={() => this.detachPhotoView('save')}>
              <div>
                {saved ? (
                  <span>
                    <svg className="largescreen" viewBox="0 0 32 32" fill="#FF5A5F" fillOpacity="1" stroke="#FF5A5F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m23.99 2.75c-.3 0-.6.02-.9.05-1.14.13-2.29.51-3.41 1.14-1.23.68-2.41 1.62-3.69 2.94-1.28-1.32-2.46-2.25-3.69-2.94-1.12-.62-2.27-1-3.41-1.14a7.96 7.96 0 0 0 -.9-.05c-1.88 0-7.26 1.54-7.26 8.38 0 7.86 12.24 16.33 14.69 17.95a1 1 0 0 0 1.11 0c2.45-1.62 14.69-10.09 14.69-17.95 0-6.84-5.37-8.38-7.26-8.38" />
                    </svg>
                    <span className="savetext">
                      Saved
                    </span>
                  </span>
                ) : (
                  <span>
                    <svg className="largescreen" viewBox="0 0 32 32" fill="#484848" fillOpacity="0" stroke="#484848" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m23.99 2.75c-.3 0-.6.02-.9.05-1.14.13-2.29.51-3.41 1.14-1.23.68-2.41 1.62-3.69 2.94-1.28-1.32-2.46-2.25-3.69-2.94-1.12-.62-2.27-1-3.41-1.14a7.96 7.96 0 0 0 -.9-.05c-1.88 0-7.26 1.54-7.26 8.38 0 7.86 12.24 16.33 14.69 17.95a1 1 0 0 0 1.11 0c2.45-1.62 14.69-10.09 14.69-17.95 0-6.84-5.37-8.38-7.26-8.38" />
                    </svg>
                    <span className="savetext">
                      Save
                    </span>
                  </span>
                )}
              </div>
            </button>
            <svg className="smallscreensave" viewBox="0 0 32 32" style={saved ? { fill: '#FF5A5F', fillOpacity: '.7' } : { fill: '#FFFFF', fillOpacity: '0' }} stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" onClick={() => this.detachPhotoView('save')}>
              <path d="m23.99 2.75c-.3 0-.6.02-.9.05-1.14.13-2.29.51-3.41 1.14-1.23.68-2.41 1.62-3.69 2.94-1.28-1.32-2.46-2.25-3.69-2.94-1.12-.62-2.27-1-3.41-1.14a7.96 7.96 0 0 0 -.9-.05c-1.88 0-7.26 1.54-7.26 8.38 0 7.86 12.24 16.33 14.69 17.95a1 1 0 0 0 1.11 0c2.45-1.62 14.69-10.09 14.69-17.95 0-6.84-5.37-8.38-7.26-8.38" />
            </svg>
            <svg className="smallscreenshare" viewBox="0 0 24 24" fill="#ffffff" onClick={() => this.detachPhotoView('share')}>
              <path d="m22.19 8.5h-3.14a.81.81 0 0 0 -.81.8c0 .44.36.8.81.8h2.33v12.31h-18.76v-12.31h3.11c.45 0 .81-.36.81-.8a.81.81 0 0 0 -.81-.8h-3.92a.81.81 0 0 0 -.81.8v13.91c0 .44.36.8.81.8h20.38c.45 0 .81-.36.81-.8v-13.91a.81.81 0 0 0 -.81-.8zm-14.11-3.82c.19 0 .36-.06.51-.18l2.01-1.58.6-.47v13.79c0 .44.36.8.81.8s.81-.36.81-.8v-13.79l.59.47 2.01 1.58a.8.8 0 0 0 .5.18.81.81 0 0 0 .63-.3.79.79 0 0 0 -.13-1.12l-3.92-3.09a.42.42 0 0 0 -.07-.04l-.07-.03-.01-.01-.05-.03a.76.76 0 0 0 -.3-.06.81.81 0 0 0 -.3.06l-.01.01-.06.04-.07.03a.42.42 0 0 0 -.07.04l-3.92 3.09a.79.79 0 0 0 -.13 1.12c.16.19.39.3.63.3z" fillRule="evenodd" />
            </svg>
          </div>
        </div>
        {showPhotoView
          && <PhotoView content={content} toggleCarousel={this.toggleCarousel} />
        }
        {showShareView
          && <Share toggleShareView={this.toggleShareView} />
        }
      </div>
    );
  }
}

export default App;
