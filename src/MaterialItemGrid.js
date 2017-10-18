
import React, { Component } from 'react';
import {
    Table,
    TableBody,
    TableFooter,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import FlatButton from 'material-ui/FlatButton';

export class MaterialItemGrid extends Component {
    constructor () {
        super();
        this.state = ({
            rowState : [],
            allRowsSelected : false
        });
        this.onRowSelection = this.onRowSelection.bind(this);
        this.getSelectMap = this.getSelectMap.bind(this);
        this.utilityRenderColumnNames = this.utilityRenderColumnNames.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

     activeFormatter( cell, row ) {
        return(
            <NumberFormat value={cell} thousandSeparator={','} decimalSeparator={'.'} prefix={'$'} decimalPrecision={2}
                          displayType='text'/>
        );
    }


    getSelectMap( ) {
        let rValue = this.state.rowState;
        if ( rValue.length !== this.props.ItemResponse.data.length ) {
            rValue.length = this.props.ItemResponse.data.length;
            let index = 0;
            for ( index = 0; index < rValue.length; index++ ) {
                rValue[ index ] = {selected : false };
            }
        }
        return rValue;
    }

    utilityRenderColumnNames() {
        return(
            <TableRow>
            <TableHeaderColumn>ID</TableHeaderColumn>
            <TableHeaderColumn>Summary</TableHeaderColumn>
            <TableHeaderColumn>Description</TableHeaderColumn>
            <TableHeaderColumn>Unit Cost</TableHeaderColumn>
            </TableRow>

        );
    }

    utilitySetAllRows( xLength, xObjectToSet ) {
        let rValue = [];
        rValue.length = xLength;
        let selectIndex = 0;
        while ( selectIndex < rValue.length ) {
            rValue[ selectIndex ] = xObjectToSet;
            selectIndex++;
        }
        return rValue;
    }

    onRowSelection( rows ) {
        let newSelections = [];
        let allRowsSelected = { allRowsSelected: false };
        if (rows === "all") {
            newSelections = this.utilitySetAllRows(this.props.ItemResponse.data.length,
                {selected: true})
            allRowsSelected = { allRowsSelected: true };
        } else {
            newSelections = this.utilitySetAllRows(this.props.ItemResponse.data.length,
                {selected: false })

            //  Go through each of the rows indicated in the call back.
            let rowIndex = 0;
            while ( rowIndex < rows.length ) {
                let selectIndex = rows[rowIndex];
                newSelections[selectIndex] = {selected: true};
                rowIndex++;
            }
         }
        this.setState( { rowState  : newSelections });
        this.setState(  allRowsSelected );
    }

    handleDelete() {
        if ( this.props.deleteButton ) {
            let selectMap = this.getSelectMap();
            let selectMapIndex = 0;
            let itemsSelected = [];
            let itemsDiscarded = []
            while (selectMapIndex < selectMap.length) {
                if (selectMap[selectMapIndex]) {
                    itemsSelected.push(this.props.ItemResponse.data[selectMapIndex]);
                } else {
                    itemsDiscarded.push(this.props.ItemResponse.data[selectMapIndex]);
                }
                selectMapIndex++;
            }
            this.props.deleteButton(itemsSelected, itemsDiscarded);
        }
    }



    render() {

        if ( this.props.ItemResponse
         &&  this.props.ItemResponse.data ) {

            return (
                <span>
                    <Table multiSelectable={true} onRowSelection={this.onRowSelection}>
                    <TableHeader>
                            {this.utilityRenderColumnNames() }
                    </TableHeader>
                    <TableBody stripedRows={true} deselectOnClickaway={false}>
                        {   this.props.ItemResponse.data.map( (item,index ) => {
                            return(
                                <TableRow key={item.id} selected={this.getSelectMap()[index].selected}>
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
                    <TableFooter adjustForCheckbox={this.state.true}>
                            {this.utilityRenderColumnNames() }
                    <TableRow>
                      <TableRowColumn colSpan="4" style={{textAlign: 'center'}}>
                        <FlatButton label="Delete" onClick={this.handleDelete}/>
                      </TableRowColumn>
                    </TableRow>
                    </TableFooter>

                  </Table>
                </span> );
        } else {
            return null;
        }
    }
}

MaterialItemGrid.propTypes = {
    ItemResponse: PropTypes.object,
    deleteButton: PropTypes.func
};

export default MaterialItemGrid;