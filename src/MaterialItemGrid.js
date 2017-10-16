
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

export class MaterialItemGrid extends Component {
    constructor () {
        super();
        this.state = ({
            isSelected: []
        });


        this.onRowSelection = this.onRowSelection.bind(this);
        this.isSelectedList = this.isSelectedList.bind(this);
    }
     activeFormatter( cell, row ) {
        return(
            <NumberFormat value={cell} thousandSeparator={','} decimalSeparator={'.'} prefix={'$'} decimalPrecision={2}
                          displayType='text'/>
        );
    }

    onRowSelection(rows){

        let  action = "insert";
        let  newArray = [];
        this.state.isSelected.map( ( selection ) => {
            /*  Find a match, then remove from newArray to cause de-selection.  */
            if ( rows[ 0 ] === selection ) {
                action = "none";
            } else {
                /*  No match, then this entry's state is unchanged.  */
                newArray.push( selection );
            }
        } );

        /*  Never found any match, must be a newly selected item.  */
        if ( action === "insert" ) {
            newArray.push( rows[ 0 ]);
        }

        this.setState( {isSelected : newArray} );
    }

    isSelectedList( ) {
        let response = [];
        let i = 0;
        for ( i = 0; i < this.props.ItemResponse.data.length; i ++ ) {
            response[ i ] = false;
            this.state.isSelected.forEach( ( selectionIndex ) => {
                if ( selectionIndex === i ) {
                    response[ i ] = true;
                }
            } );
        }
        return response;
    }

    render() {

        if ( this.props.ItemResponse
         &&  this.props.ItemResponse.data ) {
            var arrayOfData = this.props.ItemResponse.data
            return (
                <span>
                    <p>Selected  {this.state.isSelected}</p>
                    <p>isSelectList  {this.isSelectedList()}</p>
                    <Table multiSelectable={true} displaySelectAll={false} onRowSelection={this.onRowSelection}>
                    <TableHeader>
                      <TableRow>
                        <TableHeaderColumn>ID</TableHeaderColumn>
                        <TableHeaderColumn>Summary</TableHeaderColumn>
                        <TableHeaderColumn>Description</TableHeaderColumn>
                        <TableHeaderColumn>Unit Cost</TableHeaderColumn>
                      </TableRow>
                    </TableHeader>
                    <TableBody stripedRows={true}>
                        { arrayOfData.map( (item ) => {
                            return(
                                <TableRow key={item.id} selected={true}>
                                    <TableRowColumn>{item.id}</TableRowColumn>
                                    <TableRowColumn>{item.summaryId}</TableRowColumn>
                                    <TableRowColumn>{item.description}</TableRowColumn>
                                    <TableRowColumn>
                                        <NumberFormat value={item.unitCost} thousandSeparator={','} decimalSeparator={'.'} prefix={'$'} decimalPrecision={2}
                                                  displayType='text'/>
                                    </TableRowColumn>
                                </TableRow>
                            ); } ) }
                        }
                    </TableBody>
                  </Table>
                </span> );
        } else {
            return null;
        }
    }
}

MaterialItemGrid.propTypes = {
    ItemResponse: PropTypes.object
};

export default MaterialItemGrid;