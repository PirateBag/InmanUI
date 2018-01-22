
import React, { Component } from 'react';
import * as Constants from './Constants.js'
import PropTypes from 'prop-types';

export class CredentialPropertyPage extends Component  {

    constructor(props) {
        super(props)

        this.state = {
            username : 'fred', password : 'dilban', serverState : '' };

        this.handleClickLogin  = this.handleClickLogin.bind( this );
        this.handleClickLogout = this.handleClickLogout.bind(this);
    }

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
    }

    handleChangeUsername(evt) {
    this.setState({ username: evt.target.value });
   }

    handleChangePassword(evt) {
    this.setState({ password: evt.target.value });
   }

    handleClickLogin(evt) {
        this.getValidateCredentials( this );
   }
   handleClickLogout(evt) {
    this.props.updateCredentialsState(  Constants.NoCredentials );
    }

    render() {
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
}

CredentialPropertyPage.propTypes = {
    credentialsState: PropTypes.object

}



