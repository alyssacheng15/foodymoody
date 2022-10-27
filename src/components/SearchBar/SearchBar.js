import React from 'react';
import './SearchBar.css';

const sortByOptions = {
    'Best Match': 'best_match',
    'Highest Rated': 'rating',
    'Most Reviewed': 'review_count'
};

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            term: '',
            location: '',
            sortBy: 'best_match',
            categoryHappy: 'smoothie',
            categorySad: 'cake',
            categoryStressed: 'tea',
            categoryAngry: 'salad',
            categoryCold: 'soup',
            categoryTired: 'coffee',
            categoryHungover: 'breakfast',
            categoryPregnant: 'burger',
        };

        this.handleTermChange = this.handleTermChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.Happy = this.Happy.bind(this);
        this.Sad = this.Sad.bind(this);
        this.Stressed = this.Stressed.bind(this);
        this.Angry = this.Angry.bind(this);
        this.Cold = this.Cold.bind(this);
        this.Tired = this.Tired.bind(this);
        this.Hungover = this.Hungover.bind(this);
        this.Pregnant = this.Pregnant.bind(this);
        this.Go = this.Go.bind(this);
        this.Search = this.Search.bind(this);
    }

    Go(event) {
        var scrollie = document.getElementById("spacey1");
        scrollie.scrollIntoView({
            behavior: 'smooth'
        })
    }

    Search(event) {
        var go = document.getElementById("spacey2");
        go.scrollIntoView({
            behavior: 'smooth'
        })
    }

    Happy(event) {
        this.props.searchYelp(this.state.categoryHappy);
        document.getElementById("paragraphHappy").style.display = "block";
        document.getElementById("paragraphSad").style.display = "none";
        document.getElementById("paragraphStressed").style.display = "none";
        document.getElementById("paragraphAngry").style.display = "none";
        document.getElementById("paragraphCold").style.display = "none";
        document.getElementById("paragraphTired").style.display = "none";
        document.getElementById("paragraphHungover").style.display = "none";
        document.getElementById("paragraphPregnant").style.display = "none";
        document.getElementById("blurbs").style.display = "block";
        document.getElementById("restaurantsD").style.display = "block"; 
        var elem = document.getElementById("blurbs");
        elem.scrollIntoView({
            behavior: 'smooth'
        });   	
    }

    Sad(event) {
        this.props.searchYelp(this.state.categorySad);
        document.getElementById("paragraphHappy").style.display = "none";
        document.getElementById("paragraphSad").style.display = "block";
        document.getElementById("paragraphStressed").style.display = "none";
        document.getElementById("paragraphAngry").style.display = "none";
        document.getElementById("paragraphCold").style.display = "none";
        document.getElementById("paragraphTired").style.display = "none";
        document.getElementById("paragraphHungover").style.display = "none";
        document.getElementById("blurbs").style.display = "block";
        document.getElementById("restaurantsD").style.display = "block";
        var elem = document.getElementById("blurbs");
        elem.scrollIntoView({
            behavior: 'smooth'
        });      
    }

    Stressed(event) {
        this.props.searchYelp(this.state.categoryStressed);
        document.getElementById("paragraphHappy").style.display = "none";
        document.getElementById("paragraphSad").style.display = "none";
        document.getElementById("paragraphStressed").style.display = "block";
        document.getElementById("paragraphAngry").style.display = "none";
        document.getElementById("paragraphCold").style.display = "none";
        document.getElementById("paragraphTired").style.display = "none";
        document.getElementById("paragraphHungover").style.display = "none";
        document.getElementById("blurbs").style.display = "block";
        document.getElementById("restaurantsD").style.display = "block";
        var elem = document.getElementById("blurbs");
        elem.scrollIntoView({
            behavior: 'smooth'
        });   
    }

    Angry(event) {
        this.props.searchYelp(this.state.categoryAngry);
        document.getElementById("paragraphHappy").style.display = "none";
        document.getElementById("paragraphSad").style.display = "none";
        document.getElementById("paragraphStressed").style.display = "none";
        document.getElementById("paragraphAngry").style.display = "block";
        document.getElementById("paragraphCold").style.display = "none";
        document.getElementById("paragraphTired").style.display = "none";
        document.getElementById("paragraphHungover").style.display = "none";
        document.getElementById("blurbs").style.display = "block";
        document.getElementById("restaurantsD").style.display = "block";
        var elem = document.getElementById("blurbs");
        elem.scrollIntoView({
            behavior: 'smooth'
        });   
    }

    Cold(event) {
        this.props.searchYelp(this.state.categoryCold);
        document.getElementById("paragraphHappy").style.display = "none";
        document.getElementById("paragraphSad").style.display = "none";
        document.getElementById("paragraphStressed").style.display = "none";
        document.getElementById("paragraphAngry").style.display = "none";
        document.getElementById("paragraphCold").style.display = "block";
        document.getElementById("paragraphTired").style.display = "none";
        document.getElementById("paragraphHungover").style.display = "none";
        document.getElementById("paragraphPregnant").style.display = "none";
        document.getElementById("blurbs").style.display = "block";
        document.getElementById("restaurantsD").style.display = "block";
        var elem = document.getElementById("blurbs");
        elem.scrollIntoView({
            behavior: 'smooth'
        });   
    }

    Tired(event) {
        this.props.searchYelp(this.state.categoryTired);
        document.getElementById("paragraphHappy").style.display = "none";
        document.getElementById("paragraphSad").style.display = "none";
        document.getElementById("paragraphStressed").style.display = "none";
        document.getElementById("paragraphAngry").style.display = "none";
        document.getElementById("paragraphCold").style.display = "none";
        document.getElementById("paragraphTired").style.display = "block";
        document.getElementById("paragraphHungover").style.display = "none";
        document.getElementById("blurbs").style.display = "block";
        document.getElementById("restaurantsD").style.display = "block";
        var elem = document.getElementById("blurbs");
        elem.scrollIntoView({
            behavior: 'smooth'
        });   
    }

    Hungover(event) {
        this.props.searchYelp(this.state.categoryHungover);
        document.getElementById("paragraphHappy").style.display = "none";
        document.getElementById("paragraphSad").style.display = "none";
        document.getElementById("paragraphStressed").style.display = "none";
        document.getElementById("paragraphAngry").style.display = "none";
        document.getElementById("paragraphCold").style.display = "none";
        document.getElementById("paragraphTired").style.display = "none";
        document.getElementById("paragraphHungover").style.display = "block";
        document.getElementById("paragraphPregnant").style.display = "none";
        document.getElementById("blurbs").style.display = "block";
        document.getElementById("restaurantsD").style.display = "block";
        var elem = document.getElementById("blurbs");
        elem.scrollIntoView({
            behavior: 'smooth'
        });   
    }

    Pregnant(event) {
        this.props.searchYelp(this.state.categoryPregnant);
        document.getElementById("paragraphHappy").style.display = "none";
        document.getElementById("paragraphSad").style.display = "none";
        document.getElementById("paragraphStressed").style.display = "none";
        document.getElementById("paragraphAngry").style.display = "none";
        document.getElementById("paragraphCold").style.display = "none";
        document.getElementById("paragraphTired").style.display = "none";
        document.getElementById("paragraphHungover").style.display = "none";
        document.getElementById("paragraphPregnant").style.display = "block";
        document.getElementById("blurbs").style.display = "block";
        document.getElementById("restaurantsD").style.display = "block";
        var elem = document.getElementById("blurbs");
        elem.scrollIntoView({
            behavior: 'smooth'
        });   
    }
    
    handleSearch(event) {
        this.props.searchYelp(this.state.term, this.state.sortBy);
        event.preventDefault();
        document.getElementById("restaurantsD").style.display = "block";
        var elem = document.getElementById("restaurantsD");
        elem.scrollIntoView({
            behavior: 'smooth'
        });   
        document.getElementById("blurbs").style.display = "none";
    }

    getSortByClass(sortByOption) {
        if (this.state.sortBy === sortByOption) {
            return 'active';
        }
    }

    handleSortByChange(sortByOption) {
        this.setState({ sortBy: sortByOption });
    }

    handleTermChange(event) {
        this.setState({ term: event.target.value });
    }

    handleLocationChange(event) {
        this.setState({ location: event.target.value });
    }

    renderSortByOptions() {
        return Object.keys(sortByOptions).map(sortByOption => {
            let sortByOptionValue = sortByOptions[sortByOption];
            return <li key={sortByOptionValue} onClick={this.handleSortByChange.bind(this, sortByOptionValue)} className={this.getSortByClass(sortByOption)}>{sortByOption}</li>
        });
    }

    render() {
        return (
            <div className="body1">
                <div className="goWrapper">
                    <button className="go" onClick={this.Go}><span>START</span></button>
                </div>

                <div className="actualBody">
                    <div id="spacey1"></div>
                <div id="moodBoard" className="moodBoard">
                    <div className="moodBoardQuestion">
                    <h3>What mood are you feeling right now?</h3>
                    </div>
                    <div className="moodButtons">
                        <button onClick={this.Happy}>Happy</button>
                        <button onClick={this.Sad}>Sad</button>
                        <button onClick={this.Stressed}>Stressed</button>
                        <button onClick={this.Angry}>Angry</button>
                        <button onClick={this.Cold}>Cold</button>
                        <button onClick={this.Tired}>Tired</button>
                        <button onClick={this.Hungover}>Hungover</button>
                        <button onClick={this.Pregnant}>Pregnant</button>
                    </div>
                </div>
            
                <div className='spacey2' id='spacey2'></div>

                <div className="SearchBar" id="searchBar">
                    <div className="SearchBarText">
                        <h4>Type below to search for restaurants manually</h4>
                        <p>
                            Search for restaurants depending on what you are craving! Type in a cuisine, or type of food!
                        </p>
                    </div>
                    <div className="SearchBar-fields">
                        <input placeholder="Ramen, Mexican, etc" onChange={this.handleTermChange} />
                    </div>
                    <div className="button1">
                        <a href="www.#.com" onClick={this.handleSearch}>SEARCH</a>
                    </div>
                </div>

                <div className="Blurbs" id="blurbs">
                    <div id="paragraphHappy">
                        <h4>Because you are feeling happy, we recommend:</h4>
                        <p>* smoothies</p>
                        <div id="separation">
                            <p>* acai bowls</p>
                        </div>
                        <p>These have healthy sugars that will keep you happy.</p>
                        <h5>Scroll down to discover a curated list of restaurants in Santa Clarita to sustain your happiness, or, type something in the search bar to discover more food!</h5>
                    </div>
                    <div id="paragraphSad">
                        <h4>Because you are feeling sad, we recommend:</h4>
                        <p>* cakes</p>
                        <p>* cookies</p>
                        <div id="separation">
                            <p>* other deserts</p>
                        </div>
                        <p>Treat yourself when feeling down! Science has proven that intake of sugar will boost your serotonin.</p>
                        <h5>Scroll down to discover a curated list of restaurants in Santa Clarita to boost your mood!</h5>
                        <h5>Or, type something in the search bar to discover more food!</h5>
                    </div>
                    <div id="paragraphStressed">
                    <h4>Because you are feeling stressed, we recommend:</h4>
                        <p>* tea</p>
                        <div id="separation">
                            <p>* other drinks with antioxidants</p>
                        </div>                        
                        <p>Drinking tea lowers levels of the stress hormone cortisol! It is scientifically proven that half a cup of green tea a day will lower the risk of developing depression and dementia.</p>
                        <h5>Scroll down to discover a curated list of restaurants in Santa Clarita to relieve your stress!</h5>
                    </div>
                    <div id="paragraphAngry">
                    <h4>Because you are feeling angry, we recommend:</h4>
                        <p>* salad</p>
                        <div id="separation">
                            <p>* other healthy greens</p>
                        </div>                        
                        <p>Intake of sugar is not beneficial to anger, so consuming healthy veggies and salad will help relieve the anger.</p>
                        <h5>Scroll down to discover a curated list of restaurants in Santa Clarita to feel better!</h5>
                    </div>
                    <div id="paragraphCold">
                    <h4>Because you are feeling sick and cold, we recommend:</h4>
                        <p>* soup</p>
                        <div id="separation">
                            <p>* warm food</p>
                        </div>
                        <p>Soup has nutriets that will aid to a speedy recovery, the heat helps with congestion and pain, and the sodium soothes sore throats.</p>
                        <h5>Scroll down to discover a curated list of restaurants in Santa Clarita to feel better!</h5>
                    </div>
                    <div id="paragraphTired">
                    <h4>Because you are feeling tired, we recommend:</h4>
                        <div id="separation">
                            <p>* coffee</p>
                        </div>
                        <p>Coffee and caffeine in general, gives the body a temporary energy boost. It is important to regulate your caffeine intake.</p>
                        <h5>Scroll down to discover a curated list of restaurants in Santa Clarita for more energy!</h5>
                    </div>
                    <div id="paragraphHungover">
                    <h4>Because you are feeling hungover, we recommend:</h4>
                        <p>* a healthy breakfast</p>
                        <div id="separation">
                            <p>* a hearty brunch</p>
                        </div>
                        <p>Waking up hungover can be a great pain to your head and body. Eating a healthy and hearty breakfast or lunch will help you feel better faster!</p>
                        <h5>Scroll down to discover a curated list of restaurants in Santa Clarita to sustain your happiness, or, type something in the search bar to discover more food!</h5>
                    </div>
                    <div id="paragraphPregnant">
                    <h4>Because you are pregnant, we recommend:</h4>
                        <p>* burgers</p>
                        <div id="separation">
                            <p>* fries</p>
                        </div>
                        <p>Being pregnant can be stressful and tiring, so eating some yummy burgers and fries wil relieve some cravings!</p>
                        <h5>Scroll down to discover a curated list of restaurants in Santa Clarita to sustain your happiness, or, type something in the search bar to discover more food!</h5>
                    </div>
                </div>

                <div id="restaurantsD" className="restaurantsDescription">
                    <h4>We think you would like these restaurants!</h4>
                    <h5>Feel free to click on them to go to their Yelp page.</h5>
                    <h5>Click here if you would like to search for more restaurants manually!</h5>

                    <div className="manSearchWrapper">
                        <button className="manSearch" onClick={this.Search}><span>Manual Search</span></button>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}

export default SearchBar;

//put line 61
//<input placeholder="Where?" onChange={this.handleLocationChange}/>

//put line 58
//<div className="SearchBar-sort-options">
                    //<ul>
                        //{this.renderSortByOptions()}
                    //</ul>
                //</div>