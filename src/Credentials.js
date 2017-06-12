import React from 'react';
import * as Constants from './Constants.js'

var CredentialPropertyPage = React.createClass( { 
  getInitialState : function() {
    return { username : '', password : '' };

  },
    getValidateCredentials( objectWithStatus ) {
        let url = Constants.INMAN_SERVER_IP + ':8080/verifyCredentials';
        let corps = JSON.stringify( objectWithStatus.getInitialState() );
        fetch( url, { method: 'post', body: corps, mode: 'cors' })
            .then(function (response) {
                objectWithStatus.setState( { validateCredentialsResponse : 'sending' } );
                return response
            })
            .then( function( response ) {
                return response.json();
            })
            .then( function(data)
            { objectWithStatus.setState( { validateCredentialsResponse : data.status } ); })
            .catch( function() { objectWithStatus.setState( { validateCredentialsResponse : 'error' } ); } );
    },


    handleChangeUsername: function(evt) {
    this.setState({ username: evt.target.value });
   },

  handleChangePassword: function(evt) {
    this.setState({ password: evt.target.value });
   },

  handleClickLogin: function(evt) {
        this.getValidateCredentials( this );
		this.props.eventHandler( "CredentialPropertyPage", this );
   },



  render : function() {

  	if ( !this.props.visible ) {
        return (
            <h1>you can't see me</h1>
        )
    }
     return (
        <div >
            <h1>Please enter your credentials:</h1>
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
                    <td><button type="button" onClick={this.handleClickLogin} >Login</button></td>
                </tr>
                </tbody>
            </table>
	    </div>
    	);
  	}
} );
export default CredentialPropertyPage;

