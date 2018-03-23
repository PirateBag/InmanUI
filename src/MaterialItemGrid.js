
import React, { Component } from 'react';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import * as Constants from './Constants.js'
import HamburgIcon from 'material-ui/svg-icons/action/reorder'
import Item from './model/Item'
import Field from './metadata/Field.js'



export class MaterialItemGrid extends Component {
    constructor ( props ) {
        super( props );
        this.onRowSelection = this.onRowSelection.bind(this);
        this.utilityRenderColumnNames = this.utilityRenderColumnNames.bind(this);
        this.onButtonActivation = this.onButtonActivation.bind(this);

    };

    utilityRenderColumnNames() {
        return(
            <TableRow style={Constants.tableRowHeightStyle}>
                <TableHeaderColumn style={Constants.tableRowHeightStyle}>
                    <HamburgIcon style={Constants.iconStyles.small} > </HamburgIcon>
                </TableHeaderColumn>
                <TableHeaderColumn style={Constants.tableRowHeightStyle}>Id</TableHeaderColumn>
                <TableHeaderColumn style={Constants.tableRowHeightStyle}>Summary</TableHeaderColumn>
                <TableHeaderColumn style={Constants.tableRowHeightStyle}>Description</TableHeaderColumn>
                <TableHeaderColumn style={Constants.tableRowHeightStyle}>Unit Cost</TableHeaderColumn>
            </TableRow>
        );
    }

    utilityRenderColumns( fields ) {
        if ( fields === undefined ) {
            return( this.utilityRenderColumnNames() )
        } else {
        return(
            <TableRow key={999} style={Constants.tableRowHeightStyle}>
                { fields.map( (field,index ) => {
                    return( field.showColumnHeaderHtml() );
                } ) }
        </TableRow>
        );
        }


    }


    onRowSelection( rows ) {
        let itemSelected = this.props.items[ rows[ 0 ]];
        this.props.onSelectCallback( itemSelected );
    }

    onButtonActivation( event ) {
        let currentTarget = event.currentTarget;
        let id = currentTarget.id;
        let itemSelected = this.props.items[ id ];
        let params = { 'itemSelect' : itemSelected,
                       'toolTip' : currentTarget.textContent };
        this.props.onSelectCallback( params );
    }

    render() {

        if ( !this.props.items ) {
            return null;
        }

        /*
        Set the activation property for the row line buttons.
         */
        for ( let i = 0; i< this.props.fields[ 0 ].rowLineButtons.length; i++ ) {
            this.props.fields[ 0 ].rowLineButtons[ i ].onButtonActivation = this.onButtonActivation;
        }

        let x = Field.searchForItemByFieldName( { fieldName: 'id', fields: this.props.fields });

        return (
            <span>
                <Table multiSelectable={false} >
                <TableHeader adjustForCheckbox={false}
                             displaySelectAll={false}>
                        {this.utilityRenderColumns( this.props.fields ) }
                </TableHeader>
                <TableBody stripedRows={true}
                           deselectOnClickaway={false}
                           displayRowCheckbox={false}>
                    {   this.props.items.map( (item,index ) => {
                        return(
                            <TableRow key={item.id}
                                      style={Constants.tableRowHeightStyle}>
                                <TableRowColumn style={Constants.tableRowHeightStyle}>
                                    {this.props.fields[ 0 ].rowLineButtons.map( (rowLineButton, index ) => {
                                        return (
                                            rowLineButton.showRow( { index : index } ) ); } ) }
                                </TableRowColumn>


                                { x.showRowHtml( { key: index, value: item.id, onChange: null  })}

                                <TableRowColumn style={Constants.tableRowHeightStyle}>{item.summaryId}</TableRowColumn>
                                <TableRowColumn style={Constants.tableRowHeightStyle}>{item.description}</TableRowColumn>
                                <TableRowColumn style={Constants.tableRowHeightStyle}>
                                    <NumberFormat value={Item.unitCost} thousandSeparator={','} decimalSeparator={'.'} prefix={'$'} decimalPrecision={2}
                                              displayType='text'/>
                                </TableRowColumn>
                            </TableRow>
                        ); } ) }
                    }
                </TableBody>
              </Table>
            </span> );
        }
    }

MaterialItemGrid.propTypes = {
    items : PropTypes.array.isRequired,
    onSelectCallback : PropTypes.func.isRequired,
    fields : PropTypes.array.isRequired
    };

export default MaterialItemGrid;