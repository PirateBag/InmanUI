import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Item from './model/item.js';

var ShoppingList = React.createClass( {
  render: function() {
    return (
      <div className="shopping-list">
        <h1>Shopping List for {this.props.name}</h1>
        <ul>
          <li>Instagram</li>
          <li>WhatsApp</li>
          <li>Oculus</li>
        </ul>
      </div>
    );
  }
})

var SingleItem = React.createClass( {
  render: function() {
    return (
      <div className="shopping-list">
        <h1>Shopping List for {this.props.id}</h1>
        <ul>
          <li>{this.props.item.summary}</li>
          <li>{this.props.item.quanity}</li>
        </ul>
      </div>
    );
  }
})


var LoginPlease = React.createClass( { 
  getInitialState : function() {
    return { username : '', password : '' };
  },  

  handleChangeUsername: function(evt) {
    this.setState({ username: evt.target.value });
   },

  handleChangePassword: function(evt) {
    this.setState({ password: evt.target.value });
   },

  handleClickLogin: function(evt) {
		alert( "credentials=" + this.state.username + " " + this.state.password + "!" );
   },



  render : function() {
    return (
      <div className="login-please">
        <h1>Please enter your credentials:</h1>
				<table>
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
				</table>
      </div>
    );
  }
} );




class App extends Component {
  render() {
    var itemToShow = new Item( 1, "W-001", 1 );
    return (


      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Inman</h2>
        </div>
          <ShoppingList name="Mark" />
        	<LoginPlease/>
          <SingleItem item={itemToShow} />      

          But first, you must die Mr. Bond!
      </div>
    );
  }
}

export default App;
