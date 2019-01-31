import * as Constants from './Constants.js'
import { store } from './index.js'
import { serverAvailabilityStateChange, currentUserStateChange } from './Actions.js'

export class CredentialsValidator {

    constructor( url ) {
        this.url = url;
    }

  exec ( {username, password, stateChangeCallback, responseCallback} ) {
    let fullUrl = Constants.INMAN_SERVER_IP + ':8080/verifyCredentials';
    let body = { username : username, password : password };
    let header = new Headers( { 'Content-Type' : 'application/json'});

    fetch( fullUrl, { method: 'post', body: JSON.stringify( body ), mode: 'cors', headers : header })
      .then(function (response) {
        if ( stateChangeCallback != null ) {
          stateChangeCallback( "waiting");
        }
        return response;
      })
      .then( function( response ) {
        if ( stateChangeCallback != null ) {
          stateChangeCallback("pending");
        }
        return response.json();
      })
      .then( function(data) {
        if ( stateChangeCallback != null ) {
          stateChangeCallback("success");
        }
        responseCallback( data );

        let stateChange = serverAvailabilityStateChange( "Successful Login");
        store.dispatch( stateChange);
        stateChange = serverAvailabilityStateChange( "Failed Login");
        store.dispatch( stateChange);
        stateChange= currentUserStateChange( "Bags");
        store.dispatch( stateChange );
        stateChange = serverAvailabilityStateChange( "WTF Login");
        store.dispatch( stateChange);
      });
  }
}

export default CredentialsValidator;
