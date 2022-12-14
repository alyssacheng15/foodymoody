import React from 'react';
import './catalog.css';
import Business from '../restaurants/restaurants';

class BusinessList extends React.Component {
    render() {
        return (
            <div className="BusinessList">
                {
                    this.props.businesses.map(function(business) {
                        return <Business key={business.id} business={business}/>;
                    })
                }
            </div>
        );
    }
}

export default BusinessList;