/**
 * Created by osboxes on 07/07/17.
 */
import * as Constants from './Constants.js'
import * as queryString from 'query-string'
import React from "react";
import PropTypes from 'prop-types';

export class AddItem extends React.Component {
    constructor(props) {
    super(props)

    this.state = {
        summaryId: 'W-0',
        description: '',
        unitCost: '0.0',
        save: 'Not Yetti' };

        this.handleSummaryId = this.handleSummaryId.bind(this);
        this.handleDescription = this.handleDescription.bind(this);
        this.handleCost = this.handleCost.bind(this);
        this.handleClickSave = this.handleClickSave.bind(this);
        this.handleClickCancel = this.handleClickCancel.bind(this);
    }

    addItem( theObject ) {
        let params = {
                summaryId : theObject.state.summaryId,
                description : theObject.state.description,
                unitCost : theObject.state.unitCost };

        params = queryString.stringify( params );

        let url = Constants.INMAN_SERVER_IP + ':8080/item/add?'+ params;
        let header = new Headers( { 'Content-Type' : 'application/json'});
        fetch( url, { method: 'get', mode: 'cors', headers : header })
            .then(function (response) {
                theObject.setState( { MessageState : 'sending' } );
                return response
            })
            .then( function( response ) {
                theObject.setState( { MessageState : 'waiting' } );
                return response.json();
            })
            .then( function(data) {
                theObject.setState( { MessageState : 'completed' } );
                theObject.setState( { ItemResponse : data } );
                theObject.props.doneWithAdding( data );
            })
            .catch( function() {
                theObject.setState( { MessageState: 'Error' } );
            } );
    }

    handleSummaryId(evt) {
        this.setState({summaryId: evt.target.value});
    }

    handleDescription(evt) {
        this.setState({description: evt.target.value});
    }
    handleCost(evt) {
        this.setState({unitCost: evt.target.value});
    }

    handleClickSave(evt) {
        this.setState({save: evt.target.value});
        this.addItem( this );
    }
    handleClickCancel(evt) {
        this.setState({save: evt.target.value});
        this.props.doneWithAdding(evt);
    }

    render() {
        if ( this.props.Mode !== 'add') {
            return( null );
        }
        return (
            <div >
                <form className='propertyForm'>
                    <h2>Add Multiple Items</h2>
                    <label htmlFor='summaryId'>Summary</label>
                    <input id='summaryId' type="text" onChange={this.handleSummaryId} value={this.state.summaryId}/>
                    <label htmlFor='description'>Description</label>
                    <input id='description' type="text" onChange={this.handleDescription} value={this.state.description}/>
                    <label htmlFor='unitCost'>Unit Cost</label>
                    <input id='unitCost' type="text" onChange={this.handleCost} value={this.state.unitCost}/>
                    <button type="button" onClick={this.handleClickSave} value='save' >Save, Add Another</button>
                    <button type="button" onClick={this.handleClickCancel} value='cancel'>Cancel and Return</button>
                </form>
            </div>
        );
    }
}

AddItem.propTypes = {
    Mode: PropTypes.string,
    doneWithAdding : PropTypes.func
}

export default AddItem;