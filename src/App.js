import React, { Component } from 'react';
import './App.css';
import Item from './Item';
import CredentialPropertyPage from './Credentials.js'
import Button from './Button.js'

/*
var CheckCreds = function () {
    var abc = fetch( 'http://10.1.20.128:8080/status', { mode: 'no-cors' })
        .then( function(response) { return response.json(); } );
        //.then( function(responseJson) { return responseJson.status; } );


    alert( "Respe " + abc + abc.status );
    return "inman lives";
};
*/

function success( response ) {
    let temp  = response;
    return temp;
}

function failure( response ) {
    let temp = response;
    return temp;
}

var myHeaders = new Headers();

var myInit = { method: 'GET',
    headers: myHeaders,
    mode: 'no-cors',
    cache: 'default' };

function getInmanStatus() {
    /*return fetch('http://10.1.20.128:8080/status', { mode: 'no-cors' })
        .then((response) => response.json())
        .then((responseJson) => {
            return responseJson.movies;
        })
        .catch((error) => {
            console.error(error);
        });
        */
    let obj = fetch('http://10.1.20.128:8080/status', myInit ).then( success, failure );
    //let obj = "{status: ok }";
    return obj;
}


var ShoppingList = React.createClass( {
  render: function() {
      if ( !this.props.visible )
          return null;
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

        if ( !this.props.visible )
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

        this.credentials = new CredentialPropertyPage();
		this.uiEvent = this.uiEvent.bind( this );
		this.showShopping = true;
		this.state = { showCredentials : true };
		this.showItem = true;
	}

	uiEvent( sender, object ) {
		if ( sender === "CredentialPropertyPage" ) {
            this.setState( {showCredentials : false } );
        } else if ( sender ==="LogoffButton")
        {
            this.setState( {showCredentials : true } );
        }
        this.render();
	}
	
  render() {
	var itemToShow = new Item( "abc", "W-001", 2 );
    var dateOfRender = new Date().toTimeString();
    var inmanStatus = getInmanStatus();

    return (
      <div className="App">
        <div className="App-header">
			<div className='leftLayout'>
                <img className='App-logo' src={require('./logo.png')} alt="logoPoop" />
			</div>
		    <div className='rightLayout'>
                <h2>Welcome to Inman</h2>
		    </div>
        </div>
          <h6>Last Update: {dateOfRender}</h6>
          <h2>Inman Server Status: {inmanStatus}</h2>

         <ShoppingList name="Mark" visible={this.state.showCredentials} />
         <CredentialPropertyPage eventHandler={this.uiEvent} visible={this.state.showCredentials} />
         <SingleItem item={itemToShow} visible={this.state.showCredentials} />
         <Button label="Logoff" eventHandler={this.uiEvent} visible={!this.state.showCredentials} eventName="LogoffButton" ></Button>
      </div>
    );
  }
}

export default App;
