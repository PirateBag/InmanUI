/**
 * Created by osboxes on 22/06/17.
 */
import React from 'react';
import * as Constants from './Constants.js'
import * as Utility   from './Utility.js'
import * as queryString from 'query-string'
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import ItemProperties from "./ItemProperties.js";
import {Card, CardHeader, CardText, CardActions} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Avatar from 'material-ui/Avatar';
import MaterialItemGrid from "./MaterialItemGrid.js";
import ServicePoster from "./ServicePoster.js";
import DeleteModal from './DeleteModal.js';
import MetadataUnitTests from './MetadataUnitTests.js';
import SelectedItemGrid from "./SelectedItemGrid";
import Item from "./model/Item.js";
import redWagonImage from "./images/logo.png"

class SearchAndDisplayBsTable extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            ItemId: '',
            SummaryId: '',
            Description: '',
            MessageState: '',
            ItemResponse: null,
            Mode: 'query',
            itemsAvailable: [],
            itemsSelected: [],
            showSearchCard: true,
            showSelectCard: false,
            queryCriteria : Constants.NoItem
        };

        this.emptyItem = Constants.NoItem;
        this.searchItems = this.searchItems.bind(this);
        this.responseCallback = this.responseCallback.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleDoneWithAdding = this.handleDoneWithAdding.bind(this);
        this.handleSearchCardExpandedChange = this.handleSearchCardExpandedChange.bind(this);
        this.handleSelectCardExpandedChange = this.handleSelectCardExpandedChange.bind(this);
        this.handleMoveAvailableToSelected = this.handleMoveAvailableToSelected.bind(this);
        this.handleMoveSelectedToAvailable = this.handleMoveSelectedToAvailable.bind(this);
        this.handleDeleteClose = this.handleDeleteClose.bind(this);
        this.handleUnitTest = this.handleUnitTest.bind(this);
        this.idIsMemberOf = this.idIsMemberOf.bind(this);
        this.queryScreenCancel = this.queryScreenCancel.bind(this);
        this.queryScreenSearch = this.queryScreenSearch.bind(this);
    }

    queryScreenCancel( queryCriteria ) {
        this.setState( { Mode : "query"});
        this.setState( { queryCriteria : queryCriteria });
    }
    queryScreenSearch( queryCriteria ) {
        this.setState( { Mode : "query"});
        this.setState( { queryCriteria : queryCriteria });
        this.searchItems( {itemSearchParameters: queryCriteria })
    }


    responseCallback( response ) {
        this.setState( { ItemResponse : response });
        this.setState( { itemsAvailable  : response.data });
        this.setState( { itemsSelected : [] })
    }


    /** No-op until more robust error handling.  */
    responseCallbackDelete( response ) {

    }


    handleDeleteClose( ) {
        this.setState( { Mode : "query"});
        this.setState( { itemsSelected : [] })
    }


    searchItems( {itemSearchParameters: item } ) {
        let params = queryString.stringify(
            {
                'id': item.id,
                'summaryId': item.summaryId,
                'description': item.description
            });
        let servicePost = new ServicePoster(
            { url: Constants.INMAN_SERVER_IP,
                typeOfRequest: Constants.SERVER_REQUEST_TYPE_ITEM_QUERY }  );
        servicePost.go( { parameters: params, responseCallback: this.responseCallback } );
    }


    getDeleteItem( itemToDelete ) {
        let params = { id : itemToDelete.id };
        let paramsJson  = queryString.stringify( params );
        let servicePost = new ServicePoster( { url: Constants.INMAN_SERVER_IP,
            typeOfRequest: Constants.SERVER_REQUEST_TYPE_ITEM_DELETE } );

        servicePost.go( { parameters: paramsJson, responseCallback: this.responseCallbackDelete } );
    }


    handleSearchCardExpandedChange( expanded ) {
        this.setState( {showSearchCard: expanded });
    }
    handleSelectCardExpandedChange( expanded ) {
        this.setState( {showSelectCard: expanded });
    }


    handleSearch(evt) {
        this.setState( { Mode : 'query'} );
        this.searchItems( { itemSearchParameters: this.state.queryCriteria } );
    }

    handleAdd(evt) {
        this.setState( { Mode : 'add'} );
    }

    handleUnitTest( evt ) {
        this.setState( { Mode : 'unittest'})
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
            this.setState({Mode: 'query', ItemResponse: null });
        }
    }

    idIsMemberOf( arrayOfItemsToSearch, id) {
        let indexOfItems = 0;
        while ( indexOfItems <  arrayOfItemsToSearch.length) {
            if ( arrayOfItemsToSearch[ indexOfItems ].id === id ) {
                return true;
            }
            indexOfItems++;
        }
        return false;
    }

    handleMoveAvailableToSelected( itemSelected ) {
        let newAvailable = Utility.removeById( this.state.itemsAvailable, itemSelected );
        let newSelected = Utility.addById( this.state.itemsSelected, itemSelected );
        this.setState( { showSelectCard : true } );
        this.setState( { itemsAvailable : newAvailable } );
        this.setState( { itemsSelected : newSelected });
    }

    handleMoveSelectedToAvailable( itemSelected ) {
        let newAvailable = Utility.addById( this.state.itemsAvailable, itemSelected );
        let newSelected = Utility.removeById( this.state.itemsSelected, itemSelected );
        this.setState( { itemsAvailable : newAvailable } );
        this.setState( { itemsSelected : newSelected });
    }



    /**
     * Handle the pressing of the delete button on the primary card.
     *
     *
     */
    handleDelete( ) {
        let originalIndex = 0;
        this.setState( { Mode : "delete"})
        while ( originalIndex < this.state.itemsSelected.length ) {
            let item = this.state.itemsSelected[ originalIndex ];
            this.getDeleteItem( item );
            originalIndex++;
        }

    }


    render() {
        if (this.props.credentialsState.token === Constants.NO_TOKEN)
            return null;

        if (this.state.Mode === 'add') {
            let newItem = new Item( {} );
            return (
                <div>
                    <ItemProperties mode={"read"}
                                    item={newItem}
                                    closeLabel={"Return"}
                                    closeCallback={this.handleDoneWithAdding}
                                    actionLabel={"SAVE"}
                                    actionCallback={this.handleDoneWithAdding}/>
                </div>
            );
        }  else if ( this.state.Mode === 'delete') {
            return (
            <DeleteModal
                itemsToDeleteRemaining={this.state.itemsSelected.length}
                closeCallBack={this.handleDeleteClose}
            />
            );
        } else if ( this.state.Mode === 'unit2test') {
            return (
                <MetadataUnitTests
                    closeCallBack={this.handleDeleteClose}
                />
            );
        } else {
            if ( this.state.ItemResponse == null ) {
                this.searchItems( { itemSearchParameters: Constants.NoItem } );
            }
            return (
                <div>
                <Card expanded={this.state.showSearchCard}
                      zDepth={2}
                      onExpandChange={this.handleSearchCardExpandedChange} >

                    <CardHeader
                        title="Item Search Criteria."
                        avatar={
                            <Avatar src={redWagonImage}/>
                        }
                        actAsExpander={true}
                        showExpandableButton={true}
                    />
                    <CardText expandable={true}>
                        <ItemProperties mode={'read'} item={this.state.queryCriteria }
                        />
                    </CardText>

                </Card>
                <Card expanded={true} zDepth={2}>
                    <CardHeader
                        title="Items available"
                        actAsExpander={true}
                        showExpandableButton={true}
                    />
                    <CardText expandable={true}>
                        <CardActions>
                            <FlatButton label="Add" onClick={this.handleAdd}/>
                            <FlatButton label="Search" onClick={this.handleSearch}/>
                            <FlatButton label="Unit Tests" onClick={this.handleUnitTest}/>
                        </CardActions>
                        <MaterialItemGrid items={this.state.itemsAvailable }
                                      onSelectCallback={this.handleMoveAvailableToSelected}/>
                    </CardText>

                </Card>

                <SelectedItemGrid expanded={this.state.showSelectCard}
                                  onExpandChange={this.handleSelectCardExpandedChange}
                                  items={this.state.itemsSelected}
                                  onSelectCallback={this.handleMoveSelectedToAvailable}
                                  handleAdd={this.handleAdd}/>
                </div>
            );
           }
        }
}
export default SearchAndDisplayBsTable;
