/**
 * Created by osboxes on 07/07/17.
 */
import * as Constants from './Constants.js'
import * as queryString from 'query-string'
import React from "react";
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import * as Utility   from './Utility.js'
import FlatButton from 'material-ui/FlatButton';

export class ItemProperties extends React.Component {
    constructor(props) {
    super(props)

        this.state = {
            item : props.item
         };

        this.handleSummaryId = this.handleSummaryId.bind(this);
        this.handleDescription = this.handleDescription.bind(this);
        this.handleCost = this.handleCost.bind(this);
        this.handleClickSave = this.handleClickSave.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.presentButtons = this.presentButtons.bind( this );
        this.handleButtonActiviation = this.handleButtonActiviation.bind( this );
    }

    utilityRenderColumnNames() {
        return(
            <TableRow style={Constants.tableRowHeightStyle}>
                <TableHeaderColumn style={Constants.tableRowHeightStyle}>Property</TableHeaderColumn>
                <TableHeaderColumn style={Constants.tableRowHeightStyle}>Value</TableHeaderColumn>
            </TableRow>
        );
    }

    handleButtonActiviation( evt ) {
        if ( evt.target.name === 'close') {
            this.props.closeCallback(this.state.item);
        }
    }

    presentButtons( ) {
        if ( this.props.actionLabel === undefined ) {
            return ( <FlatButton name='close' label={this.props.closeLabel} onClick={this.handleButtonActiviation}/> )
        }
        return(
            <span>
                <FlatButton name='close' label={this.props.closeLabel} onClick={this.handleButtonActiviation}/>
                <FlatButton name='action' label={this.props.actionLabel} onClick={this.handleButtonActiviation}/>
            </span>
        );
    }

    handleChange( evt ) {
        var  o = this.state.item;
        o[evt.target.id] = evt.target.value;
        this.setState( o );
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
        let itemToBeChanged = this.state.item;
        itemToBeChanged.summaryId = evt.target.value;
        this.setState({item: itemToBeChanged } );
    }

    handleDescription(evt) {
        let itemToBeChanged = this.state.item;
        itemToBeChanged.description = evt.target.value;
        this.setState({item: itemToBeChanged } );

    }
    handleCost(evt) {
        let itemToBeChanged = this.state.item;
        itemToBeChanged.unitCost = evt.target.value;
        this.setState({item: itemToBeChanged } );
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
        return (
            <div >
                <Table multiSelectable={false} style={Constants.tableRowHeightStyle} >
                    <TableBody
                               deselectOnClickaway={false}
                               displayRowCheckbox={false}>
                        return(
                            <TableRow key={1} style={Constants.tableRowHeightStyle}>
                                    <TableRowColumn style={Constants.tableRowHeightStyleRight}>Item Id</TableRowColumn>
                                    <TableRowColumn style={Constants.tableRowHeightStyle}>
                                        <TextField
                                            id="Id" hintText={"Unique identifier of this item"}
                                        value={this.state.item.Id}
                                        />
                                    </TableRowColumn>
                            </TableRow>
                            <TableRow key={2}
                                  style={Constants.tableRowHeightStyle}>
                                <TableRowColumn style={Constants.tableRowHeightStyleRight}>SummaryId</TableRowColumn>
                                <TableRowColumn style={Constants.tableRowHeightStyle}>
                                    <TextField
                                        id="summaryId" hintText={"Summary ID of this item."}
                                        value={this.state.item.summaryId} onChange={this.handleChange}  />
                                </TableRowColumn>
                            </TableRow>

                            <TableRow key={3}
                                  style={Constants.tableRowHeightStyle}>
                                <TableRowColumn style={Constants.tableRowHeightStyleRight}>Description</TableRowColumn>
                                <TableRowColumn style={Constants.tableRowHeightStyle}>
                                    <TextField
                                        id="description" hintText={"Description of this item."}
                                        value={this.state.item.description}  onChange={this.handleChange} />
                                </TableRowColumn>
                            </TableRow>
                        <TableRow key={4}
                                  style={Constants.tableRowHeightStyle}>
                            <TableRowColumn style={Constants.tableRowHeightStyleRight}>Unit Cost</TableRowColumn>
                            <TableRowColumn style={Constants.tableRowHeightStyle}>
                                <TextField
                                    id="unitCost" hintText={"Unit Cost."} onChange={this.handleChange}
                                    value={Utility.formatNumber( this.state.item.unitCost ) }>
                                </TextField>
                            </TableRowColumn>
                        </TableRow>
                            ); } ) }
                        }
                    </TableBody>
                </Table>

                { this.presentButtons() }

            </div>
        );
    }
}

ItemProperties.propTypes = {
    mode: PropTypes.oneOf( ['read', 'write']).isRequired,
    item : PropTypes.object.isRequired,
    closeLabel : PropTypes.string.isRequired,
    closeCallback : PropTypes.func.isRequired,
    actionLabel : PropTypes.string,
    actionCallback : PropTypes.func
}

export default ItemProperties;