import React from 'react';
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

        this.onButtonActivation = null;
    }

    showRow( { index } ) {
        return(

            <IconButton tooltip={this.toolTip}
                iconStyle={this.iconStyle}
                style={this.style}
                onClick={this.onButtonActivation} id={index} key={this.toolTip}>
                {this.icon}
            </IconButton>

            );
    }
    }

export default LineButton;