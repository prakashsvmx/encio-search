import {isArray, isEmpty, isPlainObject} from 'lodash';

export const deleteObjectProperty = (sourceObj, keysToDelete) => {
    const isObj = isPlainObject(sourceObj);
    let result = true;
    if (isObj) {
        let keys = keysToDelete;
        const isKeyToDeleteArray = isArray(keysToDelete);
        if (!isKeyToDeleteArray) {
            keys = [keysToDelete];
        }
        for (let i = keys.length - 1; i >= 0; i -= 1) {
            const key = keys[i];
            const isDeleted = Reflect.deleteProperty(sourceObj, key);
            if (!isDeleted) {
                result = false;
                /* eslint no-console: ["error", { allow: ["error"] }] */
                console.error(`The key ${key} was unable to delete`);
            }
        }
    } else {
        result = false;
        throw new Error({
            message: 'deleteObjectProperty was called on non-object/frozen-object',
        });
    }
    return result;
};
export const HTTP_REQUEST_LOADING = 'HTTP_REQUEST_LOADING';
export const HTTP_REQUEST_FAILED = 'HTTP_REQUEST_FAILED';
export const HTTP_REQUEST_LOADED = 'HTTP_REQUEST_LOADED';

export const httpRequestLoadingActionType = {type: HTTP_REQUEST_LOADING};
export const httpRequestFailedActionType = {type: HTTP_REQUEST_FAILED};
export const httpRequestLoadedActionType = {type: HTTP_REQUEST_LOADED};
const intitialState = {};

export function httpRequestInProgress(dispatch, httpRequestTrackingKey) {
    dispatch({
        ...httpRequestLoadingActionType,
        httpLoadTrackingKey: httpRequestTrackingKey,
    });
}

export function httpRequestFailure(dispatch, httpRequestTrackingKey) {
    dispatch({
        ...httpRequestFailedActionType,
        httpLoadTrackingKey: httpRequestTrackingKey,
    });
}

export function httpRequestSuccess(dispatch, httpRequestTrackingKey) {
    dispatch({
        ...httpRequestLoadedActionType,
        httpLoadTrackingKey: httpRequestTrackingKey,
    });
}

export function getHttpResponseDataHandler(dispatch, serviceResponse, httpRequestTrackingKey) {
    return new Promise((resolve, reject) => {
        if (isEmpty(serviceResponse)) {
            httpRequestFailure(dispatch, httpRequestTrackingKey);
            reject(serviceResponse);
        } else {
            resolve(serviceResponse);
        }
    });
}

export default function httpRequestLoadingMiddleware({dispatch}) {
    return next => action => {
        const {
            isHttpAction,
            callAPI,
            httpLoadTrackingKey,
            // used to pass remaining props from dispatch action along
        } = action;
        // if we don't have the `isHttpAction` prop
        // we're not supposed to intercept it with this middleware... move it along
        if (!isHttpAction) {
            return next(action);
        }

        if (typeof callAPI !== 'function') {
            throw new Error('Expected callAPI to be a function.');
        }

        // dispatch the request action (`REQ_ITEM`)
        httpRequestInProgress(dispatch, httpLoadTrackingKey);

        const api = callAPI();

        return api.then((serviceResponse) => {
            const returnPromise = action.responseHandler(dispatch, api);
            if (returnPromise) {
                returnPromise.then(() => {
                    httpRequestSuccess(dispatch, httpLoadTrackingKey);
                }).catch(() => {
                    httpRequestFailure(dispatch, httpLoadTrackingKey);
                });
            } else {
                httpRequestSuccess(dispatch, httpLoadTrackingKey);
            }
        });
    };
}

export function httpRequestLoadingReducer(state = intitialState, action) {
    if (action.httpLoadTrackingKey) {
        const {httpLoadTrackingKey, type} = action;
        switch (type) {
            case HTTP_REQUEST_LOADING:
                return {...state, [httpLoadTrackingKey]: true};
            case HTTP_REQUEST_FAILED:
            case HTTP_REQUEST_LOADED: {
                const clonedState = {...state};
                deleteObjectProperty(clonedState, httpLoadTrackingKey);
                return clonedState;
            }
            default:
                return state;
        }
    }
    return state;
}
