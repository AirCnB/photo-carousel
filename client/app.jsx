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
    axios.get('/newPage')
    .then(res => this.setState({
      pictures: res.data[0]
    }))
  }

  render() {
    console.log(this.state.pictures)
    return (
      <div className="container">
        <div className="content">
          <img src={this.state.pictures.photos[0].url}/>
          <div><br /><br /><br /></div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
