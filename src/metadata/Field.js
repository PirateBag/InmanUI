
import React from "react";
import TextField from 'material-ui/TextField';
import * as Constants from '../Constants.js'
import {
    TableHeaderColumn,
    TableRow,
    TableRowColumn
} from 'material-ui/Table';

import HamburgIcon from 'material-ui/svg-icons/action/reorder'

export class Field{

    constructor( {   fieldName , tableName, lengthOf, isUpper=false,
                     decimalPlaces=0, isCurrency=false, horizontalLabel,
                     rules=undefined, columnHeaderIcon = undefined,
                     rowLineButtons = []
    }  ) {
        this.fieldName = fieldName;
        this.tableName = tableName;
        this.lengthOf = lengthOf;
        this.isUpper = isUpper;
        this.decimalPlaces = decimalPlaces;
        this.isCurrency = isCurrency;
        this.horizontalLabel = horizontalLabel;
        this.rules = rules;
        this.columnHeaderIcon = columnHeaderIcon;
        this.rowLineButtons = rowLineButtons;
    }

    showRowHtml( { key, value, onChange } ) {
        return (
            <TableRow key={key}
                      style={ Constants.tableRowHeightStyle}>
                <TableRowColumn style={Constants.tableRowHeightStyleRight}>{this.horizontalLabel}</TableRowColumn>
                <TableRowColumn style={Constants.tableRowHeightStyle}>
                    <TextField
                        id={this.fieldName} hintText={this.horizontalLabel}
                        value={value} onChange={onChange}  />
                </TableRowColumn>
            </TableRow>
        )
    }
    showColumnHeaderHtml( ) {
        if ( this.icon === undefined  ) {
            return(
                    <TableHeaderColumn style={Constants.tableRowHeightStyle}
                    key={'0'}>{this.horizontalLabel}</TableHeaderColumn>
                )
         } else {
            return(
                <TableHeaderColumn key={'0'} style={Constants.tableRowHeightStyle}>
                    <HamburgIcon style={Constants.iconStyles.small} > </HamburgIcon>
                </TableHeaderColumn>
            )
        }
    }

    showRowButtons( ) {
        if ( this.rowLineButtons === undefined ) {
            return;
        }
        let rValue = "";

        for ( let i = 0; i < this.rowLineButtons.length; i++ ) {
            rValue += this.rowLineButtons[ i ].showRow(null, i );
        };
        return( rValue );}
}

Field.searchForItemByFieldName = function( {fieldName, fields} ) {
    let returnValue = null;
    for ( let i = 0; i < fields.length; i ++ ) {
        if ( fields[ i ].fieldName === fieldName ) {
            returnValue = fields[i];
            break;
        }
    }
    return returnValue;
}

export default Field;
