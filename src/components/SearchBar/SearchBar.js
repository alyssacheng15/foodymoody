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
            sortBy: 'best_match'
        };

        this.handleTermChange = this.handleTermChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
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
                <div className="SearchBar-submit">
                    <a href="www.#.com" onClick={this.handleSearch}>Let's Go</a>
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