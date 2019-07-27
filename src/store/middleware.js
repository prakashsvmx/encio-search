import {applyMiddleware, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {logger as reduxLogger} from 'redux-logger';
import httpRequestLoadingMiddleware from './httpRequestLoadingMiddleware';

let composeEnhancers = compose;
const enableDevTools = true;

if (typeof __DEV__ !== 'undefined' && typeof __TEST__ === 'undefined') {
    if (global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
        composeEnhancers = global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    }
}

export default function makeEnhancers() {
    let reduxExtension = f => f;
    if (enableDevTools
        && window.__REDUX_DEVTOOLS_EXTENSION__) {
        reduxExtension = window.__REDUX_DEVTOOLS_EXTENSION__();
    }
    return composeEnhancers(
        applyMiddleware(
            reduxLogger,
            httpRequestLoadingMiddleware,
            thunkMiddleware
        ),
        reduxExtension,
    );
}
