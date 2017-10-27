import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import './App.css';
import {CredentialsModal} from './CredentialsModal.js'
import {LoginLogoff} from './LoginLogoff.js'
import * as Constants from './Constants.js'
import SearchAndDisplayBsTable from "./SearchAndDisplayBsTable";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {

    constructor(props) {
		super(props)


		this.state = { serverStatus : "unknown",
                       validateCredentialsResponse : {
                            token : Constants.NO_TOKEN,
                            message : 'Please login' } };

		this.getInmanStatus(this);
		this.updateCredentialsState = this.updateCredentialsState.bind(this);
        this.uiEvent = this.uiEvent.bind( this );
       }


    getInmanStatus( objectWithStatus ) {
        let url = Constants.INMAN_SERVER_IP + ':8080/status';
        fetch( url, Constants.fetchParameters )
            .then(function (response) {
                objectWithStatus.setState( { serverStatus : 'sending' } );
                return response
            })
            .then( function( response ) {
                return response.json();
            })
            .then( function(data)
                { objectWithStatus.setState( { serverStatus : data.status } ); })
            .catch( function() { objectWithStatus.setState( { serverStatus : 'error' } ); } );
    }

    uiEvent( sender, object ) {
        if ( sender === "Status" ) {
		    this.getInmanStatus(this);
        }
        this.render();
	}

	updateCredentialsState( newCredentials ) {
        this.setState( {validateCredentialsResponse: newCredentials } );
    }

    render() {

    var dateOfRender = new Date().toTimeString();

    return (
        <MuiThemeProvider>
      <div >
          <AppBar title="Inman"
                  iconElementRight={<LoginLogoff
                      clickLogout={this.updateCredentialsState}
                      credentialsState={this.state.validateCredentialsResponse.message}
                      serverStatus={this.state.serverStatus}/> } >
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
