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

            <div className={listingHeader}>
                <h1 className={listingTitle}>PKG_INFO</h1>
                <h3 className={listingSubtitle}>A list of all packages installed on this very system</h3>
            </div>

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
