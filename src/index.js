import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux'
import './index.css';
import './App.css';
import * as Actions from './Actions.js'

import {createStore} from "redux";

export const store = createStore(rootReducer)

function rootReducer( state = [], action ) {

  let returnValue = null;
  if (typeof state === 'undefined') {
    return initialState;
  } else if (action.type === Actions.SERVER_AVAILABILITY_CHANGE) {
    //  returnValue = Object.assign({}, state, {serverState: action.availabilityState});
    returnValue = { ...state, serverState: action.availabilityState };
    return returnValue;
  } else if (action.type === Actions.CURRENT_USER_CHANGE ) {
    //  returnValue = Object.assign({}, state, {currentUser: action.currentUser});
    returnValue = { ...state, serverState: action.currentUser };
    return returnValue;
  }
  return state;
}

export const DISCONNECTED = "Inman Server Unavailabile";
export const UNKNOWN = "Inman Server status Unknown";

const initialState = {
  serverState: UNKNOWN
}


ReactDOM.render(
    <Provider store={store}>
    <App serverState={store.getState().serverState} />
    </Provider>,
  document.getElementById('root')
);

export default store;