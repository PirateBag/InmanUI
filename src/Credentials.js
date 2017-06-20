import React from 'react';
import * as Constants from './Constants.js'

var CredentialPropertyPage = React.createClass( {
  getInitialState : function() {
    return { username : '', password : '',
        validateCredentialsResponse : {
            'token' : Constants.NO_TOKEN,
            'message' : 'Please login',
            'status' : 'communication error'} };

  },
    getValidateCredentials( objectWithStatus ) {
        let url = Constants.INMAN_SERVER_IP + ':8080/verifyCredentials';
        let corps = { username : objectWithStatus.state.username,
                      password : objectWithStatus.state.password };
        let header = new Headers( { 'Content-Type' : 'application/json'});
        fetch( url, { method: 'post', body: JSON.stringify( corps ), mode: 'cors', headers : header })
            .then(function (response) {
                objectWithStatus.setState( { validateCredentialsResponse : 'sending' } );
                return response
            })
            .then( function( response ) {
                return response.json();
            })
            .then( function(data) {
                objectWithStatus.setState( { validateCredentialsResponse : data } );
                objectWithStatus.props.updateCredentialsState( data );
            })
            .catch( function() { objectWithStatus.setState( { validateCredentialsResponse :
                {
                'message' : 'error',
                'token' : Constants.NO_TOKEN,
                'status' : "communication error" } } ) } );
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
    this.state = this.getInitialState();
    this.props.updateCredentialsState(  this.state.validateCredentialsResponse );
    },




    render : function() {

      if ( this.state.validateCredentialsResponse.token === Constants.NO_TOKEN ) {
          return (
              <div >
                  <h2>{this.state.validateCredentialsResponse.message}</h2>
                  <table>
                      <tbody>
                      <tr>
                          <td>User</td>
                          <td><input type="text" onChange={this.handleChangeUsername}/></td>
                      </tr>
                      <tr>
                          <td>Password</td>
                          <td><input type="password" onChange={this.handleChangePassword}/></td>
                      </tr>
                      <tr>
                          <td>
                              <button type="button" onClick={this.handleClickLogin}>Login</button>
                          </td>
                      </tr>
                      </tbody>
                  </table>
              </div>
          );
      } else {
          return (
                <div  className='leftLayout'>
                  <table>
                      <tbody>
                      <tr>
                          <td>User {this.state.validateCredentialsResponse.message}</td>
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
export default CredentialPropertyPage;

