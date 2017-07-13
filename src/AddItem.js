/**
 * Created by osboxes on 07/07/17.
 */
import React from "react";

export var AddItem = React.createClass({
    getInitialState: function () {

        return {
            summaryId: '',
            description: '',
            cost: '0.0',
            save: 'Not Yet'
        }
    },

    handleSummaryId: function (evt) {
        this.setState({summaryId: evt.target.value});
    },

    handleDescription: function (evt) {
        this.setState({description: evt.target.value});
    },
    handleCost: function (evt) {
        this.setState({cost: evt.target.value});
    },

    handleClickSave: function (evt) {
        this.setState({save: evt.target.value});
    },
    handleClickCancel: function (evt) {
        this.setState({save: evt.target.value});
    },

    render: function () {
        if ( this.props.Mode !== 'add') {
            return( null );
        }
        return (
            <div >
                <form className='propertyForm'>
                    <h2>Save: {this.state.save}</h2>
                    <label htmlFor='summaryId'>Summary</label>
                    <input id='summaryId' type="text" onChange={this.handleSummaryId} value={this.state.summaryId}/>
                    <label htmlFor='description'>Description</label>
                    <input id='description' type="text" onChange={this.handleDescription} value={this.state.description}/>
                    <label htmlFor='unitCost'>Unit Cost</label>
                    <input id='unitCost' type="text" onChange={this.handleCost} value={this.state.cost}/>
                    <button type="button" onClick={this.handleClickSave} value='save'>Save</button>
                    <button type="button" onClick={this.handleClickCancel} value='cancel'>Cancel</button>
                </form>

            </div>
        );
    }
});

export default AddItem;