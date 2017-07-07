/**
 * Created by osboxes on 22/06/17.
 */
import React from 'react';
import * as Constants from './Constants.js'
import * as queryString from 'query-string'
import AddItem from './AddItem.js'

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

    render : function() {
        if ( this.props.credentialsState.token !== Constants.NO_TOKEN ) {
            return (
                <div >
                    <table>
                        <tbody>
                        <tr>
                            <td>Item Id</td>
                            <td><input type="text" onChange={this.handleChangeItemId} value={this.state.ItemId}/></td>
                        </tr>
                        <tr>
                            <td>Summary Id</td>
                            <td><input type="text" onChange={this.handleChangeSummaryId} value={this.state.SummaryId}/></td>
                        </tr>
                        <tr>
                            <td>Description (mentions)</td>
                            <td><input name='Description' type="text" onChange={this.handleChangeDescription} value={this.state.Description}/></td>
                        </tr>

                        <tr>
                            <td>
                                <button type="button" onClick={this.handleAdd}>New</button>
                            </td>
                            <td>
                                <button type="button" onClick={this.handleSearch}>Search</button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <SearchResults Mode={this.state.Mode} ItemResponse={this.state.ItemResponse}/>
                </div>
            )
        } else {
            return null;
        }
    }


} );

function ItemLister( itemResponse ) {
    if ( itemResponse.errors != null && itemResponse.errors.length >0 )  {
            return ( itemResponse.errors.map( ( anError ) =>
                <tr key={anError.key}>
                    <td>{anError.message}</td>
                </tr>
                )
            )
    }

    if ( itemResponse.data == null || itemResponse.data.length === 0 )

            return (
            <tr>
                <td>These query parameters did not match any data.</td>
            </tr>
        )

     return ( itemResponse.data.map( ( anItem ) =>
        <tr key={anItem.id}>
            <td>{anItem.id}</td>
            <td>{anItem.summaryId}</td>
            <td>{anItem.description}</td>
            <td>{anItem.unitCost}</td>
        </tr>
    ) )
}

export var SearchResults = React.createClass( {

render : function() {
        if ( typeof this.props.ItemResponse === 'undefined'
        || this.props.ItemResponse == null ) {
            return(
                <h4>No items for you.</h4>
            )
        }

        if ( this.props.Mode === 'query') {
            return (
                <div >
                    <table>
                        <tbody>
                        {ItemLister(this.props.ItemResponse)}
                        </tbody>
                    </table>
                </div>
            );
        }

        if ( this.props.Mode === 'add') {
            return(
                <AddItem></AddItem> );
        }
        return(
            <h4>I have nothing to say.</h4>
        );
    }


} );
