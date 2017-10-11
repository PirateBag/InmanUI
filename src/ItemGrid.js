
import React, { Component } from 'react';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import {BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';

export class ItemGrid extends Component {

    activeFormatter( cell, row ) {
        return(
            <NumberFormat value={cell} thousandSeparator={','} decimalSeparator={'.'} prefix={'$'} decimalPrecision={2}
                          displayType='text'/>
        );
    }
    render() {
        if ( this.props.ItemResponse
         &&  this.props.ItemResponse.data ) {
            return (
                <span>
                <BootstrapTable data={this.props.ItemReponse.data} version='4' striped hover condensed>
                    <TableHeaderColumn isKey dataField='id' width='50' dataAlign='right'>Id</TableHeaderColumn>
                    <TableHeaderColumn dataField='summaryId' width='90'>Summary</TableHeaderColumn>
                    <TableHeaderColumn dataField='description' width='200'>Description</TableHeaderColumn>
                    <TableHeaderColumn dataField='unitCost' width='100' dataFormat={this.activeFormatter}
                                       dataAlign='right'>Unit Cost</TableHeaderColumn>
                </BootstrapTable>
            </span> );
        } else {
            return null;
        }


    }
}

ItemGrid.propTypes = {
    ItemResponse: PropTypes.object
};


export default ItemGrid;