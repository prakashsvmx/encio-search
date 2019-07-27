import {createStore} from 'redux';
import makeReducer from './reducer';
import makeEnhancers from './middleware';

const makeStore = (initialState = {}) => createStore(makeReducer(), initialState, makeEnhancers());

export default makeStore;
