
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
    constructor(props) {
        super(props)

    }
    activeFormatter( cell, row ) {
        return(
            <NumberFormat value={cell} thousandSeparator={','} decimalSeparator={'.'} prefix={'$'} decimalPrecision={2}
                          displayType='text'/>
        );
    }

    render() {
        if ( this.props.ItemResponse
         &&  this.props.ItemResponse.data ) {
            var arrayOfData = this.props.ItemResponse.data
            return (
                <span>
                     <Table>
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
                                <TableRow key={item.id} >
                                    <TableRowColumn style={{height: '12' }}>{item.id}</TableRowColumn>
                                    <TableRowColumn style={{height: '12' }}>{item.summaryId}</TableRowColumn>
                                    <TableRowColumn style={{height: '12' }}>{item.description}</TableRowColumn>
                                    <TableRowColumn  style={{textAlign: 'right',height: '12'}}>
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