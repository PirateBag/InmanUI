import React, { Component } from 'react';
import './App.css';
import Item from './Item';
import {CredentialStatus,CredentialPropertyPage} from './Credentials.js'
import Button from './Button.js'
import * as Constants from './Constants.js'


var ShoppingList = React.createClass( {
  render: function() {
      if ( this.props.credentialsState.token === Constants.NO_TOKEN ) {
          return null;
      }
    return (

      <div className="shopping-list">

        <h1>Shopping List for {this.props.name}</h1>
        <ul>
          <li>WhatsApp</li>
          <li>Oculus</li>
          <li>Twitter</li>
        </ul>
      </div>
    );
  }
})



var SingleItem = React.createClass( {
    render: function() {

        if ( this.props.credentialsState.token === Constants.NO_TOKEN )
            return null;

        return (
            <div className="shopping-list">
                <h1>Shopping List for {this.props.item.id}</h1>
                <ul>
                    <li>{this.props.item.summary}</li>
                    <li>{this.props.item.quantity}</li>
                </ul>
            </div>
        );
    }
})




class App extends Component {

    constructor(props) {
		super(props)


		this.state = { serverStatus : "unknown",
                       validateCredentialsResponse : {
                            token : Constants.NO_TOKEN,
                            message : 'please login' } };

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

	updateCredentialsState( validateCredentialsResponse ) {
        this.setState( { "validateCredentialsResponse" : validateCredentialsResponse } );
    }

    render() {
	var itemToShow = new Item( "abc", "W-0001", 2 );
    var dateOfRender = new Date().toTimeString();


    return (
      <div className="App">
        <div className="App-header">
			<div className='leftLayout'>
                <img className='App-logo' src={require('./logo.png')} alt="logoPoop" />
			</div>
		    <div className='rightLayout'>
                <h2>Welcome to Inman</h2>
                <h6>Inman Server Status: {this.state.serverStatus}</h6>
                <h6><CredentialStatus
                    updateCredentialsState={this.updateCredentialsState}
                    credentialsState={this.state.validateCredentialsResponse}/></h6>
            </div>
        </div>
         <CredentialPropertyPage
            updateCredentialsState={this.updateCredentialsState}
            credentialsState={this.state.validateCredentialsResponse}/>
         <ShoppingList name="Mark" credentialsState={this.state.validateCredentialsResponse} />
         <SingleItem item={itemToShow} credentialsState={this.state.validateCredentialsResponse} />
         <Button label="Status" eventHandler={this.uiEvent} visible={true} eventName="Status" ></Button>
          <h6 className="rightLayout">Last Update: {dateOfRender}</h6>
      </div>
    );
  }
}

export default App;
