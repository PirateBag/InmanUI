
import React, { Component } from 'react';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import * as Constants from './Constants.js'
import IconButton from 'material-ui/IconButton';
import {red500, yellow500, blue500, greenA200} from 'material-ui/styles/colors'
import DeleteIcon from 'material-ui/svg-icons/action/delete'
import EditIcon from 'material-ui/svg-icons/image/edit'
import HamburgIcon from 'material-ui/svg-icons/action/reorder'



export class MaterialItemGrid extends Component {
    constructor ( props ) {
        super( props );
        this.onRowSelection = this.onRowSelection.bind(this);
        this.utilityRenderColumnNames = this.utilityRenderColumnNames.bind(this);
        this.onButtonActivation = this.onButtonActivation.bind(this);

    };

    utilityRenderColumnNames() {
        return(
            <TableRow style={Constants.tableRowHeightStyle}>
                <TableHeaderColumn style={Constants.tableRowHeightStyle}>
                    <HamburgIcon style={Constants.iconStyles.small} > </HamburgIcon>
                </TableHeaderColumn>
                <TableHeaderColumn style={Constants.tableRowHeightStyle}>Id</TableHeaderColumn>
                <TableHeaderColumn style={Constants.tableRowHeightStyle}>Summary</TableHeaderColumn>
                <TableHeaderColumn style={Constants.tableRowHeightStyle}>Description</TableHeaderColumn>
                <TableHeaderColumn style={Constants.tableRowHeightStyle}>Unit Cost</TableHeaderColumn>
            </TableRow>
        );
    }

    utilityRenderColumns( fields ) {
        if ( fields === undefined ) {
            return( this.utilityRenderColumnNames() )
        } else {
        return(
            <TableRow style={Constants.tableRowHeightStyle}>
                { fields.map( (field,index ) => {
                    return( field.showColumnHeaderHtml() );
                } ) }
        </TableRow>
        );
        }


    }


    onRowSelection( rows ) {
        let itemSelected = this.props.items[ rows[ 0 ]];
        this.props.onSelectCallback( itemSelected );
    }

    onButtonActivation( event ) {
        let currentTarget = event.currentTarget;
        let id = currentTarget.id;
        let itemSelected = this.props.items[ id ];
        this.props.onSelectCallback( itemSelected );
    }

    render() {

        if ( !this.props.items ) {
            return null;
        }


        return (
            <span>
                <Table multiSelectable={false} >
                <TableHeader adjustForCheckbox={false}
                             displaySelectAll={false}>
                        {this.utilityRenderColumnNames() }
                </TableHeader>
                <TableBody stripedRows={true}
                           deselectOnClickaway={false}
                           displayRowCheckbox={false}>
                    {   this.props.items.map( (item,index ) => {
                        return(
                            <TableRow key={item.id}
                                      style={Constants.tableRowHeightStyle}>
                                <TableRowColumn style={Constants.tableRowHeightStyle}>
                                    <IconButton tooltip='Delete'
                                                iconStyle={Constants.iconStyles.smallIcon}
                                                style={Constants.iconStyles.small}
                                         onClick={this.onButtonActivation} id={index}>
                                        <DeleteIcon/>
                                    </IconButton>
                                    <IconButton tooltip='Edit' iconStyle={Constants.iconStyles.smallIcon}
                                                style={Constants.iconStyles.small}
                                                onClick={this.onButtonActivation}
                                        >
                                        <EditIcon/>
                                    </IconButton>
                                </TableRowColumn>
                                <TableRowColumn style={Constants.tableRowHeightStyle}>{item.id}</TableRowColumn>
                                <TableRowColumn style={Constants.tableRowHeightStyle}>{item.summaryId}</TableRowColumn>
                                <TableRowColumn style={Constants.tableRowHeightStyle}>{item.description}</TableRowColumn>
                                <TableRowColumn style={Constants.tableRowHeightStyle}>
                                    <NumberFormat value={item.unitCost} thousandSeparator={','} decimalSeparator={'.'} prefix={'$'} decimalPrecision={2}
                                              displayType='text'/>
                                </TableRowColumn>
                            </TableRow>
                        ); } ) }
                    }
                </TableBody>
              </Table>
            </span> );
        }
    }

MaterialItemGrid.propTypes = {
    items : PropTypes.array.isRequired,
    onSelectCallback : PropTypes.func.isRequired,
    fields : PropTypes.array,
};

export default MaterialItemGrid;