import React, { Component } from 'react';
import './App.css';
import Item from './Item';
import CredentialPropertyPage from './Credentials.js'

  

var ShoppingList = React.createClass( {
  render: function() {
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

	uiEvent( sender, object ) {
		alert( "This is a change by " + sender  );
		if ( sender === "CredentialPropertyPage" ) {
			alert( "Checking Credentials " + object.state.username + ":" + object.state.password  );
			
			}
	}
	
  render() {
	var itemToShow = new Item( "abc", "W-001", 2 );
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
          <ShoppingList name="Mark" />
          <CredentialPropertyPage eventHandler={this.uiEvent} />
	
          <SingleItem item={itemToShow} />
  
          But first, you must die Mr. Bond!
      </div>
    );
  }
}

export default App;
