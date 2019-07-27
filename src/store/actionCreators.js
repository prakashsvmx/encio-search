import {getApiDataAction} from './actions';

export const getApiDataSuccess = (data, actionType) => {
    return ({
        data,
        type: actionType,
    });
};

export const getApiData = ({url, searchText, callback, actionType}) => dispatch => {
    dispatch(getApiDataAction({url, searchText, actionType, callback}));
};
