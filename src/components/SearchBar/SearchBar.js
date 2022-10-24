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
            category1: 'cake',
            category2: 'tacos',
            category3: 'ramen',
            category4: 'burgers'
        };

        this.handleTermChange = this.handleTermChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.happy = this.happy.bind(this);
        this.sad = this.sad.bind(this);
        this.stressed = this.stressed.bind(this);
        this.angry = this.angry.bind(this);
    }

    happy(event) {
        this.props.searchYelp(this.state.category1);
    }

    sad(event) {
        this.props.searchYelp(this.state.category2);
    }

    stressed(event) {
        this.props.searchYelp(this.state.category3);
    }

    angry(event) {
        this.props.searchYelp(this.state.category4);
    }
    
    handleSearch(event) {
        this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy);
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
            <div className="SearchBar">
                
                <div className="SearchBar-fields">
                    <input placeholder="Search Food" onChange={this.handleTermChange} />
                </div>
                <div className="button1">
                    <a href="www.#.com" onClick={this.handleSearch}>Let's Go</a>
                </div>

                <div className="moodButtons">
                    <button onClick={this.happy}>happy</button>
                    <button onClick={this.sad}>sad</button>
                    <button onClick={this.stressed}>stressed</button>
                    <button onClick={this.angry}>angry</button>
                </div>

                <div className="test">
                    <ul>
                        <li>this is just a test:</li>
                        <li>happy = cake</li>
                        <li>sad = tacos</li>
                        <li>stressed = ramen</li>
                        <li>angry = burgers</li>
                    </ul>
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