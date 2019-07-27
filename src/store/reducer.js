import {combineReducers} from 'redux';
import apiDataReducer from './apiDataReducer';
import {httpRequestLoadingReducer} from './httpRequestLoadingMiddleware';


export default function makeReducer() {
    return combineReducers({
        gitHubUsers: apiDataReducer,
        httpRequestStatus: httpRequestLoadingReducer,
    });
}
