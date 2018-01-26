
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

const styles = {
    smallIcon: {
        width: 16,
        height: 16,
    },
    mediumIcon: {
        width: 48,
        height: 48,
    },
    largeIcon: {
        width: 60,
        height: 60,
    },
    small: {
        width: 32,
        height: 32,
        padding: 6,
    },
    medium: {
        width: 96,
        height: 96,
        padding: 24,
    },
    large: {
        width: 120,
        height: 120,
        padding: 30,
    },
};


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
                    <HamburgIcon style={styles.small} > </HamburgIcon>
                </TableHeaderColumn>
                <TableHeaderColumn style={Constants.tableRowHeightStyle}>Id</TableHeaderColumn>
                <TableHeaderColumn style={Constants.tableRowHeightStyle}>Summary</TableHeaderColumn>
                <TableHeaderColumn style={Constants.tableRowHeightStyle}>Description</TableHeaderColumn>
                <TableHeaderColumn style={Constants.tableRowHeightStyle}>Unit Cost</TableHeaderColumn>
            </TableRow>
        );
    }

    onRowSelection( rows ) {
        let itemSelected = this.props.items[ rows[ 0 ]];
        this.props.onSelectCallback( itemSelected );
    }

    onButtonActivation( event ) {
        let itemIndex = event["[[Target]]"].currentTarget.id;
        let itemSelected = this.props.items[ itemIndex ];
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
                                    <IconButton tooltip='Delete' iconStyle={styles.smallIcon} style={styles.small}
                                         onClick={this.onButtonActivation} id={'id' + index}>
                                        <DeleteIcon/>
                                    </IconButton>
                                    <IconButton tooltip='Edit' iconStyle={styles.smallIcon} style={styles.small}
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
};

export default MaterialItemGrid;