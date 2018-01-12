/**
 * Created by osboxes on 07/07/17.
 */
import * as Constants from './Constants.js'
import * as newItemProperties from './metadata/Domain.js'
import * as queryString from 'query-string'
import React from "react";
import {
    Table,
    TableBody


} from 'material-ui/Table';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import ServicePoster from "./ServicePoster.js";

export class ItemProperties extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            item : props.item
         };

        this.handleChange = this.handleChange.bind(this);
        this.presentButtons = this.presentButtons.bind( this );
        this.handleButtonActiviation = this.handleButtonActiviation.bind( this );
        this.persistNewItem = this.persistNewItem.bind( this );
    }

    handleButtonActiviation( evt ) {
        let name = evt.currentTarget.name;
        if ( name === 'close') {
            this.props.closeCallback(this.state.item);
        } else if ( name === 'action' ) {
            if ( this.props.actionLabel === 'SAVE' ) {
                this.persistNewItem(this);
            }
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

        let metaO =  {item: o}

        this.setState( metaO );
    }


    persistNewItem(theObject ) {
        let params = {
                summaryId : theObject.state.item.summaryId,
                description : theObject.state.item.description,
                unitCost : theObject.state.item.unitCost };

        params = queryString.stringify( params );

        let servicePost = new ServicePoster( { url: Constants.INMAN_SERVER_IP,
            typeOfRequest: Constants.SERVER_REQUEST_TYPE_ITEM_ADD } );
        servicePost.go( { parameters: params, responseCallback: this.props.doneWithAdding } );

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
                        { newItemProperties.id.showRowHtml({ key : 1,
                            value: this.state.item.id, onChange: this.handleChange })}
                        { newItemProperties.summaryId.showRowHtml({ key : 2,
                            value: this.state.item.summaryId, onChange: this.handleChange })}
                        { newItemProperties.description.showRowHtml({ key : 3,
                            value: this.state.item.description, onChange: this.handleChange })}
                        { newItemProperties.unitCost.showRowHtml({ key : 4,
                            value: this.state.item.unitCost, onChange: this.handleChange })}
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