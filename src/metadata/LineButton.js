import React from 'react';
import IconButton from 'material-ui/IconButton';
import * as Constants from '../Constants.js'
import DeleteIcon from 'material-ui/svg-icons/action/delete'


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
                iconStyle={this.iconStyle}
                style={this.style}
                onClick={onButtonActivation} id={index}>
                {this.icon}
            </IconButton>

            );
    }
    }

export default LineButton;