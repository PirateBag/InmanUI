import * as Constants from '../Constants.js'
import React from "react";
import {
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import TextField from 'material-ui/TextField';

export class Field{

    constructor( {   fieldName , tableName, lengthOf, isUpper=false,
                     decimalPlaces=0, isCurrency=false, horizontalLabel, rules=undefined, icon=undefined }  ) {
        this.fieldName = fieldName;
        this.tableName = tableName;
        this.lengthOf = lengthOf;
        this.isUpper = isUpper;
        this.decimalPlaces = decimalPlaces;
        this.isCurrency = isCurrency;
        this.horizontalLabel = horizontalLabel;
        this.rules = rules;
        this.icon = icon;
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
                    <TableHeaderColumn style={Constants.tableRowHeightStyle}>this.horizontalLabel</TableHeaderColumn>
                );
         } else {
            return(
                <TableHeaderColumn style={Constants.tableRowHeightStyle}>
                    <HamburgIcon style={styles.small} > </HamburgIcon>
                </TableHeaderColumn>
        }
    }
}

export default Field;
