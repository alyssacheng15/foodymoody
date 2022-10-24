import React, { Component } from 'react';
import './App.css';
import SearchBar from './components/SearchBar/SearchBar';
import BusinessList from './components/BusinessList/BusinessList';
import Yelp from '../src/util/Yelp';

// test comment


class App extends Component {
  constructor (props){
    super(props);
    this.state = {
      businesses: [],
    };

    this.searchYelp = this.searchYelp.bind(this);
  }
  searchYelp(term, location, sortBy) {
    Yelp.searchYelp(term, location, sortBy).then((businesses) => {
      this.setState({ businesses: businesses });
    });
  }
  render () {
    return (
      <div className="App">
        <h1>SCV Yelp</h1>
        <h2>Food in Santa Clarita</h2>
        <SearchBar searchYelp={this.searchYelp}/>
        <BusinessList businesses={this.state.businesses} />
      </div>
    );
  }
}

export default App;
