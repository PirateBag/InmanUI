/**
 * Created by osboxes on 22/06/17.
 */
import React from 'react';

import {BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import * as Constants from './Constants.js'
import * as queryString from 'query-string'
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import NumberFormat from 'react-number-format';
import AddItem from "./AddItem.js";

class SearchAndDisplayBsTable extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            ItemId : '',
            SummaryId : '',
            Description: '',
            MessageState: '',
            ItemResponse : null,
            Mode : 'query'
            };

        this.getItem = this.getItem.bind( this );
        this.handleAdd = this.handleAdd.bind( this );
        this.handleSearch = this.handleSearch.bind( this );
        this.handleChangeItemId = this.handleChangeItemId.bind(this);
        this.handleChangeSummaryId = this.handleChangeSummaryId.bind(this);
        this.handleChangeDescription = this.handleChangeDescription.bind(this);
        this.handleDoneWithAdding = this.handleDoneWithAdding.bind(this);
    }


    activeFormatter( cell, row ) {
        return(
            <NumberFormat value={cell} thousandSeparator={','} decimalSeparator={'.'} prefix={'$'} decimalPrecision={2}
            displayType='text'/>
        );
    }

    getItem( objectWithStatus ) {
        let params = queryString.stringify(
            { 'id' : this.state.ItemId,
              'summaryId' : this.state.SummaryId,
              'description' : this.state.Description })
        let url = Constants.INMAN_SERVER_IP + ':8080/item/query?'+ params;
        let header = new Headers( { 'Content-Type' : 'application/json'});
        fetch( url, { method: 'get', mode: 'cors', headers : header })
            .then(function (response) {
                objectWithStatus.setState( { MessageState : 'sending' } );
                return response
            })
            .then( function( response ) {
                objectWithStatus.setState( { MessageState : 'waiting' } );
                return response.json();
            })
            .then( function(data) {
                objectWithStatus.setState( { MessageState : 'completed' } );
                objectWithStatus.setState( { ItemResponse : data } );
            })
            .catch( function() {
                objectWithStatus.setState( { MessageState: 'Error' } );
            } )
    }

    handleChangeItemId(evt) {
        this.setState({ ItemId : evt.target.value });
    }
    handleChangeSummaryId(evt) {
        this.setState({ SummaryId : evt.target.value });
    }
    handleChangeDescription(evt) {
        this.setState( { Description : evt.target.value } );
    }

    handleSearch(evt) {
        this.setState( { Mode : 'query'} );
        this.getItem( this );
    }

    handleAdd(evt) {
        this.setState( { Mode : 'add'} );
    }

    handleDoneWithAdding(evt) {
        let evtType = typeof evt.data;
        if ( evtType === 'object') {
            if ( evt.errors.length === 0 && evt.data.length === 1) {
                let items = this.state.ItemResponse;
                this.setState( { ItemResponse : items });
            }
        } else
        {
            this.setState({Mode: 'query'});
        }
    }

    render() {

        if ( this.props.credentialsState.token === Constants.NO_TOKEN )
            return null;

        if ( this.state.Mode === 'add') {
            return (
                <div>
                    <AddItem Mode={this.state.Mode} doneWithAdding={this.handleDoneWithAdding}/>
                </div>
            ) }
        else if ( this.state.ItemResponse == null ) {
            return (
            <div className="propertyForm" >
                <label htmlFor="itemId>">Item Id</label>
                <input id='itemId' type="text" onChange={this.handleChangeItemId} value={this.state.ItemId}/>
                <label htmlFor="summaryId>">Summary</label>
                <input id='summaryId' type="text" onChange={this.handleChangeSummaryId} value={this.state.SummaryId}/>
                <label htmlFor="description>">Description</label>
                <input id='description' name='Description' type="text" onChange={this.handleChangeDescription} value={this.state.Description}/>

                <button type="button" onClick={this.handleAdd}>Create New Item</button>
                <button type="button" onClick={this.handleSearch}>Search for Items</button>
            </div>
        )
        } else {
            return (
                <div className="propertyForm" >
                    <label htmlFor="itemId>">Item Id</label>
                    <input id='itemId' type="text" onChange={this.handleChangeItemId} value={this.state.ItemId}/>
                    <label htmlFor="summaryId>">Item Id</label>
                    <input id='summaryId' type="text" onChange={this.handleChangeSummaryId} value={this.state.SummaryId}/>
                    <label htmlFor="description>">Description</label>
                    <input id='description' name='Description' type="text" onChange={this.handleChangeDescription} value={this.state.Description}/>

                    <button type="button" onClick={this.handleAdd}>Create New Item</button>
                    <button type="button" onClick={this.handleSearch}>Search for Items</button>

                    <BootstrapTable  data={this.state.ItemResponse.data} version='4' striped hover condensed >
                        <TableHeaderColumn  isKey dataField='id' width='50' dataAlign='right'>Id</TableHeaderColumn>
                        <TableHeaderColumn dataField='summaryId' width='90'>Summary</TableHeaderColumn>
                        <TableHeaderColumn dataField='description' width='200'>Description</TableHeaderColumn>
                        <TableHeaderColumn dataField='unitCost' width='100' dataFormat={this.activeFormatter} dataAlign='right'>Unit Cost</TableHeaderColumn>
                    </BootstrapTable>
                </div>
            )
           }
        }
}
export default SearchAndDisplayBsTable;
