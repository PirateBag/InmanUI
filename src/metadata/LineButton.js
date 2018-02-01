import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import * as Constants from '../Constants.js'



/**
 * Describes a button to be placed in the menu column of a table.
 */
export class LineButton {

constructor( { toolTip, iconStyle=Constants.iconStyles.smallIcon,
        style=Constants.iconStyles.small, onClick, icon }  ) {
        this.toolTip = toolTip;
        this.iconStyle = iconStyle;
        this.style = style;
        this.onClick = onClick;
        this.icon = icon;
    }

    showRow( { onButtonActivation, index } ) {
        return(
            <IconButton tooltip={this.toolTip}
                iconStyle={this.iconStyles.smallIcon}
                style={this.iconStyles.small}
                onClick={onButtonActivation} id={index}>
                {this.icon}
            </IconButton>
            );
    }
    }

export default LineButton;