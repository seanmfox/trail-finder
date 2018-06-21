import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Map from './Map';
import Menu from './Menu';


class App extends Component {

  state = {
    map: {}
  }

  createMap = (map) => {
    this.setState({ map })
  }

  render() {

    const { map } = this.state

    return (
      <div className="App">
        <Map 
        map = { map }
        createMap = {(map) => {this.createMap(map)}}
        />
        <Menu/>
      </div>
    );
  }
}

export default App;
