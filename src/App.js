import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class ShoppingList extends React.Component {
  render() {
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
}

var LoginPlease = React.createClass( {
		
	  updateInputValue: function(evt) {
    this.setState({ inputValue: evt.target.value });
		},
		

  render : function() {
    return (
      <div className="login-please">
        <h1>Please enter your credentials:</h1>
				<table>
					<tr>
						<td>User</td>
						<td><input type="text" onChange={this.updateInputValue} /></td>
					</tr>
					<tr>
						<td>Password</td>
						<td><input type="password"/></td>
					</tr>
					<tr>
						<td><button type="button">Login</button></td>
					</tr>
					<tr>
						<td>{this.state.user}</td>
					</tr>
				</table>
      </div>
    );
  }
} );


class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Inman</h2>
        </div>
        <p className="App-intro">
          To get started, edit fff <code>src/App.js</code> and save to reload.
        </p>
        <p>
				<ShoppingList name="Mark" />
				<LoginPlease/>
          But first, you must die Mr. Bond!
        </p>
	
      </div>
    );
  }
}

export default App;
