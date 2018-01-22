/**
 * Created by osboxes on 28/02/17.
 */
import React, { Component } from 'react';

export class Button extends Component  {

    constructor(props) {
        super(props)

        this.handleClickLogin  = this.handleClickLogin.bind( this );
    }


    handleClickLogin(evt) {
        this.props.eventHandler( this.props.eventName, this );
    }
    render() {
        if ( !this.props.visible ) {
            return null;
        }
        return (
            <div className="button">
                <button type="button" onClick={this.handleClickLogin}>{this.props.label}</button>
            </div>
        );
    }
}
/*
Button.propTypes = {
    label: React.PropTypes.string.isRequired,
    eventHandler: React.PropTypes.func,
    visible: React.PropTypes.bool.isRequired,
    eventName : React.PropTypes.string.isRequired,
}
*/
