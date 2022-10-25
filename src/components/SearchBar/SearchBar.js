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
    }

    Sad(event) {
        this.props.searchYelp(this.state.categorySad);
    }

    Stressed(event) {
        this.props.searchYelp(this.state.categoryStressed);
    }

    Angry(event) {
        this.props.searchYelp(this.state.categoryAngry);
    }

    Cold(event) {
        this.props.searchYelp(this.state.categoryCold);
    }

    Covid(event) {
        this.props.searchYelp(this.state.categoryCovid);
    }

    Hungover(event) {
        this.props.searchYelp(this.state.categoryHungover);
    }

    Pregnant(event) {
        this.props.searchYelp(this.state.categoryPregnant);
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
                

                <div className="SearchBar">
                    <div className="SearchBar-fields">
                        <input placeholder="Search Food" onChange={this.handleTermChange} />
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