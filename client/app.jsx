import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pictures: {
        id: 1,
        photos: [
          {url: "https://s3-us-west-1.amazonaws.com/aircnbphotos/AirCnB+Photos/photo0.jpg", desc: "Enjoy the leather couches" },
          {url: "https://s3-us-west-1.amazonaws.com/aircnbphotos/AirCnB+Photos/photo1.jpg", desc: ""},
          {url: "https://s3-us-west-1.amazonaws.com/aircnbphotos/AirCnB+Photos/photo2.jpg", desc: ""},
          {url: "https://s3-us-west-1.amazonaws.com/aircnbphotos/AirCnB+Photos/photo3.jpg", desc: "Amazing view of the ocean"},
          {url: "https://s3-us-west-1.amazonaws.com/aircnbphotos/AirCnB+Photos/photo3.jpg", desc: ""}
        ]
      }
    }
  }

  render() {
    return (
      <div className="container">
        <div className="content">
          <div><br /><br /><br /></div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
