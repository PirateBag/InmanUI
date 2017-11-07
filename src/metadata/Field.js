import * as Constants from '../Constants.js'
import React from "react";
import {
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import TextField from 'material-ui/TextField';

export class Field{

    constructor( {   fieldName , tableName, lengthOf, isUpper=false,
                     decimalPlaces=0, isCurrency=false, horizontalLabel, rules=undefined }  ) {
        this.fieldName = fieldName;
        this.tableName = tableName;
        this.lengthOf = lengthOf;
        this.isUpper = isUpper;
        this.decimalPlaces = decimalPlaces;
        this.isCurrency = isCurrency;
        this.horizontalLabel = horizontalLabel;
        this.rules = rules;
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
}

export default Field;
