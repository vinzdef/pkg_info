import * as types from './types';
import config from '../../config';

export function fetchDetailSuccess(detail) {
    return {type: types.FETCH_DETAIL_SUCCESS, detail};
}

export function fetchDetailFailure(error) {
    return {type: types.FETCH_DETAIL_FAILURE, error};
}

export function fetchDetail(packageName) {
    return function(dispatch) {
        return fetch(`${config.API_URL}${config.PACKAGES_ENDPOINT}${packageName}`)
            .then(r => r.json())
            .then(detail => {
                dispatch(fetchDetailSuccess(detail));
            }).catch((error) => {
                dispatch(fetchDetailFailure(error));
            });
    };
}
