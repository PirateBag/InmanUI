
import React, { Component } from 'react';
import * as Constants from './Constants.js'
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

export class CredentialsModal extends Component  {

    constructor(props) {
        super(props)

        this.state = {
            username : 'fred',
            password : 'dilban' };

        this.handleClickLogin  = this.handleClickLogin.bind( this );
        this.handleClickLogout = this.handleClickLogout.bind(this);
    };

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
        const actions = [
            <FlatButton
                label="Login"
                primary={true}
                onClick={this.handleClickLogin}
            />
        ];
      if ( this.props.credentialsState.token === Constants.NO_TOKEN ) {
          return (
              <Dialog
                  title="Please enter your credentials"
                  actions={actions}
                  modeal={false}
                  open={true}
                  onRequestClose={this.handleClose} >

                  <label htmlFor="username">User</label>
                  <input id='username' type="text" onChange={this.handleChangeUsername} defaultValue={this.state.username}/>

                  <label htmlFor="password">Password</label>
                  <input id='password' type="text" onChange={this.handleChangeItemId} defaultValue={this.state.password}/>
              </Dialog>
          );
      } else {
          return null;
      }
  }
}

CredentialsModal.propTypes = {
    updateCredentialsState : PropTypes.func
}



