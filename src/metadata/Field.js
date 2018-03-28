
import React from "react";
import TextField from 'material-ui/TextField';
import * as Constants from '../Constants.js'
import {
    TableHeaderColumn,
    TableRow,
    TableRowColumn
} from 'material-ui/Table';

import HamburgIcon from 'material-ui/svg-icons/action/reorder'
import NumberFormat from 'react-number-format'

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

    showRowHtml( { key, value, onChange  } ) {
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

    showColumnValue( { key, value, onChange  } ) {
        return (
            <TableRowColumn style={Constants.tableRowHeightStyle}>
                {value}
            </TableRowColumn>
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

    showValue( value ) {
        if ( this.isCurrency ) {
            return (
                <NumberFormat value={value} decimalPrecision={this.decimalPlaces} readOnly prefix='$' outline='none'/>
            );
        } else {
            return (
                <TextField id={this.fieldName}     value={value}/>
            );
        }
    }
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

