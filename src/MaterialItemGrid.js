
import React, { Component } from 'react';
import {
    Table,
    TableBody,
    TableHeader,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import PropTypes from 'prop-types';
import * as Constants from './Constants.js'


export class MaterialItemGrid extends Component {
    constructor ( props ) {
        super( props );
        this.onRowSelection = this.onRowSelection.bind(this);
        this.onButtonActivation = this.onButtonActivation.bind(this);

    };


    showButtons( field, item ) {
        if  ( field.rowLineButtons.length === 0 ) {
            let fieldValue = item[ field.fieldName ];
            return (
                field.showValue( { value: fieldValue, key: item.id } )
            )
        } else {
            return (
                <TableRowColumn style={Constants.tableRowHeightStyle} key={item.id}>
                    {field.rowLineButtons.map((rowLineButton, index) => {
                        return (
                            rowLineButton.showRow({index: index}))
                    })}
                </TableRowColumn>
            );
        }
    }

    generateTableBody( { items, fields } )
    {
        return (
        <TableBody stripedRows={true}
                   deselectOnClickaway={false}
                   displayRowCheckbox={false}>

            {   items.map( (item,index ) => {
                return(
                    <TableRow key={item.id}
                              style={Constants.tableRowHeightStyle}>
                        { fields.map( (field, fieldIndex ) => {
                            return ( this.showButtons( field, item ));} ) }
                    </TableRow>
                ); } ) }
        </TableBody>
        )
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

        return (
            <span>
                <Table multiSelectable={false} >
                    <TableHeader adjustForCheckbox={false}
                                 displaySelectAll={false}>
                       {this.utilityRenderColumns( this.props.fields ) }
                    </TableHeader>
                    { this.generateTableBody( { items: this.props.items, fields: this.props.fields }) }
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