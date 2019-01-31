import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import './App.css';
import {CredentialsModal} from './CredentialsModal.js'
import {LoginLogoff} from './LoginLogoff.js'
import * as Constants from './Constants.js'
import SearchAndDisplayBsTable from "./SearchAndDisplayBsTable";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { store } from './index.js'

class App extends Component {

    constructor(props) {
		super(props)

		this.state = { serverStatus : "unknown",
                   validateCredentialsResponse : {
                        token : Constants.NO_TOKEN,
                        message : 'Please login' } };

		this.getInmanStatus();
		this.updateCredentialsState = this.updateCredentialsState.bind(this);
    }


    getInmanStatus( ) {
        let url = Constants.INMAN_SERVER_IP + ':8080/status';
        fetch( url, Constants.fetchParameters )
            .then(function (response) {
                this.setState( { serverStatus : 'sending' } );
                return response
            })
            .then( function( response ) {
                return response.json();
            })
            .then( function(data)
                { this.setState( { serverStatus : data.status } ); })
            .catch( function() { this.setState( { serverStatus : 'Inman Server Unavailable' } ); } );
    }

	updateCredentialsState( newCredentials ) {
        this.setState( {validateCredentialsResponse: newCredentials } );
    }

    render() {

    let dateOfRender = new Date().toTimeString();
    let theStore = store;
    let user = typeof theStore.getState().currentUser  == "undefined" ? "No current luser" :
    theStore.getState().currentUser;

    return (
        <MuiThemeProvider>
      <div >
          <AppBar title="Inman"
            iconElementRight={<LoginLogoff
              clickLogout={this.updateCredentialsState}
              credentialsState={this.state.validateCredentialsResponse.message}
              serverStatus={this.state.serverStatus}/> } >
            This is a test {theStore.getState().currentUser }
          </AppBar>
          <div className="mainForm">
            <CredentialsModal
              updateCredentialsState={this.updateCredentialsState}
              credentialsState={this.state.validateCredentialsResponse}/>
            <br/>
            <SearchAndDisplayBsTable credentialsState={this.state.validateCredentialsResponse} />
            <h6 className="rightLayout">Last Update: {dateOfRender}</h6>
      </div>
    </div>
        </MuiThemeProvider>
    );
  }
}

export default App;
