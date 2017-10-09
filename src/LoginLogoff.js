import React, { Component } from 'react';
import * as Constants from './Constants.js'
import FlatButton from 'material-ui/FlatButton';
import PropTypes from 'prop-types';

/**
* **********************************************************************
*/
export class LoginLogoff extends Component {

    constructor(props) {
        super(props)
        this.handleClickLogout = this.handleClickLogout.bind(this);
    }


    handleClickLogout(evt) {
        this.props.clickLogout(  Constants.NoCredentials );
    }

    render() {
        if ( this.props.credentialsState.token ===  Constants.NoCredentials
        || this.props.serverStatus === "error" ) {
            return (
                <span>
                    <FlatButton label={this.props.serverStatus} />
                </span>
            )
        } else {
            return (
                <span>
                <FlatButton label={this.props.credentialsState} onClick={this.handleClickLogout}/>
                </span>
            )
        }
    }
}

LoginLogoff.propTypes = {
    credentialsState: PropTypes.string,
    clickLogout : PropTypes.func,
    serverStatus : PropTypes.string
}
