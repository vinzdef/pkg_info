import React from 'react';
import {Link} from 'react-router-dom';

import {listingItem, listingItemLabel} from '../styles/pages/listing.scss';

export default class Listing extends React.Component {
    render() {
        const {name} = this.props;

        return <Link className={listingItem} to={`/package/${name}`}>
            <span className={listingItemLabel}>{name}</span>
        </Link>;
    }
}
