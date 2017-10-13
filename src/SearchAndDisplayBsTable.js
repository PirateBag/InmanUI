/**
 * Created by osboxes on 22/06/17.
 */
import React from 'react';
import * as Constants from './Constants.js'
import * as queryString from 'query-string'
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import AddItem from "./AddItem.js";
import {Card, CardHeader, CardText, CardActions} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import MaterialItemGrid from "./MaterialItemGrid.js";
import ServicePoster from "./ServicePoster.js";

class SearchAndDisplayBsTable extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            ItemId : '',
            SummaryId : '',
            Description: '',
            MessageState: '',
            ItemResponse : null,
            Mode : 'query',
            expanded: true
            };

        this.getItems = this.getItems.bind( this );
        this.handleChange = this.handleChange.bind(this);
        this.responseCallback = this.responseCallback.bind(this);
        this.handleAdd = this.handleAdd.bind( this );
        this.handleSearch = this.handleSearch.bind( this );
        this.handleDoneWithAdding = this.handleDoneWithAdding.bind(this);
        this.handleExpand = this.handleExpand.bind(this);
        this.handleReduce = this.handleReduce.bind(this);
        this.handleExpandedChange = this.handleExpandedChange.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
    }

    handleChange( evt ) {
        var  o = {  };
        o[evt.target.id] = evt.target.value;
        this.setState( o );
    }

    responseCallback( response ) {
        this.setState( { ItemResponse : response });
    }

    getItems( ) {
        let params = queryString.stringify(
            {
                'id': this.state.ItemId,
                'summaryId': this.state.SummaryId,
                'description': this.state.Description
            });
        let servicePost = new ServicePoster(Constants.INMAN_SERVER_IP,
            Constants.SERVER_REQUEST_TYPE_ITEM_QUERY );
        servicePost.go(params, null, this.responseCallback);
    }

    handleExpand() {
        this.setState({expanded: true});
    }
    handleReduce() {
        this.setState( {expanded: false})
    }
    handleExpandedChange( expanded ) {
        this.setState( {expanded: expanded });
    }

    handleToggle(event, toggle) {
        this.setState({expanded: toggle});
    };

    handleSearch(evt) {
        this.setState( { Mode : 'query'} );
        this.getItems( );
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

        if (this.props.credentialsState.token === Constants.NO_TOKEN)
            return null;

        if (this.state.Mode === 'add') {
            return (
                <div>
                    <AddItem Mode={this.state.Mode} doneWithAdding={this.handleDoneWithAdding}/>
                </div>
            );
        }  else {
            if ( this.state.ItemResponse == null ) {
                this.getItems();
            }
            return (
                <div>
                <Card expanded={this.state.expanded }
                      onExpandChange={this.handleExpandedChange} >

                    <CardHeader
                        title="Item Search Criteria"
                        avatar="./logo.png"
                        actAsExpander={true}
                        showExpandableButton={true}
                    />
                    <CardText expandable={true}>
                    <label htmlFor="itemId>">Item Id</label>
                    <input id='ItemId' type="text" onChange={this.handleChange} value={this.state.ItemId}/>
                    <label htmlFor="summaryId>">Summary Id</label>
                    <input id='SummaryId' type="text" onChange={this.handleChange} value={this.state.SummaryId}/>
                    <label htmlFor="description>">Description</label>
                    <input id='Description' name='Description' type="text" onChange={this.handleChange} value={this.state.Description}/>
                    <CardActions>
                        <FlatButton label="Add" onClick={this.handleAdd}/>
                        <FlatButton label="Search" onClick={this.handleSearch}/>
                    </CardActions>

                </CardText>
                </Card>
                <Card>
                    <MaterialItemGrid ItemResponse={this.state.ItemResponse} />
                </Card>
                </div>
            )
           }
        }
}
export default SearchAndDisplayBsTable;
