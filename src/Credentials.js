import React from 'react';
import * as Constants from './Constants.js'

export var CredentialPropertyPage = React.createClass( {
  getInitialState : function() {
    return { username : 'fred', password : 'dilban', serverState : '' }
  },
    getValidateCredentials( objectWithStatus ) {
        let url = Constants.INMAN_SERVER_IP + ':8080/verifyCredentials';
        let corps = { username : objectWithStatus.state.username,
                      password : objectWithStatus.state.password };
        let header = new Headers( { 'Content-Type' : 'application/json'});
        fetch( url, { method: 'post', body: JSON.stringify( corps ), mode: 'cors', headers : header })
            .then(function (response) {
                objectWithStatus.setState( { serverState : "waiting"})
                return response;
            })
            .then( function( response ) {
                objectWithStatus.setState( { serverState : "pending"})
                return response.json();
            })
            .then( function(data) {
                objectWithStatus.setState( { serverState : "success"})
                objectWithStatus.props.updateCredentialsState( data );
            });
        /*
            .catch( function() {
                objectWithStatus.props.updateCredentialsState(
                {
                'message' : 'error',
                'token' : Constants.NO_TOKEN,
                'status' : "communication error" } );
                objectWithStatus.setState( { serverState : "error"})} );
                */
    },


    handleChangeUsername: function(evt) {
    this.setState({ username: evt.target.value });
   },

  handleChangePassword: function(evt) {
    this.setState({ password: evt.target.value });
   },

  handleClickLogin: function(evt) {
        this.getValidateCredentials( this );
   },
   handleClickLogout: function(evt) {
    this.props.updateCredentialsState(  Constants.NoCredentials );
    },

    render : function() {
      if ( this.props.credentialsState.token === Constants.NO_TOKEN ) {
          return (
              <div className="propertyForm" >

                  <label htmlFor="username">User</label>
                  <input id='username' type="text" onChange={this.handleChangeUsername} defaultValue={this.state.username}/>

                  <label htmlFor="password">Password</label>
                  <input id='password' type="text" onChange={this.handleChangeItemId} defaultValue={this.state.password}/>
                  <button type="button" onClick={this.handleClickLogin}>Login</button>
              </div>
          );
      }
      return null;
  }

} );


/**
 * **********************************************************************
 */
export var CredentialStatus = React.createClass( {

    handleClickLogout: function(evt) {
        this.props.updateCredentialsState(  Constants.NoCredentials );
    },

    render : function() {
        if ( this.props.credentialsState.token === Constants.NO_TOKEN ) {
            return (
                <div >
                    You are not logged in.
                </div>
            );
        } else {
            return (
                <div>
                    <table>
                        <tbody>
                        <tr>
                            <td>{this.props.credentialsState.message}</td>
                            <td>
                                <button type="button" onClick={this.handleClickLogout}>logout</button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            )
        }
    }

} );

