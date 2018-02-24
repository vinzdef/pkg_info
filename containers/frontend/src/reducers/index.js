import { combineReducers } from 'redux';
import * as types from '../actions/types';

const listingReducer = (state = {}, action) => {
    switch (action.type) {
        case types.FETCH_LISTING_SUCCESS:
            return action.listing;
        default:
            return state;
    }
};

function detailReducer(state = null, action) {
    switch (action.type) {
        case types.FETCH_DETAIL_SUCCESS:
            return action.detail;
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    listingReducer,
    detailReducer
});

export default rootReducer;
