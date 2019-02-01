import * as Constants from "./Constants";
import {store} from "./index";
import {serverAvailabilityStateChange} from "./Actions";

export const INMAN_SERVER_UNAVAILABLE = "Inman Server: unavailable.";
export const INMAN_SERVER_OK =          "Inman Server: healthy";
export const INMAN_SERVER_HEALTH_CHECKFAILURE = "Inman Server: health check failure";

export function InmanStatus( ) {
  let url = Constants.INMAN_SERVER_IP + ':8080/status';

  let statusAction = serverAvailabilityStateChange( INMAN_SERVER_UNAVAILABLE );
  store.dispatch( statusAction );

  fetch( url, Constants.fetchParameters )
    .then(function (response) {
      return response
    })
    .then( function( response ) {
      return response.json();
    })
    .then( function(data) {
      statusAction = serverAvailabilityStateChange(INMAN_SERVER_OK);
      store.dispatch(statusAction);
    })
    .catch( function() {
      statusAction = serverAvailabilityStateChange(INMAN_SERVER_HEALTH_CHECKFAILURE);
      store.dispatch(statusAction);
    } );
}

