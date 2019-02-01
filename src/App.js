import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import './App.css';
import {CredentialsModal} from './CredentialsModal.js'
import {LoginLogoff} from './LoginLogoff.js'
import * as Constants from './Constants.js'
import SearchAndDisplayBsTable from "./SearchAndDisplayBsTable";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { store } from './index.js'
import { InmanStatus} from "./InmanStatus";

class App extends Component {

    constructor(props) {
		super(props)

		this.state = { serverStatus : "unknown",
                   validateCredentialsResponse : {
                        token : Constants.NO_TOKEN,
                        message : 'Please login' } };

		this.updateCredentialsState = this.updateCredentialsState.bind(this);
    InmanStatus();
    }



	updateCredentialsState( newCredentials ) {
        this.setState( {validateCredentialsResponse: newCredentials } );
    }

  render() {
    let dateOfRender = new Date().toTimeString();
    let theStore = store;
    let user = typeof theStore.getState().currentUser  === "undefined" ?
        "No current luser" :
        "The current user is " + theStore.getState().currentUser;

    return (
        <MuiThemeProvider>
      <div >
          <AppBar title="Inman"
            iconElementRight={<LoginLogoff
              clickLogout={this.updateCredentialsState}
              credentialsState={this.state.validateCredentialsResponse.message}
              serverStatus={this.state.serverStatus}/> } >
            {user}
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
