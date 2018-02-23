import React from 'react';
import R from 'ramda';

import ListingItem from './ListingItem';
import {listing} from '../styles/pages/listing.scss';

export default class Listing extends React.Component {
    render() {
        const {packages} = this.props;

        const alphabeticCompare = (a, b) => {
            if (a < b) {
                return 1;
            } else if (a > b) {
                return -1;
            }

            return 0;
        };

        const orderPackages = R.compose(R.reverse, R.sort(alphabeticCompare));

        const makeLinks = R.map(p =>
            <ListingItem key={p} name={p}/>
        );

        const packagesToLinks = R.compose(makeLinks, orderPackages);

        const links = packagesToLinks(packages);
        return <div className={listing}>
            {
                links
            }
        </div>;
    }
}
