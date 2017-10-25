
import React, { Component } from 'react';
import {
    Table,
    TableBody,
    TableFooter,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import FlatButton from 'material-ui/FlatButton';
import * as Constants from './Constants.js'

export class MaterialItemGrid extends Component {
    constructor ( props ) {
        super( props );
        this.onRowSelection = this.onRowSelection.bind(this);
        this.utilityRenderColumnNames = this.utilityRenderColumnNames.bind(this);

    };

    utilityRenderColumnNames() {
        return(
            <TableRow style={Constants.tableRowHeightStyle}>
            <TableHeaderColumn style={Constants.tableRowHeightStyle}>ID</TableHeaderColumn>
            <TableHeaderColumn style={Constants.tableRowHeightStyle}>Summary</TableHeaderColumn>
            <TableHeaderColumn style={Constants.tableRowHeightStyle}>Description</TableHeaderColumn>
            <TableHeaderColumn style={Constants.tableRowHeightStyle}>Unit Cost</TableHeaderColumn>
            </TableRow>
        );
    }

    onRowSelection( rows ) {
        let itemSelected = this.props.items[ rows[ 0 ]];
        this.props.actionButtonHandler( itemSelected );
    }

    render() {

        if ( !this.props.items ) {
            return null;
        }


        return (
            <span>
                <Table multiSelectable={false} onRowSelection={this.onRowSelection}>
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

                <TableFooter
                    adjustForCheckbox={false}
                    style={Constants.tableRowHeightStyle}>
                <TableRow>
                  <TableRowColumn colSpan="4" style={{textAlign: 'center'}}>
                    <FlatButton
                                label={this.props.actionButtonLabel}
                                onClick={this.handleAction}/>
                  </TableRowColumn>
                </TableRow>
                </TableFooter>

              </Table>
            </span> );
        }
    }

MaterialItemGrid.propTypes = {
    items : PropTypes.array.isRequired,
    actionButtonHandler : PropTypes.func.isRequired,
    actionButtonLabel   : PropTypes.string.isRequired
};

export default MaterialItemGrid;