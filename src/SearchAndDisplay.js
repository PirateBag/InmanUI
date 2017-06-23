/**
 * Created by osboxes on 22/06/17.
 */
import React from 'react';
import * as Constants from './Constants.js'
import * as queryString from 'query-string'
export var SearchAndDisplay= React.createClass( {
    getInitialState : function() {
        return { ItemId : '',
                 SummaryId : '',
                 Description: '',
                 MessageState: ''}
    },
    getItem( objectWithStatus, itemId ) {
        let params = queryString.stringify(
            { 'itemId' : this.state.ItemId,
              'summaryId' : this.state.SummaryId,
              'description' : this.state.Description })
        let url = Constants.INMAN_SERVER_IP + ':8080/item/search/'+itemId;
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
                objectWithStatus.setState( { item : data } );
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
        this.getItem( this, this.state.ItemId );
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
                                <button type="button" onClick={this.handleSearch}>Search</button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <SearchResults item={this.state.item}/>
                </div>
            )
        } else {
            return null;
        }
    }


} );

function ItemLister( items ) {
     return ( items.map( (anItem ) =>
        <tr key="anItem.id">
            <td>{anItem.id}</td>
            <td>{anItem.summaryId}</td>
            <td>{anItem.description}</td>
            <td>{anItem.unitCost}</td>
        </tr>
    ) )
}

export var SearchResults = React.createClass( {

render : function() {
        if ( typeof this.props.item === 'undefined' ) {
            return(
                <h4>No items for you.</h4>
            )
        }
        return (
            <div >
                <table>
                    <tbody>
                    {ItemLister(this.props.item)}
                    </tbody>
                </table>
            </div>
        );
    }


} );
