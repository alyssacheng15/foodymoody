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
            categoryCovid: 'fruit',
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
        this.Covid = this.Covid.bind(this);
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
        document.getElementById("paragraphCovid").style.display = "none";
        document.getElementById("paragraphHungover").style.display = "none";
        document.getElementById("paragraphPregnant").style.display = "none";    	
    }

    Sad(event) {
        this.props.searchYelp(this.state.categorySad);
        document.getElementById("paragraphHappy").style.display = "none";
        document.getElementById("paragraphSad").style.display = "block";
        document.getElementById("paragraphStressed").style.display = "none";
        document.getElementById("paragraphAngry").style.display = "none";
        document.getElementById("paragraphCold").style.display = "none";
        document.getElementById("paragraphCovid").style.display = "none";
        document.getElementById("paragraphHungover").style.display = "none";
        document.getElementById("paragraphPregnant").style.display = "none";   
    }

    Stressed(event) {
        this.props.searchYelp(this.state.categoryStressed);
        document.getElementById("paragraphHappy").style.display = "none";
        document.getElementById("paragraphSad").style.display = "none";
        document.getElementById("paragraphStressed").style.display = "block";
        document.getElementById("paragraphAngry").style.display = "none";
        document.getElementById("paragraphCold").style.display = "none";
        document.getElementById("paragraphCovid").style.display = "none";
        document.getElementById("paragraphHungover").style.display = "none";
        document.getElementById("paragraphPregnant").style.display = "none";
    }

    Angry(event) {
        this.props.searchYelp(this.state.categoryAngry);
        document.getElementById("paragraphHappy").style.display = "none";
        document.getElementById("paragraphSad").style.display = "none";
        document.getElementById("paragraphStressed").style.display = "none";
        document.getElementById("paragraphAngry").style.display = "block";
        document.getElementById("paragraphCold").style.display = "none";
        document.getElementById("paragraphCovid").style.display = "none";
        document.getElementById("paragraphHungover").style.display = "none";
        document.getElementById("paragraphPregnant").style.display = "none";
    }

    Cold(event) {
        this.props.searchYelp(this.state.categoryCold);
        document.getElementById("paragraphHappy").style.display = "none";
        document.getElementById("paragraphSad").style.display = "none";
        document.getElementById("paragraphStressed").style.display = "none";
        document.getElementById("paragraphAngry").style.display = "none";
        document.getElementById("paragraphCold").style.display = "block";
        document.getElementById("paragraphCovid").style.display = "none";
        document.getElementById("paragraphHungover").style.display = "none";
        document.getElementById("paragraphPregnant").style.display = "none";
    }

    Covid(event) {
        this.props.searchYelp(this.state.categoryCovid);
        document.getElementById("paragraphHappy").style.display = "none";
        document.getElementById("paragraphSad").style.display = "none";
        document.getElementById("paragraphStressed").style.display = "none";
        document.getElementById("paragraphAngry").style.display = "none";
        document.getElementById("paragraphCold").style.display = "none";
        document.getElementById("paragraphCovid").style.display = "block";
        document.getElementById("paragraphHungover").style.display = "none";
        document.getElementById("paragraphPregnant").style.display = "none";
    }

    Hungover(event) {
        this.props.searchYelp(this.state.categoryHungover);
        document.getElementById("paragraphHappy").style.display = "none";
        document.getElementById("paragraphSad").style.display = "none";
        document.getElementById("paragraphStressed").style.display = "none";
        document.getElementById("paragraphAngry").style.display = "none";
        document.getElementById("paragraphCold").style.display = "none";
        document.getElementById("paragraphCovid").style.display = "none";
        document.getElementById("paragraphHungover").style.display = "block";
        document.getElementById("paragraphPregnant").style.display = "none";
    }

    Pregnant(event) {
        this.props.searchYelp(this.state.categoryPregnant);
        document.getElementById("paragraphHappy").style.display = "none";
        document.getElementById("paragraphSad").style.display = "none";
        document.getElementById("paragraphStressed").style.display = "none";
        document.getElementById("paragraphAngry").style.display = "none";
        document.getElementById("paragraphCold").style.display = "none";
        document.getElementById("paragraphCovid").style.display = "none";
        document.getElementById("paragraphHungover").style.display = "none";
        document.getElementById("paragraphPregnant").style.display = "block";
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
                        <button onClick={this.Covid}>Covid</button>
                        <button onClick={this.Hungover}>Hungover</button>
                        <button onClick={this.Pregnant}>Pregnant</button>
                    </div>
                </div>
                

                <div className="Blurbs">
                    <div id="paragraphHappy">
                        <p>Because you are feeling happy, we recommend:</p>
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
                        Stressed description
                    </div>
                    <div id="paragraphAngry">
                        Angry description
                    </div>
                    <div id="paragraphCold">
                        Cold description
                    </div>
                    <div id="paragraphCovid">
                        Covid description
                    </div>
                    <div id="paragraphHungover">
                        Hungover description
                    </div>
                    <div id="paragraphPregnant">
                        Pregnant description
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