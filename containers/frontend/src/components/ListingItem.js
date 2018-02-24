import React from 'react';
import {Link} from 'react-router-dom';

import {listingItem, listingItemLabel} from '../styles/pages/listing.scss';
import {packageLink} from '../styles/buttons/packageLink.scss';

export default class Listing extends React.Component {
    render() {
        const {name} = this.props;

        return <div className={listingItem}>
            <Link className={packageLink} to={`/package/${name}`}>{name}</Link>
        </div>;
    }
}
