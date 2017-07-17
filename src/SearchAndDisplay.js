/**
 * Created by osboxes on 22/06/17.
 */
import React from 'react';
import * as Constants from './Constants.js'
import * as queryString from 'query-string'
import ItemList from './ItemList.js'


export var SearchAndDisplay= React.createClass( {
    getInitialState : function() {
        return { ItemId : '',
                 SummaryId : '',
                 Description: '',
                 MessageState: '',
                 ItemResponse : null,
                 Mode : 'query' }
    },
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
    },

    handleChangeItemId: function(evt) {
        this.setState({ ItemId : evt.target.value });
    },
    handleChangeSummaryId: function(evt) {
        this.setState({ SummaryId : evt.target.value });
    },
    handleChangeDescription: function(evt) {
        this.setState( { Description : evt.target.value } );
    },


    handleSearch: function(evt) {
        this.setState( { Mode : 'query'} );
        this.getItem( this );
    },

    handleAdd: function(evt) {
        this.setState( { Mode : 'add'} );
    },

    handleDoneWithAdding : function(evt) {
        let evtType = typeof evt.data;
        if ( evtType === 'object') {
            if ( evt.errors.length === 0 && evt.data.length === 1) {
                let items = this.state.ItemResponse;
                let anItem = evt.data[ 0 ];
                let count = items.push( anItem );
                this.setState( { ItemResponse : items });
            }
        } else
        {
            this.setState({Mode: 'query'});
        }
    },

    render : function() {
        if ( this.props.credentialsState.token !== Constants.NO_TOKEN ) {
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
                    <ItemList Mode={this.state.Mode} ItemResponse={this.state.ItemResponse}
                                   DoneWithAdding={this.handleDoneWithAdding}/>
                </div>
            )
        } else {
            return null;
        }
    }
} );

