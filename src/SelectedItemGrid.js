/**
 * Created by osboxes on 17/07/17.
 */
import React from "react";
import * as Constants from './Constants.js'
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import {Card, CardHeader, CardText, CardActions} from 'material-ui/Card';
import MaterialItemGrid from "./MaterialItemGrid.js";
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';

class SelectedItemGrid extends React.Component {

    render() {
        let buttons = null;
        if ( this.props.items.length === 0 ) {
            return null;
        } else if ( this.props.items.length === 1) {
            buttons =
                <div>
                <FlatButton label="Add" onClick={this.props.handleAdd}/>
                <FlatButton label="Change" onClick={this.handleAdd}/>
                <FlatButton label="Delete" onClick={this.handleAdd}/>
                </div>;
        } else if ( this.props.items.length > 1 ) {
            buttons =
                <div>
                <FlatButton label="Add" onClick={this.props.handleAdd}/>
                <FlatButton label="Delete" onClick={this.handleAdd}/>
                </div>;
        }
        return (
            <Card expanded={this.props.expanded}
              onExpandChange={this.props.onExpandChange}
              zDepth={Constants.zDepth}>
            <CardHeader
                title="Items selected."
                actAsExpander={true}
                showExpandableButton={true}
            />

            <CardText expandable={true}>
                <CardActions>
                    {buttons}
                </CardActions>
                <MaterialItemGrid items={this.props.items }
                                  onSelectCallback={this.props.onSelectCallback}
                />

            </CardText>
        </Card> );
        }
    }

SelectedItemGrid.propTypes = {
    expanded : PropTypes.bool.isRequired,
    onExpandChange  : PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
    onSelectCallback : PropTypes.func.isRequired,
    handleAdd : PropTypes.func.isRequired
}

export default SelectedItemGrid;

