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

        return (
            <div >
                <h2>Save: {this.state.save}</h2>
                <table>
                    <tbody>
                    <tr>
                        <td>Summary Id</td>
                        <td><input type="text" onChange={this.handleSummaryId} value={this.state.summaryId}/></td>
                    </tr>
                    <tr>
                        <td>Description</td>
                        <td><input type="text" onChange={this.handleDescription} value={this.state.description}/></td>
                    </tr>
                    <tr>
                        <td>Cost</td>
                        <td><input type="text" onChange={this.handleCost} value={this.state.cost}/></td>
                    </tr>

                    <tr>
                    </tr>
                    </tbody>
                </table>
                <button type="button" onClick={this.handleClickSave} value='save'>Save</button>
                <button type="button" onClick={this.handleClickCancel} value='cancel'>Cancel</button>

            </div>
        );
    }
});

export default AddItem;