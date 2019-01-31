
import React, { Component } from 'react';
import * as Constants from './Constants.js'
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import CredentialsValidator from './CredentialsValidator.js'

export class CredentialsModal extends Component  {

    constructor(props) {
        super(props)

        this.state = {
            username : 'fred',
            password : 'dilban' };

        this.handleChange  = this.handleChange.bind( this );
        this.handleClickLogin  = this.handleClickLogin.bind( this );
        this.credentialsValidator = new CredentialsValidator( Constants.INMAN_SERVER_IP  );
    };

    handleChange( evt ) {
        var  o = {  };
        o[evt.target.id] = evt.target.value;
        this.setState( o );
    }

    handleClickLogin(evt) {
        this.credentialsValidator.exec(
          { username: this.state.username,
            password: this.state.password,
            responseCallback : this.props.updateCredentialsState } );
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
                  title={this.props.credentialsState.message}
                  actions={actions}
                  modeal={false}
                  open={true}
                  onRequestClose={this.handleClose} >

                  <label htmlFor="username">User</label>
                  <input id='username' type="text" onChange={this.handleChange} defaultValue={this.state.username}/>

                  <label htmlFor="password">Password</label>
                  <input id='password' type="text" onChange={this.handleChange} defaultValue={this.state.password}/>
              </Dialog>
          );
      } else {
          return null;
      }
  }
}

CredentialsModal.propTypes = {
    updateCredentialsState : PropTypes.func,
    credentialsState : PropTypes.object
}



