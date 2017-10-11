import * as Constants from './Constants.js'

export class ServerPoster {

    constructor( url, typeOfRequest ) {
        this.url = url;
        this.type = typeOfRequest
        this.fullUrl = url + Constants.IPPORT + '/' + typeOfRequest;
    }

    /**
     * Send a request to the server via get.
     *
     * @parameters:  a string representation of the of the parameters in get format.  See "queryString" library.
     * @stateChangeCallback( string new state )
     *   Callback invoked whenever the state of the request changes.
     * @responseCallback( object responseCallback )
     *   Callback invoked when the response object arrives.
     *
     */
    go( parameters, stateChangeCallback, responseCallback ) {

        let fullUrlPlusParams = this.fullUrl + parameters;

        let header = new Headers( { 'Content-Type' : 'application/json'} );
        fetch( fullUrlPlusParams, { method: 'get', mode: 'cors', headers : header })
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
            });
    }
}

export default ServerPoster;
