
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

export class ItemsSelected extends Component {
    constructor ( props ) {
        super( props );
        this.utilityRenderColumnNames = this.utilityRenderColumnNames.bind(this);
    }

     activeFormatter( cell, row ) {
        return(
            <NumberFormat value={cell} thousandSeparator={','} decimalSeparator={'.'} prefix={'$'} decimalPrecision={2}
                          displayType='text'/>
        );
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


    render() {

        if ( this.props.items ) {
            return (
                <span>
                    <Table multiSelectable={false}>
                    <TableHeader displaySelectAll={false}
                                 adjustForCheckbox={false}>
                            {this.utilityRenderColumnNames() }
                    </TableHeader>
                    <TableBody stripedRows={true}
                               deselectOnClickaway={false}
                               displayRowCheckbox={false}>
                        {   this.props.items.map( (item,index ) => {
                            return(
                                <TableRow key={item.id}>
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
                    <TableFooter adjustForCheckbox={false}>
                            {this.utilityRenderColumnNames() }
                    <TableRow>
                      <TableRowColumn colSpan="4" style={{textAlign: 'center'}}>
                        <FlatButton label="Delete"/>
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

ItemsSelected.propTypes = {
    items: PropTypes.array.isRequired
};

export default ItemsSelected;