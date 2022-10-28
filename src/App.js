import React, { Component } from 'react';
import './App.css';
import SearchBar from './components/SearchBar/SearchBar';
import BusinessList from './components/BusinessList/BusinessList';
import Yelp from '../src/util/Yelp';


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
        <div className="logo"></div>
        <div className="drawing">
        </div>

        <div className="quizIntroduction">

          <div className="scrollDownText">
                <p>SCROLL DOWN</p>
          </div>
          <div className="quizIntroductionText1">
            <p>
              Hungry?<br></br>
              Want to support the grandma next door?<br></br>
              Let's eat.
            </p>
          </div>

          <div className="quizIntroductionText2">
            <p>
              Take this fun quiz to see which American small business you will be supporting next!
            </p>
          </div>

        </div>

        <SearchBar searchYelp={this.searchYelp}/>
        <BusinessList businesses={this.state.businesses} />
      </div>
    );
  }
}

export default App;
