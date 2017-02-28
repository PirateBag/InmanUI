/**
 * Created by osboxes on 28/02/17.
 */
import React from 'react';

var Button = React.createClass( {

    handleClickLogin: function(evt) {
        this.props.eventHandler( "LogoffButton", this );
    },
    render: function() {
        if ( !this.props.visible ) {
            return null;
        }
        return (
            <div className="button">
                <button type="button" onClick={this.handleClickLogin}>{this.props.label}</button>
            </div>
        );
    }
} );

Button.propTypes = {
    label: React.PropTypes.string.isRequired,
    eventHandler: React.PropTypes.func,
    visible: React.PropTypes.bool.isRequired,
    eventName : React.PropTypes.string.isRequired,
}
export default Button;