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
    }
    
    handleSearch(event) {
        this.props.searchYelp(this.state.term, this.state.sortBy);
        event.preventDefault();
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
            <div className="body">
            
                <div className="moodBoard">
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
                

                <div className="Blurbs" id="blurbs">
                    <div id="paragraphHappy">
                        <p>Because you are feeling happy, we recommend:
                            <br></br>
                        </p>
                        <p>* smoothies</p>
                        <p>* acai bowls</p>
                        <p>These have healthy sugars that will keep you happy.</p>
                        <p>Scroll down to discover a curated list of restaurants in Santa Clarita to sustain your happiness, or, type something in the search bar to discover more food!</p>
                    </div>
                    <div id="paragraphSad">
                        <p>Because you are feeling sad, we recommend:</p>
                        <p>* cakes</p>
                        <p>* cookies</p>
                        <p>* other desserts</p>
                        <p>Treat yourself when feeling down! Science has proven that intake of sugar will boost your serotonin.</p>
                        <p>Scroll down to discover a curated list of restaurants in Santa Clarita to boost your mood, or, type something in the search bar to discover more food!</p>
                    </div>
                    <div id="paragraphStressed">
                    <p>Because you are feeling stressed, we recommend:</p>
                        <p>* tea</p>
                        <p>* other drinks with antioxidants</p>
                        <p>Drinking tea lowers levels of the stress hormone cortisol! It is scientifically proven that half a cup of green tea a day will lower the risk of developing depression and dementia.</p>
                        <p>Scroll down to discover a curated list of restaurants in Santa Clarita to relieve your stress, or, type something in the search bar to discover more food!</p>
                    </div>
                    <div id="paragraphAngry">
                    <p>Because you are feeling angry, we recommend:</p>
                        <p>* salad</p>
                        <p>* other healthy greens</p>
                        <p>Intake of sugar is not beneficial to anger, so consuming healthy veggies and salad will help relieve the anger.</p>
                        <p>Scroll down to discover a curated list of restaurants in Santa Clarita to relieve your anger, or, type something in the search bar to discover more food!</p>
                    </div>
                    <div id="paragraphCold">
                    <p>Because you are feeling sick and cold, we recommend:</p>
                        <p>* soup</p>
                        <p>* warm food</p>
                        <p>Soup has nutriets that will aid to a speedy recovery, the heat helps with congestion and pain, and the sodium soothes sore throats.</p>
                        <p>Scroll down to discover a curated list of restaurants in Santa Clarita to help with your cold, or, type something in the search bar to discover more food!</p>
                    </div>
                    <div id="paragraphTired">
                    <p>Because you are feeling tired, we recommend:</p>
                        <p>* coffee</p>
                        <p>Coffee and caffeine in general, gives the body a temporary energy boost. It is important to regulate your caffeine intake.</p>
                        <p>Scroll down to discover a curated list of restaurants in Santa Clarita that will help to a speedy recovery, or, type something in the search bar to discover more food!</p>
                    </div>
                    <div id="paragraphHungover">
                    <p>Because you are feeling hungover, we recommend:</p>
                        <p>* a healthy breakfast</p>
                        <p>* a hearty brunch</p>
                        <p>Waking up hungover can be a great pain to your head and body. Eating a healthy and hearty breakfast or lunch will help you feel better faster!</p>
                        <p>Scroll down to discover a curated list of restaurants in Santa Clarita to help with your hangover, or, type something in the search bar to discover more food!</p>
                    </div>
                    <div id="paragraphPregnant">
                    <p>Because you are pregnant, we recommend:</p>
                        <p>* burgers</p>
                        <p>* fries</p>
                        <p>Being pregnant can be stressful and tiring, so eating some yummy burgers and fries wil relieve some cravings!</p>
                        <p>Scroll down to discover a curated list of restaurants in Santa Clarita to help you feel better during pregnancy, or, type something in the search bar to discover more food!</p>
                    </div>
                </div>


                <div className="SearchBar">
                    <div className="SearchBar-fields">
                        <input placeholder="Ramen, Mexican, etc" onChange={this.handleTermChange} />
                    </div>
                    <div className="button1">
                        <a href="www.#.com" onClick={this.handleSearch}>Let's Go</a>
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