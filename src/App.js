import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import './App.css';
import {CredentialsModal} from './CredentialsModal.js'
import {LoginLogoff} from './LoginLogoff.js'
import * as Constants from './Constants.js'
import SearchAndDisplayBsTable from "./SearchAndDisplayBsTable";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { InmanStatus} from "./InmanStatus";
import PropTypes from "prop-types";

class App extends Component {

    constructor(props) {
		super(props)

		this.state = { serverState : props.serverState,
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

    return (
        <MuiThemeProvider>
      <div >
          <AppBar title="Inman"
            iconElementRight={<LoginLogoff
              clickLogout={this.updateCredentialsState}
              credentialsState={this.state.validateCredentialsResponse.message}
              serverStatus={this.state.serverStatus}/> } >
            Server State goes here:  {this.state.serverStatus}
          </AppBar>
          <div className="mainForm">
            <CredentialsModal
              updateCredentialsState={this.updateCredentialsState}
              credentialsState={this.state.validateCredentialsResponse}
              serverStatus={this.state.serverStatus}/>
            <br/>
            <SearchAndDisplayBsTable credentialsState={this.state.validateCredentialsResponse} />
            <h6 className="rightLayout">Last Update: {dateOfRender}</h6>
      </div>
    </div>
        </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  serverState: PropTypes.string.isRequired
}


export default App;
