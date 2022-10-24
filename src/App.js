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
        <h1>SCV Yelp</h1>
        
        <div class="quizIntroduction">
          <div class="quizIntroductionText">
          <p>
            Hungry?<br></br>
            Want to support the grandma next door?<br></br>
            Let's eat.
          </p>
          </div>

          <div class="quizIntroductionText">
            <p>
              Take this fun and quiz to see which American small business you will be supporting next!
            </p>
          </div>
        </div>

        <div class="moodBoard">
          <h3>What mood are you feeling right now?</h3>
        </div>

        <footer>
        </footer>
        <SearchBar searchYelp={this.searchYelp}/>
        <BusinessList businesses={this.state.businesses} />
      </div>
    );
  }
}

export default App;
