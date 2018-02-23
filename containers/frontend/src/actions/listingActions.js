import * as types from './types';
import config from '../../config';

export function fetchListingSuccess(listing) {
    return {type: types.FETCH_LISTING_SUCCESS, listing};
}

export function fetchListingFailure(error) {
    return {type: types.FETCH_LISTING_FAILURE, error};
}

export function fetchListing() {
    return function(dispatch) {
        return fetch(`${config.API_URL}${config.PACKAGES_ENDPOINT}`)
            .then(r => r.json())
            .then(listing => {
                dispatch(fetchListingSuccess(listing));
            }).catch((error) => {
                dispatch(fetchListingFailure(error));
            });
    };
}
