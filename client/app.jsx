import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pictures: {
        id: 1,
        photos: [
          {url: ""},
        ]
      }
    }
  }

  componentDidMount() {
    let id = window.location.pathname.slice(8);
    id = parseInt(id.substring(0, id.length))
    axios.get(`/photos/${id}`)
    .then(res => this.setState({
      pictures: res.data[0]
    }))
  }

  render() {
    console.log(this.state.pictures)
    return (
      <div>
      <div className="container" style={{backgroundImage: `url(${this.state.pictures.photos[0].url})`}}>
        <div className="content">
          <div><br /><br /><br /></div>
        </div>
        <div>
          <button>Hello</button>
        </div>
      </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
