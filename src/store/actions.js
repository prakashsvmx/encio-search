import {getApiDataSuccess} from './actionCreators';
import UserService from 'service/UserService';

export const getApiDataAction = ({searchText, actionType}) => {
    // const newRequest = new Request(url);
    const getApiData = {
        callAPI:  () =>  UserService.getGitUsers({searchText}),
        httpLoadTrackingKey: 'apiDataLoading',
        isHttpAction: true,
        responseHandler: (dispatch, promise) => {
            promise.then(apiResponseData => {
                dispatch(getApiDataSuccess(apiResponseData, actionType));
            }).catch((error) => {
                dispatch(getApiDataSuccess({
                    success: false,
                    totalCount: 0,
                    userList: [],
                    isInComplete: false,
                    message: error.message || 'Service/Network Error.'
                }, actionType));
            })
            ;
        },
    };
    return getApiData;
};
