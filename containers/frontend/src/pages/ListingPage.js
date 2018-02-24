import React from 'react';

import { connect } from 'react-redux';
import { fetchListing } from '../actions/listingActions';

import Listing from '../components/Listing';
import {listingPage, listingTitle, listingSubtitle, listingHeader} from '../styles/pages/listing.scss';

class ListingPage extends React.Component {

    componentDidMount() {
        this.props.dispatch(fetchListing());
    }

    render() {
        const {packages} = this.props;

        return <div className={listingPage}>
            <Listing packages={packages} />
        </div>;
    }
}


const mapStateToProps = (state) => {
    return {
        packages: state.listingReducer
    };
};

export default connect(mapStateToProps)(ListingPage);
