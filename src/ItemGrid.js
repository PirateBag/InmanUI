
import React, { Component } from 'react';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import {BootstrapTable, TableHeaderColumn,DeleteButton } from 'react-bootstrap-table';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';

export class ItemGrid extends Component {
    constructor(props) {
        super(props)

        this.handleDeleteButtonClick = this.handleDeleteButtonClick.bind( this );
        this.createCustomDeleteButton = this.createCustomDeleteButton.bind(this);
    }
    activeFormatter( cell, row ) {
        return(
            <NumberFormat value={cell} thousandSeparator={','} decimalSeparator={'.'} prefix={'$'} decimalPrecision={2}
                          displayType='text'/>
        );
    }

    // ...
    handleDeleteButtonClick (onClick) {
        // Custom your onClick event here,
        // it's not necessary to implement this function if you have no any process before onClick
        console.log('This is my custom function for DeleteButton click event');

    }

    createCustomDeleteButton(onClick) {
        return (
            <DeleteButton
                btnText='CustomDeleteText'
                btnContextual='btn-warning'
                className='my-custom-class'
                btnGlyphicon='glyphicon-edit'
                onClick={ () => this.handleDeleteButtonClick(onClick) }/>
        );
    }


    options = {
        deleteBtn: this.createCustomDeleteButton
    };

    render() {
        if ( this.props.ItemResponse
         &&  this.props.ItemResponse.data ) {
            var arrayOfData = this.props.ItemResponse.data
            return (
                <span>
                <BootstrapTable data={arrayOfData} version='4' striped hover condensed options={this.options} deleteRow>
                    <TableHeaderColumn isKey dataField='id' width='50' dataAlign='right'>Id</TableHeaderColumn>
                    <TableHeaderColumn dataField='summaryId' width='90'>Summary</TableHeaderColumn>
                    <TableHeaderColumn dataField='description' width='200'>Description</TableHeaderColumn>
                    <TableHeaderColumn dataField='unitCost' width='100' dataFormat={this.activeFormatter}
                                       dataAlign='right'>Unit Cost</TableHeaderColumn>
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